import { isError, snakeCase } from "lodash";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProjectView, Tag, getTestsReferencingTag, isTag } from "testmatic";

import { useProject, useTag } from "../../hooks";
import { homeRoute } from "../../screens";
import { showErrorNotification } from "../notification";
import { timeout } from "../utils";

import { TAG_NEW, TAG_NEW_NAME, tagEditorRoute } from "./tag-editor.routes";

interface UseTagEditorState {
  readonly tag?: Tag;
}

export function useTagEditor() {
  const { project, addNewTag } = useProject();

  const { tagName = undefined } = useParams();

  const { updateDescription } = useTag();

  const [state, setState] = useState<UseTagEditorState>({});

  useEffect(() => {
    setState({
      tag: undefined,
    });
  }, [tagName]);

  const isNewTag = tagName === TAG_NEW_NAME;

  const navigate = useNavigate();

  const tagOrError = getNewOrExistingTag({
    isNewTag,
    tagName,
    project,
    state,
  });

  const tag = tagOrError && isTag(tagOrError) ? tagOrError : undefined;

  const tests = project?.tests ?? [];

  const originalTag = tagName ? project?.tagsByName[tagName] : undefined;

  const tagReferencedTests = originalTag
    ? getTestsReferencingTag(tests, originalTag)
    : [];

  const handleChangeTitle = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (!project || !tag) {
      return;
    }

    const title = event.target.value;

    setState((previousState) => ({
      ...previousState,
      tag: {
        ...tag,
        title,
        name: snakeCase(title),
      },
    }));
  };

  const handleChangeDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const description = event.target.value;
    updateDescription(description);
  };

  const handleCloseClick = () => {
    navigate(homeRoute());
  };

  const isCreateButtonDisabled = useMemo(() => {
    if (!state.tag) {
      return true;
    }

    if (isNewTag && state.tag?.name === TAG_NEW_NAME) {
      return true;
    }

    return false;
  }, [isNewTag, state.tag]);

  const handleClickSave = async () => {
    const { tag: newTag } = state;

    if (!newTag || !project) {
      return;
    }

    const addNewTagResult = await addNewTag(newTag);

    if (isError(addNewTagResult)) {
      showErrorNotification(addNewTagResult);
      return;
    }

    await timeout();

    navigate(tagEditorRoute(newTag.name));
  };

  return {
    tag,
    tagReferencedTests,
    isNewTag,
    isCreateButtonDisabled,
    handleChangeTitle,
    handleChangeDescription,
    handleCloseClick,
    handleClickSave,
  };
}

function getNewOrExistingTag({
  isNewTag,
  tagName,
  project,
  state,
}: {
  readonly isNewTag: boolean;
  readonly tagName?: string;
  readonly project?: ProjectView;
  readonly state: UseTagEditorState;
}) {
  if (state.tag) {
    return state.tag;
  }

  if (isNewTag) {
    return TAG_NEW;
  }

  if (tagName) {
    return project?.tagsByName[tagName];
  }
}
