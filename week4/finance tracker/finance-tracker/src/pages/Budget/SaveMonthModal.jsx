import { useState } from "react";
import styled from "styled-components";
import Button from "../../components/common/Button";
import { Calendar, X } from "lucide-react";

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

const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 16px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
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

    &:hover {
      color: #333;
      background: #f8f9fa;
      border-radius: 4px;
    }
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #495057;
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #dee2e6;
  border-radius: 8px;
  font-size: 16px;
  background: white;
  cursor: pointer;
  color: #333; /* ✅ Добавили цвет текста */

  &:focus {
    outline: none;
    border-color: #667eea;
  }

  /* Стили для опций */
  option {
    background: white;
    color: #333; /* ✅ Цвет текста опций */
    padding: 10px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #dee2e6;
  border-radius: 8px;
  font-size: 16px;
  color: #333; /* ✅ Добавили цвет текста */

  &:focus {
    outline: none;
    border-color: #667eea;
  }

  &::placeholder {
    color: #adb5bd;
  }
`;

const MonthNameInput = styled.div`
  margin-top: 10px;

  input {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #dee2e6;
    border-radius: 6px;
    font-size: 14px;
    margin-top: 5px;
    color: #333; /* ✅ Добавили цвет текста */

    &:focus {
      outline: none;
      border-color: #667eea;
    }

    &::placeholder {
      color: #adb5bd;
    }
  }
`;

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

const getYears = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = currentYear - 5; i <= currentYear + 5; i++) {
    years.push(i);
  }
  return years;
};

export default function SaveMonthModal({
  isOpen,
  onClose,
  onSave,
  currentCategories,
}) {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [customName, setCustomName] = useState("");

  if (!isOpen) return null;

  const handleSave = () => {
    if (currentCategories.length === 0) {
      alert("Please add some categories before saving the month");
      return;
    }

    const monthName =
      customName.trim() || `${getMonthName(selectedMonth)} ${selectedYear}`;

    onSave(selectedYear, selectedMonth, monthName);
    onClose();
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h2>
            <Calendar size={20} style={{ marginRight: "10px" }} />
            Save Month
          </h2>
          <button onClick={onClose}>
            <X size={24} />
          </button>
        </ModalHeader>

        <FormGroup>
          <Label>Select Year</Label>
          <Select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            style={{ color: "#333" }} /* ✅ Инлайн стиль для надёжности */
          >
            {getYears().map((year) => (
              <option
                key={year}
                value={year}
                style={{
                  color: "#333",
                  backgroundColor: "white",
                }} /* ✅ Стили для опций */
              >
                {year}
              </option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Select Month</Label>
          <Select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            style={{ color: "#333" }} /* ✅ Инлайн стиль для надёжности */
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option
                key={i}
                value={i}
                style={{
                  color: "#333",
                  backgroundColor: "white",
                }} /* ✅ Стили для опций */
              >
                {getMonthName(i)}
              </option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Custom Name (Optional)</Label>
          <MonthNameInput>
            <Input
              type="text"
              placeholder={`e.g., "Summer 2024" or "Moving Month"`}
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
            />
            <small style={{ color: "#6c757d", fontSize: "12px" }}>
              Leave empty to use default: {getMonthName(selectedMonth)}{" "}
              {selectedYear}
            </small>
          </MonthNameInput>
        </FormGroup>

        <div
          style={{
            backgroundColor: "#f8f9fa",
            padding: "15px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{ fontSize: "14px", color: "#495057", marginBottom: "5px" }}
          >
            <strong>Will save:</strong>
          </div>
          <div style={{ fontSize: "13px", color: "#6c757d" }}>
            • {currentCategories.length} categories
            <br />• {getMonthName(selectedMonth)} {selectedYear}
            <br />•{" "}
            {customName ? `Custom name: "${customName}"` : "Default name"}
          </div>
        </div>

        <div
          style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}
        >
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={handleSave}
            disabled={currentCategories.length === 0}
          >
            Save Month
          </Button>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
}
