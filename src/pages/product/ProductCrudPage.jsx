import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import TopNav from "../../components/navigation/TopNav";

const API_BASE_URL = import.meta.env.VITE_PRODUCTS_API_URL || "/api/products/";
const REQUEST_TIMEOUT_MS = 10000;

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80";

const emptyForm = {
  name: "",
  category: "Phones",
  price: "",
  stock: "",
  image: "",
  status: "active",
  description: "",
};

const categoryOptions = ["Phones", "Laptops", "Audio", "Tablets", "Accessories"];
const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "out_of_stock", label: "Out of Stock" },
];

const statusLabelMap = {
  active: "Active",
  inactive: "Inactive",
  out_of_stock: "Out of Stock",
};

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(Number(value || 0));

const normalizeProduct = (product) => ({
  id: product._id,
  name: product.productName || "",
  category: product.category || "Accessories",
  price: String(product.price ?? ""),
  stock: String(product.stock ?? ""),
  image: product.imageUrl || FALLBACK_IMAGE,
  status: product.status || "inactive",
  description: product.description || "",
});

const Shell = styled.div`
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(255, 255, 255, 0.92), transparent 28%),
    linear-gradient(180deg, #f5f5f5 0%, #ececeb 100%);
`;

const Container = styled.div`
  width: min(1180px, calc(100% - 40px));
  margin: 0 auto;
`;

const Hero = styled.section`
  padding: 32px 0 20px;
`;

const HeroCard = styled.div`
  background: linear-gradient(135deg, #171717 0%, #0c0c0c 100%);
  color: white;
  border-radius: 30px;
  padding: 34px;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 24px;
  overflow: hidden;

  @media (max-width: 940px) {
    grid-template-columns: 1fr;
  }
`;

const HeroText = styled.div`
  max-width: 620px;
`;

const Eyebrow = styled.p`
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.62);
`;

const Title = styled.h1`
  margin: 16px 0 0;
  font-size: clamp(2.1rem, 5vw, 4rem);
  line-height: 0.98;
`;

const Description = styled.p`
  margin: 18px 0 0;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.74);
`;

const HeroStats = styled.div`
  margin-top: 28px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  padding: 18px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.08);
`;

const StatValue = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
`;

const StatLabel = styled.div`
  margin-top: 8px;
  color: rgba(255, 255, 255, 0.64);
`;

const Spotlight = styled.div`
  background:
    radial-gradient(circle at top right, rgba(255, 255, 255, 0.18), transparent 28%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02));
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: 24px;
  display: grid;
  gap: 16px;
  align-content: start;
`;

const SpotlightLabel = styled.div`
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: rgba(255, 255, 255, 0.62);
`;

const SpotlightValue = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
`;

const SpotlightText = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.75;
`;

const Layout = styled.section`
  padding: 6px 0 72px;
  display: grid;
  grid-template-columns: minmax(320px, 420px) minmax(0, 1fr);
  gap: 22px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const Panel = styled.section`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 26px;
  padding: 24px;
  box-shadow: 0 18px 42px rgba(0, 0, 0, 0.07);
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

const Banner = styled.div`
  margin-top: 16px;
  border-radius: 18px;
  padding: 14px 16px;
  background: ${({ $error }) => ($error ? "#fff1f1" : "#eef8f1")};
  color: ${({ $error }) => ($error ? "#b42318" : "#166534")};
  border: 1px solid ${({ $error }) => ($error ? "rgba(180, 35, 24, 0.16)" : "rgba(22, 101, 52, 0.16)")};
  line-height: 1.6;
`;

const Form = styled.form`
  margin-top: 24px;
  display: grid;
  gap: 16px;
`;

const FieldGroup = styled.div`
  display: grid;
  gap: 8px;
`;

const SplitFields = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const Label = styled.label`
  font-size: 0.92rem;
  font-weight: 600;
`;

const sharedFieldStyles = `
  width: 100%;
  border: 1px solid rgba(17, 17, 17, 0.12);
  border-radius: 16px;
  background: #fafafa;
  padding: 14px 16px;
  color: ${({ theme }) => theme.colors.text};
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.dark};
    box-shadow: 0 0 0 4px rgba(17, 17, 17, 0.08);
  }
`;

const Input = styled.input`
  ${sharedFieldStyles}
`;

const Select = styled.select`
  ${sharedFieldStyles}
`;

const Textarea = styled.textarea`
  ${sharedFieldStyles}
  min-height: 120px;
  resize: vertical;
`;

const FormActions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  padding-top: 6px;
`;

const PrimaryButton = styled.button`
  border: 0;
  border-radius: 999px;
  background: #111111;
  color: white;
  padding: 13px 20px;
  cursor: pointer;
  font-weight: 700;
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
`;

