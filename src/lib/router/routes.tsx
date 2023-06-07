import React from "react";
import type { PathRouteProps } from "react-router-dom";
import TodoList from "../pages/AddTodo/main";

const Home = React.lazy(() => import("../pages/home"));
export const routes: Array<PathRouteProps> = [
  {
    path: "/",
    element: <Home />,
  },
];
export const privateRoutes: Array<PathRouteProps> = [
   {
    path: "/addTodo",
    element: <TodoList />,
  },
];