import { ChangeEvent, useMemo, useState } from "react";
import {
  createLink,
  isAlreadyExistsError,
  projectAddTestLink,
} from "testmatic";

import { useProject } from "../../../../hooks";
import { isNotNil, isUrl } from "../../../utils";
import { useEditingTest } from "../../use-editing-test.hook";

interface UseTestEditorLinksAddLinkParams {
  readonly close: VoidFunction;
}

interface UseTestEditorLinksAddLink {
  readonly values: {
    readonly href: string;
    readonly title: string;
  };
  readonly form: {
    readonly wasSubmitAttempted?: boolean;
  };
  readonly fields: {
    readonly href: {
      readonly isDirty: boolean;
    };
  };
}

export function useTestEditorLinksAddLink(
  params: UseTestEditorLinksAddLinkParams,
) {
  const [state, setState] = useState<UseTestEditorLinksAddLink>({
    values: {
      href: "",
      title: "",
    },
    form: {
      wasSubmitAttempted: false,
    },
    fields: {
      href: {
        isDirty: false,
      },
    },
  });

  const { test } = useEditingTest();

  const { values, form, fields } = state;

  const errors = useMemo(() => {
    return {
      href: getHrefError(state),
    };
  }, [state]);

  const hasErrors = Object.values(errors).filter(isNotNil).length > 0;

  function handleHrefInput(event: ChangeEvent<HTMLInputElement>) {
    setState((previousState) => ({
      ...previousState,
      values: { ...previousState.values, href: event.target.value },
      fields: {
        ...previousState.fields,
        href: {
          ...previousState.fields.href,
          isDirty: true,
        },
      },
    }));
  }

  function handleTitleInput(event: ChangeEvent<HTMLInputElement>) {
    setState((previousState) => ({
      ...previousState,
      values: { ...previousState.values, title: event.target.value },
    }));
  }

  const { project, saveProject } = useProject();

  function handleSubmitClick() {
    if (!test) {
      return;
    }

    setState((previousState) => ({
      ...previousState,
      form: {
        wasSubmitAttempted: true,
      },
    }));

    if (hasErrors) {
      return;
    }

    const newLink = createLink({
      href: state.values.href,
      title: state.values.title,
    });

    const updatedProject = projectAddTestLink({
      project,
      newLink,
      lookupTestNameOrTitle: test.name,
    });

    if (isAlreadyExistsError(updatedProject)) {
      return;
    }

    saveProject(updatedProject);

    params.close();
  }

  return {
    form,
    values,
    fields,
    errors,
    hasErrors,

    handleHrefInput,
    handleTitleInput,
    handleSubmitClick,
  };
}

function getHrefError(state: UseTestEditorLinksAddLink) {
  if (state.values.href.trim() === "") {
    return "URL is required.";
  }

  if (!isUrl(state.values.href)) {
    return "URL must be formatted correctly.";
  }

  return undefined;
}
