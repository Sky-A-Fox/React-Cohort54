import { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../../components/common/Button";
import { X } from "lucide-react";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
`;

const LoadMonthModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 16px;
  width: 100%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;

  h2 {
    margin: 0;
    color: #333;
    font-size: 1.5rem;
    font-weight: 600;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    color: #666;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      color: #333;
      background: #f8f9fa;
      border-radius: 4px;
    }
  }
`;

const MonthList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
  max-height: 300px;
  overflow-y: auto;
`;

const MonthItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 10px;
  border: 2px solid #e9ecef;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #667eea;
    background: white;
  }
`;

const MonthInfo = styled.div`
  flex: 1;
`;

const MonthTitle = styled.h4`
  margin: 0 0 5px 0;
  color: #333;
`;

const MonthDetails = styled.div`
  display: flex;
  gap: 10px;
  font-size: 12px;
  color: #6c757d;
`;

const Badge = styled.span`
  background: ${(props) => {
    switch (props.type) {
      case "budget":
        return "#e3f2fd";
      case "categories":
        return "#e8f5e9";
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
        return "#1976d2";
      case "categories":
        return "#2e7d32";
      case "balance":
        return "#e65100";
      case "spent":
        return "#c62828";
      default:
        return "#6c757d";
    }
  }};
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
`;

export default function LoadMonthModal({
  isOpen,
  onClose,
  onLoadMonth,
  getMonthName,
  formatCurrency,
}) {
  const [availableMonths, setAvailableMonths] = useState([]);

  useEffect(() => {
    if (isOpen) {
      loadAvailableMonths();
    }
  }, [isOpen]);

  const loadAvailableMonths = () => {
    const savedData = JSON.parse(localStorage.getItem("monthlyData") || "{}");

    // Функция для получения и сортировки месяцев
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

    setAvailableMonths(months);
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <LoadMonthModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h2>Load Saved Month</h2>
          <button onClick={onClose}>
            <X size={24} />
          </button>
        </ModalHeader>

        <p style={{ color: "#6c757d", marginBottom: "20px" }}>
          Select a month to load its categories into the current budget. Current
          budget will be replaced.
        </p>

        {availableMonths.length === 0 ? (
          <div
            style={{ textAlign: "center", padding: "40px", color: "#6c757d" }}
          >
            <div style={{ fontSize: "48px", marginBottom: "10px" }}>📂</div>
            <p style={{ fontSize: "18px", marginBottom: "10px" }}>
              No saved months found
            </p>
            <p>Save current month first to load it later.</p>
          </div>
        ) : (
          <MonthList>
            {availableMonths.map((month) => {
              const monthName = getMonthName(month.month);
              const isCurrent =
                month.year === new Date().getFullYear() &&
                month.month === new Date().getMonth();

              // РАСЧЁТ ДАННЫХ:
              // 1. Бюджет (totalPlanned)
              const totalPlanned =
                month.data.summary?.totalPlanned ||
                month.data.categories?.reduce(
                  (sum, cat) => sum + (cat.planned || 0),
                  0
                ) ||
                0;

              // 2. Потрачено (totalSpent)
              const totalSpent =
                month.data.summary?.totalSpent ||
                month.data.categories?.reduce(
                  (sum, cat) => sum + (cat.actual || 0),
                  0
                ) ||
                0;

              // 3. Баланс = Бюджет - Потрачено
              const balance = totalPlanned - totalSpent;

              // 4. Количество категорий
              const categoryCount = month.data.categories?.length || 0;

              // 5. Дата сохранения
              const saveDate = month.data.timestamp
                ? new Date(month.data.timestamp).toLocaleDateString()
                : "No date";

              return (
                <MonthItem key={month.id} onClick={() => onLoadMonth(month)}>
                  <MonthInfo>
                    <MonthTitle>
                      {monthName} {month.year}
                      {isCurrent && " (Current Month)"}
                    </MonthTitle>
                    <MonthDetails>
                      <Badge type="budget">
                        Budget: {formatCurrency(totalPlanned)}
                      </Badge>
                      <Badge type="spent">
                        Spent: {formatCurrency(totalSpent)}
                      </Badge>
                      <Badge type="balance">
                        Balance: {formatCurrency(balance)}
                      </Badge>
                      <Badge type="categories">{categoryCount} cats</Badge>
                      <span style={{ fontSize: "11px", color: "#adb5bd" }}>
                        {saveDate}
                      </span>
                    </MonthDetails>
                  </MonthInfo>
                  <Button variant="primary" size="small">
                    Load
                  </Button>
                </MonthItem>
              );
            })}
          </MonthList>
        )}
      </LoadMonthModalContent>
    </ModalOverlay>
  );
}
