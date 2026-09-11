import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "vellum-seal-cart";
const CURRENCY_KEY = "vellum-seal-currency";

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function loadStoredCurrency() {
  try {
    return localStorage.getItem(CURRENCY_KEY);
  } catch {
    return null;
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart);
  const [currency, setCurrencyState] = useState(() => loadStoredCurrency() || "usd");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  // If the person hasn't manually picked a currency before, try to guess
  // it once from their location. Falls back to USD silently on any error.
  useEffect(() => {
    if (loadStoredCurrency()) return;
    let cancelled = false;
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && data?.country_code === "CA") {
          setCurrencyState("cad");
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(CURRENCY_KEY, currency);
  }, [currency]);

  const setCurrency = (next) => {
    if (next === currency) return;
    if (items.length > 0) {
      const confirmed = window.confirm(
        "Switching currency will clear your current cart, since an order can't mix currencies. Continue?"
      );
      if (!confirmed) return;
      setItems([]);
    }
    setCurrencyState(next);
  };

  const addItem = (item) => {
    setItems((prev) => [...prev, { ...item, cartId: crypto.randomUUID() }]);
  };

  const removeItem = (cartId) => {
    setItems((prev) => prev.filter((i) => i.cartId !== cartId));
  };

  const updateQuantity = (cartId, newQuantity) => {
    const clamped = Math.max(1, Math.min(10, newQuantity));
    setItems((prev) =>
      prev.map((i) => (i.cartId === cartId ? { ...i, quantity: clamped } : i))
    );
  };

  const clearCart = () => setItems([]);

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0),
    [items]
  );

  const count = useMemo(() => items.reduce((n, i) => n + i.quantity, 0), [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        subtotal,
        count,
        currency,
        setCurrency,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
