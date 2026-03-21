import styled from "styled-components";
import TopNav from "../../components/navigation/TopNav";

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
  padding: 34px 0 22px;
`;

const HeroCard = styled.div`
  background: linear-gradient(135deg, #1b1b1b 0%, #111111 100%);
  color: white;
  border-radius: 30px;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;

  @media (max-width: 920px) {
    grid-template-columns: 1fr;
  }
`;

const HeroContent = styled.div`
  padding: 36px;
`;

const Eyebrow = styled.div`
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: rgba(255, 255, 255, 0.62);
`;

const Title = styled.h1`
  margin: 14px 0 0;
  font-size: clamp(2.1rem, 5vw, 4rem);
  line-height: 0.98;
`;

const Description = styled.p`
  margin: 18px 0 0;
  max-width: 560px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.74);
`;

const SearchCard = styled.div`
  margin-top: 28px;
  padding: 16px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px;

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
  }
`;

const SearchInput = styled.input`
  border: 0;
  outline: none;
  border-radius: 14px;
  padding: 14px 16px;
  background: white;
`;

const SearchButton = styled.button`
  border: 0;
  border-radius: 14px;
  padding: 14px 20px;
  background: white;
  color: #111111;
  font-weight: 700;
  cursor: pointer;
`;

const HeroVisual = styled.div`
  min-height: 360px;
  position: relative;
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const FloatingStatus = styled.div`
  position: absolute;
  right: 24px;
  bottom: 24px;
  padding: 16px 18px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.86);
  color: #111111;
  min-width: 220px;
  box-shadow: 0 22px 40px rgba(0, 0, 0, 0.18);
`;

const StatusLabel = styled.div`
  font-size: 0.76rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const StatusValue = styled.div`
  margin-top: 8px;
  font-size: 1.1rem;
  font-weight: 700;
`;

const Grid = styled.section`
  padding: 8px 0 72px;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
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

const SummaryGrid = styled.div`
  margin-top: 22px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
  }
`;

const SummaryItem = styled.div`
  padding: 16px;
  border-radius: 18px;
  background: ${({ theme }) => theme.colors.surfaceMuted};
`;

const SummaryLabel = styled.div`
  font-size: 0.82rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const SummaryValue = styled.div`
  margin-top: 8px;
  font-weight: 700;
  font-size: 1rem;
`;

const Timeline = styled.div`
  margin-top: 22px;
  display: grid;
  gap: 18px;
`;

const Step = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 14px;
  align-items: start;
`;

const StepMarker = styled.div`
  width: 16px;
  height: 16px;
  margin-top: 4px;
  border-radius: 50%;
  background: ${({ $active }) => ($active ? "#111111" : "#cfcfcf")};
  box-shadow: ${({ $active }) => ($active ? "0 0 0 6px rgba(17,17,17,0.08)" : "none")};
`;

const StepTitle = styled.div`
  font-weight: 700;
`;

const StepMeta = styled.div`
  margin-top: 6px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.7;
`;

const SideStack = styled.div`
  display: grid;
  gap: 22px;
`;

const ProductCard = styled.div`
  display: grid;
  grid-template-columns: 104px 1fr;
  gap: 16px;
  align-items: center;
  margin-top: 22px;
  padding: 14px;
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.surfaceMuted};

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

const ProductImage = styled.img`
  width: 104px;
  height: 104px;
  object-fit: cover;
  border-radius: 18px;
  display: block;
`;

const ProductName = styled.div`
  font-weight: 700;
  font-size: 1rem;
`;

const ProductMeta = styled.div`
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.7;
`;

const MiniList = styled.div`
  margin-top: 18px;
  display: grid;
  gap: 12px;
`;

const MiniItem = styled.div`
  padding: 14px 16px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.surfaceMuted};
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
`;

const MiniKey = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
`;

const MiniValue = styled.div`
  font-weight: 600;
`;

const HelpCard = styled.div`
  padding: 18px;
  border-radius: 18px;
  background: linear-gradient(135deg, #1c1c1c 0%, #121212 100%);
  color: white;
`;

const HelpText = styled.p`
  margin: 10px 0 0;
  line-height: 1.75;
  color: rgba(255, 255, 255, 0.7);
`;

