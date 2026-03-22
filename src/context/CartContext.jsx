import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CART_STORAGE_KEY = "inova-cart-items";

const defaultCartItems = [
  {
    id: "macbook-pro-14",
    name: "MacBook Pro 14",
    finish: "Space Black",
    specs: "M3 Pro | 18GB | 512GB SSD",
    price: 1999,
    quantity: 1,
    selected: true,
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
    selected: true,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80",
  },
];

const CartContext = createContext(null);

const loadCartItems = () => {
  if (typeof window === "undefined") {
    return defaultCartItems;
  }

  try {
    const saved = window.localStorage.getItem(CART_STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultCartItems;
  } catch {
    return defaultCartItems;
  }
};

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCartItems);

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (product) => {
    setItems((current) => {
      const existingItem = current.find((item) => item.id === product.id);

      if (existingItem) {
        return current.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                selected: true,
              }
            : item
        );
      }

      return [
        ...current,
        {
          ...product,
          quantity: product.quantity || 1,
          selected: true,
        },
      ];
    });
  };

  const removeItem = (id) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  const toggleItemSelection = (id) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const changeQuantity = (id, nextQuantity) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, nextQuantity) } : item
      )
    );
  };

  const clearSelectedItems = () => {
    setItems((current) => current.filter((item) => !item.selected));
  };

  const cartCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      setItems,
      addItem,
      removeItem,
      toggleItemSelection,
      changeQuantity,
      clearSelectedItems,
      cartCount,
    }),
    [items, cartCount]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
