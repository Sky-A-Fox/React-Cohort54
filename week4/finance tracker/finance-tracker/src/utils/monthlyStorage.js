// Утилиты для работы с месячными данными - utilities for monthly data management
export const saveCurrentMonth = (categories, monthlyIncome) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Загружаем существующие данные - load existing data
  const savedData = JSON.parse(localStorage.getItem("monthlyData") || "{}");

  // Структурируем данные для текущего месяца - structure data for current month
  const monthData = {
    timestamp: new Date().toISOString(),
    income: monthlyIncome,
    categories: categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      type: cat.type,
      planned: cat.planned,
      actual: cat.actual,
      color: cat.color,
    })),
    summary: {
      totalPlanned: categories.reduce((sum, cat) => sum + cat.planned, 0),
      totalSpent: categories.reduce((sum, cat) => sum + cat.actual, 0),
      balance:
        monthlyIncome - categories.reduce((sum, cat) => sum + cat.actual, 0),
    },
  };

  // Сохраняем данные в localStorage - save data to localStorage
  if (!savedData[year]) savedData[year] = {};
  savedData[year][month] = monthData;

  localStorage.setItem("monthlyData", JSON.stringify(savedData));

  return monthData;
};

export const loadMonthData = (year, month) => {
  const savedData = JSON.parse(localStorage.getItem("monthlyData") || "{}");
  return savedData[year]?.[month] || null;
};

export const getAllYears = () => {
  const savedData = JSON.parse(localStorage.getItem("monthlyData") || "{}");
  return Object.keys(savedData)
    .map(Number)
    .sort((a, b) => b - a);
};

export const getMonthsForYear = (year) => {
  const savedData = JSON.parse(localStorage.getItem("monthlyData") || "{}");
  const yearData = savedData[year] || {};

  const months = [];
  for (let month = 0; month < 12; month++) {
    months.push({
      month,
      data: yearData[month] || null,
      hasData: !!yearData[month],
    });
  }

  return months;
};

export const archiveCurrentMonth = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const savedData = JSON.parse(localStorage.getItem("monthlyData") || "{}");
  const monthData = savedData[year]?.[month];

  if (monthData) {
    // Помечаем как архивированный - mark as archived
    monthData.archived = true;
    monthData.archivedAt = new Date().toISOString();

    localStorage.setItem("monthlyData", JSON.stringify(savedData));
    return monthData;
  }

  return null;
};

export const deleteMonthData = (year, month) => {
  const savedData = JSON.parse(localStorage.getItem("monthlyData") || "{}");

  if (savedData[year] && savedData[year][month]) {
    delete savedData[year][month];

    // Удаляем год, если в нём больше нет месяцев - remove year if no months left
    if (Object.keys(savedData[year]).length === 0) {
      delete savedData[year];
    }

    localStorage.setItem("monthlyData", JSON.stringify(savedData));
    return true;
  }

  return false;
};
