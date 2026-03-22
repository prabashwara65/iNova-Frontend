import styled from "styled-components";
import TopNav from "../../../components/navigation/TopNav";

const Shell = styled.div`
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(255, 255, 255, 0.95), transparent 28%),
    linear-gradient(180deg, #f5f5f5 0%, #ececeb 100%);
`;

const Container = styled.div`
  width: min(1120px, calc(100% - 40px));
  margin: 0 auto;
`;

const Hero = styled.section`
  padding: 36px 0 22px;
`;

const HeroCard = styled.div`
  border-radius: 30px;
  overflow: hidden;
  background: linear-gradient(135deg, #1b1b1b 0%, #111111 100%);
  color: white;
  padding: 34px;
`;

const Eyebrow = styled.div`
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: rgba(255, 255, 255, 0.62);
`;

const Title = styled.h1`
  margin: 14px 0 0;
  font-size: clamp(2rem, 5vw, 3.6rem);
  line-height: 1;
`;

const Description = styled.p`
  margin: 18px 0 0;
  max-width: 640px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.74);
`;

const Grid = styled.section`
  padding: 8px 0 72px;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 22px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const Panel = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 24px;
  padding: 24px;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.06);
`;

const PanelTitle = styled.h2`
  margin: 0;
  font-size: 1.35rem;
`;

const PanelText = styled.p`
  margin: 10px 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.75;
`;

const CardList = styled.div`
  margin-top: 22px;
  display: grid;
  gap: 14px;
`;

const SupportCard = styled.div`
  padding: 18px;
  border-radius: 18px;
  background: ${({ theme }) => theme.colors.surfaceMuted};
`;

const SupportTitle = styled.div`
  font-weight: 700;
`;

const SupportMeta = styled.div`
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.7;
`;

const TicketBox = styled.div`
  margin-top: 22px;
  padding: 18px;
  border-radius: 20px;
  background: linear-gradient(135deg, #1c1c1c 0%, #121212 100%);
  color: white;
`;

const TicketCode = styled.div`
  margin-top: 12px;
  font-size: 1.4rem;
  font-weight: 700;
`;

export default function SupportPage() {
  return (
    <Shell>
      <TopNav />

      <Hero>
        <Container>
          <HeroCard>
            <Eyebrow>Customer support</Eyebrow>
            <Title>Get help for orders, delivery, and cancellations.</Title>
            <Description>
              This customer support area brings your common order-help actions into one place so
              shoppers can quickly contact the team, follow up on a shipment, or resolve checkout
              issues without extra steps.
            </Description>
          </HeroCard>
        </Container>
      </Hero>

      <Container>
        <Grid>
          <Panel>
            <PanelTitle>Support channels</PanelTitle>
            <PanelText>
              Reach the right team based on the type of problem you are facing with an order.
            </PanelText>

            <CardList>
              <SupportCard>
                <SupportTitle>Order support desk</SupportTitle>
                <SupportMeta>
                  Email: orders@inova.com
                  <br />
                  Use this for payment issues, missing order confirmations, and invoice requests.
                </SupportMeta>
              </SupportCard>
              <SupportCard>
                <SupportTitle>Delivery help</SupportTitle>
                <SupportMeta>
                  Hotline: +94 11 234 5678
                  <br />
                  Use this for late delivery, address correction, and courier follow-up.
                </SupportMeta>
              </SupportCard>
              <SupportCard>
                <SupportTitle>Returns and cancellations</SupportTitle>
                <SupportMeta>
                  Live chat: Mon - Sat, 8:00 AM - 8:00 PM
                  <br />
                  Use this for return guidance and pending-order cancellation support.
                </SupportMeta>
              </SupportCard>
            </CardList>
          </Panel>

          <Panel>
            <PanelTitle>Support summary</PanelTitle>
            <PanelText>
              Keep this reference handy when a customer needs quick assistance after checkout.
            </PanelText>

            <CardList>
              <SupportCard>
                <SupportTitle>Recommended flow</SupportTitle>
                <SupportMeta>
                  1. Track the order with the order ID.
                  <br />
                  2. If the order is still pending, cancel directly from the tracking page.
                  <br />
                  3. If it is already confirmed, contact delivery support for the next action.
                </SupportMeta>
              </SupportCard>
              <SupportCard>
                <SupportTitle>Response time</SupportTitle>
                <SupportMeta>
                  Priority order questions are typically handled within 30 minutes during support
                  hours.
                </SupportMeta>
              </SupportCard>
            </CardList>

            <TicketBox>
              <div>Sample support ticket</div>
              <TicketCode>SUP-2026-0148</TicketCode>
              <PanelText as="div" style={{ color: "rgba(255,255,255,0.72)" }}>
                Share the order ID together with the support ticket number when escalating an issue
                to the admin or operations team.
              </PanelText>
            </TicketBox>
          </Panel>
        </Grid>
      </Container>
    </Shell>
  );
}
