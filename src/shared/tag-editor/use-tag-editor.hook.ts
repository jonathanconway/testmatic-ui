import { isError } from "lodash";
import { ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTestsReferencingTag, tagCreateNameFromTitle } from "testmatic";

import { useProject, useTag } from "../../hooks";
import { homeRoute } from "../../screens";
import { showSuccessOrErrorNotification } from "../notification";
import { timeout } from "../utils";

import { TagEditorIds } from "./tag-editor";
import { TAG_NEW_NAME, tagEditorRoute } from "./tag-editor.routes";

export function useTagEditor() {
  const { project } = useProject();

  const { tagName = undefined } = useParams();

  const { tag, updateTitle, updateDescription } = useTag();

  const isNewTag = tagName === TAG_NEW_NAME;

  const navigate = useNavigate();

  const tests = project?.tests ?? [];

  const originalTag = tagName ? project?.tagsByName[tagName] : undefined;

  const tagReferencedTests = originalTag
    ? getTestsReferencingTag(tests, originalTag)
    : [];

  const handleChangeTitle = async (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (!tag) {
      return;
    }

    const title = event.target.value;
    if (title === tag.title) {
      return;
    }

    const updateTitleResult = await updateTitle(title);

    await timeout(100);

    if (isError(updateTitleResult)) {
      setTimeout(() => {
        event.target.value = tag.title;
      }, 100);
      return;
    }

    navigate(tagEditorRoute(tagCreateNameFromTitle(title)));

    await timeout(100);

    showSuccessOrErrorNotification(updateTitleResult, {
      anchorElement: window.document.getElementById(
        TagEditorIds.TitleContainer,
      ),
    });
  };

  const handleChangeDescription = async (
    event: ChangeEvent<HTMLTextAreaElement>,
  ) => {
    if (!tag) {
      return;
    }

    const description = event.target.value;
    if (description === tag.description) {
      return;
    }

    const updateDescriptionResult = updateDescription(description);

    await timeout(100);

    showSuccessOrErrorNotification(updateDescriptionResult, {
      anchorElement: event.target.parentElement,
    });
  };

  const handleCloseClick = () => {
    navigate(homeRoute());
  };

  return {
    tag,
    tagReferencedTests,
    isNewTag,
    handleChangeTitle,
    handleChangeDescription,
    handleCloseClick,
  };
}
