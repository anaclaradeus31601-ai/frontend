import type { RouteObject } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import Home from "../pages/client/Home";



export const PublicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <DefaultLayout />,

    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
];