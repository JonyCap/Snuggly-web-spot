#!/usr/bin/env python3
"""
Warehouse Slotting Strategy Optimizer
====================================

This script optimizes warehouse layout based on pick frequency data from CSV files.
It implements ABC classification and places high-frequency items closer to the dock.

Usage:
    1. Save this file as warehouse_slotting_optimizer.py
    2. Place your CSV file(s) in the same directory
    3. Run: python warehouse_slotting_optimizer.py

Input CSV format should have pick frequency data in a grid format.
Empty cells represent obstacles or unavailable positions.

Author: Warehouse Optimization Tool
Date: 2025
"""

import pandas as pd
import numpy as np
import csv
import os
from typing import List, Tuple, Dict
import math

class WarehouseSlottingOptimizer:
    def __init__(self):
        self.grid = None
        self.sku_data = None
        self.dock_position = (0, 0)  # Default dock at top-left
        self.obstacle_positions = set()
        
    def load_frequency_grid(self, csv_file_path: str) -> pd.DataFrame:
        """Load frequency grid from CSV file"""
        try:
            # Read the CSV file
            df = pd.read_csv(csv_file_path, index_col=0)
            self.grid = df
            print(f"✓ Loaded grid with dimensions: {df.shape}")
            return df
        except Exception as e:
            print(f"✗ Error loading file: {e}")
            return None
    
    def flatten_grid_to_skus(self) -> pd.DataFrame:
        """Flatten the grid to create SKU list with positions and frequencies"""
        if self.grid is None:
            raise ValueError("Grid not loaded. Call load_frequency_grid first.")
        
        sku_list = []
        sku_counter = 1
        
        for row in range(len(self.grid)):
            for col in range(len(self.grid.columns)):
                frequency = self.grid.iloc[row, col]
                if pd.notna(frequency) and str(frequency).strip() != '' and frequency != 0:
                    try:
                        freq_value = float(frequency)
                        if freq_value > 0:
                            sku_name = f"SKU{sku_counter}"
                            sku_list.append({
                                'SKU': sku_name,
                                'Row': row,
                                'Col': col,
                                'Position': f"({row},{col})",
                                'Pick_Frequency': freq_value
                            })
                            sku_counter += 1
                    except (ValueError, TypeError):
                        continue
        
        self.sku_data = pd.DataFrame(sku_list)
        print(f"✓ Created {len(sku_list)} SKUs from grid")
        return self.sku_data
    
    def conduct_pareto_analysis(self) -> pd.DataFrame:
        """Conduct Pareto analysis on SKU data"""
        if self.sku_data is None:
            raise ValueError("SKU data not available. Call flatten_grid_to_skus first.")
        
        # Sort by frequency in descending order
        sorted_data = self.sku_data.sort_values('Pick_Frequency', ascending=False).copy()
        sorted_data = sorted_data.reset_index(drop=True)
        
        # Calculate cumulative percentage
        total_frequency = sorted_data['Pick_Frequency'].sum()
        sorted_data['Cumulative_Frequency'] = sorted_data['Pick_Frequency'].cumsum()
        sorted_data['CU_Percentage'] = (sorted_data['Cumulative_Frequency'] / total_frequency) * 100
        
        print(f"✓ Pareto analysis completed - Total frequency: {total_frequency}")
        return sorted_data
    
    def calculate_abc_classes(self, a_threshold: float = 20, b_threshold: float = 50) -> pd.DataFrame:
        """Calculate ABC classes based on cumulative percentages"""
        pareto_data = self.conduct_pareto_analysis()
        
        def classify_sku(cu_percentage):
            if cu_percentage <= a_threshold:
                return 'A'
            elif cu_percentage <= b_threshold:
                return 'B'
            else:
                return 'C'
        
        pareto_data['Classification'] = pareto_data['CU_Percentage'].apply(classify_sku)
        
        # Count classifications
        class_counts = pareto_data['Classification'].value_counts()
        print(f"✓ ABC Classification: A={class_counts.get('A', 0)}, B={class_counts.get('B', 0)}, C={class_counts.get('C', 0)}")
        
        return pareto_data
    
    def calculate_distance_from_dock(self, row: int, col: int) -> float:
        """Calculate Manhattan distance from dock position"""
        return abs(row - self.dock_position[0]) + abs(col - self.dock_position[1])
    
    def assign_skus_to_slots(self) -> pd.DataFrame:
        """Assign SKUs to optimal slots based on frequency and distance from dock"""
        classified_data = self.calculate_abc_classes()
        
        # Calculate distance from dock for each current position
        classified_data['Current_Distance'] = classified_data.apply(
            lambda x: self.calculate_distance_from_dock(x['Row'], x['Col']), axis=1
        )
        
        # Create optimization score (higher frequency, lower distance = better score)
        classified_data['Optimization_Score'] = (
            classified_data['Pick_Frequency'] * 1000 / 
            (classified_data['Current_Distance'] + 1)  # +1 to avoid division by zero
        )
        
        print("✓ SKU optimization scores calculated")
        return classified_data
    
    def create_optimized_grid_layout(self) -> Tuple[pd.DataFrame, pd.DataFrame]:
        """Create the final optimized grid layout"""
        optimized_data = self.assign_skus_to_slots()
        
        # Create a copy of the original grid structure filled with empty strings
        optimized_grid = pd.DataFrame(
            '', 
            index=self.grid.index, 
            columns=self.grid.columns
        )
        
        # Get all available positions and sort by distance from dock
        available_positions = []
        for row in range(len(self.grid)):
            for col in range(len(self.grid.columns)):
                cell_value = self.grid.iloc[row, col]
                if pd.notna(cell_value) and str(cell_value).strip() != '':
                    try:
                        freq_value = float(cell_value)
                        if freq_value >= 0:  # Include positions with frequency data
                            distance = self.calculate_distance_from_dock(row, col)
                            available_positions.append((distance, row, col))
                    except (ValueError, TypeError):
                        continue
        
        # Sort positions by distance from dock (closest first)
        available_positions.sort(key=lambda x: x[0])
        
        # Sort SKUs by frequency (highest first) for optimal placement
        sorted_skus = optimized_data.sort_values('Pick_Frequency', ascending=False)
        
        # Assign high-frequency SKUs to closest positions
        for i, (_, row, col) in enumerate(available_positions):
            if i < len(sorted_skus):
                sku_name = sorted_skus.iloc[i]['SKU']
                optimized_grid.iloc[row, col] = sku_name
                
                # Update the SKU data with new optimal position
                optimized_data.loc[optimized_data['SKU'] == sku_name, 'Optimal_Row'] = row
                optimized_data.loc[optimized_data['SKU'] == sku_name, 'Optimal_Col'] = col
                optimized_data.loc[optimized_data['SKU'] == sku_name, 'Optimal_Position'] = f"({row},{col})"
                optimized_data.loc[optimized_data['SKU'] == sku_name, 'Optimal_Distance'] = self.calculate_distance_from_dock(row, col)
        
        # Mark obstacles and dock
        optimized_grid.iloc[self.dock_position[0], self.dock_position[1]] = 'DOCK'
        
        # Fill remaining positions with obstacles or empty
        for row in range(len(self.grid)):
            for col in range(len(self.grid.columns)):
                if optimized_grid.iloc[row, col] == '':
                    cell_value = self.grid.iloc[row, col]
                    if pd.isna(cell_value) or str(cell_value).strip() == '':
                        optimized_grid.iloc[row, col] = 'OBSTACLE'
        
        print("✓ Optimized grid layout created")
        return optimized_grid, optimized_data
    
    def save_results(self, output_prefix: str = 'optimized_warehouse'):
        """Save the optimized results to CSV files"""
        optimized_grid, optimized_data = self.create_optimized_grid_layout()
        
        # Save the grid layout
        grid_file = f'{output_prefix}_grid_layout.csv'
        optimized_grid.to_csv(grid_file)
        
        # Save the detailed SKU data
        detail_file = f'{output_prefix}_sku_details.csv'
        optimized_data.to_csv(detail_file, index=False)
        
        print(f"✓ Results saved:")
        print(f"  - {grid_file}")
        print(f"  - {detail_file}")
        
        return optimized_grid, optimized_data
    
    def print_summary(self):
        """Print optimization summary"""
        if self.sku_data is None:
            print("No data available for summary")
            return
        
        classified_data = self.calculate_abc_classes()
        
        print("\n" + "="*50)
        print("    WAREHOUSE OPTIMIZATION SUMMARY")
        print("="*50)
        print(f"Total SKUs: {len(classified_data)}")
        print(f"Grid dimensions: {self.grid.shape[0]} rows × {self.grid.shape[1]} columns")
        print(f"Dock position: {self.dock_position}")
        
        # Class distribution
        class_counts = classified_data['Classification'].value_counts()
        total_freq = classified_data['Pick_Frequency'].sum()
        
        print(f"\nABC Classification:")
        for class_name in ['A', 'B', 'C']:
            count = class_counts.get(class_name, 0)
            percentage = (count / len(classified_data)) * 100 if len(classified_data) > 0 else 0
            class_freq = classified_data[classified_data['Classification'] == class_name]['Pick_Frequency'].sum()
            freq_pct = (class_freq / total_freq) * 100 if total_freq > 0 else 0
            print(f"  Class {class_name}: {count:2d} SKUs ({percentage:4.1f}%) - {class_freq:5.0f} picks ({freq_pct:4.1f}%)")
        
        # Top performers
        print(f"\nTop 10 Highest Frequency SKUs:")
        print(f"{'SKU':<8} {'Freq':<6} {'Class':<5} {'Cum%':<6} {'Position':<10}")
        print("-" * 40)
        top_skus = classified_data.head(10)
        for _, row in top_skus.iterrows():
            print(f"{row['SKU']:<8} {row['Pick_Frequency']:<6.0f} {row['Classification']:<5} {row['CU_Percentage']:<6.1f} {row['Position']:<10}")
        
        print("="*50)

