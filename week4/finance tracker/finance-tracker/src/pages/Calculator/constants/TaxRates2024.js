export const TAX_BRACKETS_2024 = [
  {
    min: 0,
    max: 75518,
    rate: 0.3693,
    description: "Income up to €75,518",
  },
  {
    min: 75518,
    max: Infinity,
    rate: 0.495,
    description: "Income above €75,518",
  },
];

export const GENERAL_TAX_CREDIT = {
  base: 3075,
  maxIncome: 24748,
  reductionRate: 0.06007,
};

export const LABOUR_TAX_CREDIT = {
  minIncome: 11494,
  maxIncome: 40954,
  maxAmount: 5549,
  reductionRate: 0.05697,
};

export const HOURS_PER_WEEK = 40;
export const WEEKS_PER_YEAR = 52;
export const MONTHS_PER_YEAR = 12;
export const HOURS_PER_YEAR = HOURS_PER_WEEK * WEEKS_PER_YEAR;

export const DISCLAIMER =
  "This calculator provides estimates only. Social security contributions are NOT included. Actual tax calculations may vary. Consult a tax advisor for official calculations.";
