import { useState, useEffect, useMemo, useCallback } from "react";
import styled from "styled-components";
import { Calendar, ChevronDown } from "lucide-react";

const SelectorContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  cursor: pointer;

  h3 {
    margin: 0;
    color: #333;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const ChevronIcon = styled(ChevronDown)`
  transition: transform 0.3s ease;
  transform: ${(props) => (props.$isOpen ? "rotate(180deg)" : "rotate(0deg)")};
`;

const MonthsContainer = styled.div`
  max-height: ${(props) => (props.$isOpen ? "400px" : "0")};
  overflow-y: auto;
  transition: max-height 0.3s ease;
  padding-right: ${(props) => (props.$isOpen ? "8px" : "0")};
  margin-bottom: ${(props) => (props.$isOpen ? "1rem" : "0")};

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const MonthsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.75rem;
`;

const MonthItem = styled.label`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: ${(props) => (props.$selected ? "#e3f2fd" : "#f8f9fa")};
  border: 2px solid ${(props) => (props.$selected ? "#2196F3" : "#e9ecef")};
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #667eea;
    background: ${(props) => (props.$selected ? "#e3f2fd" : "white")};
  }
`;

const CheckboxInput = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const MonthInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const MonthTitle = styled.div`
  font-weight: 600;
  color: #333;
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MonthDetails = styled.div`
  font-size: 0.8rem;
  color: #6c757d;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const Badge = styled.span`
  background: ${(props) => {
    switch (props.type) {
      case "budget":
        return "#e8f5e9";
      case "categories":
        return "#e3f2fd";
      case "balance":
        return "#fff3e0";
      case "spent":
        return "#ffebee";
      default:
        return "#f8f9fa";
    }
  }};
  color: ${(props) => {
    switch (props.type) {
      case "budget":
        return "#2e7d32";
      case "categories":
        return "#1976d2";
      case "balance":
        return "#e65100";
      case "spent":
        return "#c62828";
      default:
        return "#6c757d";
    }
  }};
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  font-size: 0.75rem;
  white-space: nowrap;
`;

const Summary = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e9ecef;
  font-size: 0.9rem;
  color: #6c757d;

  strong {
    color: #333;
  }
`;

// Функция для расчёта данных месяца - СОГЛАСОВАНА С BUDGET - calculate month data consistently with Budget
const calculateMonthData = (monthData) => {
  // В Budget используется income, а не budget - in Budget income is used, not budget
  const income =
    monthData.income !== undefined
      ? monthData.income
      : monthData.summary?.income !== undefined
        ? monthData.summary.income
        : 0;

  // totalPlanned (планируемые траты)
  const totalPlanned =
    monthData.summary?.totalPlanned !== undefined
      ? monthData.summary.totalPlanned
      : monthData.categories?.reduce(
          (sum, cat) => sum + (cat.planned || 0),
          0
        ) || 0;

  // totalActual (фактические траты)
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

  // balance like in budget
  const balance = income - totalActual;

  const categoryCount = monthData.categories?.length || 0;

  return { income, totalPlanned, totalActual, balance, categoryCount };
};

