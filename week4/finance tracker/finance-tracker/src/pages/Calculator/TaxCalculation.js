import {
  TAX_BRACKETS_2024,
  GENERAL_TAX_CREDIT,
  LABOUR_TAX_CREDIT,
  MONTHS_PER_YEAR,
  HOURS_PER_WEEK,
  WEEKS_PER_YEAR,
} from "./constants/TaxRates2024.js";

const HOURS_PER_YEAR = HOURS_PER_WEEK * WEEKS_PER_YEAR;

// Convert to yearly amount
const normalizeToYearly = (amount, period) => {
  switch (period) {
    case "yearly":
      return amount;
    case "monthly":
      return amount * MONTHS_PER_YEAR;
    case "hourly":
      return amount * HOURS_PER_YEAR;
    default:
      return amount;
  }
};

// Calculate income tax using progressive brackets
const calculateIncomeTax = (grossYearly) => {
  let remaining = grossYearly;
  let totalTax = 0;

  TAX_BRACKETS_2024.forEach((bracket) => {
    if (remaining <= 0) return;

    const bracketAmount = Math.min(remaining, bracket.max - (bracket.min || 0));
    const taxInBracket = bracketAmount * bracket.rate;

    totalTax += taxInBracket;
    remaining -= bracketAmount;
  });

  return totalTax;
};

// Calculate tax credits
const calculateTaxCredits = (grossYearly) => {
  // General tax credit
  let generalCredit = GENERAL_TAX_CREDIT.base;
  if (grossYearly > GENERAL_TAX_CREDIT.maxIncome) {
    const reduction =
      (grossYearly - GENERAL_TAX_CREDIT.maxIncome) *
      GENERAL_TAX_CREDIT.reductionRate;
    generalCredit = Math.max(0, GENERAL_TAX_CREDIT.base - reduction);
  }

  // Labour tax credit
  let labourCredit = 0;
  if (grossYearly >= LABOUR_TAX_CREDIT.minIncome) {
    if (grossYearly <= LABOUR_TAX_CREDIT.maxIncome) {
      labourCredit = LABOUR_TAX_CREDIT.maxAmount;
    } else {
      const reduction =
        (grossYearly - LABOUR_TAX_CREDIT.maxIncome) *
        LABOUR_TAX_CREDIT.reductionRate;
      labourCredit = Math.max(0, LABOUR_TAX_CREDIT.maxAmount - reduction);
    }
  }

  return generalCredit + labourCredit;
};

// Main calculation function
export const calculateNetSalary = (grossAmount, period) => {
  // Convert to yearly
  const grossYearly = normalizeToYearly(grossAmount, period);

  // Calculate tax and credits
  const incomeTax = calculateIncomeTax(grossYearly);
  const taxCredits = calculateTaxCredits(grossYearly);

  // Calculate net (tax - credits, NO social security)
  const totalTax = incomeTax - taxCredits;
  const netYearly = grossYearly - totalTax;

  // Convert back to requested period
  const netMonthly = netYearly / MONTHS_PER_YEAR;
  const netHourly = netYearly / HOURS_PER_YEAR;

  // Effective tax rate
  const effectiveTaxRate = (totalTax / grossYearly) * 100;

  // Format to 2 decimal places
  const format = (num) => parseFloat(num.toFixed(2));

  return {
    input: {
      grossAmount: format(grossAmount),
      period,
      grossYearly: format(grossYearly),
    },
    results: {
      netYearly: format(netYearly),
      netMonthly: format(netMonthly),
      netHourly: format(netHourly),
      incomeTax: format(incomeTax),
      taxCredits: format(taxCredits),
      totalTax: format(totalTax),
      effectiveTaxRate: format(effectiveTaxRate),
    },
  };
};
