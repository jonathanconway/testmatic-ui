import { isError, snakeCase } from "lodash";
import { useNavigate, useParams } from "react-router-dom";
import { createTag } from "testmatic";

import { useProject } from "../../../hooks";
import { homeRoute } from "../../../screens";
import { getDuplicateItemTitle } from "../../item";
import {
  showErrorNotification,
  showSuccessOrErrorNotification,
} from "../../notification";
import { TAG_NEW, tagEditorRoute } from "../../tag-editor";
import { timeout } from "../../utils";

import { ProjectExplorerTagsIds } from "./project-explorer-tags.const";

export function useProjectExplorerTags() {
  const { project, deleteTag, addNewTag } = useProject();

  const navigate = useNavigate();

  const { tagName } = useParams();

  const handleTagAddClick = async () => {
    const tagTitles = project.tags.map((tag) => tag.title);
    const title = getDuplicateItemTitle(tagTitles, TAG_NEW.title);

    const newTag = createTag({
      ...TAG_NEW,
      title,
      name: snakeCase(title),
    });

    if (isError(newTag)) {
      showErrorNotification(newTag);
      return;
    }

    await addNewTag(newTag);

    navigate(tagEditorRoute(newTag.name));
  };

  const handleTagDeleteClick = (lookupTagName: string) => async () => {
    const deleteTagResult = await deleteTag(lookupTagName);

    await timeout(100);

    showSuccessOrErrorNotification(deleteTagResult, {
      anchorElement: window.document.getElementById(
        ProjectExplorerTagsIds.Section,
      ),
    });

    if (isError(deleteTagResult)) {
      return;
    }

    if (tagName) {
      navigate(homeRoute());
    }
  };

  return {
    project,
    tagName,
    handleTagAddClick,
    handleTagDeleteClick,
  };
}
