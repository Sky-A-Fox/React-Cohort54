import styled from "styled-components";
import {
  TrendingUp,
  TrendingDown,
  PieChart,
  DollarSign,
  Calendar,
} from "lucide-react";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const KPICard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border-left: 4px solid ${(props) => props.color || "#667eea"};
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const KPITitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6c757d;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const KPIValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
`;

const KPIChange = styled.div`
  font-size: 0.9rem;
  color: ${(props) => (props.$positive ? "#2e7d32" : "#c62828")};
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

export default function KPIGrid({ kpis }) {
  // ЗАЩИТА ОТ UNDEFINED
  if (!kpis) {
    return (
      <GridContainer>
        <div
          style={{
            gridColumn: "1 / -1",
            textAlign: "center",
            padding: "3rem",
            color: "#666",
            fontSize: "1.1rem",
          }}
        >
          📊 Loading analytics data...
        </div>
      </GridContainer>
    );
  }

  // Извлекаем значения с защитой по умолчанию - ОБНОВЛЕНО
  const {
    totalPlanned = 0, // ← БЮДЖЕТ вместо income
    totalActual = 0,
    balance = 0,
    budgetUsage = 0, // ← Budget Usage вместо savingsRate
    essentialRatio = 0,
    isAggregated = false,
    monthCount = 1,
  } = kpis;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Форматируем значения для агрегированных данных - ОБНОВЛЕНО
  const budgetValue = isAggregated
    ? `${formatCurrency(totalPlanned)} (${monthCount} months)`
    : formatCurrency(totalPlanned);

  const spentValue = isAggregated
    ? `${formatCurrency(totalActual)} (avg: ${formatCurrency(totalActual / monthCount)}/mo)`
    : formatCurrency(totalActual);

  // Используем значения с защитой - ОБНОВЛЕНО
  const budgetUsageValue =
    typeof budgetUsage === "number" ? budgetUsage.toFixed(1) : "0.0";
  const essentialRatioValue =
    typeof essentialRatio === "number" ? essentialRatio.toFixed(0) : "0";

  return (
    <GridContainer>
      {/* КАРТОЧКА 1: БЮДЖЕТ вместо INCOME */}
      <KPICard color="#1976d2">
        {" "}
        {/* Синий цвет для Budget */}
        <KPITitle>
          <DollarSign size={16} />
          {isAggregated ? "Total Budget" : "Monthly Budget"} {/* ← Budget */}
        </KPITitle>
        <KPIValue>{budgetValue}</KPIValue> {/* ← totalPlanned */}
        <KPIChange $positive>
          <TrendingUp size={14} />
          {isAggregated ? "Aggregated data" : "Planned spending"}{" "}
          {/* ← Обновленный текст */}
        </KPIChange>
      </KPICard>

      {/* КАРТОЧКА 2: ПОТРАЧЕНО (оставляем как было) */}
      <KPICard color="#F44336">
        <KPITitle>
          <TrendingDown size={16} />
          {isAggregated ? "Total Spent" : "Total Spent"}
        </KPITitle>
        <KPIValue>{spentValue}</KPIValue>
        <KPIChange $positive={balance >= 0}>
          {balance >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {balance >= 0
            ? `Saved ${formatCurrency(balance)}`
            : `Over budget ${formatCurrency(Math.abs(balance))}`}
        </KPIChange>
      </KPICard>

      {/* КАРТОЧКА 3: BUDGET USAGE вместо SAVINGS RATE */}
      <KPICard color="#2196F3">
        <KPITitle>
          <PieChart size={16} />
          Budget Usage {/* ← вместо Savings Rate */}
        </KPITitle>
        <KPIValue>{budgetUsageValue}%</KPIValue> {/* ← budgetUsage */}
        <KPIChange $positive={budgetUsage <= 80}>
          {" "}
          {/* ← Логика для Budget Usage */}
          {budgetUsage <= 80 ? "Good control! 👍" : "High spending"}{" "}
          {/* ← Обновленный текст */}
        </KPIChange>
      </KPICard>

      {/* КАРТОЧКА 4: ESSENTIAL EXPENSES (оставляем как было) */}
      <KPICard color="#FF9800">
        <KPITitle>
          <Calendar size={16} />
          Essential Expenses
        </KPITitle>
        <KPIValue>{essentialRatioValue}%</KPIValue>
        <KPIChange $positive={essentialRatio <= 60}>
          {essentialRatio <= 60 ? "Healthy spending" : "High fixed costs"}
          {isAggregated && " (avg)"}
        </KPIChange>
      </KPICard>
    </GridContainer>
  );
}
