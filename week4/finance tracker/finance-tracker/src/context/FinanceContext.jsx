import { createContext, useState, useEffect } from "react";
import { initialCategories } from "../constants/initialData";

export const FinanceContext = createContext();

const getRandomColor = () => {
  const colors = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#96CEB4",
    "#FFEAA7",
    "#A29BFE",
    "#FD79A8",
    "#81ECEC",
    "#55EFC4",
    "#74B9FF",
    "#DFE6E9",
    "#00B894",
    "#00CEC9",
    "#0984E3",
    "#6C5CE7",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const getMonthName = (monthIndex) => {
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

export const FinanceProvider = ({ children }) => {
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem("budgetCategories");
    return saved ? JSON.parse(saved) : initialCategories;
  });

  const [monthHistory, setMonthHistory] = useState(() => {
    const saved = localStorage.getItem("monthHistory");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("budgetCategories", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem("monthHistory", JSON.stringify(monthHistory));
  }, [monthHistory]);

  const updateCategory = (id, field, value) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, [field]: value } : cat))
    );
  };

  const addCategory = (name, planned = 0, isEssential = false) => {
    const newCategory = {
      id: Date.now(),
      name,
      planned: Number(planned),
      actual: 0,
      isEssential,
      color: getRandomColor(),
    };

    setCategories((prev) => [...prev, newCategory]);
  };

  const deleteCategory = (id) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
  };

  const clearCategories = () => {
    setCategories([]);
    localStorage.removeItem("budgetCategories");
  };

  const loadMonthData = (monthData) => {
    if (!monthData || !monthData.data) return;

    const newCategories =
      monthData.data.categories?.map((cat) => ({
        id: Date.now() + Math.random(),
        name: cat.name,
        planned: cat.planned || 0,
        actual: cat.actual || 0,
        isEssential: cat.type === "essential" || cat.isEssential,
        color: cat.color || getRandomColor(),
      })) || [];

    setCategories(newCategories);
  };

  const saveMonth = (year, month, customName = null) => {
    const categoriesWithActual = categories.map((cat) => ({
      ...cat,
      actual: cat.actual || 0,
    }));

    const totalActual = categoriesWithActual.reduce(
      (sum, cat) => sum + cat.actual,
      0
    );
    const totalPlanned = categoriesWithActual.reduce(
      (sum, cat) => sum + cat.planned,
      0
    );
    const balance = totalPlanned - totalActual;

    const monthData = {
      timestamp: new Date().toISOString(),
      categories: categoriesWithActual.map((cat) => ({
        id: cat.id,
        name: cat.name,
        type: cat.isEssential ? "essential" : "optional",
        planned: cat.planned,
        actual: cat.actual,
        color: cat.color,
      })),
      summary: {
        totalPlanned,
        totalSpent: totalActual,
        balance: balance,
      },
      monthName: customName || `${getMonthName(month)} ${year}`,
    };

    const savedData = JSON.parse(localStorage.getItem("monthlyData") || "{}");
    if (!savedData[year]) savedData[year] = {};
    savedData[year][month] = monthData;
    localStorage.setItem("monthlyData", JSON.stringify(savedData));

    const oldMonthData = {
      date: new Date().toISOString(),
      categories: JSON.parse(JSON.stringify(categoriesWithActual)),
      totalActual,
      totalPlanned,
      balance,
      year,
      month,
      customName,
    };

    const newHistory = [...monthHistory, oldMonthData];
    setMonthHistory(newHistory);
    localStorage.setItem("monthHistory", JSON.stringify(newHistory));

    return monthData;
  };

  const saveCurrentMonth = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    return saveMonth(year, month, "Current Month");
  };

  const totalPlanned = categories.reduce((sum, cat) => sum + cat.planned, 0);
  const totalActual = categories.reduce(
    (sum, cat) => sum + (cat.actual || 0),
    0
  );

  return (
    <FinanceContext.Provider
      value={{
        categories,
        monthHistory,
        updateCategory,
        addCategory,
        deleteCategory,
        saveCurrentMonth,
        saveMonth,
        clearCategories,
        loadMonthData,
        getMonthName,
        totalPlanned,
        totalActual,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};
