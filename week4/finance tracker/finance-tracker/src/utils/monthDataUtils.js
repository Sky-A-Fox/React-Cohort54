// Функция загрузки месяцев - loadAvailableMonths
export const loadAvailableMonths = () => {
  const savedData = JSON.parse(localStorage.getItem("monthlyData") || "{}");
  const months = [];

  Object.keys(savedData).forEach((year) => {
    Object.keys(savedData[year]).forEach((month) => {
      const monthData = savedData[year][month];
      if (monthData) {
        months.push({
          id: `${year}-${month}`,
          year: parseInt(year),
          month: parseInt(month),
          data: monthData,
        });
      }
    });
  });

  // Сортируем по дате (новые сначала) - sort by date (newest first)
  months.sort((a, b) => {
    const dateA = new Date(a.year, a.month, 1);
    const dateB = new Date(b.year, b.month, 1);
    return dateB.getTime() - dateA.getTime();
  });

  return months;
};

// Функция расчёта данных месяца - calculateMonthData
export const calculateMonthData = (monthData) => {
  // Доход: проверяем несколько мест
  const income =
    monthData.income !== undefined
      ? monthData.income
      : monthData.summary?.income !== undefined
        ? monthData.summary.income
        : 0;

  let totalSpent = 0;

  // Сначала пробуем из summary - try summary first
  if (monthData.summary?.totalSpent !== undefined) {
    totalSpent = monthData.summary.totalSpent;
  }
  // Иначе считаем из категорий - else calculate from categories
  else if (monthData.categories && monthData.categories.length > 0) {
    totalSpent = monthData.categories.reduce((sum, cat) => {
      return sum + (cat.actual || 0);
    }, 0);
  }

  const balance = income - totalSpent;

  const categoryCount = monthData.categories?.length || 0;

  return {
    income,
    totalSpent,
    balance,
    categoryCount,
    rawData: monthData,
  };
};

//Функция расчёта essential расходов - calculateEssentialSpent
export const calculateEssentialSpent = (monthData) => {
  if (!monthData.categories) return 0;

  return monthData.categories
    .filter((cat) => cat.type === "essential" || cat.isEssential)
    .reduce((sum, cat) => sum + (cat.actual || 0), 0);
};

// Функция агрегации данных по нескольким месяцам (для Analytics) - aggregateMonthsData (analytics)
export const aggregateMonthsData = (months) => {
  const aggregated = months.reduce(
    (acc, month) => {
      const monthData = calculateMonthData(month.data);
      const essentialSpent = calculateEssentialSpent(month.data);

      return {
        totalIncome: acc.totalIncome + monthData.income,
        totalSpent: acc.totalSpent + monthData.totalSpent,
        totalEssentialSpent: acc.totalEssentialSpent + essentialSpent,
        totalCategories: acc.totalCategories + monthData.categoryCount,
        monthCount: acc.monthCount + 1,
      };
    },
    {
      totalIncome: 0,
      totalSpent: 0,
      totalEssentialSpent: 0,
      totalCategories: 0,
      monthCount: 0,
    }
  );

  const balance = aggregated.totalIncome - aggregated.totalSpent;
  const savingsRate =
    aggregated.totalIncome > 0 ? (balance / aggregated.totalIncome) * 100 : 0;
  const essentialRatio =
    aggregated.totalSpent > 0
      ? (aggregated.totalEssentialSpent / aggregated.totalSpent) * 100
      : 0;
  const avgCategories =
    aggregated.monthCount > 0
      ? aggregated.totalCategories / aggregated.monthCount
      : 0;

  return {
    income: aggregated.totalIncome,
    totalPlanned: aggregated.totalSpent, // В аналитике используем spent как planned - use spent as planned in analytics
    totalActual: aggregated.totalSpent,
    balance,
    savingsRate,
    essentialRatio,
    categoryCount: Math.round(avgCategories),
    isAggregated: true,
    monthCount: aggregated.monthCount,
  };
};

// Функция форматирования валюты - formatCurrency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Функция получения имени месяца - getMonthName
export const getMonthName = (monthIndex) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[monthIndex];
};
