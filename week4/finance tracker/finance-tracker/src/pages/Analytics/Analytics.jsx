import { useState, useEffect } from "react";
import styled from "styled-components";
import AnalyticsHeader from "./AnalyticsHeader";
import KPIGrid from "./KPIGrid";
import NoDataState from "./NoDataState";
import QuickActions from "./QuickActions";
import WarningBox from "./WarningBox";
import PeriodSelector from "./PeriodSelector";

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: calc(100vh - 180px);
`;

// ФУНКЦИЯ ДЛЯ РАСЧЁТА ДАННЫХ МЕСЯЦА - СИНХРОНИЗИРОВАНА С BUDGET
const calculateMonthData = (monthData) => {
  // БЮДЖЕТ (totalPlanned) - как в Budget
  const totalPlanned =
    monthData.summary?.totalPlanned !== undefined
      ? monthData.summary.totalPlanned
      : monthData.categories?.reduce(
          (sum, cat) => sum + (cat.planned || 0),
          0
        ) || 0;

  // Фактические траты (totalActual) - как в Budget
  let totalActual = 0;
  if (monthData.summary?.totalActual !== undefined) {
    totalActual = monthData.summary.totalActual;
  } else if (monthData.summary?.totalSpent !== undefined) {
    totalActual = monthData.summary.totalSpent;
  } else if (monthData.categories && monthData.categories.length > 0) {
    totalActual = monthData.categories.reduce(
      (sum, cat) => sum + (cat.actual || 0),
      0
    );
  }

  // Баланс = Бюджет - Фактические траты (как в Budget)
  const balance = totalPlanned - totalActual;

  // Количество категорий
  const categoryCount = monthData.categories?.length || 0;

  return { totalPlanned, totalActual, balance, categoryCount };
};

// Функция для расчёта essential расходов
const calculateEssentialSpent = (monthData) => {
  if (!monthData.categories) return 0;

  return monthData.categories
    .filter((cat) => cat.type === "essential" || cat.isEssential)
    .reduce((sum, cat) => sum + (cat.actual || 0), 0);
};

export default function Analytics() {
  const [hasData, setHasData] = useState(false);
  const [kpis, setKpis] = useState(null);
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [availableMonths, setAvailableMonths] = useState([]);

  // ПЕРЕНОСИМ ВСЕ ФУНКЦИИ ПЕРЕД useEffect
  const checkForData = () => {
    const monthlyData = JSON.parse(localStorage.getItem("monthlyData") || "{}");
    const budgetCategories = JSON.parse(
      localStorage.getItem("budgetCategories") || "[]"
    );

    const monthsList = loadAvailableMonths();
    setAvailableMonths(monthsList);

    if (Object.keys(monthlyData).length > 0 || budgetCategories.length > 0) {
      setHasData(true);

      // По умолчанию выбираем последний месяц, если есть сохраненные
      if (monthsList.length > 0) {
        setSelectedMonths([monthsList[0].id]);
      } else {
        // Иначе используем текущий бюджет
        calculateFromCurrentBudget();
      }
    }
  };

  const loadAvailableMonths = () => {
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

    // Сортируем по дате (новые сначала)
    months.sort((a, b) => {
      const dateA = new Date(a.year, a.month, 1);
      const dateB = new Date(b.year, b.month, 1);
      return dateB.getTime() - dateA.getTime();
    });

    return months;
  };

  const calculateFromCurrentBudget = () => {
    const budgetCategories = JSON.parse(
      localStorage.getItem("budgetCategories") || "[]"
    );

    const totalPlanned = budgetCategories.reduce(
      (sum, cat) => sum + (cat.planned || 0),
      0
    );
    const totalActual = budgetCategories.reduce(
      (sum, cat) => sum + (cat.actual || 0),
      0
    );
    const balance = totalPlanned - totalActual;
    const budgetUsage =
      totalPlanned > 0 ? (totalActual / totalPlanned) * 100 : 0;

    const essentialSpent = budgetCategories
      .filter((cat) => cat.isEssential)
      .reduce((sum, cat) => sum + (cat.actual || 0), 0);
    const essentialRatio =
      totalActual > 0 ? (essentialSpent / totalActual) * 100 : 0;

    setKpis({
      totalPlanned, // ← БЮДЖЕТ
      totalActual, // ← Фактические траты
      balance,
      budgetUsage, // ← % использования бюджета
      essentialRatio,
      categoryCount: budgetCategories.length,
      isAggregated: false,
      monthCount: 1,
    });
  };

  // Функция aggregateMonthsData - БЮДЖЕТ вместо INCOME
  const aggregateMonthsData = (months) => {
    const aggregated = months.reduce(
      (acc, month) => {
        const monthData = calculateMonthData(month.data);
        const essentialSpent = calculateEssentialSpent(month.data);

        return {
          totalPlanned: acc.totalPlanned + (monthData.totalPlanned || 0),
          totalActual: acc.totalActual + (monthData.totalActual || 0),
          totalEssentialSpent: acc.totalEssentialSpent + essentialSpent,
          totalCategories: acc.totalCategories + monthData.categoryCount,
          monthCount: acc.monthCount + 1,
        };
      },
      {
        totalPlanned: 0,
        totalActual: 0,
        totalEssentialSpent: 0,
        totalCategories: 0,
        monthCount: 0,
      }
    );

    const balance = aggregated.totalPlanned - aggregated.totalActual;
    const budgetUsage =
      aggregated.totalPlanned > 0
        ? (aggregated.totalActual / aggregated.totalPlanned) * 100
        : 0;
    const essentialRatio =
      aggregated.totalActual > 0
        ? (aggregated.totalEssentialSpent / aggregated.totalActual) * 100
        : 0;
    const avgCategories =
      aggregated.monthCount > 0
        ? aggregated.totalCategories / aggregated.monthCount
        : 0;

    return {
      totalPlanned: aggregated.totalPlanned, // ← БЮДЖЕТ
      totalActual: aggregated.totalActual, // ← Фактические траты
      balance,
      budgetUsage, // ← % использования бюджета
      essentialRatio,
      categoryCount: Math.round(avgCategories),
      isAggregated: true,
      monthCount: aggregated.monthCount,
    };
  };

  const handlePeriodChange = (selectedMonthIds) => {
    if (selectedMonthIds.length === 0) {
      // Если ничего не выбрано, показываем текущий бюджет
      calculateFromCurrentBudget();
      return;
    }

    // Загружаем данные выбранных месяцев
    const selectedMonthsData = availableMonths.filter((month) =>
      selectedMonthIds.includes(month.id)
    );

    if (selectedMonthsData.length > 0) {
      const aggregatedData = aggregateMonthsData(selectedMonthsData);
      setKpis(aggregatedData);
    } else {
      calculateFromCurrentBudget();
    }
  };

  // ТЕПЕРЬ useEffect
  useEffect(() => {
    checkForData();
  }, []);

  useEffect(() => {
    if (hasData && availableMonths.length > 0) {
      handlePeriodChange(selectedMonths);
    }
  }, [selectedMonths, hasData, availableMonths]);

  if (!hasData) {
    return (
      <DashboardContainer>
        <AnalyticsHeader />
        <NoDataState />
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <AnalyticsHeader />
      <WarningBox />
      <PeriodSelector
        onPeriodChange={setSelectedMonths}
        availableMonths={availableMonths}
        initialSelected={selectedMonths}
      />
      {kpis && <KPIGrid kpis={kpis} />}
      <QuickActions />
    </DashboardContainer>
  );
}
