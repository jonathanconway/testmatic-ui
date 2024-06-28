import { homeRoute } from "../../../screens";
import { useEditingRun } from "./use-editing-run.hook";
import { useNavigate } from "react-router-dom";

export function useRunEditor() {
  const navigateTo = useNavigate();

  const { test, run, runDateTime } = useEditingRun();

  const handleChangeRunDateTime = () => {
    // validate format
    // save
  };

  const handleCloseClick = () => {
    navigateTo(homeRoute());
  };

  return {
    test,
    run,
    runDateTime,
    handleChangeRunDateTime,
    handleCloseClick,
  };
}
