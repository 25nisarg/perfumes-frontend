import { createContext, useContext, useEffect, useReducer } from "react";
import api from "../api/axios";

const AuthContext = createContext();

const initialState = {
  user: null,
  token: localStorage.getItem("token"),
  loading: true,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload, loading: false };
    case "LOGIN":
      localStorage.setItem("token", action.payload.token);
      return { ...state, token: action.payload.token, user: action.payload.user, loading: false };
    case "LOGOUT":
      localStorage.removeItem("token");
      return { user: null, token: null, loading: false };
    case "STOP_LOADING":
      return { ...state, loading: false };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function loadMe() {
      if (!state.token) {
        dispatch({ type: "STOP_LOADING" });
        return;
      }
      try {
        const { data } = await api.get("/auth/me");
        dispatch({ type: "SET_USER", payload: data.data });
      } catch {
        dispatch({ type: "LOGOUT" });
      }
    }
    loadMe();
  }, [state.token]);

  const login = async (payload) => {
    const { data } = await api.post("/auth/login", payload);
    dispatch({ type: "LOGIN", payload: data.data });
    return data;
  };

  const register = async (payload) => {
    await api.post("/auth/register", payload);
    return login({ email: payload.email, password: payload.password });
  };

  return (
    <AuthContext.Provider value={{ ...state, dispatch, login, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
