import { Link } from "react-router-dom";
import styled from "styled-components";
import TopNav from "../components/navigation/TopNav";

const featuredProducts = [
  {
    name: "MacBook Pro 14",
    price: "$1,999",
    accent: "Linear",
    tag: "Mac",
    image:
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "AirPods Max",
    price: "$549",
    accent: "Radial",
    tag: "Audio",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Apple Watch",
    price: "$399",
    accent: "Glass",
    tag: "Watch",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "iPad Air",
    price: "$599",
    accent: "Shadow",
    tag: "iPad",
    image:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1200&q=80",
  },
];

const categories = [
  {
    title: "Laptops",
    text: "High-performance devices for study, work, and creation.",
    symbol: "⌘",
    glow: "linear-gradient(135deg, #111111 0%, #4b4b4b 100%)",
  },
  {
    title: "Phones",
    text: "Flagship designs with powerful cameras and crisp displays.",
    symbol: "◎",
    glow: "linear-gradient(135deg, #1e1e1e 0%, #7d7d7d 100%)",
  },
  {
    title: "Audio",
    text: "Immersive headphones, speakers, and wireless earbuds.",
    symbol: "◉",
    glow: "linear-gradient(135deg, #0f0f0f 0%, #5a5a5a 100%)",
  },
  {
    title: "Accessories",
    text: "Premium essentials that complete the full setup.",
    symbol: "✦",
    glow: "linear-gradient(135deg, #151515 0%, #8a8a8a 100%)",
  },
];

function CategoryIcon({ title }) {
  if (title === "Laptops") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="5" y="6" width="14" height="9" rx="1.8" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M3.5 17.5h17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (title === "Phones") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="7" y="4" width="10" height="16" rx="2.4" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="16.8" r="0.9" fill="currentColor" />
      </svg>
    );
  }

  if (title === "Audio") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M7 13v-2a5 5 0 0 1 10 0v2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <rect x="4" y="12" width="4" height="7" rx="1.6" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <rect x="16" y="12" width="4" height="7" rx="1.6" fill="none" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 4v16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M4 12h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="12" r="3.3" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

const Shell = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`;

const Container = styled.div`
  width: min(1120px, calc(100% - 40px));
  margin: 0 auto;
`;

const Hero = styled.section`
  background: ${({ theme }) => theme.colors.dark};
  color: white;
  padding: 22px 0 68px;
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 40px;
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const HeroText = styled.div`
  max-width: 560px;
`;

const Eyebrow = styled.p`
  margin: 0 0 16px;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.66);
`;

const HeroTitle = styled.h1`
  margin: 0;
  font-size: clamp(2.4rem, 5vw, 4.5rem);
  line-height: 0.98;
`;

const HeroDescription = styled.p`
  margin: 20px 0 0;
  color: rgba(255, 255, 255, 0.74);
  line-height: 1.8;
  font-size: 1rem;
`;

const HeroActions = styled.div`
  display: flex;
  gap: 14px;
  margin-top: 30px;
  flex-wrap: wrap;
`;

const Action = styled(Link)`
  text-decoration: none;
  padding: 14px 22px;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ $primary }) => ($primary ? "#ffffff" : "transparent")};
  color: ${({ $primary }) => ($primary ? "#111111" : "#ffffff")};
  border: 1px solid ${({ $primary }) => ($primary ? "#ffffff" : "rgba(255,255,255,0.25)")};
  font-weight: 600;
`;

const HeroVisual = styled.div`
  min-height: 420px;
  border-radius: 28px;
  background:
    radial-gradient(circle at 25% 20%, rgba(255,255,255,0.14), transparent 24%),
    radial-gradient(circle at 78% 28%, rgba(255,255,255,0.1), transparent 18%),
    linear-gradient(180deg, #2e2e2e 0%, #191919 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  position: relative;
  overflow: hidden;

  @media (max-width: 900px) {
    min-height: 320px;
  }
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: saturate(0.95) contrast(1.02);
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(17, 17, 17, 0.1) 0%, rgba(17, 17, 17, 0.32) 100%),
    radial-gradient(circle at top right, rgba(255, 255, 255, 0.16), transparent 28%);
`;

const HeroBadge = styled.div`
  position: absolute;
  left: 22px;
  bottom: 22px;
  padding: 14px 16px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(10px);
  color: ${({ theme }) => theme.colors.text};
  max-width: 250px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
`;

const HeroBadgeLabel = styled.div`
  font-size: 0.74rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const HeroBadgeText = styled.div`
  margin-top: 8px;
  line-height: 1.5;
  font-weight: 600;
`;

const Section = styled.section`
  padding: 26px 0 0;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const SectionTitle = styled.h2`
  margin: 0;
  font-size: 1.7rem;
`;

const SectionText = styled.p`
  margin: 8px 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 620px;
  line-height: 1.7;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
  }
`;

const CategoryCard = styled.article`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 22px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
`;

const CategoryBadge = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: ${({ $glow, theme }) => $glow || theme.colors.dark};
  margin-bottom: 18px;
  position: relative;
  display: grid;
  place-items: center;
  color: white;
  font-size: 1.1rem;
  font-weight: 700;
  box-shadow: 0 16px 28px rgba(17, 17, 17, 0.18);
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 1px;
    border-radius: 13px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.02));
  }

  &::after {
    content: "";
    position: absolute;
    width: 24px;
    height: 24px;
    right: -6px;
    top: -6px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.18);
  }
`;

const CategoryBadgeSymbol = styled.span`
  position: relative;
  z-index: 1;
  width: 22px;
  height: 22px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    height: 100%;
    display: block;
  }
