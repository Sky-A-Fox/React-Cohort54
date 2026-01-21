import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SalaryForm from "./SalaryForm";
import TaxBreakdown from "./TaxBreakdown";
import Assumptions from "./Assumptions";
import { calculateNetSalary } from "./TaxCalculation";

// Styled Components
const CalculatorContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: calc(100vh - 120px);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  color: white;
`;

const CalculatorHeader = styled.header`
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const Title = styled.h1`
  font-size: 2.8rem;
  margin-bottom: 0.5rem;
  color: white;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const CalculatorContent = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Placeholder = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 3rem 2rem;
  text-align: center;
  border: 2px dashed rgba(255, 255, 255, 0.3);

  p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 1.2rem;
    margin: 0;
  }
`;

const Calculator = () => {
  const navigate = useNavigate();

  // Load saved data from localStorage on component mount
  const [grossAmount, setGrossAmount] = useState(() => {
    const saved = localStorage.getItem("calculator_grossAmount");
    return saved || "";
  });

  const [period, setPeriod] = useState(() => {
    const saved = localStorage.getItem("calculator_period");
    return saved || "yearly";
  });

  const [calculation, setCalculation] = useState(() => {
    const saved = localStorage.getItem("calculator_lastCalculation");
    return saved ? JSON.parse(saved) : null;
  });

  // Save to localStorage whenever values change
  useEffect(() => {
    localStorage.setItem("calculator_grossAmount", grossAmount);
    localStorage.setItem("calculator_period", period);
  }, [grossAmount, period]);

  useEffect(() => {
    if (calculation) {
      localStorage.setItem(
        "calculator_lastCalculation",
        JSON.stringify(calculation)
      );
    }
  }, [calculation]);

  const handleCalculate = () => {
    if (!grossAmount || parseFloat(grossAmount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    const result = calculateNetSalary(parseFloat(grossAmount), period);
    setCalculation(result);
  };

  const handleApplyToIncome = () => {
    if (!calculation) return;

    const monthlyIncome = calculation.results.netMonthly;
    localStorage.setItem("calculatedIncome", monthlyIncome.toString());

    // Clear calculator data if needed
    // localStorage.removeItem('calculator_grossAmount');
    // localStorage.removeItem('calculator_period');
    // localStorage.removeItem('calculator_lastCalculation');

    navigate("/budget");
  };

  const handleClearCalculator = () => {
    setGrossAmount("");
    setPeriod("yearly");
    setCalculation(null);
    localStorage.removeItem("calculator_grossAmount");
    localStorage.removeItem("calculator_period");
    localStorage.removeItem("calculator_lastCalculation");
  };

  return (
    <CalculatorContainer>
      <CalculatorHeader>
        <Title>💰 Netherlands Salary Calculator</Title>
        <Subtitle>
          Simplified net salary estimation calculator based on 2024 tax brackets
        </Subtitle>
      </CalculatorHeader>

      <CalculatorContent>
        <LeftColumn>
          <SalaryForm
            grossAmount={grossAmount}
            setGrossAmount={setGrossAmount}
            period={period}
            setPeriod={setPeriod}
            onCalculate={handleCalculate}
            onClear={handleClearCalculator}
          />

          {calculation ? (
            <TaxBreakdown
              calculation={calculation}
              onApplyToIncome={handleApplyToIncome}
            />
          ) : (
            <Placeholder>
              <p>Enter your salary details to calculate net income</p>
              {localStorage.getItem("calculator_lastCalculation") && (
                <p
                  style={{
                    marginTop: "1rem",
                    fontSize: "0.9rem",
                    color: "rgba(255, 255, 255, 0.5)",
                  }}
                >
                  Last calculation will be restored automatically
                </p>
              )}
            </Placeholder>
          )}
        </LeftColumn>

        <RightColumn>{calculation && <Assumptions />}</RightColumn>
      </CalculatorContent>
    </CalculatorContainer>
  );
};

export default Calculator;
