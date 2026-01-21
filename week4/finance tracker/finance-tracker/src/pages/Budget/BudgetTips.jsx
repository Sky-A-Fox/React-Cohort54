import styled from "styled-components";

const TipBox = styled.div`
  margin-top: 30px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 10px;
  font-size: 14px;
  color: #6c757d;
  line-height: 1.5;

  strong {
    color: #333;
  }
`;

export default function BudgetTips({ categories }) {
  if (categories.length === 0) {
    return (
      <TipBox
        style={{
          textAlign: "center",
          background: "#fff3cd",
          border: "1px solid #ffeaa7",
        }}
      >
        <strong>💡 Getting Started:</strong> Click "Add Category" to create your
        first budget category. Use "Load Month" to load previously saved
        budgets.
      </TipBox>
    );
  }

  return (
    <TipBox>
      <strong>💡 Tips:</strong> Click on any value in the table to edit it.
      Essential expenses are marked with a{" "}
      <span style={{ color: "#28a745" }}>green badge</span>. Track your actual
      spending by updating the "Actual" column.
    </TipBox>
  );
}