def process_csv_file(input_csv_path: str, output_prefix: str = "optimized"):
    """Process a single CSV file and generate optimized warehouse layout"""
    print(f"\n{'='*60}")
    print(f"PROCESSING: {input_csv_path}")
    print(f"{'='*60}")
    
    optimizer = WarehouseSlottingOptimizer()
    
    try:
        # Load the CSV file
        grid = optimizer.load_frequency_grid(input_csv_path)
        if grid is None:
            print("✗ Failed to load CSV file!")
            return None
        
        # Process the data step by step
        print("\nStep 1: Flattening grid to SKUs...")
        sku_data = optimizer.flatten_grid_to_skus()
        
        if len(sku_data) == 0:
            print("✗ No valid SKUs found in the grid!")
            return None
        
        print("Step 2: Conducting Pareto analysis...")
        pareto_data = optimizer.conduct_pareto_analysis()
        
        print("Step 3: Calculating ABC classes...")
        classified_data = optimizer.calculate_abc_classes()
        
        print("Step 4: Creating optimized layout...")
        optimized_grid, optimized_data = optimizer.create_optimized_grid_layout()
        
        print("Step 5: Saving results...")
        optimizer.save_results(output_prefix)
        
        print("Step 6: Generating summary...")
        optimizer.print_summary()
        
        print(f"\n✓ OPTIMIZATION COMPLETE FOR: {input_csv_path}")
        return optimized_grid, optimized_data
        
    except Exception as e:
        print(f"✗ Error processing {input_csv_path}: {e}")
        return None

