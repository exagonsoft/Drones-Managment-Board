import { lazy } from "react";

// Lazy load the components
const Layout = lazy(() => import("../containers/mainLayout"))
const Dashboard = lazy(() => import("../pages/dashboard/dashboardPage"));
const Drones = lazy(() => import("../pages/drones/dronesPage"));
const Medications = lazy(() => import("../pages/medications/medicationsPage"));
const ErrorPage = lazy(() => import("../pages/error/errorPage"));


export const layoutRoute = { path: "/", element: <Layout /> }

export const routes = [
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/drones", element: <Drones /> },
    { path: "/medications", element: <Medications /> },
    { path: "*", element: <ErrorPage /> },
];