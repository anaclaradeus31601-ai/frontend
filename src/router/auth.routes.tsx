import type { RouteObject } from "react-router-dom"
import Login from "../pages/client/Login"
import AdminLogin from "../pages/admin/AdminLogin"
import RealtorLogin from "../pages/realtor/RealtorLogin"
import Register from "../pages/client/Register"
import RequestEmailVerification from "../pages/client/RequestEmailVerification"
import ConfirmEmailVerification from "../pages/client/ConfirmEmailVerification"
import ForgotPassword from "../pages/client/ForgotPassword"
import ResetPassword from "../pages/client/ResetPassword"

export const AuthRoutes: RouteObject[] = [
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/login/admin",
        element: <AdminLogin />,
    },
    {
        path: "/login/corretor",
        element: <RealtorLogin />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/verify-email/request",
        element: <RequestEmailVerification />,
    },
    {
        path: "/verify-email/confirm",
        element: <ConfirmEmailVerification />,
    },
    {
        path: "/forgot-password",
        element: <ForgotPassword />,
    },
    {
        path: "/reset-password",
        element: <ResetPassword />,
    },
]
