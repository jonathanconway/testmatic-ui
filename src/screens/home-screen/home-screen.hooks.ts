import {
  tagEditorNewTagRoute,
  testEditorNewTestRoute,
  useGetProject,
} from "../../shared";
import { homeRoute } from "./home-screen.route";
import { useNavigate, useParams } from "react-router-dom";

export function useHomeScreen() {
  const { itemId: selectedItemId = undefined } = useParams();
  const navigate = useNavigate();

  const { data: project } = useGetProject();

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
