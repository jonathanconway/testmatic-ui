import { useNavigate } from "react-router-dom";

import { homeRoute } from "../../screens";

import { useEditingTest } from "./use-editing-test.hook";

export function useTestEditor() {
  const { test } = useEditingTest();

  const navigateTo = useNavigate();

  const handleCloseClick = () => {
    navigateTo(homeRoute());
  };

  return {
    test,

    handleCloseClick,
  };
}
