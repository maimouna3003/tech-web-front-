import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Login from "./pages/login.page";
import HomePage from "./pages/home.page";

const AppLayout: React.FC = () => {
  return (
    <>
      <header>
        <nav>
          {/* Menu */}
        </nav>
      </header>
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "home",
        element: <HomePage />,
      },
    ],
  },
]);

const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