export default function TrackOrderPage() {
  return (
    <Shell>
      <TopNav />

      <Hero>
        <Container>
          <HeroCard>
            <HeroContent>
              <Eyebrow>Track your order</Eyebrow>
              <Title>Stay close to every step of your delivery.</Title>
              <Description>
                Follow your Apple order with a clean, visual timeline. Review the latest courier
                updates, estimated arrival, shipping address, and support details in one place.
              </Description>

              <SearchCard>
                <SearchInput defaultValue="IN-2048-APL" aria-label="Order number" />
                <SearchButton type="button">Track Order</SearchButton>
              </SearchCard>
            </HeroContent>

            <HeroVisual>
              <HeroImage
                src="https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=1400&q=80"
                alt="Packed Apple order on a minimalist desk"
              />
              <FloatingStatus>
                <StatusLabel>Current status</StatusLabel>
                <StatusValue>Out for delivery</StatusValue>
              </FloatingStatus>
            </HeroVisual>
          </HeroCard>
        </Container>
      </Hero>

      <Container>
        <Grid>
          <Panel>
            <PanelTitle>Shipment journey</PanelTitle>
            <PanelText>
              Your order is moving smoothly through the final delivery stages. Here is the latest
              handoff and location information for this shipment.
            </PanelText>

            <SummaryGrid>
              <SummaryItem>
                <SummaryLabel>Order ID</SummaryLabel>
                <SummaryValue>IN-2048-APL</SummaryValue>
              </SummaryItem>
              <SummaryItem>
                <SummaryLabel>Estimated delivery</SummaryLabel>
                <SummaryValue>Today, 6:30 PM</SummaryValue>
              </SummaryItem>
              <SummaryItem>
                <SummaryLabel>Courier</SummaryLabel>
                <SummaryValue>DHL Express</SummaryValue>
              </SummaryItem>
            </SummaryGrid>

            <Timeline>
              <Step>
                <StepMarker $active />
                <div>
                  <StepTitle>Out for delivery</StepTitle>
                  <StepMeta>Courier left the Colombo distribution center at 1:05 PM.</StepMeta>
                </div>
              </Step>
              <Step>
                <StepMarker $active />
                <div>
                  <StepTitle>Arrived at local hub</StepTitle>
                  <StepMeta>Package sorted at the final city hub at 10:20 AM.</StepMeta>
                </div>
              </Step>
              <Step>
                <StepMarker $active />
                <div>
                  <StepTitle>Dispatched from warehouse</StepTitle>
                  <StepMeta>Order packed and dispatched with seal verification completed.</StepMeta>
                </div>
              </Step>
              <Step>
                <StepMarker />
                <div>
                  <StepTitle>Delivered</StepTitle>
                  <StepMeta>Final confirmation will appear once the package reaches your address.</StepMeta>
                </div>
              </Step>
            </Timeline>
          </Panel>

          <SideStack>
            <Panel>
              <PanelTitle>Order summary</PanelTitle>

              <ProductCard>
                <ProductImage
                  src="https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=1200&q=80"
                  alt="MacBook Pro"
                />
                <div>
                  <ProductName>MacBook Pro 14</ProductName>
                  <ProductMeta>
                    Space Black
                    <br />
                    16GB unified memory
                    <br />
                    512GB SSD
                  </ProductMeta>
                </div>
              </ProductCard>

              <MiniList>
                <MiniItem>
                  <MiniKey>Shipping to</MiniKey>
                  <MiniValue>Colombo 07, Sri Lanka</MiniValue>
                </MiniItem>
                <MiniItem>
                  <MiniKey>Payment</MiniKey>
                  <MiniValue>Visa ending in 2408</MiniValue>
                </MiniItem>
                <MiniItem>
                  <MiniKey>Total</MiniKey>
                  <MiniValue>$2,047.00</MiniValue>
                </MiniItem>
              </MiniList>
            </Panel>

            <HelpCard>
              <PanelTitle>Need help quickly?</PanelTitle>
              <HelpText>
                Contact support, update delivery instructions, or request a callback if the courier
                misses you. Everything important is available before the order arrives.
              </HelpText>
            </HelpCard>
          </SideStack>
        </Grid>
      </Container>
    </Shell>
  );
}
