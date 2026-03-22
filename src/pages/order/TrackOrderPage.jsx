import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import TopNav from "../../components/navigation/TopNav";
import { API_BASE, orderApi } from "../../services/api";

const TEST_USER_ID = import.meta.env.VITE_TEST_USER_ID || "test-user-001";
const fallbackImage =
  "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=1400&q=80";
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

const formatShippingAddress = (shippingAddress) => {
  if (!shippingAddress) {
    return "Not available";
  }

  if (typeof shippingAddress === "string") {
    return shippingAddress;
  }

  const parts = [
    shippingAddress.fullName,
    shippingAddress.street,
    [shippingAddress.city, shippingAddress.postalCode].filter(Boolean).join(" "),
    shippingAddress.country,
    shippingAddress.phone,
  ];

  return parts.map((part) => (part || "").trim()).filter(Boolean).join(", ") || "Not available";
};

const getTimelineSteps = (status) => {
  if (status === "CANCELLED") {
    return [
      {
        title: "Order was canceled",
        meta: "This order was cancelled before shipment because it was still pending.",
        active: true,
      },
    ];
  }

  if (status === "CONFIRMED") {
    return [
      { title: "Packing completed", meta: "Items were packed and prepared.", active: true },
      { title: "Shipment confirmed", meta: "The order was confirmed successfully.", active: true },
      { title: "Out for delivery", meta: "Delivery flow is in progress.", active: true },
      { title: "Delivered", meta: "This order is shown at the delivered stage.", active: true },
    ];
  }

  return [
    { title: "Packing", meta: "Pending orders are currently being packed.", active: true },
    { title: "Shipment confirmed", meta: "This appears after confirmation.", active: false },
    { title: "Out for delivery", meta: "Courier updates will appear here next.", active: false },
    { title: "Delivered", meta: "Final delivery confirmation will appear here.", active: false },
  ];
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

const SearchCard = styled.form`
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

const Message = styled.div`
  margin-top: 18px;
  padding: 14px 16px;
  border-radius: 16px;
  line-height: 1.7;
  background: ${({ $tone }) => ($tone === "error" ? "rgba(209, 47, 47, 0.08)" : "rgba(17, 17, 17, 0.06)")};
  color: ${({ $tone }) => ($tone === "error" ? "#8b1e1e" : "#111111")};
  border: 1px solid ${({ $tone }) => ($tone === "error" ? "rgba(209, 47, 47, 0.18)" : "rgba(17, 17, 17, 0.08)")};
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
  background: ${({ $active, $cancelled }) => (!$active ? "#cfcfcf" : $cancelled ? "#b42318" : "#111111")};
  box-shadow: ${({ $active, $cancelled }) =>
    $active
      ? $cancelled
        ? "0 0 0 6px rgba(180, 35, 24, 0.12)"
        : "0 0 0 6px rgba(17,17,17,0.08)"
      : "none"};
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

const ProductList = styled.div`
  margin-top: 22px;
  display: grid;
  gap: 14px;
`;

const ProductCard = styled.div`
  display: grid;
  grid-template-columns: 104px 1fr;
  gap: 16px;
  align-items: center;
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
  text-align: right;
`;

const ActionButton = styled.button`
  width: 100%;
  margin-top: 18px;
  border: 0;
  border-radius: 16px;
  background: ${({ $danger }) => ($danger ? "#b42318" : "#111111")};
  color: white;
  padding: 14px 16px;
  cursor: pointer;
  font-weight: 700;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

const OrderHistory = styled.div`
  margin-top: 20px;
  display: grid;
  gap: 12px;
`;

const OrderRow = styled.button`
  border: 0;
  width: 100%;
  text-align: left;
  padding: 14px 16px;
  border-radius: 16px;
  background: ${({ $active, theme }) => ($active ? theme.colors.dark : theme.colors.surfaceMuted)};
  color: ${({ $active }) => ($active ? "white" : "inherit")};
  cursor: pointer;
`;

const OrderRowMeta = styled.div`
  margin-top: 8px;
  line-height: 1.6;
  color: ${({ $active, theme }) => ($active ? "rgba(255,255,255,0.72)" : theme.colors.textMuted)};
`;

export default function TrackOrderPage() {
  const [searchOrderId, setSearchOrderId] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [canceling, setCanceling] = useState(false);
  const [feedback, setFeedback] = useState({ tone: "info", message: "" });

  const loadUserOrders = async () => {
    setLoadingOrders(true);

    try {
      const data = await withTimeout((signal) => orderApi.getByUserId(TEST_USER_ID, signal));
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
          : error.message || "Failed to load order history";

      setFeedback({
        tone: "error",
        message: `${message} Endpoint: ${API_BASE}/api/orders?userId=${TEST_USER_ID}`,
      });
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    loadUserOrders();
  }, []);

  const handleTrackOrder = async (event) => {
    event.preventDefault();

    if (!searchOrderId.trim()) {
      setFeedback({ tone: "error", message: "Please enter an order ID to track." });
      return;
    }

    setLoadingOrder(true);
    setFeedback({ tone: "info", message: "" });

    try {
      const data = await withTimeout((signal) => orderApi.getById(searchOrderId.trim(), signal));
      const nextOrder = data.order || data;

      if (!nextOrder?.orderId) {
        throw new Error("Order response format is invalid");
      }

      setSelectedOrder(nextOrder);
      setSearchOrderId(nextOrder.orderId);
      setFeedback({ tone: "info", message: `Showing tracking details for ${nextOrder.orderId}.` });
    } catch (error) {
      const message =
        error.name === "AbortError"
          ? `The API did not respond within ${REQUEST_TIMEOUT_MS / 1000} seconds.`
          : error.message || "Failed to track order";

      setSelectedOrder(null);
      setFeedback({
        tone: "error",
        message: `${message} Endpoint: ${API_BASE}/api/orders/${searchOrderId.trim()}`,
      });
    } finally {
      setLoadingOrder(false);
    }
  };

  const handleCancelOrder = async () => {
    if (!selectedOrder || selectedOrder.status !== "PENDING" || canceling) {
      return;
    }

    setCanceling(true);

    try {
      const data = await withTimeout((signal) =>
        orderApi.update(
          selectedOrder.orderId,
          { action: "cancel" },
          signal
        )
      );
      const nextOrder = data.order || data;

      setSelectedOrder(nextOrder);
      setOrders((current) =>
        current.map((order) => (order.orderId === nextOrder.orderId ? nextOrder : order))
      );
      setFeedback({ tone: "info", message: `Order ${nextOrder.orderId} was cancelled successfully.` });
    } catch (error) {
      const message =
        error.name === "AbortError"
          ? `The API did not respond within ${REQUEST_TIMEOUT_MS / 1000} seconds.`
          : error.message || "Failed to cancel order";

      setFeedback({
        tone: "error",
        message: `${message} Endpoint: ${API_BASE}/api/orders/${selectedOrder.orderId}`,
      });
    } finally {
      setCanceling(false);
    }
  };

  const timelineSteps = useMemo(() => getTimelineSteps(selectedOrder?.status || "PENDING"), [selectedOrder]);
  const heroImage = selectedOrder?.items?.[0]?.imageUrl || fallbackImage;
  const isCancelled = selectedOrder?.status === "CANCELLED";

  return (
    <Shell>
      <TopNav />
      <Hero>
        <Container>
          <HeroCard>
            <HeroContent>
              <Eyebrow>Track your order</Eyebrow>
              <Title>Search by order ID and follow each update.</Title>
              <Description>
                Track one order with its order ID, review the real order summary, check shipping
                details, and cancel the order while it is still pending.
              </Description>

              <SearchCard onSubmit={handleTrackOrder}>
                <SearchInput
                  value={searchOrderId}
                  onChange={(event) => setSearchOrderId(event.target.value)}
                  placeholder="Enter order ID"
                  aria-label="Order number"
                />
                <SearchButton type="submit">{loadingOrder ? "Tracking..." : "Track Order"}</SearchButton>
              </SearchCard>

              {feedback.message ? <Message $tone={feedback.tone}>{feedback.message}</Message> : null}
            </HeroContent>

            <HeroVisual>
              <HeroImage src={heroImage} alt="Order preview" />
              <FloatingStatus>
                <div>Current status</div>
                <strong>{selectedOrder?.status || "No order selected"}</strong>
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
              {selectedOrder?.status === "CANCELLED"
                ? "This order is no longer moving because it was cancelled."
                : selectedOrder?.status === "CONFIRMED"
                  ? "The order has moved through confirmation and is shown at the delivered stage."
                  : "Pending orders are shown in the packing stage until confirmation happens."}
            </PanelText>

            <SummaryGrid>
              <SummaryItem>
                <SummaryLabel>Order ID</SummaryLabel>
                <SummaryValue>{selectedOrder?.orderId || "Not selected"}</SummaryValue>
              </SummaryItem>
              <SummaryItem>
                <SummaryLabel>Status</SummaryLabel>
                <SummaryValue>{selectedOrder?.status || "Waiting"}</SummaryValue>
              </SummaryItem>
              <SummaryItem>
                <SummaryLabel>Created at</SummaryLabel>
                <SummaryValue>{formatDate(selectedOrder?.createdAt)}</SummaryValue>
              </SummaryItem>
            </SummaryGrid>

            <Timeline>
              {timelineSteps.map((step) => (
                <Step key={step.title}>
                  <StepMarker $active={step.active} $cancelled={isCancelled} />
                  <div>
                    <StepTitle>{step.title}</StepTitle>
                    <StepMeta>{step.meta}</StepMeta>
                  </div>
                </Step>
              ))}
            </Timeline>

            {selectedOrder?.status === "PENDING" ? (
              <ActionButton type="button" $danger onClick={handleCancelOrder} disabled={canceling}>
                {canceling ? "Cancelling..." : "Cancel Order"}
              </ActionButton>
            ) : null}
          </Panel>

          <SideStack>
            <Panel>
              <PanelTitle>Order summary</PanelTitle>
              <PanelText>The summary below is loaded from the saved order details using the order ID.</PanelText>

              <ProductList>
                {selectedOrder?.items?.length ? (
                  selectedOrder.items.map((item, index) => (
                    <ProductCard key={`${item.productId}-${index}`}>
                      <ProductImage src={item.imageUrl || fallbackImage} alt={item.productId} />
                      <div>
                        <ProductName>{item.productId}</ProductName>
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
                  <Message $tone="info">Select an order to see its items and summary.</Message>
                )}
              </ProductList>

              <MiniList>
                <MiniItem>
                  <MiniKey>Shipping address</MiniKey>
                  <MiniValue>{formatShippingAddress(selectedOrder?.shippingAddress)}</MiniValue>
                </MiniItem>
                <MiniItem>
                  <MiniKey>Actual total bill</MiniKey>
                  <MiniValue>{formatCurrency(selectedOrder?.totalAmount)}</MiniValue>
                </MiniItem>
                <MiniItem>
                  <MiniKey>Last updated</MiniKey>
                  <MiniValue>{formatDate(selectedOrder?.updatedAt)}</MiniValue>
                </MiniItem>
              </MiniList>
            </Panel>

            <Panel>
              <PanelTitle>Your orders</PanelTitle>
              <PanelText>All orders placed by the current user are listed here with order ID and status.</PanelText>

              <OrderHistory>
                {loadingOrders ? (
                  <Message $tone="info">Loading your orders...</Message>
                ) : orders.length ? (
                  orders.map((order) => (
                    <OrderRow
                      key={order.orderId}
                      type="button"
                      $active={selectedOrder?.orderId === order.orderId}
                      onClick={() => {
                        setSelectedOrder(order);
                        setSearchOrderId(order.orderId);
                        setFeedback({ tone: "info", message: `Showing ${order.orderId}.` });
                      }}
                    >
                      <strong>{order.orderId} - {order.status}</strong>
                      <OrderRowMeta $active={selectedOrder?.orderId === order.orderId}>
                        Total: {formatCurrency(order.totalAmount)}
                        <br />
                        Created: {formatDate(order.createdAt)}
                      </OrderRowMeta>
                    </OrderRow>
                  ))
                ) : (
                  <Message $tone="info">No orders found for this user yet.</Message>
                )}
              </OrderHistory>
            </Panel>
          </SideStack>
        </Grid>
      </Container>
    </Shell>
  );
}
