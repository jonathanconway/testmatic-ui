import { useNavigate, useParams } from "react-router-dom";

import {
  tagEditorNewTagRoute,
  testEditorNewTestRoute,
  useProject,
} from "../../shared";

import { homeRoute } from "./home-screen.route";

export function useHomeScreen() {
  const { itemId: selectedItemId = undefined } = useParams();
  const navigate = useNavigate();

  const { project } = useProject();

  const onClickTestAdd = () => {
    navigate(testEditorNewTestRoute());
  };

  const onClickTagAdd = () => {
    navigate(tagEditorNewTagRoute());
  };

  const onCloseClick = () => {
    navigate(homeRoute());
  };

  return {
    project,
    selectedItemId,
    onClickTestAdd,
    onClickTagAdd,
    onCloseClick,
  };
}
