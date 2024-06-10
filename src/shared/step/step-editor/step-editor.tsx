import { useGetProject } from "../../project";
import {
  StepTokenTag,
  StepTokenText,
} from "../../project-test-editor/project-test-editor.styles";
import "../../utils";
import { querySelectorParent } from "../../utils";
import { stepFragments } from "../step-fragments";
import {
  Container,
  Measurement,
  StepDisplay,
  TagSuggestContainer,
  TextArea,
  TextAreaContainer,
} from "./step-editor.styles";
import { TagSuggest } from "./tag-suggest";
import {
  ChangeEvent,
  KeyboardEvent,
  FocusEvent,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";
import { Step, Tag, createTestStepFromText } from "testmatic";

export interface StepEditorProps {
  readonly step: Step;
}

export interface StepEditorState {
  readonly showTagSuggest: boolean;
  readonly value: string;
  readonly selectedTag?: Tag;
  readonly textArea: {
    readonly selectionStart: number;
    readonly selectionEnd: number;
  };
  readonly isEditing: boolean;
}

function getSelectedTag({
  value,
  selectionStart,
  selectionEnd,
}: {
  readonly value: string;
  readonly selectionStart: number;
  readonly selectionEnd: number;
}) {
  const valueBeforeSelection = value.substring(0, selectionStart);
  const valueAfterSelection = value.substring(selectionEnd);

  const lastIndexOfOpenBracketBeforeSelection =
    valueBeforeSelection.lastIndexOf("(");
  const lastIndexOfCloseBracketBeforeSelection =
    valueBeforeSelection.lastIndexOf(")");

  const firstIndexOfOpenBracketAfterSelection =
    valueAfterSelection.indexOf("(") + 1;
  const firstIndexOfCloseBracketAfterSelection =
    valueAfterSelection.indexOf(")") + 1;

  const firstIndexOfBracketAfterSelection = [
    firstIndexOfOpenBracketAfterSelection,
    firstIndexOfCloseBracketAfterSelection,
  ]
    .filter((value) => value > 0)
    .sortBy()[0];

  const closeBracketAfterOpenBracket =
    lastIndexOfCloseBracketBeforeSelection >
    lastIndexOfOpenBracketBeforeSelection;

  const noOpenBracket = lastIndexOfOpenBracketBeforeSelection === -1;

  if (noOpenBracket || closeBracketAfterOpenBracket) {
    return undefined;
  }

  const openBracketIndex = lastIndexOfOpenBracketBeforeSelection;
  const closeBracketIndex = selectionEnd + firstIndexOfBracketAfterSelection;

  const valueBetweenBrackets = value.substring(
    openBracketIndex,
    closeBracketIndex
  );

  return {
    valueBetweenBrackets,
    openBracketIndex,
    closeBracketIndex,
  };
}

export function StepEditor(props: StepEditorProps) {
  const { data: project } = useGetProject();

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const measurementSpanRef = useRef<HTMLSpanElement | null>(null);

  const [state, setState] = useState<StepEditorState>({
    showTagSuggest: false,
    value: props.step?.text ?? "",
    textArea: {
      selectionStart: 0,
      selectionEnd: 0,
    },
    isEditing: false,
  });

  const handleKeyDownEscape = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (state.showTagSuggest) {
      setState({
        ...state,
        showTagSuggest: false,
      });
    }
  };

  const handleKeyDownTabEnter = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (state.showTagSuggest && state.selectedTag) {
      event.preventDefault();
      handleTagSuggestSelectTag(state.selectedTag);
    }
  };

  const handleKeyDownArrowUp = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    if (state.selectedTag) {
      setState({
        ...state,
        selectedTag:
          project?.tags[project?.tags.indexOf(state.selectedTag) - 1] ??
          project?.tags[0],
      });
    } else {
      querySelectorParent(textAreaRef?.current, "li")
        ?.previousElementSibling?.querySelector("textarea")
        ?.focus();
    }
  };

  const handleKeyDownArrowDown = (
    event: KeyboardEvent<HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    if (state.selectedTag) {
      setState({
        ...state,
        selectedTag: state.selectedTag
          ? project?.tags[project?.tags.indexOf(state.selectedTag) + 1] ??
            project?.tags[project?.tags.length - 1]
          : project?.tags[0],
      });
    } else {
      querySelectorParent(textAreaRef?.current, "li")
        ?.nextElementSibling?.querySelector("textarea")
        ?.focus();
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    switch (event.key) {
      case "Escape":
        handleKeyDownEscape(event);
        return;
      case "Tab":
      case "Enter":
        handleKeyDownTabEnter(event);
        return;
      case "ArrowUp":
        handleKeyDownArrowUp(event);
        return;
      case "ArrowDown":
        handleKeyDownArrowDown(event);
        return;
    }
  };

  const setStateTextAreaSelection = (target?: HTMLTextAreaElement) => {
    if (!target) {
      return;
    }

    const tagAtCursor = getSelectedTag({
      value: target.value,
      selectionStart: target.selectionStart,
      selectionEnd: target.selectionEnd,
    });

    const showTagSuggest = Boolean(tagAtCursor);
    //xxx
    // if (!showTagSuggest) {
    //   return;
    // }

    setState((prevState) => ({
      ...prevState,
      textArea: {
        selectionStart: target.selectionStart,
        selectionEnd: target.selectionEnd,
      },
      showTagSuggest,
    }));
  };

  const tagAtCursor = useMemo(
    () =>
      getSelectedTag({
        value: state.value,
        selectionStart: state.textArea.selectionStart,
        selectionEnd: state.textArea.selectionEnd,
      }),
    [state.value, state.textArea]
  );

  const handleInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setState({
      ...state,
      value,
    });
  };

  const handleSelect = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    setTimeout(() => {
      setStateTextAreaSelection(event.target as HTMLTextAreaElement);
    });
  };

  const handleClick = (event: FocusEvent<HTMLTextAreaElement>) => {
    setTimeout(() => {
      setStateTextAreaSelection(event.target as HTMLTextAreaElement);
    });
  };

  const handleTagSuggestClose = () => {
    setState((previousState) => ({
      ...previousState,
      showTagSuggest: false,
    }));
  };

  const handleTagSuggestSelectTag = (tag: Tag) => {
    const tagAtCursorNow = getSelectedTag({
      value: state.value,
      selectionStart: state.textArea.selectionStart,
      selectionEnd: state.textArea.selectionEnd,
    });

    const insertionStart = tagAtCursorNow
      ? tagAtCursorNow.openBracketIndex
      : state.textArea.selectionStart;

    const insertionEnd = tagAtCursorNow
      ? tagAtCursorNow.closeBracketIndex
      : state.textArea.selectionEnd;

    const insertion = `(${tag.title.toLowerCase()})`;
    const beforeInsertion = state.value.substring(0, insertionStart);
    const afterInsertion = state.value.substring(insertionEnd);

    const value = `${beforeInsertion}${insertion}${afterInsertion}`;

    setState((prevState) => ({
      ...prevState,
      showTagSuggest: false,
      selectedTag: undefined,
      value,
    }));
  };

  const handleCancelClick = () => {};

  const handleSaveClick = () => {
    setState((prevState) => ({
      ...prevState,
      value: "",
    }));

    setTimeout(() => {
      textAreaRef.current?.focus();
    }, 100);
  };

  const handleEditClick = () => {
    console.log("handleEditClick", props.step);

    setTimeout(() => {
      setState({
        ...state,
        value: props.step?.text ?? "",
        isEditing: true,
      });
    });
    // setTimeout(() => {
    //   textAreaRef.current?.focus();
    // });
  };

  const handleEditBlur = () => {
    console.log("handleEditBlur", state.value);

    setState((previousState) => ({
      ...previousState,
      isEditing: false,
    }));
  };

  const fragments = useMemo(() => {
    if (state.isEditing) {
      return stepFragments(createTestStepFromText(state.value));
    }
    return stepFragments(props.step);
  }, [props.step, state.isEditing, state.value]);

  return (
    <Container>
      <TextAreaContainer style={{ opacity: state.isEditing ? "1" : "0" }}>
        <TextArea
          ref={textAreaRef}
          value={state.value}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          onSelect={handleSelect}
          onFocus={handleEditClick}
          onBlur={handleEditBlur}
        />

        {/* <ActionsContainer>
            <Button onClick={handleCancelClick}>Cancel</Button>

            <Button
              disabled={state.value.trim() === ""}
              onClick={handleSaveClick}
            >
              Save
            </Button>
          </ActionsContainer> */}

        {/* <FocusAbsorber type="text" style={{ opacity: 0 }} /> */}

        <Measurement ref={measurementSpanRef}>
          {state.value.substring(0, tagAtCursor?.openBracketIndex)}
        </Measurement>
      </TextAreaContainer>

      {state.showTagSuggest && (
        <TagSuggestContainer
          style={{
            marginLeft: `${measurementSpanRef.current?.offsetWidth}px`,
          }}
        >
          <TagSuggest
            selectedTag={state.selectedTag}
            onSelectTag={handleTagSuggestSelectTag}
            onClose={handleTagSuggestClose}
          />
        </TagSuggestContainer>
      )}

      <StepDisplay>
        {fragments.map((token, index) => {
          switch (token.type) {
            case "text":
              return (
                <StepTokenText key={`${token.value}_${index}`}>
                  {token.value}
                </StepTokenText>
              );
            case "tag":
              return (
                <StepTokenTag key={`${token.value}_${index}`}>
                  <Link to={`/tag_${token.tag.name}`}>({token.value})</Link>
                </StepTokenTag>
              );
            default:
              return null;
          }
        })}
      </StepDisplay>
    </Container>
  );
}