`;

const CategoryTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
`;

const CategoryText = styled.p`
  margin: 10px 0 0;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
  }
`;

const ProductCard = styled.article`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 18px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
`;

const ProductVisual = styled.div`
  height: 180px;
  border-radius: 14px;
  background: ${({ $accent }) =>
    $accent === "Linear"
      ? "linear-gradient(135deg, #f3f3f3 0%, #dcdcdc 100%)"
      : $accent === "Radial"
        ? "radial-gradient(circle at top, #ffffff 0%, #dbdbdb 70%)"
        : $accent === "Glass"
          ? "linear-gradient(135deg, #fafafa 0%, #cfcfcf 100%)"
          : "linear-gradient(135deg, #ececec 0%, #c9c9c9 100%)"};
  overflow: hidden;
  margin-bottom: 16px;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const ProductTag = styled.span`
  display: inline-block;
  padding: 6px 10px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.surfaceMuted};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.78rem;
  margin-bottom: 12px;
`;

const ProductName = styled.h3`
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
`;

const Price = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
`;

const AddButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.dark};
  background: transparent;
  color: ${({ theme }) => theme.colors.dark};
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: 10px 14px;
  cursor: pointer;
  font-weight: 600;
`;

const Promo = styled.section`
  padding: 26px 0 72px;
`;

const PromoCard = styled.div`
  background: linear-gradient(135deg, #242424 0%, #111111 100%);
  color: white;
  border-radius: 28px;
  padding: 34px;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 20px;
  align-items: center;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const PromoTitle = styled.h2`
  margin: 0;
  font-size: 2rem;
`;

const PromoText = styled.p`
  margin: 12px 0 0;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.72);
  max-width: 620px;
`;

const Footer = styled.footer`
  background: ${({ theme }) => theme.colors.dark};
  color: rgba(255, 255, 255, 0.72);
  padding: 24px 0 36px;
`;

const FooterRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
  font-size: 0.95rem;
`;

export default function HomePage() {
  return (
    <Shell>
      <TopNav />

      <Hero id="featured">
        <Container>
          <HeroGrid>
            <HeroText>
              <Eyebrow>Modern electronics, clean experience</Eyebrow>
              <HeroTitle>
                Everything you need in one complete online shopping experience.
              </HeroTitle>
              <HeroDescription>
                Explore a wide range of electronics, especially Apple
                products—from iPhones and iPads to MacBooks and AirPods—on
                iNova’s seamless e‑commerce platform.
              </HeroDescription>

              <HeroActions>
                <Action to="/signup" $primary>
                  Start Shopping
                </Action>
                <Action to="/login">Track Your Orders</Action>
              </HeroActions>
            </HeroText>

            <HeroVisual>
              <HeroImage
                src="https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=1400&q=80"
                alt="Apple devices on a clean desk setup"
              />
              <HeroOverlay />
              <HeroBadge>
                <HeroBadgeLabel>Apple Collection</HeroBadgeLabel>
                <HeroBadgeText>
                  Mac, iPhone, iPad, Watch, and audio essentials in one clean
                  experience.
                </HeroBadgeText>
              </HeroBadge>
            </HeroVisual>
          </HeroGrid>
        </Container>
      </Hero>

      <Section id="categories">
        <Container>
          <SectionHeader>
            <div>
              <SectionTitle>Shop by category</SectionTitle>
              <SectionText>
                Explore our top product categories including phones, tablets,
                headphones, and more designed for easy browsing and discovery.
              </SectionText>
            </div>
          </SectionHeader>

          <CategoryGrid>
            {categories.map((category) => (
              <CategoryCard key={category.title}>
                <CategoryBadge $glow={category.glow}>
                  <CategoryBadgeSymbol>
                    <CategoryIcon title={category.title} />
                  </CategoryBadgeSymbol>
                </CategoryBadge>
                <CategoryTitle>{category.title}</CategoryTitle>
                <CategoryText>{category.text}</CategoryText>
              </CategoryCard>
            ))}
          </CategoryGrid>
        </Container>
      </Section>

      <Section id="new-arrivals">
        <Container>
          <SectionHeader>
            <div>
              <SectionTitle>New arrivals</SectionTitle>
              <SectionText>
                Discover the latest electronics, including the newest Apple
                devices and accessories, all curated for a seamless shopping
                experience.
              </SectionText>
            </div>
          </SectionHeader>

          <ProductGrid>
            {featuredProducts.map((product) => (
              <ProductCard key={product.name}>
                <ProductVisual $accent={product.accent}>
                  <ProductImage src={product.image} alt={product.name} />
                </ProductVisual>
                <ProductTag>{product.tag}</ProductTag>
                <ProductName>{product.name}</ProductName>
                <PriceRow>
                  <Price>{product.price}</Price>
                  <AddButton type="button">Add to cart</AddButton>
                </PriceRow>
              </ProductCard>
            ))}
          </ProductGrid>
        </Container>
      </Section>

      <Promo>
        <Container>
          <PromoCard>
            <div>
              <PromoTitle>
                Sign up and save your next order in seconds.
              </PromoTitle>
              <PromoText>
                 Create your iNova account to save your details, track orders, 
                 and get exclusive access to the latest Apple products and deals.
              </PromoText>
            </div>

            <Action to="/signup" $primary>
              Create Account
            </Action>
          </PromoCard>
        </Container>
      </Promo>

      <Footer>
        <Container>
          <FooterRow>
            <div>iNova E Commerce Platform</div>
            <div>
               © {new Date().getFullYear()} iNova. All rights reserved.
            </div>
          </FooterRow>
        </Container>
      </Footer>
    </Shell>
  );
}
