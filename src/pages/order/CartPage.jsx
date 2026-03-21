import { useMemo, useState } from "react";
import styled from "styled-components";
import TopNav from "../../components/navigation/TopNav";

const initialCartItems = [
  {
    id: "macbook-pro-14",
    name: "MacBook Pro 14",
    finish: "Space Black",
    specs: "M3 Pro | 18GB | 512GB SSD",
    price: 1999,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "airpods-max",
    name: "AirPods Max",
    finish: "Silver",
    specs: "Active Noise Cancellation",
    price: 549,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80",
  },
];

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);

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
  padding: 34px 0 20px;
`;

const HeroCard = styled.div`
  background: linear-gradient(135deg, #1d1d1d 0%, #111111 100%);
  color: white;
  border-radius: 30px;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1.08fr 0.92fr;

  @media (max-width: 920px) {
    grid-template-columns: 1fr;
  }
`;

const HeroContent = styled.div`
  padding: 34px;
`;

const Eyebrow = styled.div`
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: rgba(255, 255, 255, 0.6);
`;

const Title = styled.h1`
  margin: 14px 0 0;
  font-size: clamp(2.1rem, 5vw, 3.8rem);
  line-height: 1;
`;

const Description = styled.p`
  margin: 18px 0 0;
  max-width: 540px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.74);
`;

const HeroStats = styled.div`
  margin-top: 28px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
  }
`;

const HeroStat = styled.div`
  padding: 16px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.08);
`;

const HeroStatValue = styled.div`
  font-size: 1.15rem;
  font-weight: 700;
`;

const HeroStatLabel = styled.div`
  margin-top: 6px;
  color: rgba(255, 255, 255, 0.66);
  font-size: 0.88rem;
`;

const HeroImageWrap = styled.div`
  min-height: 320px;
  position: relative;
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const HeroBadge = styled.div`
  position: absolute;
  right: 22px;
  bottom: 22px;
  background: rgba(255, 255, 255, 0.88);
  color: #111111;
  border-radius: 18px;
  padding: 16px 18px;
  min-width: 220px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.18);
`;

const HeroBadgeLabel = styled.div`
  font-size: 0.76rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const HeroBadgeValue = styled.div`
  margin-top: 8px;
  font-size: 1.05rem;
  font-weight: 700;
`;

const Layout = styled.section`
  padding: 6px 0 72px;
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
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

const CartList = styled.div`
  margin-top: 24px;
  display: grid;
  gap: 16px;
`;

const CartItem = styled.article`
  display: grid;
  grid-template-columns: 112px 1fr auto;
  gap: 18px;
  align-items: center;
  padding: 16px;
  border-radius: 22px;
  background: ${({ theme }) => theme.colors.surfaceMuted};

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const ItemImage = styled.img`
  width: 112px;
  height: 112px;
  object-fit: cover;
  border-radius: 18px;
  display: block;
`;

const ItemName = styled.h3`
  margin: 0;
  font-size: 1rem;
`;

const ItemMeta = styled.div`
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.7;
`;

const ItemControls = styled.div`
  margin-top: 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const QtyPill = styled.div`
  padding: 8px 12px;
  border-radius: 999px;
  background: white;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const ItemPriceBlock = styled.div`
  text-align: right;

  @media (max-width: 760px) {
    text-align: left;
  }
`;

const ItemPrice = styled.div`
  font-size: 1.15rem;
  font-weight: 700;
`;

const DeleteButton = styled.button`
  margin-top: 14px;
  border: 1px solid rgba(17, 17, 17, 0.12);
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  border-radius: 999px;
  padding: 10px 14px;
  cursor: pointer;
  font-weight: 600;
`;

const EmptyState = styled.div`
  margin-top: 24px;
  padding: 24px;
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.surfaceMuted};
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.75;
`;

const SideStack = styled.div`
  display: grid;
  gap: 22px;
`;

const DetailList = styled.div`
  margin-top: 20px;
  display: grid;
  gap: 12px;
`;

const DetailItem = styled.div`
  padding: 15px 16px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.surfaceMuted};
  display: flex;
  justify-content: space-between;
  gap: 14px;
  align-items: center;
`;

const DetailKey = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
`;

const DetailValue = styled.div`
  font-weight: 600;
  text-align: right;
`;

const Divider = styled.div`
  height: 1px;
  background: rgba(17, 17, 17, 0.08);
  margin: 18px 0;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
  font-size: 1.12rem;
  font-weight: 700;
`;

const PayButton = styled.button`
  width: 100%;
  margin-top: 18px;
  border: 0;
  border-radius: 18px;
  background: #111111;
  color: white;
  padding: 16px 18px;
  cursor: pointer;
  font-weight: 700;
  font-size: 1rem;
`;

const NoteCard = styled.div`
  padding: 18px;
  border-radius: 18px;
  background: linear-gradient(135deg, #1c1c1c 0%, #121212 100%);
  color: white;
`;

