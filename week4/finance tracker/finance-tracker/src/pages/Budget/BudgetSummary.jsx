import styled from "styled-components";
import { TrendingUp, TrendingDown, DollarSign, Wallet } from "lucide-react";

const SummaryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SummaryCard = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  gap: 20px;
`;

const IconContainer = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background: ${(props) => props.$color}15;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    color: ${(props) => props.$color};
  }
`;

const SummaryContent = styled.div`
  flex: 1;
`;

const SummaryLabel = styled.p`
  color: #6c757d;
  font-size: 14px;
  margin-bottom: 5px;
`;

const SummaryValue = styled.h3`
  font-size: 28px;
  font-weight: 700;
  color: ${(props) => props.$color || "#333"};
  margin: 0;
`;

const SummarySubtext = styled.p`
  font-size: 12px;
  color: ${(props) => props.$color || "#6c757d"};
  margin-top: 5px;
`;

export default function BudgetSummary({ totalPlanned, totalActual }) {
  const balance = totalPlanned - totalActual;
  const hasOverBudget = totalActual > totalPlanned;

  return (
    <SummaryContainer>
      <SummaryCard>
        <IconContainer $color="#28a745">
          <DollarSign size={28} />
        </IconContainer>
        <SummaryContent>
          <SummaryLabel>Total Budget</SummaryLabel>
          <SummaryValue>€{totalPlanned.toLocaleString()}</SummaryValue>
          <SummarySubtext>Planned monthly spending</SummarySubtext>
        </SummaryContent>
      </SummaryCard>

      <SummaryCard>
        <IconContainer $color={hasOverBudget ? "#dc3545" : "#28a745"}>
          {hasOverBudget ? (
            <TrendingUp size={28} />
          ) : (
            <TrendingDown size={28} />
          )}
        </IconContainer>
        <SummaryContent>
          <SummaryLabel>Actual Spending</SummaryLabel>
          <SummaryValue $color={hasOverBudget ? "#dc3545" : "#28a745"}>
            €{totalActual.toLocaleString()}
          </SummaryValue>
          <SummarySubtext $color={hasOverBudget ? "#dc3545" : "#28a745"}>
            {hasOverBudget ? "Over budget!" : "Under budget"}
          </SummarySubtext>
        </SummaryContent>
      </SummaryCard>

      <SummaryCard>
        <IconContainer $color={balance >= 0 ? "#17a2b8" : "#ffc107"}>
          <Wallet size={28} />
        </IconContainer>
        <SummaryContent>
          <SummaryLabel>Monthly Balance</SummaryLabel>
          <SummaryValue $color={balance >= 0 ? "#17a2b8" : "#ffc107"}>
            €{balance.toLocaleString()}
          </SummaryValue>
          <SummarySubtext $color={balance >= 0 ? "#17a2b8" : "#ffc107"}>
            {balance >= 0 ? "Savings" : "Deficit"}
          </SummarySubtext>
        </SummaryContent>
      </SummaryCard>
    </SummaryContainer>
  );
}
