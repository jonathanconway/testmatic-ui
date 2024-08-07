import { useNavigate } from "react-router-dom";

import { homeRoute } from "../../../screens";

export function useTestEditorStepsNav() {
  const navigateTo = useNavigate();

  const handleCloseClick = () => {
    navigateTo(homeRoute());
  };

  return {
    handleCloseClick,
  };
}
