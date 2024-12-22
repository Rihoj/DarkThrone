// eslint-disable-next-line @nx/enforce-module-boundaries
import {
  FortificationUpgrade,
  HousingUpgrade,
  StructureType,
  PlayerClass,
  PlayerRace,
  UnitType,
  type Unit,
} from '@darkthrone/interfaces';

export const UnitTypes: { [k: string]: Unit } = {
  citizen: {
    name: 'Citizen',
    type: UnitType.SUPPORT,
    attack: 0,
    defense: 0,
    cost: 0,
    goldPerTurn: 0,
    canTrain: false,
    canUntrain: false,
  },
  worker: {
    name: 'Worker',
    type: UnitType.SUPPORT,
    attack: 0,
    defense: 0,
    cost: 1000,
    goldPerTurn: 50,
    canTrain: true,
    canUntrain: true,
  },
  soldier_1: {
    name: 'Soldier',
    type: UnitType.OFFENSE,
    attack: 3,
    defense: 0,
    cost: 1500,
    goldPerTurn: 0,
    canTrain: true,
    canUntrain: true,
  },
  guard_1: {
    name: 'Guard',
    type: UnitType.DEFENSE,
    attack: 0,
    defense: 3,
    cost: 1500,
    goldPerTurn: 0,
    canTrain: true,
    canUntrain: true,
  },
};

const MaxLevel = 100;
/**
 * Calculate the XP required for a specific level
 * This is a complexity of O(1) as it is a quadratic equation
 * Previously, the search was O(n) which was not efficient.
 * This also allows for an easy level cap change.
 * @param level
 * @returns number
 */
export const calculateLevelXP = (level: number): number => {
  if (level <= 1) return 0;
  // 500x^2 + 1500x - 1000 {x >= 2} where x is the level
  return Math.floor(500 * Math.pow(level, 2) + 1500 * level - 1000);
};

/**
 * Get the XP required for a specific level
 * @param level
 * @returns number
 */
export const getLevelXP = (level: number): number => {
  if (level < 1 || level > MaxLevel) {
    throw new Error(`Level must be between 1 and ${MaxLevel}`);
  }
  return calculateLevelXP(level);
};

/**
 * Calculate the level from a given XP value
 * This is a complexity of O(1) as it is a quadratic equation
 * @param xp
 * @returns number
 */
export const calculateLevelFromXP = (xp: number): number => {
  const a = 500;
  const b = 1500;
  const c = -1000;
  const _xp = !xp || isNaN(xp) ? 0 : xp;
  if (_xp < 0) {
    throw new Error('XP must be greater than or equal to 0');
  }

  if (_xp < 4000) {
    return 1;
  }

  // Adjust c to account for the XP value
  const adjustedC = c - _xp;

  // Calculate the discriminant
  const discriminant = b * b - 4 * a * adjustedC;

  if (discriminant < 0) {
    throw new Error('No valid level for the given XP');
  }

  // Calculate the two possible roots
  const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
  const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);

  // Take the maximum valid root and round down
  const level = Math.floor(Math.max(root1, root2));

  // Ensure the level does not exceed MaxLevel
  return Math.min(level, MaxLevel);
};

/**
 * Create Fortification Upgrade
 * @param name
 * @param levelRequirement
 * @param cost
 * @param defenceBonusPercentage
 * @param goldPerTurn
 * @param requiredFortificationLevel
 * @returns FortificationUpgrade
 * @example
 * createFortificationUpgrade('Manor', 1, 0, 5, 1000, 0);
 * // returns { name: 'Manor', levelRequirement: 1, cost: 0, defenceBonusPercentage: 5, goldPerTurn: 1000, requiredFortificationLevel: 0, type: 'fortification' }
 */
const createFortificationUpgrade = (
  name: string,
  levelRequirement: number,
  cost: number,
  defenceBonusPercentage: number,
  goldPerTurn: number,
  requiredFortificationLevel: number,
): FortificationUpgrade => ({
  name,
  levelRequirement,
  cost,
  defenceBonusPercentage,
  goldPerTurn,
  requiredFortificationLevel,
  type: StructureType.FORTIFICATION,
});

const calculateFortificationLevelRequirement = (index: number): number =>
  index === 0 ? 1 : 5 * index;

const calculateFortificationDefenceBonusPercentage = (index: number): number =>
  5 * index + 5;

const calculateFortificationGoldPerTurn = (index: number): number =>
  1000 * index + 1000;

