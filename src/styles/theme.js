import { createGlobalStyle } from "styled-components";

export const theme = {
  colors: {
    background: "#eeeeee",
    surface: "#ffffff",
    surfaceMuted: "#f6f6f6",
    dark: "#222222",
    darkSoft: "#2b2b2b",
    text: "#141414",
    textMuted: "#6d6d6d",
    border: "#d8d8d8",
    accent: "#111111",
    success: "#1f7a42",
  },
  shadow: "0 28px 70px rgba(0, 0, 0, 0.14)",
  radius: {
    lg: "28px",
    md: "16px",
    sm: "10px",
  },
};

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

  :root {
    color-scheme: light;
  }

  * {
    box-sizing: border-box;
  }

  html, body, #root {
    min-height: 100%;
  }

  body {
    margin: 0;
    background:
      radial-gradient(circle at top left, rgba(255, 255, 255, 0.9), transparent 32%),
      linear-gradient(180deg, #f5f5f5 0%, #ececec 100%);
    color: ${({ theme }) => theme.colors.text};
    font-family: "Roboto", sans-serif;
  }

  button,
  input {
    font: inherit;
  }

  a {
    color: inherit;
  }
`;
