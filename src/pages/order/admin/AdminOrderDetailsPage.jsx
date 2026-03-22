import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import TopNav from "../../../components/navigation/TopNav";
import { API_BASE, orderApi } from "../../../services/api";

const REQUEST_TIMEOUT_MS = 10000;

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(Number(value || 0));

const formatDate = (value) => {
  if (!value) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
};

async function withTimeout(request) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    return await request(controller.signal);
  } finally {
    window.clearTimeout(timeoutId);
  }
}

const Shell = styled.div`
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(255, 255, 255, 0.95), transparent 28%),
    linear-gradient(180deg, #f5f5f5 0%, #ececeb 100%);
`;

const Container = styled.div`
  width: min(1180px, calc(100% - 40px));
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
  font-size: clamp(2rem, 5vw, 3.8rem);
  line-height: 1;
`;

const Description = styled.p`
  margin: 18px 0 0;
  max-width: 680px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.74);
`;

const Grid = styled.section`
  padding: 8px 0 72px;
  display: grid;
  grid-template-columns: 0.95fr 1.05fr;
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

const SearchRow = styled.form`
  margin-top: 22px;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px;

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
  }
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid rgba(17, 17, 17, 0.12);
  border-radius: 14px;
  padding: 12px 14px;
  background: white;
  color: ${({ theme }) => theme.colors.text};
  font: inherit;
`;

const Button = styled.button`
  border: 0;
  border-radius: 14px;
  background: #111111;
  color: white;
  padding: 12px 18px;
  font-weight: 700;
  cursor: pointer;
`;

const Message = styled.div`
  margin-top: 18px;
  padding: 14px 16px;
  border-radius: 16px;
  line-height: 1.7;
  background: ${({ $tone }) =>
    $tone === "error" ? "rgba(209, 47, 47, 0.08)" : "rgba(17, 17, 17, 0.06)"};
  color: ${({ $tone }) => ($tone === "error" ? "#8b1e1e" : "#111111")};
  border: 1px solid
    ${({ $tone }) =>
      $tone === "error" ? "rgba(209, 47, 47, 0.18)" : "rgba(17, 17, 17, 0.08)"};
`;

const OrderList = styled.div`
  margin-top: 22px;
  display: grid;
  gap: 12px;
`;

const OrderRow = styled.button`
  width: 100%;
  text-align: left;
  border: 0;
  border-radius: 16px;
  padding: 14px 16px;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.dark : theme.colors.surfaceMuted};
  color: ${({ $active }) => ($active ? "white" : "inherit")};
  cursor: pointer;
`;

const OrderMeta = styled.div`
  margin-top: 8px;
  line-height: 1.65;
  color: ${({ $active, theme }) =>
    $active ? "rgba(255,255,255,0.72)" : theme.colors.textMuted};
`;

const DetailList = styled.div`
  margin-top: 22px;
  display: grid;
  gap: 12px;
`;

const DetailItem = styled.div`
  padding: 14px 16px;
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

const ProductList = styled.div`
  margin-top: 22px;
  display: grid;
  gap: 14px;
`;

const ProductCard = styled.div`
  display: grid;
  grid-template-columns: 96px 1fr;
  gap: 16px;
  align-items: center;
  padding: 14px;
  border-radius: 18px;
  background: ${({ theme }) => theme.colors.surfaceMuted};

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const ProductImage = styled.img`
  width: 96px;
  height: 96px;
  object-fit: cover;
  border-radius: 16px;
  display: block;
`;

const ProductTitle = styled.div`
  font-weight: 700;
