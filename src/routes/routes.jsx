import { lazy } from "react";

// Lazy load the components
const Layout = lazy(() => import("../containers/mainLayout"))
const Dashboard = lazy(() => import("../pages/dashboard/dashboardPage"));
const Drones = lazy(() => import("../pages/drones/dronesPage"));
const LoadDrones = lazy(() => import("../pages/loadDrones/loadDronesPage"));
const History = lazy(() => import("../pages/history/historyPage"));
const Medications = lazy(() => import("../pages/medications/medicationsPage"));
const ErrorPage = lazy(() => import("../pages/error/errorPage"));


export const layoutRoute = { path: "/", element: <Layout /> }
export const errorRoute = { path: "*", element: <ErrorPage /> }

export const routes = [
    { path: "/", element: <Dashboard /> },
    { path: "/drones", element: <Drones /> },
    { path: "/drones/load", element: <LoadDrones /> },
    { path: "/drones/audit", element: <History /> },
    { path: "/medications", element: <Medications /> },
];