const SecondaryButton = styled.button`
  border: 1px solid rgba(17, 17, 17, 0.14);
  border-radius: 999px;
  background: white;
  color: ${({ theme }) => theme.colors.text};
  padding: 13px 20px;
  cursor: pointer;
  font-weight: 600;
`;

const Toolbar = styled.div`
  margin-top: 24px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 180px;
  gap: 14px;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const SearchInput = styled(Input)`
  background: ${({ theme }) => theme.colors.surfaceMuted};
`;

const ProductGrid = styled.div`
  margin-top: 20px;
  display: grid;
  gap: 16px;
`;

const ProductCard = styled.article`
  background: ${({ theme }) => theme.colors.surfaceMuted};
  border-radius: 22px;
  overflow: hidden;
  display: grid;
  grid-template-columns: 220px 1fr;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  min-height: 220px;
  object-fit: cover;
  display: block;
`;

const ProductBody = styled.div`
  padding: 20px;
  display: grid;
  gap: 16px;
`;

const ProductTop = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: start;
  flex-wrap: wrap;
`;

const ProductName = styled.h3`
  margin: 0;
  font-size: 1.15rem;
`;

const ProductMeta = styled.div`
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.7;
`;

const StatusPill = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  border-radius: 999px;
  background: ${({ $status }) =>
    $status === "active"
      ? "rgba(31, 122, 66, 0.12)"
      : $status === "out_of_stock"
        ? "rgba(181, 122, 0, 0.12)"
        : "rgba(17, 17, 17, 0.08)"};
  color: ${({ $status, theme }) =>
    $status === "active"
      ? theme.colors.success
      : $status === "out_of_stock"
        ? "#9a6500"
        : theme.colors.textMuted};
  font-size: 0.84rem;
  font-weight: 700;
`;

const Metrics = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
  }
`;

const MetricCard = styled.div`
  background: white;
  border-radius: 18px;
  padding: 14px 16px;
`;

const MetricLabel = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.86rem;
`;

const MetricValue = styled.div`
  margin-top: 8px;
  font-weight: 700;
  font-size: 1rem;
  word-break: break-word;
`;

const CardActions = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  border: 1px solid rgba(17, 17, 17, 0.12);
  background: ${({ $danger }) => ($danger ? "#fff2f2" : "white")};
  color: ${({ $danger, theme }) => ($danger ? "#b42318" : theme.colors.text)};
  border-radius: 999px;
  padding: 10px 14px;
  cursor: pointer;
  font-weight: 600;
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
`;

const EmptyState = styled.div`
  margin-top: 20px;
  background: ${({ theme }) => theme.colors.surfaceMuted};
  border-radius: 22px;
  padding: 24px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.75;
`;

const buildPayload = (values) => ({
  productName: values.name.trim(),
  category: values.category,
  status: values.status,
  price: Number(values.price),
  stock: Number(values.stock),
  imageUrl: values.image.trim() || FALLBACK_IMAGE,
  description: values.description.trim(),
});

async function readErrorMessage(response) {
  try {
    const data = await response.json();
    return data.error || data.message || "Something went wrong.";
  } catch {
    return "Something went wrong.";
  }
}

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } finally {
    window.clearTimeout(timeoutId);
  }
}