`;

const ProductMeta = styled.div`
  margin-top: 8px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export default function AdminOrderDetailsPage() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchOrderId, setSearchOrderId] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ tone: "info", message: "" });

  const loadOrders = async () => {
    setLoading(true);

    try {
      const data = await withTimeout((signal) => orderApi.getAll(signal));
      const nextOrders = Array.isArray(data) ? data : data.orders || [];
      setOrders(nextOrders);

      if (!selectedOrder && nextOrders.length) {
        setSelectedOrder(nextOrders[0]);
        setSearchOrderId(nextOrders[0].orderId);
      }
    } catch (error) {
      const message =
        error.name === "AbortError"
          ? `The API did not respond within ${REQUEST_TIMEOUT_MS / 1000} seconds.`
          : error.message || "Failed to load admin order view";

      setFeedback({
        tone: "error",
        message: `${message} Endpoint: ${API_BASE}/api/orders`,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const totalUnits = useMemo(
    () =>
      selectedOrder?.items?.reduce((sum, item) => sum + Number(item.quantity || 0), 0) || 0,
    [selectedOrder]
  );

  const handleSearch = async (event) => {
    event.preventDefault();

    if (!searchOrderId.trim()) {
      setFeedback({
        tone: "error",
        message: "Enter an order ID to inspect order details.",
      });
      return;
    }

    setLoading(true);

    try {
      const data = await withTimeout((signal) => orderApi.getById(searchOrderId.trim(), signal));
      const nextOrder = data.order || data;

      if (!nextOrder?.orderId) {
        throw new Error("Order response format is invalid");
      }

      setSelectedOrder(nextOrder);
      setFeedback({
        tone: "info",
        message: `Showing admin details for ${nextOrder.orderId}.`,
      });
    } catch (error) {
      const message =
        error.name === "AbortError"
          ? `The API did not respond within ${REQUEST_TIMEOUT_MS / 1000} seconds.`
          : error.message || "Failed to load order details";

      setFeedback({
        tone: "error",
        message: `${message} Endpoint: ${API_BASE}/api/orders/${searchOrderId.trim()}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Shell>
      <TopNav />

      <Hero>
        <Container>
          <HeroCard>
            <Eyebrow>Admin orders</Eyebrow>
            <Title>Review full order details from one admin screen.</Title>
            <Description>
              This admin page helps the operations team inspect order IDs, customer shipping
              addresses, line items, totals, status changes, and creation timestamps from the order
              service.
            </Description>
          </HeroCard>
        </Container>
      </Hero>

      <Container>
        <Grid>
          <Panel>
            <PanelTitle>All orders</PanelTitle>
            <PanelText>
              Browse recent orders or search a specific order ID to open the full order details.
            </PanelText>

            <SearchRow onSubmit={handleSearch}>
              <Input
                value={searchOrderId}
                onChange={(event) => setSearchOrderId(event.target.value)}
                placeholder="Search by order ID"
                aria-label="Search order ID"
              />
              <Button type="submit">{loading ? "Loading..." : "Find order"}</Button>
            </SearchRow>

            {feedback.message ? <Message $tone={feedback.tone}>{feedback.message}</Message> : null}

            <OrderList>
              {orders.map((order) => (
                <OrderRow
                  key={order.orderId}
                  type="button"
                  $active={selectedOrder?.orderId === order.orderId}
                  onClick={() => {
                    setSelectedOrder(order);
                    setSearchOrderId(order.orderId);
                    setFeedback({
                      tone: "info",
                      message: `Loaded ${order.orderId} from the admin order list.`,
                    });
                  }}
                >
                  <strong>{order.orderId}</strong>
                  <OrderMeta $active={selectedOrder?.orderId === order.orderId}>
                    User: {order.userId}
                    <br />
                    Status: {order.status}
                    <br />
                    Total: {formatCurrency(order.totalAmount)}
                  </OrderMeta>
                </OrderRow>
              ))}
            </OrderList>
          </Panel>

          <Panel>
            <PanelTitle>Order details</PanelTitle>
            <PanelText>
              Use this panel to review the selected order summary, shipping destination, and item
              breakdown.
            </PanelText>

            <DetailList>
              <DetailItem>
                <DetailKey>Order ID</DetailKey>
                <DetailValue>{selectedOrder?.orderId || "Not selected"}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailKey>User ID</DetailKey>
                <DetailValue>{selectedOrder?.userId || "Not selected"}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailKey>Status</DetailKey>
                <DetailValue>{selectedOrder?.status || "Waiting"}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailKey>Total bill</DetailKey>
                <DetailValue>{formatCurrency(selectedOrder?.totalAmount)}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailKey>Total units</DetailKey>
                <DetailValue>{totalUnits}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailKey>Shipping address</DetailKey>
                <DetailValue>{selectedOrder?.shippingAddress || "Not available"}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailKey>Created at</DetailKey>
                <DetailValue>{formatDate(selectedOrder?.createdAt)}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailKey>Last updated</DetailKey>
                <DetailValue>{formatDate(selectedOrder?.updatedAt)}</DetailValue>
              </DetailItem>
            </DetailList>

            <ProductList>
              {selectedOrder?.items?.length ? (
                selectedOrder.items.map((item, index) => (
                  <ProductCard key={`${item.productId}-${index}`}>
                    <ProductImage
                      src={
                        item.imageUrl ||
                        "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=1400&q=80"
                      }
                      alt={item.productId}
                    />
                    <div>
                      <ProductTitle>{item.productId}</ProductTitle>
                      <ProductMeta>
                        Quantity: {item.quantity}
                        <br />
                        Unit price: {formatCurrency(item.priceAtPurchase)}
                        <br />
                        Line total: {formatCurrency(item.quantity * item.priceAtPurchase)}
                      </ProductMeta>
                    </div>
                  </ProductCard>
                ))
              ) : (
                <Message $tone="info">Select an order to see its product details.</Message>
              )}
            </ProductList>
          </Panel>
        </Grid>
      </Container>
    </Shell>
  );
}
