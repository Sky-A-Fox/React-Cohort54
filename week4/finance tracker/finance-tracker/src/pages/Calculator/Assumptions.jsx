import styled from "styled-components";
import { AlertCircle, Info } from "lucide-react";

const Container = styled.div`
  background: #f8f9fa;
  border-radius: 16px;
  padding: 25px;
  margin-top: 30px;
  border-left: 4px solid #6c757d;
  grid-column: 1 / -1;
`;

const Title = styled.h3`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #495057;
  margin-bottom: 20px;
  font-size: 1.2rem;

  svg {
    color: #6c757d;
  }
`;

const AssumptionList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const AssumptionItem = styled.li`
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
  color: #6c757d;
  line-height: 1.5;
  font-size: 0.95rem;

  svg {
    color: #6c757d;
    flex-shrink: 0;
    margin-top: 2px;
  }
`;

const Disclaimer = styled.div`
  background: #fff3e0;
  border: 1px solid #ffe0b2;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
`;

const DisclaimerHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;

  svg {
    color: #f57c00;
  }
`;

const DisclaimerTitle = styled.strong`
  color: #e65100;
  font-size: 1rem;
`;

const DisclaimerText = styled.p`
  color: #5d4037;
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.5;
`;

const ExternalLink = styled.a`
  color: #1976d2;
  font-weight: 500;
  text-decoration: none;
  border-bottom: 1px dotted #1976d2;

  &:hover {
    color: #0d47a1;
    border-bottom: 1px solid #0d47a1;
  }
`;

export default function Assumptions() {
  return (
    <Container>
      <Title>
        <Info size={20} />
        Important Information
      </Title>

      <AssumptionList>
        <AssumptionItem>
          <Info size={16} />
          <span>Uses Dutch 2024 tax brackets (36.93%/49.50%)</span>
        </AssumptionItem>

        <AssumptionItem>
          <Info size={16} />
          <span>Social security contributions are NOT included</span>
        </AssumptionItem>

        <AssumptionItem>
          <Info size={16} />
          <span>Includes basic tax credits</span>
        </AssumptionItem>

        <AssumptionItem>
          <Info size={16} />
          <span>For single person without special deductions</span>
        </AssumptionItem>
      </AssumptionList>

      <Disclaimer>
        <DisclaimerHeader>
          <AlertCircle size={18} />
          <DisclaimerTitle>Please Note</DisclaimerTitle>
        </DisclaimerHeader>
        <DisclaimerText>
          This calculator was created for educational purposes. The results are
          approximate estimates. For accurate calculations, use the official
          calculator at{" "}
          <ExternalLink
            href="https://thetax.nl/"
            target="_blank"
            rel="noopener noreferrer"
          >
            TheTax.nl
          </ExternalLink>{" "}
          or consult a tax professional.
        </DisclaimerText>
      </Disclaimer>
    </Container>
  );
}