export default function ProductCrudPage() {
  const [products, setProducts] = useState([]);
  const [formValues, setFormValues] = useState(emptyForm);
  const [editingId, setEditingId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  const loadProducts = async () => {
    setIsLoading(true);

    try {
      const response = await fetchWithTimeout(API_BASE_URL);

      if (!response.ok) {
        throw new Error(await readErrorMessage(response));
      }

      const data = await response.json();
      setProducts(Array.isArray(data) ? data.map(normalizeProduct) : []);
    } catch (error) {
      const message =
        error.name === "AbortError"
          ? `The API did not respond within ${REQUEST_TIMEOUT_MS / 1000} seconds.`
          : error.message || "Unable to load products from the API.";

      setFeedback({
        type: "error",
        message: `${message} Endpoint: ${API_BASE_URL}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const searchValue =
        `${product.name} ${product.category} ${product.description}`.toLowerCase();
      const matchesSearch = searchValue.includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" ? true : product.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [products, searchTerm, statusFilter]);

  const dashboard = useMemo(() => {
    const totalProducts = products.length;
    const activeProducts = products.filter((product) => product.status === "active").length;
    const inventoryUnits = products.reduce((sum, product) => sum + Number(product.stock || 0), 0);
    const inventoryValue = products.reduce(
      (sum, product) => sum + Number(product.stock || 0) * Number(product.price || 0),
      0,
    );

    return { totalProducts, activeProducts, inventoryUnits, inventoryValue };
  }, [products]);

  const resetForm = () => {
    setFormValues(emptyForm);
    setEditingId("");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFeedback({ type: "", message: "" });

    const payload = buildPayload(formValues);
    const requestUrl = editingId ? `${API_BASE_URL}/${editingId}` : API_BASE_URL;
    const requestMethod = editingId ? "PUT" : "POST";

    try {
      const response = await fetchWithTimeout(requestUrl, {
        method: requestMethod,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(await readErrorMessage(response));
      }

      const savedProduct = normalizeProduct(await response.json());

      setProducts((current) =>
        editingId
          ? current.map((product) => (product.id === editingId ? savedProduct : product))
          : [savedProduct, ...current],
      );

      setFeedback({
        type: "success",
        message: editingId ? "Product updated successfully." : "Product created successfully.",
      });
      resetForm();
    } catch (error) {
      const message =
        error.name === "AbortError"
          ? `The API did not respond within ${REQUEST_TIMEOUT_MS / 1000} seconds.`
          : error.message || "Unable to save the product.";

      setFeedback({
        type: "error",
        message: `${message} Endpoint: ${requestUrl}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setFeedback({ type: "", message: "" });
    setFormValues({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      image: product.image,
      status: product.status,
      description: product.description,
    });
  };

  const handleDelete = async (id) => {
    setFeedback({ type: "", message: "" });

    try {
      const requestUrl = `${API_BASE_URL}${id}`;
      const response = await fetchWithTimeout(requestUrl, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(await readErrorMessage(response));
      }

      setProducts((current) => current.filter((product) => product.id !== id));
      setFeedback({ type: "success", message: "Product deleted successfully." });

      if (editingId === id) {
        resetForm();
      }
    } catch (error) {
      const message =
        error.name === "AbortError"
          ? `The API did not respond within ${REQUEST_TIMEOUT_MS / 1000} seconds.`
          : error.message || "Unable to delete the product.";

      setFeedback({
        type: "error",
        message: `${message} Endpoint: ${API_BASE_URL}${id}`,
      });
    }
  };

  const toggleStatus = async (product) => {
    const nextStatus = product.status === "active" ? "inactive" : "active";
    setFeedback({ type: "", message: "" });

    try {
      const requestUrl = `${API_BASE_URL}${product.id}`;
      const response = await fetchWithTimeout(requestUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...buildPayload(product),
          status: nextStatus,
        }),
      });

      if (!response.ok) {
        throw new Error(await readErrorMessage(response));
      }

      const updatedProduct = normalizeProduct(await response.json());
      setProducts((current) =>
        current.map((item) => (item.id === product.id ? updatedProduct : item)),
      );

      if (editingId === product.id) {
        setFormValues((current) => ({ ...current, status: updatedProduct.status }));
      }
    } catch (error) {
      const message =
        error.name === "AbortError"
          ? `The API did not respond within ${REQUEST_TIMEOUT_MS / 1000} seconds.`
          : error.message || "Unable to update the product status.";

      setFeedback({
        type: "error",
        message: `${message} Endpoint: ${API_BASE_URL}${product.id}`,
      });
    }
  };

  return (
    <Shell>
      <TopNav />

      <Hero>
        <Container>
          <HeroCard>
            <HeroText>
              <Eyebrow>Product CRUD workspace</Eyebrow>
              <Title>Manage your catalog with one clean admin-style UI.</Title>
              <Description>
                Create, update, search, and remove products from a single screen. This view is now
                connected to your product API, so data stays synced across refreshes and devices.
              </Description>

              <HeroStats>
                <StatCard>
                  <StatValue>{dashboard.totalProducts}</StatValue>
                  <StatLabel>Total products</StatLabel>
                </StatCard>
                <StatCard>
                  <StatValue>{dashboard.activeProducts}</StatValue>
                  <StatLabel>Currently active</StatLabel>
                </StatCard>
                <StatCard>
                  <StatValue>{dashboard.inventoryUnits}</StatValue>
                  <StatLabel>Units in stock</StatLabel>
                </StatCard>
              </HeroStats>
            </HeroText>

            <Spotlight>
              <div>
                <SpotlightLabel>Inventory value</SpotlightLabel>
                <SpotlightValue>{formatCurrency(dashboard.inventoryValue)}</SpotlightValue>
              </div>
              <SpotlightText>
                Use the form to add new products, choose a status, and keep each listing ready for
                storefront publishing or internal review.
              </SpotlightText>
              <SpotlightText>
                Editing an item fills the form automatically, while delete removes it from the API
                immediately.
              </SpotlightText>
            </Spotlight>
          </HeroCard>
        </Container>
      </Hero>

      <Container>
        <Layout>
          <Panel>
            <PanelTitle>{editingId ? "Update product" : "Create product"}</PanelTitle>
            <PanelText>
              Fill in the product information below. The same form handles both product creation
              and updates.
            </PanelText>

            {feedback.message ? <Banner $error={feedback.type === "error"}>{feedback.message}</Banner> : null}

            <Form onSubmit={handleSubmit}>
              <FieldGroup>
                <Label htmlFor="name">Product name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formValues.name}
                  onChange={handleChange}
                  placeholder="MacBook Pro 16"
                  required
                />
              </FieldGroup>

              <SplitFields>
                <FieldGroup>
                  <Label htmlFor="category">Category</Label>
                  <Select id="category" name="category" value={formValues.category} onChange={handleChange}>
                    {categoryOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Select>
                </FieldGroup>

                <FieldGroup>
                  <Label htmlFor="status">Status</Label>
                  <Select id="status" name="status" value={formValues.status} onChange={handleChange}>
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                </FieldGroup>
              </SplitFields>

              <SplitFields>
                <FieldGroup>
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formValues.price}
                    onChange={handleChange}
                    placeholder="1299"
                    required
                  />
                </FieldGroup>

                <FieldGroup>
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    id="stock"
                    name="stock"
                    type="number"
                    min="0"
                    value={formValues.stock}
                    onChange={handleChange}
                    placeholder="10"
                    required
                  />
                </FieldGroup>
              </SplitFields>

              <FieldGroup>
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  name="image"
                  value={formValues.image}
                  onChange={handleChange}
                  placeholder="https://example.com/product-image.jpg"
                />
              </FieldGroup>

              <FieldGroup>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formValues.description}
                  onChange={handleChange}
                  placeholder="Short product summary for customers and admins."
                  required
                />
              </FieldGroup>

              <FormActions>
                <PrimaryButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : editingId ? "Save Changes" : "Create Product"}
                </PrimaryButton>
                <SecondaryButton type="button" onClick={resetForm}>
                  Clear Form
                </SecondaryButton>
              </FormActions>
            </Form>
          </Panel>

          <Panel>
            <PanelTitle>Product inventory</PanelTitle>
            <PanelText>
              Search by name, category, or description, then filter by status to review the exact
              slice of your catalog you need.
            </PanelText>

            <Toolbar>
              <SearchInput
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search products"
              />
              <Select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
                <option value="all">All statuses</option>
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </Toolbar>

            {isLoading ? (
              <EmptyState>Loading products from the API...</EmptyState>
            ) : filteredProducts.length > 0 ? (
              <ProductGrid>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id}>
                    <ProductImage src={product.image} alt={product.name} />

                    <ProductBody>
                      <ProductTop>
                        <div>
                          <ProductName>{product.name}</ProductName>
                          <ProductMeta>
                            {product.category}
                            <br />
                            {product.description}
                          </ProductMeta>
                        </div>

                        <StatusPill $status={product.status}>
                          {statusLabelMap[product.status] || product.status}
                        </StatusPill>
                      </ProductTop>

                      <Metrics>
                        <MetricCard>
                          <MetricLabel>Price</MetricLabel>
                          <MetricValue>{formatCurrency(product.price)}</MetricValue>
                        </MetricCard>
                        <MetricCard>
                          <MetricLabel>Stock</MetricLabel>
                          <MetricValue>{product.stock} units</MetricValue>
                        </MetricCard>
                        <MetricCard>
                          <MetricLabel>Product ID</MetricLabel>
                          <MetricValue>{product.id}</MetricValue>
                        </MetricCard>
                      </Metrics>

                      <CardActions>
                        <ActionButton type="button" onClick={() => handleEdit(product)} disabled={isSubmitting}>
                          Edit
                        </ActionButton>
                        <ActionButton
                          type="button"
                          onClick={() => toggleStatus(product)}
                          disabled={isSubmitting}
                        >
                          {product.status === "active" ? "Deactivate" : "Activate"}
                        </ActionButton>
                        <ActionButton
                          type="button"
                          $danger
                          onClick={() => handleDelete(product.id)}
                          disabled={isSubmitting}
                        >
                          Delete
                        </ActionButton>
                      </CardActions>
                    </ProductBody>
                  </ProductCard>
                ))}
              </ProductGrid>
            ) : (
              <EmptyState>
                No products matched your current search or filter. Try another keyword, switch the
                status filter, or create a new product from the form.
              </EmptyState>
            )}
          </Panel>
        </Layout>
      </Container>
    </Shell>
  );
}
