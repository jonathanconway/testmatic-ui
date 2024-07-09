import { isError } from "lodash";
import { useNavigate, useParams } from "react-router-dom";
import { Tag, projectDeleteTag } from "testmatic";

import { homeRoute } from "../../../screens";
import { showErrorNotification } from "../../notification";
import { useProject } from "../../project";
import { tagEditorNewTagRoute } from "../../tag-editor";

export function useProjectExplorerTags() {
  const { project, saveProject } = useProject();

  const navigate = useNavigate();

  const { tagName } = useParams();

  const handleTagAddClick = () => {
    navigate(tagEditorNewTagRoute());
  };

  const handleTagDeleteClick = (tagToDelete: Tag) => () => {
    if (!project) {
      return;
    }

    const updatedProject = projectDeleteTag({
      project,
      lookupTagNameOrTitle: tagToDelete.name,
    });

    if (isError(updatedProject)) {
      showErrorNotification(updatedProject);
      return;
    }

    saveProject(updatedProject);

    navigate(homeRoute());
  };

  return {
    project,
    tagName,
    handleTagAddClick,
    handleTagDeleteClick,
  };
}
