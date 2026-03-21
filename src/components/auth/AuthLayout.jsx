import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const Shell = styled.main`
  min-height: 100vh;
  padding: 32px 20px;
  display: grid;
  place-items: center;
`;

const Frame = styled.section`
  width: min(1080px, 100%);
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow};
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Showcase = styled.div`
  background:
    linear-gradient(160deg, rgba(255, 255, 255, 0.06), transparent 45%),
    linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%);
  color: white;
  padding: 56px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 40px;

  @media (max-width: 900px) {
    padding: 32px 28px;
  }
`;

const BrandRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

const Brand = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const Tabs = styled.div`
  display: inline-flex;
  gap: 8px;
  padding: 6px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
`;

const Tab = styled(Link)`
  text-decoration: none;
  padding: 10px 16px;
  border-radius: 999px;
  font-size: 0.92rem;
  color: ${({ $active }) => ($active ? "#111111" : "rgba(255, 255, 255, 0.82)")};
  background: ${({ $active }) => ($active ? "#ffffff" : "transparent")};
  transition: 180ms ease;
`;

const HeroCopy = styled.div`
  max-width: 420px;
`;

const Eyebrow = styled.p`
  margin: 0 0 16px;
  font-size: 0.82rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.65);
`;

const Title = styled.h1`
  margin: 0;
  font-size: clamp(2rem, 4vw, 3.3rem);
  line-height: 1.05;
  font-weight: 700;
`;

const Description = styled.p`
  margin: 18px 0 0;
  font-size: 1rem;
  line-height: 1.75;
  color: rgba(255, 255, 255, 0.72);
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  padding: 16px 18px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.08);
`;

const StatValue = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
`;

const StatLabel = styled.div`
  margin-top: 6px;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.66);
`;

const FormPanel = styled.div`
  padding: 56px;
  background: linear-gradient(180deg, #ffffff 0%, #f7f7f7 100%);
  display: flex;
  align-items: center;

  @media (max-width: 900px) {
    padding: 32px 24px;
  }
`;

export default function AuthLayout({ mode, title, description, children }) {
  const location = useLocation();

  return (
    <Shell>
      <Frame>
        <Showcase>
          <div>
            <BrandRow>
              <Brand>iNova</Brand>
              <Tabs>
                <Tab to="/login" $active={location.pathname === "/login"}>
                  Login
                </Tab>
                <Tab to="/signup" $active={location.pathname === "/signup"}>
                  Sign Up
                </Tab>
              </Tabs>
            </BrandRow>
          </div>

          <HeroCopy>
            <Eyebrow>Ecommerce Platform</Eyebrow>
            <Title>{title}</Title>
            <Description>{description}</Description>
          </HeroCopy>

          <Stats>
            <StatCard>
              <StatValue>24/7</StatValue>
              <StatLabel>Account access with secure session flow</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{mode === "login" ? "Fast" : "Simple"}</StatValue>
              <StatLabel>
                {mode === "login"
                  ? "Return customers can continue in a few seconds"
                  : "New shoppers can create an account without friction"}
              </StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>Seamless</StatValue>
              <StatLabel>Your one-stop shop for modern electronic devices</StatLabel>
            </StatCard>
          </Stats>
        </Showcase>

        <FormPanel>{children}</FormPanel>
      </Frame>
    </Shell>
  );
}
