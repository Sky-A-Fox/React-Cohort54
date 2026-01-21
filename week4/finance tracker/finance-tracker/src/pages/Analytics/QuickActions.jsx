import styled from "styled-components";

const ActionsContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h3`
  margin-bottom: 1.5rem;
  color: #333;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  padding: 1rem 1.5rem;
  background: ${(props) => props.color || "#667eea"};
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

export default function QuickActions() {
  return (
    <ActionsContainer>
      <Title>Quick Actions</Title>
      <ButtonsContainer>
        <ActionButton onClick={() => (window.location.href = "/budget")}>
          📊 Edit Budget
        </ActionButton>

        <ActionButton
          color="#4caf50"
          onClick={() => (window.location.href = "/calculator")}
        >
          🧮 Update Salary
        </ActionButton>
      </ButtonsContainer>
    </ActionsContainer>
  );
}
