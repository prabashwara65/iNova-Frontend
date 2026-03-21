import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import TopNav from "../../components/navigation/TopNav";

const STORAGE_KEY = "inova-products";

const starterProducts = [
  {
    id: "iphone-15-pro-max",
    name: "iPhone 15 Pro Max",
    category: "Phones",
    price: "1299",
    stock: "18",
    image:
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1200&q=80",
    status: "Active",
    description: "Titanium flagship with advanced camera system and all-day battery life.",
  },
  {
    id: "macbook-air-m3",
    name: "MacBook Air M3",
    category: "Laptops",
    price: "1499",
    stock: "9",
    image:
      "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=1200&q=80",
    status: "Active",
    description: "Thin and light notebook designed for work, study, and creative tasks.",
  },
  {
    id: "airpods-pro-2",
    name: "AirPods Pro 2",
    category: "Audio",
    price: "249",
    stock: "24",
    image:
      "https://images.unsplash.com/photo-1606741965429-0cf8f5d4f6c0?auto=format&fit=crop&w=1200&q=80",
    status: "Draft",
    description: "Wireless earbuds with immersive sound and adaptive noise cancellation.",
  },
];

const emptyForm = {
  name: "",
  category: "Phones",
  price: "",
  stock: "",
  image: "",
  status: "Active",
  description: "",
};

const categoryOptions = ["Phones", "Laptops", "Audio", "Tablets", "Accessories"];
const statusOptions = ["Active", "Draft", "Archived"];

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(Number(value || 0));

const createProductId = (name) =>
  `${name || "product"}-${Date.now()}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const loadProducts = () => {
  if (typeof window === "undefined") {
    return starterProducts;
  }

  const savedProducts = window.localStorage.getItem(STORAGE_KEY);

  if (!savedProducts) {
    return starterProducts;
  }

  try {
    const parsedProducts = JSON.parse(savedProducts);
    return Array.isArray(parsedProducts) && parsedProducts.length > 0 ? parsedProducts : starterProducts;
  } catch {
    return starterProducts;
  }
};

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
    $status === "Active" ? "rgba(31, 122, 66, 0.12)" : $status === "Archived" ? "rgba(17, 17, 17, 0.08)" : "rgba(181, 122, 0, 0.12)"};
  color: ${({ $status, theme }) =>
    $status === "Active" ? theme.colors.success : $status === "Archived" ? theme.colors.textMuted : "#9a6500"};
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
`;

const EmptyState = styled.div`
  margin-top: 20px;
  background: ${({ theme }) => theme.colors.surfaceMuted};
  border-radius: 22px;
  padding: 24px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.75;
`;

export default function ProductCrudPage() {
  const [products, setProducts] = useState(loadProducts);
  const [formValues, setFormValues] = useState(emptyForm);
  const [editingId, setEditingId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const searchValue = `${product.name} ${product.category} ${product.description}`.toLowerCase();
      const matchesSearch = searchValue.includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "All" ? true : product.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [products, searchTerm, statusFilter]);

  const dashboard = useMemo(() => {
    const totalProducts = products.length;
    const activeProducts = products.filter((product) => product.status === "Active").length;
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

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextProduct = {
      ...formValues,
      id: editingId || createProductId(formValues.name),
      price: String(formValues.price).trim(),
      stock: String(formValues.stock).trim(),
      image:
        formValues.image.trim() ||
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80",
      description: formValues.description.trim(),
      name: formValues.name.trim(),
    };

    if (editingId) {
      setProducts((current) => current.map((product) => (product.id === editingId ? nextProduct : product)));
    } else {
      setProducts((current) => [nextProduct, ...current]);
    }

    resetForm();
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
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

  const handleDelete = (id) => {
    setProducts((current) => current.filter((product) => product.id !== id));

    if (editingId === id) {
      resetForm();
    }
  };

  const toggleStatus = (id) => {
    setProducts((current) =>
      current.map((product) =>
        product.id === id
          ? {
              ...product,
              status: product.status === "Active" ? "Archived" : "Active",
            }
          : product,
      ),
    );
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
                Create, update, search, and remove products from a single screen. This frontend
                view keeps products in local storage, so your work stays in place after refresh.
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
                Editing an item fills the form automatically, while delete removes it from the
                catalog immediately.
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
                      <option key={option} value={option}>
                        {option}
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
                <PrimaryButton type="submit">{editingId ? "Save Changes" : "Create Product"}</PrimaryButton>
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
                <option value="All">All statuses</option>
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </Toolbar>

            {filteredProducts.length > 0 ? (
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

                        <StatusPill $status={product.status}>{product.status}</StatusPill>
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
                        <ActionButton type="button" onClick={() => handleEdit(product)}>
                          Edit
                        </ActionButton>
                        <ActionButton type="button" onClick={() => toggleStatus(product.id)}>
                          {product.status === "Active" ? "Archive" : "Activate"}
                        </ActionButton>
                        <ActionButton type="button" $danger onClick={() => handleDelete(product.id)}>
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
