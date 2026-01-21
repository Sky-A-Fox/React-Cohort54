import React from "react";
import styled from "styled-components";

// Styled Components
const TaxBreakdownContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const Title = styled.h3`
  color: #333;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
  text-align: center;
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ResultCard = styled.div`
  background: ${(props) =>
    props.highlight
      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      : "#f8f9fa"};
  border-radius: 15px;
  padding: 1.5rem;
  text-align: center;
  border: 2px solid ${(props) => (props.highlight ? "#667eea" : "#e9ecef")};
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ResultLabel = styled.div`
  color: ${(props) =>
    props.highlight ? "rgba(255, 255, 255, 0.9)" : "#6c757d"};
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const ResultValue = styled.div`
  color: ${(props) => (props.highlight ? "white" : "#333")};
  font-size: 1.8rem;
  font-weight: 700;
`;

const TaxInfo = styled.div`
  background: #781bad;
  border-radius: 12px;
  padding: 1.2rem;
  margin-bottom: 1.5rem;
  text-align: center;
  border-left: 4px solid #2196f3;
`;

const TaxRateDisplay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
`;

const RateValue = styled.span`
  color: #2196f3;
  font-weight: 700;
  font-size: 1.3rem;
`;

const TaxNote = styled.p`
  color: #6c757d;
  font-size: 0.9rem;
  margin: 0;
`;

const Disclaimer = styled.div`
  background: #1b89b4;
  border: 1px solid #ffeaa7;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const DisclaimerText = styled.p`
  color: #ffffff;
  margin: 0 0 1rem 0;
  font-size: 0.95rem;
  line-height: 1.5;
`;

const ExternalButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  background: linear-gradient(135deg, #ff9800 0%, #ff5722 100%);
  color: white;
  text-decoration: none;
  border-radius: 12px;
  padding: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  text-align: center;
  margin-bottom: 1.5rem;
  border: 2px solid #ff9800;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(255, 152, 0, 0.3);
  }
`;

const WarningBadge = styled.span`
  background: #d32f2f;
  color: white;
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-left: 0.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ApplyButton = styled.button`
  background: linear-gradient(135deg, #4caf50 0%, #2e7d32 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 1.2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(76, 175, 80, 0.3);
  }

  &:disabled {
    background: #adb5bd;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const TaxBreakdown = ({ calculation, onApplyToIncome }) => {
  if (!calculation) return null;

  const { results } = calculation;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <TaxBreakdownContainer>
      <Title>Calculation Results</Title>

      <ResultsGrid>
        <ResultCard highlight>
          <ResultLabel highlight>Net Salary (Yearly)</ResultLabel>
          <ResultValue highlight>
            €{formatCurrency(results.netYearly)}
          </ResultValue>
        </ResultCard>

        <ResultCard>
          <ResultLabel>Net Salary (Monthly)</ResultLabel>
          <ResultValue>€{formatCurrency(results.netMonthly)}</ResultValue>
        </ResultCard>

        <ResultCard>
          <ResultLabel>Net Salary (Hourly)</ResultLabel>
          <ResultValue>€{formatCurrency(results.netHourly)}</ResultValue>
        </ResultCard>
      </ResultsGrid>

      <TaxInfo>
        <TaxRateDisplay>
          <span>Effective Tax Rate:</span>
          <RateValue>{results.effectiveTaxRate}%</RateValue>
        </TaxRateDisplay>
        <TaxNote>Based on 2024 Dutch tax brackets with tax credits</TaxNote>
      </TaxInfo>

      <Disclaimer>
        <DisclaimerText>
          ⚠️ <strong>Important:</strong> This is a simplified calculation
          without social security contributions. Numbers shown here are
          approximate estimates only.
        </DisclaimerText>

        <ExternalButton
          href="https://thetax.nl/"
          target="_blank"
          rel="noopener noreferrer"
        >
          🔗 Go to Accurate Calculator: TheTax.nl
          <WarningBadge>EXTERNAL SITE</WarningBadge>
        </ExternalButton>
      </Disclaimer>

      <ButtonGroup>
        <ApplyButton onClick={onApplyToIncome}>Back to Budget Page</ApplyButton>
      </ButtonGroup>
    </TaxBreakdownContainer>
  );
};

export default TaxBreakdown;
