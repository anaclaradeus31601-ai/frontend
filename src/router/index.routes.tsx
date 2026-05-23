import Login from "../pages/client/Login";
import Register from "../pages/client/Register";
import DefaultLayout from "#components/layout/DefaultLayout";

export const publicRoutes = {
  element: <DefaultLayout />,
  children: [
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
   
    
  ],
};