import {
  TEST_EDITOR_ROUTE,
  TAG_EDITOR_ROUTE,
  RUN_EDITOR_ROUTE,
} from "../../shared";
import { HomeScreen } from "./home-screen";
import { RouteObject } from "react-router-dom";

export const HOME_ROUTE: RouteObject = {
  path: "/",
  element: <HomeScreen />,
  children: [TEST_EDITOR_ROUTE, TAG_EDITOR_ROUTE, RUN_EDITOR_ROUTE],
};

export function homeRoute() {
  return "/";
}
