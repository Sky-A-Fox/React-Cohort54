import styled from "styled-components";

const PageHeader = styled.div`
  margin-bottom: 30px;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 10px;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const PageSubtitle = styled.p`
  color: #6c757d;
  font-size: 1.1rem;
  line-height: 1.6;
`;

export default function BudgetHeader({ categoriesCount }) {
  return (
    <PageHeader>
      <PageTitle>Budget Planning</PageTitle>
      <PageSubtitle>
        Plan your monthly expenses, track actual spending, and manage your
        budget by categories.
        {categoriesCount === 0 && " Start by adding your first category!"}
      </PageSubtitle>
    </PageHeader>
  );
}
