import { HomeScreen } from "./home-screen";
import { RouteObject } from "react-router-dom";

export const HOME_ROUTE: RouteObject = {
  path: "/:itemId?",
  element: <HomeScreen />,
};
