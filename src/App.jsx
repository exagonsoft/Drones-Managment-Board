import { Suspense } from "react";
import LoaderPage from "./pages/loader/loaderPage";
import { Route, Routes } from "react-router-dom";
import { errorRoute, layoutRoute, routes } from "./routes/routes";
import { ToastNotification } from "./messages/notificationsHandler";

function App() {
  return (
    <main className="app">
      <ToastNotification />
      <div className="main">
        <div className="gradient" />
      </div>

      <Suspense fallback={<LoaderPage />}>
        <Routes>
          <Route path={layoutRoute.path} element={layoutRoute.element}>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Route>
          <Route path={errorRoute.path} element={errorRoute.element} />
        </Routes>
      </Suspense>
    </main>
  );
}

export default App;
