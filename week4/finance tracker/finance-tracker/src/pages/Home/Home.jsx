import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ArrowRight, PieChart, Calculator, BarChart } from "lucide-react";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const WelcomeSection = styled.section`
  text-align: center;
  padding: 60px 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  color: white;
  margin-bottom: 40px;
  box-shadow: 0 20px 60px rgba(102, 126, 234, 0.3);
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
  font-weight: 800;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  max-width: 700px;
  margin: 0 auto 30px;
  opacity: 0.9;
  line-height: 1.6;
`;

const StartButton = styled.button`
  background: white;
  color: #667eea;
  border: none;
  padding: 16px 40px;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s;
  box-shadow: 0 10px 30px rgba(255, 255, 255, 0.2);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 35px rgba(255, 255, 255, 0.3);
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin: 40px 0;
`;

const FeatureCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.3s;
  border: 2px solid transparent;
  text-align: center;

  &:hover {
    transform: translateY(-8px);
    border-color: #667eea;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
  }
`;

const FeatureIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 12px;
  background: #667eea15;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;

  svg {
    width: 32px;
    height: 32px;
    color: #667eea;
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 12px;
  color: #333;
`;

const FeatureDescription = styled.p`
  color: #666;
  line-height: 1.6;
`;

const InstructionsSection = styled.section`
  background: #f8f9fa;
  border-radius: 16px;
  padding: 40px;
  margin-top: 40px;
`;

const InstructionsTitle = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  color: #333;
`;

const StepsList = styled.ol`
  max-width: 600px;
  margin: 0 auto;
  list-style: none;
  counter-reset: step-counter;
`;

const Step = styled.li`
  margin-bottom: 20px;
  padding-left: 40px;
  position: relative;
  line-height: 1.6;
  color: #555;

  &::before {
    counter-increment: step-counter;
    content: counter(step-counter);
    position: absolute;
    left: 0;
    top: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }
`;

export default function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <PieChart />,
      title: "Budget Planning",
      description:
        "Plan expenses by categories, track actual spending, and optimize your financial habits.",
      route: "/budget",
    },
    {
      icon: <Calculator />,
      title: "Salary Calculator",
      description:
        "Calculate your net salary in Netherlands with 30% ruling, taxes, and social contributions.",
      route: "/calculator",
    },
    {
      icon: <BarChart />,
      title: "Monthly Analytics",
      description:
        "Compare your spending across months, visualize trends, and improve financial decisions.",
      route: "/analytics",
    },
  ];

  return (
    <Container>
      {/* Welcome Section */}
      <WelcomeSection>
        <Title>BudgetFlow</Title>
        <Subtitle>
          Your personal finance tracker for Netherlands. Plan your budget,
          calculate net salary, and analyze your spending across months.
        </Subtitle>
        <StartButton onClick={() => navigate("/budget")}>
          Start Planning
          <ArrowRight size={20} />
        </StartButton>
      </WelcomeSection>

      {/* Features Grid */}
      <FeaturesGrid>
        {features.map((feature, index) => (
          <FeatureCard key={index} onClick={() => navigate(feature.route)}>
            <FeatureIcon>{feature.icon}</FeatureIcon>
            <FeatureTitle>{feature.title}</FeatureTitle>
            <FeatureDescription>{feature.description}</FeatureDescription>
          </FeatureCard>
        ))}
      </FeaturesGrid>

      {/* Instructions */}
      <InstructionsSection>
        <InstructionsTitle>How It Works</InstructionsTitle>
        <StepsList>
          <Step>
            Use the calculator to determine your net salary in Netherlands
          </Step>
          <Step>Distribute your budget across expense categories</Step>
          <Step>Monitor your actual spending throughout the month</Step>
          <Step>Compare months to optimize your financial habits</Step>
        </StepsList>
      </InstructionsSection>
    </Container>
  );
}
