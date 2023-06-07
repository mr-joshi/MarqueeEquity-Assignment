
import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import RequireAuth from "../components/auth/RequireAuth";
import Page404 from "../pages/404";

import { routes, privateRoutes } from "./routes";
import NormalRoutes from "../components/auth/NormalRoutes";

const Routings = () => {
  return (
    <Suspense>
      <Routes>
        
        {routes.map(({element,...routeProps}) => (
          <Route {...routeProps} element={
            <NormalRoutes>
              {element}
            </NormalRoutes>
          } key={routeProps.path as string} />
        ))}
        {privateRoutes.map(({ element, ...privateRouteProps }) => (
          <Route
            element={
              <RequireAuth>
                {element}
              </RequireAuth>
            }
            {...privateRouteProps}
            key={`privateRoute-${privateRouteProps.path}`}
          />
        ))}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Suspense>
  );
};

export default Routings;
