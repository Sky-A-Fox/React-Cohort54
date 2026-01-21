// 1. Функция загрузки месяцев (как в LoadMonthModal.jsx)
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

  // Сортировка по дате месяца (январь 2023, февраль 2023...)
  months.sort((a, b) => {
    const dateA = new Date(a.year, a.month, 1);
    const dateB = new Date(b.year, b.month, 1);
    return dateB.getTime() - dateA.getTime(); // новые первыми
  });

  return months;
};

// 2. Функция расчёта данных месяца (ЕДИНАЯ ДЛЯ ВСЕХ!)
export const calculateMonthData = (monthData) => {
  // Доход: проверяем несколько мест
  const income =
    monthData.income !== undefined
      ? monthData.income
      : monthData.summary?.income !== undefined
        ? monthData.summary.income
        : 0;

  // Потрачено: считаем из категорий ИЛИ берем из summary
  let totalSpent = 0;

  // Сначала пробуем из summary
  if (monthData.summary?.totalSpent !== undefined) {
    totalSpent = monthData.summary.totalSpent;
  }
  // Иначе считаем из категорий
  else if (monthData.categories && monthData.categories.length > 0) {
    totalSpent = monthData.categories.reduce((sum, cat) => {
      return sum + (cat.actual || 0);
    }, 0);
  }

  // Баланс
  const balance = income - totalSpent;

  // Количество категорий
  const categoryCount = monthData.categories?.length || 0;

  return {
    income,
    totalSpent,
    balance,
    categoryCount,
    // Дополнительные данные для отладки
    rawData: monthData,
  };
};

// 3. Функция расчёта essential расходов
export const calculateEssentialSpent = (monthData) => {
  if (!monthData.categories) return 0;

  return monthData.categories
    .filter((cat) => cat.type === "essential" || cat.isEssential)
    .reduce((sum, cat) => sum + (cat.actual || 0), 0);
};

// 4. Функция агрегации данных по нескольким месяцам (для Analytics)
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
    totalPlanned: aggregated.totalSpent, // В аналитике используем spent как planned
    totalActual: aggregated.totalSpent,
    balance,
    savingsRate,
    essentialRatio,
    categoryCount: Math.round(avgCategories),
    isAggregated: true,
    monthCount: aggregated.monthCount,
  };
};

// 5. Функция форматирования валюты
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// 6. Функция получения имени месяца
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
