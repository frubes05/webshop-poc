import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/login/login.tsx";
import NotFound from "./pages/not-found/not-found.tsx";
import Layout from "./components/layout/layout.tsx";
import { CartContextProvider } from "./contexts/cart/cart.tsx";
import Cart from "./pages/cart/cart.tsx";
import { AuthContextProvider } from "./contexts/auth/auth.tsx";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider>
      <CartContextProvider>
        <RouterProvider router={router} />
      </CartContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
