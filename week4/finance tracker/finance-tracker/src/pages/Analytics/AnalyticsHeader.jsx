import styled from "styled-components";

const HeaderContainer = styled.header`
  text-align: center;
  margin-bottom: 3rem;

  h1 {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    color: #6c757d;
    font-size: 1.1rem;
  }
`;

export default function AnalyticsHeader() {
  return (
    <HeaderContainer>
      <h1>📊 Financial Analytics</h1>
      <p className="subtitle">Track and analyze your spending patterns</p>
    </HeaderContainer>
  );
}