export const fortificationUpgrades: FortificationUpgrade[] = [
  { name: 'Manor', cost: 0 },
  { name: 'Village', cost: 100000 },
  { name: 'Town', cost: 250000 },
  { name: 'Outpost', cost: 500000 },
  { name: 'Outpost Level 2', cost: 1000000 },
  { name: 'Outpost Level 3', cost: 2000000 },
  { name: 'Stronghold', cost: 3000000 },
  { name: 'Stronghold Level 2', cost: 4000000 },
  { name: 'Stronghold Level 3', cost: 5000000 },
  { name: 'Fortress', cost: 7500000 },
  { name: 'Fortress Level 2', cost: 10000000 },
  { name: 'Fortress Level 3', cost: 15000000 },
  { name: 'Citadel', cost: 20000000 },
  { name: 'Citadel Level 2', cost: 30000000 },
  { name: 'Citadel Level 3', cost: 40000000 },
  { name: 'Castle', cost: 50000000 },
  { name: 'Castle Level 2', cost: 75000000 },
  { name: 'Castle Level 3', cost: 100000000 },
  { name: 'Kingdom', cost: 150000000 },
  { name: 'Kingdom Level 2', cost: 200000000 },
  { name: 'Kingdom Level 3', cost: 250000000 },
  { name: 'Empire', cost: 300000000 },
  { name: 'Empire Level 2', cost: 350000000 },
  { name: 'Empire Level 3', cost: 400000000 },
].map((upgrade, index) => {
  return createFortificationUpgrade(
    upgrade.name,
    calculateFortificationLevelRequirement(index),
    upgrade.cost, // I could not find a pattern for the cost without splitting into a very large piecewise function
    calculateFortificationDefenceBonusPercentage(index),
    calculateFortificationGoldPerTurn(index),
    0,
  );
});

/**
 * This is a factory function that creates a housing upgrade
 * @param name
 * @param requiredFortificationLevel
 * @param cost
 * @param citizensPerDay
 * @returns HousingUpgrade
 * @example
 * createHousingUpgrade('Hovel', 0, 0, 1);
 * // returns { name: 'Hovel', requiredFortificationLevel: 0, cost: 0, citizensPerDay: 1, type: 'housing' }
 */
const createHousingUpgrade = (
  name: string,
  requiredFortificationLevel: number,
  cost: number,
  citizensPerDay: number,
): HousingUpgrade => ({
  name,
  requiredFortificationLevel,
  cost,
  citizensPerDay,
  type: StructureType.HOUSING,
});

/**
 * Calculate the required fortification level for a housing upgrade
 * f(x)={x=0:0,x>0:4x-2}
 * @param index
 * @returns number
 */
const calculateHousingRequiredFortificationLevel = (index: number): number => {
  if (index === 0) return 0;
  return 4 * index - 2;
};

/**
 * Find the cost of housing using a piecewise function
 * f(x)={0<=x<=3:500000x,4<=x:250000x^2-1250000x+3500000}
 * @param index
 * @returns
 */
const calculateHousingCost = (index: number): number => {
  if (index <= 3) return 500000 * index;
  return 250000 * Math.pow(index, 2) - 1250000 * index + 3500000;
};

const calculateHousingCitizensPerDay = (index: number): number =>
  index === 0 ? 1 : 10 * index;

export const housingUpgrades: HousingUpgrade[] = [
  'Hovel',
  'Hut',
  'Cottage',
  'Longhouse',
  'Manor House',
  'Keep',
  'Great Hall',
].map((upgrade, index) => {
  return createHousingUpgrade(
    upgrade,
    calculateHousingRequiredFortificationLevel(index),
    calculateHousingCost(index),
    calculateHousingCitizensPerDay(index),
  );
});

export const structureUpgrades = {
  fortification: fortificationUpgrades,
  housing: housingUpgrades,
};

type bonusStats = {
  offense: number;
  defense: number;
  income: number;
  intelligence: number;
};

export const raceBonuses: { [key in PlayerRace]: bonusStats } = {
  human: {
    offense: 5,
    defense: 0,
    income: 0,
    intelligence: 0,
  },
  elf: {
    offense: 0,
    defense: 5,
    income: 0,
    intelligence: 0,
  },
  goblin: {
    offense: 0,
    defense: 5,
    income: 0,
    intelligence: 0,
  },
  undead: {
    offense: 5,
    defense: 0,
    income: 0,
    intelligence: 0,
  },
};

export const classBonuses: { [key in PlayerClass]: bonusStats } = {
  fighter: {
    offense: 5,
    defense: 0,
    income: 0,
    intelligence: 0,
  },
  cleric: {
    offense: 0,
    defense: 5,
    income: 0,
    intelligence: 0,
  },
  thief: {
    offense: 0,
    defense: 0,
    income: 5,
    intelligence: 0,
  },
  assassin: {
    offense: 0,
    defense: 0,
    income: 0,
    intelligence: 5,
  },
};

const attackLevelRange = 7;

export const attackableLevels = (
  player1_level: number,
  player2_level: number,
): boolean => Math.abs(player1_level - player2_level) <= attackLevelRange;

export const attackableMinLevel = (playerLevel: number): number =>
  Math.max(1, playerLevel - attackLevelRange);
export const attackableMaxLevel = (playerLevel: number): number =>
  playerLevel + attackLevelRange;
