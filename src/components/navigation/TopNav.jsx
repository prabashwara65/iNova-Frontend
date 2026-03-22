import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 6h2l1.4 7h9.6l2-5.5H8.1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="18" r="1.4" fill="currentColor" />
      <circle cx="17" cy="18" r="1.4" fill="currentColor" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M5 19.2a7.2 7.2 0 0 1 14 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

const Header = styled.header`
  background: ${({ theme }) => theme.colors.dark};
  color: white;
  position: sticky;
  top: 0;
  z-index: 20;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.18);
`;

const InfoBar = styled.div`
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

const Container = styled.div`
  width: min(1120px, calc(100% - 40px));
  margin: 0 auto;
`;

const InfoRow = styled.div`
  min-height: 42px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  font-size: 0.83rem;
  color: rgba(255, 255, 255, 0.7);
`;

const NavRow = styled.div`
  padding: 18px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
`;

const Brand = styled(Link)`
  text-decoration: none;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: white;
`;

const NavGroup = styled.nav`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: ${({ $active }) => ($active ? "#ffffff" : "rgba(255, 255, 255, 0.76)")};
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  font-size: 0.95rem;
`;

const CartButton = styled(Link)`
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  color: white;
  font-weight: 600;
  position: relative;
`;

const CartCount = styled.span`
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: white;
  color: #111111;
  font-size: 0.82rem;
  position: absolute;
  top: -6px;
  right: -4px;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.24);
`;

const CartIconWrap = styled.span`
  width: 20px;
  height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    height: 100%;
    display: block;
  }
`;

const AuthButton = styled(Link)`
  text-decoration: none;
  padding: 10px 16px;
  border-radius: 999px;
  background: ${({ $filled }) => ($filled ? "#ffffff" : "transparent")};
  color: ${({ $filled }) => ($filled ? "#111111" : "#ffffff")};
  border: 1px solid ${({ $filled }) => ($filled ? "#ffffff" : "rgba(255,255,255,0.2)")};
  font-weight: 600;
`;

const LogoutButton = styled.button`
  text-decoration: none;
  padding: 10px 16px;
  border-radius: 999px;
  background: #ffffff;
  color: #111111;
  border: 1px solid #ffffff;
  font-weight: 600;
  cursor: pointer;
`;

const ProfileButton = styled(Link)`
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const ProfileIconWrap = styled.span`
  width: 20px;
  height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    height: 100%;
    display: block;
  }
`;

export default function TopNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem("inova_token")));

  useEffect(() => {
    setIsLoggedIn(Boolean(localStorage.getItem("inova_token")));
  }, [location.pathname]);

  const handleLogout = async () => {
    const token = localStorage.getItem("inova_token");

    try {
      await fetch("/api/auth/logout", {
        method: "GET",
        credentials: "include",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
    } catch {
      // Ignore network logout failures and still clear client auth state.
    }

    localStorage.removeItem("inova_token");
    localStorage.removeItem("inova_user");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <Header>
      <InfoBar>
        <Container>
          <InfoRow>
            <span>Free express shipping for premium Apple orders</span>
            <span>Support: +94 11 234 5678 | Mon - Sat, 8:00 AM - 8:00 PM</span>
          </InfoRow>
        </Container>
      </InfoBar>

      <Container>
        <NavRow>
          <Brand to="/">iNova</Brand>

          <NavGroup>
            <NavLink to="/" $active={location.pathname === "/"}>
              Home
            </NavLink>
            <NavLink to="/track-order" $active={location.pathname === "/track-order"}>
              Track Order
            </NavLink>
            <NavLink to="/" $active={false}>
              Collections
            </NavLink>
            <NavLink to="/" $active={false}>
              Support
            </NavLink>
          </NavGroup>

          <NavGroup>
            <CartButton to="/cart" aria-label="Open cart">
              <CartIconWrap>
                <CartIcon />
              </CartIconWrap>
              <CartCount>2</CartCount>
            </CartButton>
            {isLoggedIn ? (
              <>
                <ProfileButton to="/profile" aria-label="Open profile">
                  <ProfileIconWrap>
                    <ProfileIcon />
                  </ProfileIconWrap>
                </ProfileButton>
                <LogoutButton type="button" onClick={handleLogout}>
                  Logout
                </LogoutButton>
              </>
            ) : (
              <>
                <AuthButton to="/login">Login</AuthButton>
                <AuthButton to="/signup" $filled>
                  Sign Up
                </AuthButton>
              </>
            )}
          </NavGroup>
        </NavRow>
      </Container>
    </Header>
  );
}
