import styled from "styled-components";

const StyledInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid ${(props) => (props.error ? "#dc3545" : "#dee2e6")};
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #667eea;
  }

  &::placeholder {
    color: #adb5bd;
  }
`;

const InputContainer = styled.div`
  margin-bottom: ${(props) => props.marginBottom || "16px"};
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #495057;
`;

const ErrorMessage = styled.span`
  display: block;
  margin-top: 4px;
  color: #dc3545;
  font-size: 14px;
`;

export default function Input({ label, error, marginBottom, ...props }) {
  return (
    <InputContainer marginBottom={marginBottom}>
      {label && <Label>{label}</Label>}
      <StyledInput error={error} {...props} />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputContainer>
  );
}
