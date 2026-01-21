import styled from "styled-components";
import { AlertCircle } from "lucide-react";

const WarningContainer = styled.div`
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
  align-items: center;

  svg {
    color: #856404;
    flex-shrink: 0;
  }

  p {
    margin: 0;
    color: #856404;
    font-size: 0.95rem;
  }
`;

export default function WarningBox() {
  return (
    <WarningContainer>
      <AlertCircle size={20} />
      <p>
        <strong>Note:</strong> This is a simplified analytics view. For detailed
        month-by-month comparison, use the Budget page's "Load Month" feature.
      </p>
    </WarningContainer>
  );
}
