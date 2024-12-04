import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Brands from "./Components/Brands/Brands";
import Proudcts from "./Components/Proudcts/Proudcts";
import Cart from "./Components/Cart/Cart";
import Home from "./Components/Home/Home";
import Notfound from "./Components/Notfound/Notfound";
import ProtectedRoute from "./Components/ProtuctedRoute/ProtuctedRoute";
import CounterContextProvider from "./Context/CounnterContext";
import UserContextProvider from "./Context/UserContext";
import ProductDetailes from "./Components/ProductDetailes/ProductDetailes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CartContextProvider from "./Context/CartContext";
import toast, { Toaster } from 'react-hot-toast';
import ShippingAddress from "./Components/ShippingAddress/ShippingAddress";
import Categories from "./Components/Categories/Categories";
import WishList from "./Components/WishList/WishList";
import ForgetPassword from "./Components/password/password";

const notify = () => toast('Here is your toast.');
function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element: <Register /> },
        { path: "login", element: <Login /> },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              {" "}
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: "wishList",
          element: (
            <ProtectedRoute>
              {" "}
              <WishList />
            </ProtectedRoute>
          ),
        },
        {
          path: "resetPassword",
          element: (
            <ProtectedRoute>
              {" "}
              <ForgetPassword />
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              {" "}
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "proudcts",
          element: (
            <ProtectedRoute>
              <Proudcts />
            </ProtectedRoute>
          ),
        },
        {
          path: "shippingAddress",
          element: (
            <ProtectedRoute>
              <ShippingAddress />
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "ProductDetailes/:id",
          element: (
            <ProtectedRoute>
              <ProductDetailes />
            </ProtectedRoute>
          ),
        },
        {
          path: "home",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        { path: "*", element: <Notfound /> },
      ],
    },
  ]);

  const myClient = new QueryClient();
  return (
    <QueryClientProvider client={myClient}>
      <CartContextProvider>
        <UserContextProvider>
          <CounterContextProvider>
          <Toaster />
            <RouterProvider router={router} />
            <ReactQueryDevtools />
          </CounterContextProvider>
        </UserContextProvider>
      </CartContextProvider>
    </QueryClientProvider>
  );
}

export default App;
