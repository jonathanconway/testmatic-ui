import { Button } from "../../button";
import { Heading } from "../../heading";
import { Stack } from "../../layout";
import { StepAdder, StepEditor } from "../../step";
import * as Styled from "./test-editor-steps.styles";
import { useTestEditorSteps } from "./use-test-editor-steps.hook";
import { Test } from "testmatic";

interface TestEditorStepsProps {
  readonly test?: Test;
  readonly onChange: (updatedTest: Test) => void;
}

export function TestEditorSteps(props: TestEditorStepsProps) {
  const {
    stepsContainerRef,
    stepAdderRef,
    steps,
    editingStep,
    handleClickAddStep,
    handleStepAdderInput,
    handleStepEditorClick,
    handleStepEditorEditingStepChange,
    handleStepEditorGoPrevious,
    handleStepEditorGoLast,
    handleStepEditorGoNext,
    handleStepEditorCancel,
    handleDeleteClick,
  } = useTestEditorSteps(props);

  return (
    <Styled.Container>
      <Stack spacing={1} ref={stepsContainerRef}>
        <Styled.StepsHeader>
          <Heading level={3}>Steps</Heading>
          <Button onClick={handleClickAddStep}>Add step</Button>
        </Styled.StepsHeader>

        <Styled.StepsMain>
          <Styled.StepsList>
            {steps.map((step, stepIndex) => (
              <Styled.StepsListItem key={`${step.text}_${stepIndex}`}>
                <StepEditor
                  isEditing={editingStep === step}
                  step={step}
                  onClick={handleStepEditorClick(step)}
                  onChange={handleStepEditorEditingStepChange(stepIndex)}
                  onGoPrevious={handleStepEditorGoPrevious(stepIndex)}
                  onGoNext={handleStepEditorGoNext(stepIndex)}
                  onCancel={handleStepEditorCancel(stepIndex)}
                  onDeleteClick={handleDeleteClick(stepIndex)}
                />
              </Styled.StepsListItem>
            ))}

            <Styled.StepsListItem key="adding-step">
              <StepAdder
                ref={stepAdderRef}
                onInput={handleStepAdderInput}
                onGoPrevious={handleStepEditorGoLast}
              />
            </Styled.StepsListItem>
          </Styled.StepsList>
        </Styled.StepsMain>
      </Stack>
    </Styled.Container>
  );
}