export default function PeriodSelector({
  onPeriodChange,
  availableMonths = [],
  initialSelected = [],
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedMonths, setSelectedMonths] = useState(initialSelected);

  // Сортируем месяцы (используем useMemo чтобы не пересчитывать каждый рендер) - sort months
  const sortedMonths = useMemo(() => {
    return [...availableMonths].sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      return b.month - a.month;
    });
  }, [availableMonths]);

  // Инициализация выбранных месяцев - if initialSelected changes (rewrite for dry code)
  useEffect(() => {
    if (initialSelected.length > 0) {
      setSelectedMonths(initialSelected);
    } else if (sortedMonths.length > 0) {
      setSelectedMonths([sortedMonths[0].id]);
    }
  }, [initialSelected, sortedMonths]);

  // Уведомляем родителя об изменении выбора - useCallback (remove for dry code)
  const handleSelectionChange = useCallback(
    (newSelection) => {
      setSelectedMonths(newSelection);
      if (onPeriodChange) {
        onPeriodChange(newSelection);
      }
    },
    [onPeriodChange]
  );

  const handleMonthToggle = useCallback(
    (monthId) => {
      handleSelectionChange((prev) => {
        if (prev.includes(monthId)) {
          return prev.filter((id) => id !== monthId);
        } else {
          return [...prev, monthId];
        }
      });
    },
    [handleSelectionChange]
  );

  const getMonthName = useCallback((monthIndex) => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return monthNames[monthIndex];
  }, []);

  const formatCurrency = useCallback((amount) => {
    if (typeof amount !== "number" || isNaN(amount)) {
      return "€0";
    }
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }, []);

  const selectedMonthsData = useMemo(() => {
    return sortedMonths.filter((month) => selectedMonths.includes(month.id));
  }, [sortedMonths, selectedMonths]);

  // Рассчитываем агрегированные данные
  const aggregatedData = useMemo(() => {
    return selectedMonthsData.reduce(
      (acc, month) => {
        const monthData = calculateMonthData(month.data);
        return {
          totalIncome: acc.totalIncome + (monthData.income || 0),
          totalPlanned: acc.totalPlanned + (monthData.totalPlanned || 0),
          totalActual: acc.totalActual + (monthData.totalActual || 0),
          totalCategories: acc.totalCategories + (monthData.categoryCount || 0),
          monthCount: acc.monthCount + 1,
        };
      },
      {
        totalIncome: 0,
        totalPlanned: 0,
        totalActual: 0,
        totalCategories: 0,
        monthCount: 0,
      }
    );
  }, [selectedMonthsData]);

  const totalBalance = useMemo(
    () => aggregatedData.totalIncome - aggregatedData.totalActual,
    [aggregatedData]
  );
  const averageSavingsRate = useMemo(
    () =>
      aggregatedData.totalIncome > 0
        ? (totalBalance / aggregatedData.totalIncome) * 100
        : 0,
    [aggregatedData.totalIncome, totalBalance]
  );
  const avgCategories = useMemo(
    () =>
      aggregatedData.monthCount > 0
        ? aggregatedData.totalCategories / aggregatedData.monthCount
        : 0,
    [aggregatedData]
  );

  // Если нет сохраненных месяцев
  if (sortedMonths.length === 0) {
    return (
      <SelectorContainer>
        <Header onClick={() => setIsOpen(!isOpen)}>
          <h3>
            <Calendar size={20} />
            Select Period for Analysis
          </h3>
          <ChevronIcon size={20} $isOpen={isOpen} />
        </Header>

        <MonthsContainer $isOpen={isOpen}>
          <div
            style={{
              textAlign: "center",
              padding: "3rem 1rem",
              color: "#6c757d",
              fontStyle: "italic",
            }}
          >
            📊 No saved months found. <br />
            Save some months in the Budget page first.
          </div>
        </MonthsContainer>
      </SelectorContainer>
    );
  }

  return (
    <SelectorContainer>
      <Header onClick={() => setIsOpen(!isOpen)}>
        <h3>
          <Calendar size={20} />
          Select Period for Analysis ({sortedMonths.length} months available)
        </h3>
        <ChevronIcon size={20} $isOpen={isOpen} />
      </Header>

      <MonthsContainer $isOpen={isOpen}>
        <MonthsGrid>
          {sortedMonths.map((month) => {
            const monthName = getMonthName(month.month);
            const monthData = calculateMonthData(month.data);

            return (
              <MonthItem
                key={month.id}
                $selected={selectedMonths.includes(month.id)}
              >
                <CheckboxInput
                  type="checkbox"
                  checked={selectedMonths.includes(month.id)}
                  onChange={() => handleMonthToggle(month.id)}
                />
                <MonthInfo>
                  <MonthTitle
                    title={`${getMonthName(month.month)} ${month.year}`}
                  >
                    {monthName} {month.year}
                  </MonthTitle>
                  <MonthDetails>
                    <Badge type="budget" title="Budget (Planned)">
                      {formatCurrency(monthData.totalPlanned)}
                    </Badge>
                    <Badge type="spent" title="Actual Spent">
                      {formatCurrency(monthData.totalActual)}
                    </Badge>
                    <Badge type="balance" title="Balance">
                      {formatCurrency(monthData.balance)}
                    </Badge>
                  </MonthDetails>
                </MonthInfo>
              </MonthItem>
            );
          })}
        </MonthsGrid>
      </MonthsContainer>

      {selectedMonths.length > 0 && (
        <Summary>
          <strong>Selected {selectedMonths.length} month(s):</strong> Total
          Income: {formatCurrency(aggregatedData.totalIncome)} • Total Spent:{" "}
          {formatCurrency(aggregatedData.totalActual)} • Balance:{" "}
          {formatCurrency(totalBalance)} • Avg Savings:{" "}
          {averageSavingsRate.toFixed(1)}% • Avg Categories:{" "}
          {avgCategories.toFixed(1)}
        </Summary>
      )}

      {selectedMonths.length === 0 && (
        <div
          style={{
            fontSize: "0.9rem",
            color: "#ff9800",
            marginTop: "0.5rem",
            padding: "0.5rem",
            background: "#fff3e0",
            borderRadius: "6px",
            textAlign: "center",
          }}
        >
          ⚠️ Select at least one month to see analytics
        </div>
      )}
    </SelectorContainer>
  );
}