const NoteText = styled.p`
  margin: 10px 0 0;
  line-height: 1.75;
  color: rgba(255, 255, 255, 0.7);
`;

export default function CartPage() {
  const [items, setItems] = useState(initialCartItems);

  const summary = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = items.length > 0 ? 24 : 0;
    const protection = items.length > 0 ? 19 : 0;
    const total = subtotal + shipping + protection;

    return { subtotal, shipping, protection, total };
  }, [items]);

  const removeItem = (id) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  return (
    <Shell>
      <TopNav />

      <Hero>
        <Container>
          <HeroCard>
            <HeroContent>
              <Eyebrow>Your cart</Eyebrow>
              <Title>Review every detail before you pay.</Title>
              <Description>
                Check your Apple products, delivery preferences, payment method, and final totals
                in one clean checkout-ready cart experience.
              </Description>

              <HeroStats>
                <HeroStat>
                  <HeroStatValue>{items.length}</HeroStatValue>
                  <HeroStatLabel>Items in cart</HeroStatLabel>
                </HeroStat>
                <HeroStat>
                  <HeroStatValue>Express</HeroStatValue>
                  <HeroStatLabel>Priority delivery available</HeroStatLabel>
                </HeroStat>
                <HeroStat>
                  <HeroStatValue>Secure</HeroStatValue>
                  <HeroStatLabel>Protected checkout and payment</HeroStatLabel>
                </HeroStat>
              </HeroStats>
            </HeroContent>

            <HeroImageWrap>
              <HeroImage
                src="https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=1400&q=80"
                alt="Apple products prepared for checkout"
              />
              <HeroBadge>
                <HeroBadgeLabel>Estimated total</HeroBadgeLabel>
                <HeroBadgeValue>{formatCurrency(summary.total)}</HeroBadgeValue>
              </HeroBadge>
            </HeroImageWrap>
          </HeroCard>
        </Container>
      </Hero>

      <Container>
        <Layout>
          <Panel>
            <PanelTitle>Items in your cart</PanelTitle>
            <PanelText>
              Review your selected products, remove anything you no longer need, and continue to
              payment when everything looks right.
            </PanelText>

            {items.length > 0 ? (
              <CartList>
                {items.map((item) => (
                  <CartItem key={item.id}>
                    <ItemImage src={item.image} alt={item.name} />

                    <div>
                      <ItemName>{item.name}</ItemName>
                      <ItemMeta>
                        {item.finish}
                        <br />
                        {item.specs}
                      </ItemMeta>

                      <ItemControls>
                        <QtyPill>Qty {item.quantity}</QtyPill>
                        <QtyPill>Ships in 1-2 business days</QtyPill>
                      </ItemControls>
                    </div>

                    <ItemPriceBlock>
                      <ItemPrice>{formatCurrency(item.price)}</ItemPrice>
                      <DeleteButton type="button" onClick={() => removeItem(item.id)}>
                        Delete Item
                      </DeleteButton>
                    </ItemPriceBlock>
                  </CartItem>
                ))}
              </CartList>
            ) : (
              <EmptyState>
                Your cart is currently empty. Add Apple products to continue with payment and
                delivery scheduling.
              </EmptyState>
            )}
          </Panel>

          <SideStack>
            <Panel>
              <PanelTitle>Cart details</PanelTitle>
              <DetailList>
                <DetailItem>
                  <DetailKey>Shipping address</DetailKey>
                  <DetailValue>24 Flower Road, Colombo 07</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailKey>Delivery method</DetailKey>
                  <DetailValue>Express delivery</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailKey>Payment method</DetailKey>
                  <DetailValue>Visa ending in 2408</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailKey>Contact</DetailKey>
                  <DetailValue>hasara@email.com</DetailValue>
                </DetailItem>
              </DetailList>
            </Panel>

            <Panel>
              <PanelTitle>Order summary</PanelTitle>
              <DetailList>
                <DetailItem>
                  <DetailKey>Subtotal</DetailKey>
                  <DetailValue>{formatCurrency(summary.subtotal)}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailKey>Shipping</DetailKey>
                  <DetailValue>{formatCurrency(summary.shipping)}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailKey>Device protection</DetailKey>
                  <DetailValue>{formatCurrency(summary.protection)}</DetailValue>
                </DetailItem>
              </DetailList>

              <Divider />

              <TotalRow>
                <span>Total</span>
                <span>{formatCurrency(summary.total)}</span>
              </TotalRow>

              <PayButton type="button">Proceed to Payment</PayButton>
            </Panel>

            <NoteCard>
              <PanelTitle>Checkout note</PanelTitle>
              <NoteText>
                Payment, warranty, and shipping details are shown here together so customers can
                review everything important before placing the order.
              </NoteText>
            </NoteCard>
          </SideStack>
        </Layout>
      </Container>
    </Shell>
  );
}
