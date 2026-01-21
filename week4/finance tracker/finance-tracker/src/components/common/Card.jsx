import styled from "styled-components";

const StyledCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: ${(props) => props.padding || "24px"};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: ${(props) => props.marginBottom || "0"};

  ${(props) =>
    props.hoverable &&
    `
    transition: transform 0.2s, box-shadow 0.2s;
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    }
  `}
`;

export default function Card({ children, padding, marginBottom, hoverable }) {
  return (
    <StyledCard
      padding={padding}
      marginBottom={marginBottom}
      hoverable={hoverable}
    >
      {children}
    </StyledCard>
  );
}
