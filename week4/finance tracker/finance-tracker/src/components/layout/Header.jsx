import styled from "styled-components";
import { DollarSign } from "lucide-react";

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  color: white;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 24px;
  font-weight: bold;
  color: white;

  svg {
    color: #4caf50;
  }
`;

const UserInfo = styled.div`
  font-size: 14px;
  opacity: 0.8;
`;

export default function Header() {
  return (
    <HeaderContainer>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Logo>
          <DollarSign size={28} />
          BudgetFlow
        </Logo>
        <UserInfo>NL Finance Tracker</UserInfo>
      </div>
    </HeaderContainer>
  );
}
