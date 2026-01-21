import styled from "styled-components";

const NoDataContainer = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

  .icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: #667eea;
  }

  h3 {
    color: #333;
    margin-bottom: 0.5rem;
  }

  p {
    color: #6c757d;
    margin-bottom: 1.5rem;
  }
`;

const ActionButton = styled.button`
  padding: 0.8rem 1.5rem;
  background: ${(props) => props.color || "#667eea"};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  margin: 0 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

export default function NoDataState() {
  return (
    <NoDataContainer>
      <div className="icon">📈</div>
      <h3>No financial data yet</h3>
      <p>
        Start by setting up your budget and tracking expenses to see analytics
        here.
      </p>
      <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
        <ActionButton onClick={() => (window.location.href = "/budget")}>
          Go to Budget Page
        </ActionButton>
        <ActionButton
          color="#4caf50"
          onClick={() => (window.location.href = "/calculator")}
        >
          Calculate Salary
        </ActionButton>
      </div>
    </NoDataContainer>
  );
}