def create_sample_data():
    """Create sample warehouse data based on Lab 12 example"""
    sample_data = {
        '0': [0, 1, 2, 3, 4, 5],
        '1': [0, 19, 15, '', 8, 21],
        '2': [1, 19, 23, 11, 11, 24],
        '3': [2, 36, 24, 3, 22, 2],
        '4': [3, 24, 30, '', 9, 21],
        '5': [4, 33, 12, 22, 25, '']
    }
    
    sample_df = pd.DataFrame(sample_data)
    sample_filename = "sample_warehouse_frequency_data.csv"
    sample_df.to_csv(sample_filename, index=False)
    print(f"✓ Sample file created: {sample_filename}")
    return sample_filename

def main():
    """Main function - automatically processes CSV files in the directory"""
    print("*" * 70)
    print("             WAREHOUSE SLOTTING STRATEGY OPTIMIZER")
    print("*" * 70)
    print("This tool optimizes warehouse layout based on pick frequency data.")
    print("It implements ABC classification and distance optimization from dock.")
    print("*" * 70)
    
    # Look for CSV files in current directory
    csv_files = [f for f in os.listdir('.') if f.endswith('.csv') and not f.startswith('optimized_') and not f.startswith('sample_')]
    
    if not csv_files:
        print("\n⚠ No input CSV files found in current directory.")
        print("Creating sample data for demonstration...")
        sample_file = create_sample_data()
        csv_files = [sample_file]
    
    print(f"\nFound {len(csv_files)} CSV file(s) to process:")
    for i, file in enumerate(csv_files, 1):
        print(f"  {i}. {file}")
    
    # Process each CSV file
    results = {}
    for csv_file in csv_files:
        base_name = csv_file.replace('.csv', '')
        output_prefix = f"optimized_{base_name}"
        result = process_csv_file(csv_file, output_prefix)
        results[csv_file] = result
    
    # Final summary
    print(f"\n{'*'*70}")
    print("                    PROCESSING COMPLETE")
    print(f"{'*'*70}")
    
    successful = sum(1 for r in results.values() if r is not None)
    print(f"Successfully processed: {successful}/{len(csv_files)} files")
    
    if successful > 0:
        print(f"\nGenerated files:")
        for csv_file, result in results.items():
            if result is not None:
                base_name = csv_file.replace('.csv', '')
                print(f"  From {csv_file}:")
                print(f"    → optimized_{base_name}_grid_layout.csv")
                print(f"    → optimized_{base_name}_sku_details.csv")
    
    print(f"\nTo use this tool:")
    print(f"1. Place your warehouse frequency CSV files in this directory")
    print(f"2. Run: python warehouse_slotting_optimizer.py")
    print(f"3. Check the generated optimized_*_grid_layout.csv files")
    print("*" * 70)

if __name__ == "__main__":
    main()
