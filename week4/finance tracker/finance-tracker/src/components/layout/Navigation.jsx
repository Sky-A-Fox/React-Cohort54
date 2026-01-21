import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Home, Calculator, PieChart, BarChart } from "lucide-react";

const Nav = styled.nav`
  display: flex;
  gap: 10px;
  padding: 10px;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  justify-content: center;
`;

const NavItem = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 20px;
  text-decoration: none;
  color: #666;
  border-radius: 8px;
  transition: all 0.2s;

  &.active {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;

    svg {
      color: white;
    }
  }

  &:hover:not(.active) {
    background: #f5f5f5;
  }

  svg {
    margin-bottom: 5px;
    color: #999;
  }

  span {
    font-size: 12px;
    font-weight: 500;
  }
`;

export default function Navigation() {
  return (
    <Nav>
      <NavItem to="/">
        <Home size={20} />
        <span>Home</span>
      </NavItem>
      <NavItem to="/budget">
        <PieChart size={20} />
        <span>Budget</span>
      </NavItem>
      <NavItem to="/calculator">
        <Calculator size={20} />
        <span>Calculator</span>
      </NavItem>
      <NavItem to="/analytics">
        <BarChart size={20} />
        <span>Analytics</span>
      </NavItem>
    </Nav>
  );
}
