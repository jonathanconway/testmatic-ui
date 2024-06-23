import { Button } from "../button";
import { Stack } from "../layout";
import { useGetProject, usePostProject } from "../project";
import { StepEditor } from "../step";
import { StepAdder } from "../step/step-editor/step-adder";
import { StepInputClassNames } from "../step/step-editor/step-editor-input/step-input";
import { TitleEditor } from "../title-editor";
import { Tooltip } from "../tooltip";
import { LinksBox } from "./links-box";
import {
  H2,
  StepsList,
  StepsListItem,
  Header,
  StepsContainer,
  OtherContainer,
  Column,
  TagsContainer,
  LinksContainer,
  RunsContainer,
  H3,
} from "./project-test-editor.styles";
import * as Styled from "./project-test-editor.styles";
import { RunsBox } from "./runs-box";
import { TagsBox } from "./tags-box";
import { ChangeEvent, useMemo, useRef, useState } from "react";
import {
  Step,
  Test,
  createTestStepFromText,
  projectAddTest,
  projectUpdateTest,
} from "testmatic";

interface ProjectTestEditorProps {
  readonly test: Test;
  readonly onCloseClick: VoidFunction;
}

interface ProjectTestEditorState {
  readonly test?: Test;
  readonly editingStep?: Step;
}

export function ProjectTestEditor(props: ProjectTestEditorProps) {
  const stepsContainerRef = useRef<HTMLDivElement>(null);

  const [state, setState] = useState<ProjectTestEditorState>({});

  const { data: project } = useGetProject();
  const { mutateAsync: postProject } = usePostProject();

  const isNewTest = props.test.name === "test_new";
  const isSaveButtonDisabled = useMemo(() => {
    if (!state.test) {
      return true;
    }

    if (isNewTest && state.test?.name === "New test") {
      return true;
    }

    return false;
  }, [isNewTest, state.test]);

  const test = state.test ?? props.test;

  const handleClickSave = () => {
    if (!project) {
      return;
    }

    if (isNewTest) {
      const { test: newTest } = state;

      if (!newTest) {
        return;
      }

      projectAddTest({ project, newTest });
    } else {
      const { test: updatedTest } = state;

      if (!updatedTest) {
        return;
      }

      const testName = props.test.name;
      postProject(projectUpdateTest({ project, testName, updatedTest }));
    }
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((previousState) => ({
      ...previousState,
      test: {
        ...test,
        title: event.target.value,
      },
    }));
  };

  const handleClickAddStep = () => {
    addNewStep();
  };

  const handleStepEditorClick = (step: Step) => () => {
    setState((previousState) => ({
      ...previousState,
      editingStep: step,
    }));
  };

  const handleStepEditorGoPrevious = (stepIndex: number) => () => {
    if (stepIndex <= 0) {
      return;
    }

    setState((previousState) => ({
      ...previousState,
      editingStep: test.steps[stepIndex - 1],
    }));
  };

  const handleStepEditorGoNext = (stepIndex: number) => () => {
    if (stepIndex === test.steps.length - 1) {
      addNewStep();
      return;
    }

    setState((previousState) => ({
      ...previousState,
      editingStep: test.steps[stepIndex + 1],
    }));
  };

  const handleStepEditorCancel = (editingStepIndex: number) => () => {
    setState((previousState) => ({
      ...previousState,
      editingStep: undefined,
    }));
    // topContainerRef.current?.blur();
  };

  const handleStepEditorEditingStepChange =
    (editingStepIndex: number) => (editingStep: Step) => {
      const test = state.test ?? props.test;

      const newState = {
        test: {
          ...test,
          steps: test.steps.map((step, stepIndex) =>
            stepIndex === editingStepIndex ? editingStep : step
          ),
        },
      };

      setState((previousState) => ({
        ...previousState,
        test: {
          ...test,
          steps: test.steps.map((step, stepIndex) =>
            stepIndex === editingStepIndex ? editingStep : step
          ),
        },
      }));
    };

  const addNewStep = (stepText = "") => {
    const test = state.test ?? props.test;

    const newStep = createTestStepFromText(stepText);

    setState((previousState) => ({
      ...previousState,
      test: {
        ...test,
        steps: [...test.steps, newStep],
      },
      editingStep: newStep,
    }));

    setTimeout(() => {
      const lastTextArea = Array.from(
        stepsContainerRef?.current?.querySelectorAll(
          `textarea.${StepInputClassNames.StepInputTextArea}`
        ) ?? []
      ).slice(-1)[0] as HTMLTextAreaElement;

      lastTextArea.selectionStart = lastTextArea.value.length;
    });
  };

  const handleStepAdderInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
    addNewStep(event.target.value);
  };

  const handleDeleteClick = (deleteStepIndex: number) => () => {
    const test = state.test ?? props.test;

    setState((previousState) => ({
      ...previousState,
      test: {
        ...test,
        steps: test.steps.filter(
          (_, stepIndex) => stepIndex !== deleteStepIndex
        ),
      },
    }));
  };

  return (
    <Stack spacing={1} height="100%">
      <Header>
        <H2>
          Test:{" "}
          <TitleEditor
            value={test.title}
            autoFocus={isNewTest}
            autoSelect={isNewTest}
            onChange={handleChangeTitle}
          />
        </H2>
        <div>
          <Button disabled={isSaveButtonDisabled} onClick={handleClickSave}>
            {isNewTest ? "Create" : "Save"}
          </Button>
        </div>
        <div>
          <Tooltip contents="Close">
            <Button onClick={props.onCloseClick}>✕</Button>
          </Tooltip>
        </div>
      </Header>

      {/* todo: rename to StepsContainer or StepsSection */}
      <Stack spacing={1} ref={stepsContainerRef}>
        <Styled.StepsHeader>
          <H3>Steps</H3>
          <Button onClick={handleClickAddStep}>Add step</Button>
        </Styled.StepsHeader>

        <StepsContainer>
          <StepsList>
            {test.steps.map((step, stepIndex) => (
              <StepsListItem key={`${step.text}_${stepIndex}`}>
                <StepEditor
                  isEditing={state.editingStep === step}
                  step={step}
                  onClick={handleStepEditorClick(step)}
                  onChange={handleStepEditorEditingStepChange(stepIndex)}
                  onGoPrevious={handleStepEditorGoPrevious(stepIndex)}
                  onGoNext={handleStepEditorGoNext(stepIndex)}
                  onCancel={handleStepEditorCancel(stepIndex)}
                  onDeleteClick={handleDeleteClick(stepIndex)}
                />
              </StepsListItem>
            ))}

            <StepsListItem key="adding-step">
              <StepAdder onInput={handleStepAdderInput} />
            </StepsListItem>
          </StepsList>
        </StepsContainer>
      </Stack>

      <OtherContainer>
        <Column>
          <TagsContainer>
            <H3>Tags</H3>
            <TagsBox test={test} />
          </TagsContainer>

          <LinksContainer>
            <H3>Links</H3>
            <LinksBox test={test} />
          </LinksContainer>
        </Column>
        <Column>
          <RunsContainer>
            <H3>Runs</H3>
            <RunsBox test={test} />
          </RunsContainer>
        </Column>
      </OtherContainer>
    </Stack>
  );
}
