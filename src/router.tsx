import { createBrowserRouter } from "react-router-dom";
import { AuthRoutes } from "./router/auth.routes";
import { AdminRoutes, RealtorRoutes } from "./router/admin.routes";
import { PublicRoutes } from "./router/public.routes";

export const router = createBrowserRouter([
  ...PublicRoutes,
  ...AdminRoutes,
  ...RealtorRoutes,
  ...AuthRoutes,
]);
