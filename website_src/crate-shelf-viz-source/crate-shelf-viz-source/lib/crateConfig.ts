/**
 * Crate Configuration
 * 
 * Maps crateIds to their positions in the warehouse visualization.
 * This configuration defines where each crate is located in the 3D space.
 * 
 * Format: crateId -> { rackIndex, row, column, side }
 * 
 * Example crateId format: "R2-C3-L1"
 * - R2 = Rack 2 (0-indexed: rack 1)
 * - C3 = Column 3 (0-indexed: column 2)
 * - L1 = Level 1 (0-indexed: level 0)
 */

export interface CratePosition {
  rackIndex: number; // Which rack (0-indexed)
  row: number; // Shelf level (0-indexed, bottom to top)
  column: number; // Position along X-axis (0-indexed)
  side: "front" | "back"; // Front (positive Z) or back (negative Z)
}

/**
 * Default crate configuration mapping
 * 
 * This maps crateIds like "R2-C3-L1" to their positions in the warehouse.
 * You can extend this based on your actual warehouse layout.
 * 
 * For the demo, we'll create a mapping for a typical warehouse with:
 * - 4 racks (R0, R1, R2, R3)
 * - 4 levels per rack (L0, L1, L2, L3)
 * - 5 columns per level (C0, C1, C2, C3, C4)
 * - Front and back sides
 */
export const crateConfig: Record<string, CratePosition> = {};

/**
 * Initialize crate configuration based on warehouse layout
 * 
 * @param rackCount Number of racks (default: 4)
 * @param levelsPerRack Number of shelf levels per rack (default: 4)
 * @param columnsPerLevel Number of positions per level (default: 5)
 */
export function initializeCrateConfig(
  rackCount: number = 4,
  levelsPerRack: number = 4,
  columnsPerLevel: number = 5
): void {
  // Clear existing config
  Object.keys(crateConfig).forEach(key => delete crateConfig[key]);

  // Generate crateIds for all positions
  for (let rack = 0; rack < rackCount; rack++) {
    for (let level = 0; level < levelsPerRack; level++) {
      for (let column = 0; column < columnsPerLevel; column++) {
        // Front side
        const frontId = `R${rack + 1}-C${column + 1}-L${level + 1}`;
        crateConfig[frontId] = {
          rackIndex: rack,
          row: level,
          column,
          side: "front",
        };

        // Back side
        const backId = `R${rack + 1}-C${column + 1}-L${level + 1}-B`;
        crateConfig[backId] = {
          rackIndex: rack,
          row: level,
          column,
          side: "back",
        };
      }
    }
  }
}

/**
 * Get position for a crateId
 */
export function getCratePosition(crateId: string): CratePosition | undefined {
  return crateConfig[crateId];
}

/**
 * Get all crateIds for a specific rack
 */
export function getCrateIdsForRack(rackIndex: number): string[] {
  return Object.entries(crateConfig)
    .filter(([_id, pos]) => pos.rackIndex === rackIndex)
    .map(([id]) => id);
}

// Initialize default configuration
initializeCrateConfig();

