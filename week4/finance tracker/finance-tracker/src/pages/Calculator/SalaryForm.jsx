import React from "react";
import styled from "styled-components";

// Styled Components
const SalaryFormContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
  }
`;

const FormTitle = styled.h2`
  color: #333;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
  text-align: center;
  position: relative;
  padding-bottom: 0.5rem;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 25%;
    width: 50%;
    height: 3px;
    background: linear-gradient(90deg, #667eea, #764ba2);
    border-radius: 2px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: #555;
  font-size: 0.95rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: "📊";
    font-size: 1rem;
  }
`;

const InputWithCurrency = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  background: #f8f9fa;
  border-radius: 12px;
  border: 2px solid #e9ecef;
  transition: all 0.3s ease;
  overflow: hidden;

  &:focus-within {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 1rem 1rem 1rem 1.2rem;
  border: none;
  background: transparent;
  font-size: 1.1rem;
  color: #333;
  font-weight: 500;
  outline: none;

  &::placeholder {
    color: #adb5bd;
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const Currency = styled.span`
  padding: 1rem 1.2rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 60px;
`;

const Select = styled.select`
  width: 100%;
  padding: 1rem 1.2rem;
  border-radius: 12px;
  border: 2px solid #e9ecef;
  background: #f8f9fa;
  font-size: 1rem;
  color: #333;
  font-weight: 500;
  cursor: pointer;
  outline: none;
  transition: all 0.3s ease;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23667eea' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;

  &:hover {
    border-color: #667eea;
    background-color: white;
  }

  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const CalculateButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 1.2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  &::after {
    content: "→";
    position: absolute;
    right: 1.5rem;
    opacity: 0;
    transition: all 0.3s ease;
  }

  &:hover::after {
    opacity: 1;
    transform: translateX(5px);
  }

  &:disabled {
    background: #adb5bd;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const ClearButton = styled.button`
  background: transparent;
  color: #6c757d;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;

  &:hover {
    background: #f8f9fa;
    border-color: #dc3545;
    color: #dc3545;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SalaryForm = ({
  grossAmount,
  setGrossAmount,
  period,
  setPeriod,
  onCalculate,
  onClear,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onCalculate();
  };

  const handleClear = () => {
    if (onClear) onClear();
  };

  return (
    <SalaryFormContainer>
      <FormTitle>Salary Details</FormTitle>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="grossAmount">Gross Salary</Label>
          <InputWithCurrency>
            <Input
              id="grossAmount"
              type="number"
              step="0.01"
              min="0"
              value={grossAmount}
              onChange={(e) => setGrossAmount(e.target.value)}
              placeholder="0.00"
              required
            />
            <Currency>€</Currency>
          </InputWithCurrency>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="period">Period</Label>
          <Select
            id="period"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            <option value="yearly">Yearly</option>
            <option value="monthly">Monthly</option>
            <option value="hourly">Hourly</option>
          </Select>
        </FormGroup>

        <ButtonGroup>
          <CalculateButton type="submit">Calculate Net Salary</CalculateButton>

          {(grossAmount || period !== "yearly") && (
            <ClearButton type="button" onClick={handleClear}>
              Clear All
            </ClearButton>
          )}
        </ButtonGroup>
      </Form>
    </SalaryFormContainer>
  );
};

export default SalaryForm;
