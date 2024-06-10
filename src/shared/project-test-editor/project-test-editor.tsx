import { Button } from "../button";
import { useGetProject } from "../project/use-get-project.hook";
import { usePostProject } from "../project/use-post-project.hook";
import { stepFragments } from "../step";
import { StepEditor } from "../step/step-editor/step-editor";
import { LinksBox } from "./links-box";
import {
  H2,
  Container,
  StepsList,
  StepsListItem,
  Header,
  StepTokenText,
  StepTokenTag,
  StepsContainer,
  OtherContainer,
  Column,
  TagsContainer,
  LinksContainer,
  StepsActionContainer,
  RunsContainer,
  H3,
} from "./project-test-editor.styles";
import { RunsBox } from "./runs-box";
import { TagsBox } from "./tags-box";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Step, Test, projectUpdateTest } from "testmatic";

interface ProjectTestEditorProps {
  readonly test: Test;
}

interface ProjectTestEditorStateProps {
  readonly test?: Test;
  readonly editingStep?: Step;
  readonly addingStep?: Step;
}

export function ProjectTestEditor(props: ProjectTestEditorProps) {
  const [state, setState] = useState<ProjectTestEditorStateProps>({});

  const { data: project } = useGetProject();
  const { mutateAsync: postProject } = usePostProject();

  const { editingStep, addingStep } = state;

  const test = state.test ?? props.test;

  const handleClickSave = () => {
    if (!project) {
      return;
    }
    const { test: updatedTest } = state;
    if (!updatedTest) {
      return;
    }

    const testName = props.test.name;

    postProject(projectUpdateTest({ project, testName, updatedTest }));
  };

  const handleClickStep = (step: Step) => {
    return () => {
      setState({
        ...state,
        editingStep: step,
      });
    };
  };

  const handleEditStepCancel = () => {
    setState({
      ...state,
      editingStep: undefined,
    });
  };

  const handleEditStepSave = (savedStep: Step) => {
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

  const handleAddStepCancel = () => {
    setState({
      ...state,
      editingStep: undefined,
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

  const handleClickAddStep = () => {
    setState({
      ...state,
      addingStep: { tags: [], text: "" },
    });
  };

  return (
    <Container>
      <Header>
        <H2>Test: {props.test.title}</H2>
        <div>
          <Button disabled={!state.test} onClick={handleClickSave}>
            Save
          </Button>
        </div>
      </Header>

      <StepsContainer>
        <StepsList>
          {test.steps.map((step, index) => (
            <StepsListItem key={`${step.text}_${index}`}>
              {editingStep === step ? (
                <StepEditor
                  step={editingStep}
                  onCancel={handleEditStepCancel}
                  onSave={handleEditStepSave}
                />
              ) : (
                <span onClick={handleClickStep(step)}>
                  {stepFragments(step).map((token, index) => {
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
                            <Link to={`/tag_${token.tag.name}`}>
                              ({token.value})
                            </Link>
                          </StepTokenTag>
                        );
                      default:
                        return null;
                    }
                  })}
                </span>
              )}
            </StepsListItem>
          ))}

          {addingStep && (
            <StepsListItem key="adding-step">
              <StepEditor
                step={editingStep}
                onCancel={handleAddStepCancel}
                onSave={handleAddStepSave}
              />
            </StepsListItem>
          )}
        </StepsList>

        <StepsActionContainer>
          {!addingStep && (
            <Button onClick={handleClickAddStep}>Add step</Button>
          )}
        </StepsActionContainer>
      </StepsContainer>

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
