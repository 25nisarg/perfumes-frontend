import { createContext, useContext, useEffect, useReducer } from "react";

const CartContext = createContext();

const initial = {
  items: JSON.parse(localStorage.getItem("cart") || "[]"),
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const found = state.items.find((i) => i.product_id === action.payload.product_id);
      const items = found
        ? state.items.map((i) =>
            i.product_id === action.payload.product_id
              ? { ...i, quantity: i.quantity + action.payload.quantity }
              : i
          )
        : [...state.items, action.payload];
      return { ...state, items };
    }
    case "UPDATE":
      return {
        ...state,
        items: state.items.map((i) =>
          i.product_id === action.payload.id
            ? { ...i, quantity: action.payload.quantity }
            : i
        ),
      };
    case "REMOVE":
      return { ...state, items: state.items.filter((i) => i.product_id !== action.payload) };
    case "CLEAR":
      return { ...state, items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initial);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.items));
  }, [state.items]);

  return <CartContext.Provider value={{ ...state, dispatch }}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
