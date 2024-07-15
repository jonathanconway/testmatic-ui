import { isError } from "lodash";
import { useNavigate, useParams } from "react-router-dom";

import { useProject } from "../../../hooks";
import { homeRoute } from "../../../screens";
import { showSuccessOrErrorNotification } from "../../notification";
import { tagEditorNewTagRoute } from "../../tag-editor";

export function useProjectExplorerTags() {
  const { project, deleteTag } = useProject();

  const navigate = useNavigate();

  const { tagName } = useParams();

  const handleTagAddClick = () => {
    navigate(tagEditorNewTagRoute());
  };

  const handleTagDeleteClick = (lookupTagName: string) => async () => {
    if (!project) {
      return;
    }

    const deleteTagResult = deleteTag(lookupTagName);

    showSuccessOrErrorNotification(deleteTagResult);

    if (isError(deleteTagResult)) {
      return;
    }

    navigate(homeRoute());
  };

  return {
    project,
    tagName,
    handleTagAddClick,
    handleTagDeleteClick,
  };
}
