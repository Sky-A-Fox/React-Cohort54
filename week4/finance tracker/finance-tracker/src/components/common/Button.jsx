import styled from "styled-components";

const StyledButton = styled.button`
  background: ${(props) => {
    switch (props.variant) {
      case "primary":
        return "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
      case "secondary":
        return "#6c757d";
      case "success":
        return "#28a745";
      case "danger":
        return "#dc3545";
      case "outline":
        return "#689fd6";
      default:
        return "#4c8ccc";
    }
  }};

  color: ${(props) => (props.variant === "outline" ? "#667eea" : "white")};
  border: ${(props) =>
    props.variant === "outline" ? "2px solid #667eea" : "none"};
  padding: ${(props) =>
    props.size === "large"
      ? "16px 32px"
      : props.size === "small"
        ? "8px 16px"
        : "12px 24px"};
  border-radius: 8px;
  font-size: ${(props) =>
    props.size === "large" ? "18px" : props.size === "small" ? "14px" : "16px"};
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default function Button({
  children,
  variant = "primary",
  size = "medium",
  onClick,
  disabled,
  type = "button",
  title = "", 
}) {
  return (
    <StyledButton
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled}
      type={type}
      title={title}
    >
      {children}
    </StyledButton>
  );
}
