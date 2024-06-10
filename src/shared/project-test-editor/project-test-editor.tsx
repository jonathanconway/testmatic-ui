import { Button } from "../button";
import { useGetProject, usePostProject } from "../project";
import { StepEditor } from "../step";
import { TitleEditor } from "../title-editor";
import { LinksBox } from "./links-box";
import {
  H2,
  Container,
  StepsList,
  StepsListItem,
  Header,
  StepsContainer,
  OtherContainer,
  Column,
  TagsContainer,
  LinksContainer,
  StepsActionContainer,
  RunsContainer,
  H3,
  TopContainer,
} from "./project-test-editor.styles";
import { RunsBox } from "./runs-box";
import { TagsBox } from "./tags-box";
import { useMemo, useState } from "react";
import { Step, Test, projectAddTest, projectUpdateTest } from "testmatic";

interface ProjectTestEditorProps {
  readonly test: Test;
  readonly onCloseClick: VoidFunction;
}

interface ProjectTestEditorState {
  readonly test?: Test;
  readonly editingStep?: Step;
  readonly addingStep?: Step;
}

const STEP_NEW: Step = {
  text: "New step",
  tags: [],
};

export function ProjectTestEditor(props: ProjectTestEditorProps) {
  const [state, setState] = useState<ProjectTestEditorState>({});

  const { data: project } = useGetProject();
  const { mutateAsync: postProject } = usePostProject();

  const { editingStep, addingStep } = state;

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
    setState({
      ...state,
      test: {
        ...test,
        title: event.target.value,
      },
    });
  };

  const handleClickStep = (step: Step) => {
    setState({
      ...state,
      addingStep: undefined,
      editingStep: step,
    });
  };

  const handleEditStepCancel = () => {
    setState({
      ...state,
      editingStep: undefined,
      addingStep: undefined,
    });
  };

  const handleEditStepSave = (savedStep: Step) => {
    console.log(
      "handleEditStepSave",
      { savedStep, editingStep },
      editingStep ? test.steps.indexOf(editingStep) : undefined
    );
    setState({
      ...state,
      editingStep: undefined,
      test: {
        ...test,
        steps: test.steps.map((existingStep) =>
          existingStep === editingStep ? savedStep : existingStep
        ),
      },
    });
  };

  const handleClickAddStep = () => {
    setState({
      ...state,
      editingStep: undefined,
      addingStep: undefined,
    });
    setState({
      ...state,
      editingStep: undefined,
      addingStep: { tags: [], text: "" },
    });
  };

  const handleAddStepCancel = () => {
    setState({
      ...state,
      editingStep: undefined,
      addingStep: undefined,
    });
  };

  const handleAddStepSave = (step: Step) => {
    setState({
      editingStep: undefined,
      test: {
        ...test,
        steps: [...test.steps, step],
      },
    });
  };

  return (
    <Container>
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
          <Button onClick={props.onCloseClick}>✕</Button>
        </div>
      </Header>

      <TopContainer>
        <H3>Steps</H3>

        <StepsContainer>
          <StepsList>
            {test.steps.map((step, index) => (
              <StepsListItem key={`${step.text}_${index}`}>
                <StepEditor step={step} />
              </StepsListItem>
            ))}

            {addingStep && (
              <StepsListItem key="adding-step">
                <StepEditor step={STEP_NEW} />
              </StepsListItem>
            )}
          </StepsList>

          <StepsActionContainer>
            {!addingStep && (
              <Button onClick={handleClickAddStep}>Add step</Button>
            )}
          </StepsActionContainer>
        </StepsContainer>
      </TopContainer>

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
    </Container>
  );
}
