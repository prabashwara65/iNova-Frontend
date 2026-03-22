import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/products": {
        target:
          process.env.VITE_DEV_PRODUCTS_API_URL ||
          "http://inova-alb-1159271538.eu-north-1.elb.amazonaws.com",
        changeOrigin: true,
      },
    },
  },
});
