import { Button } from "../../button";
import { Heading } from "../../heading";
import { Stack } from "../../layout";
import { StepAdder, StepAdderHint, StepEditor } from "../../step";

import * as Styled from "./test-editor-steps.styles";
import { useTestEditorSteps } from "./use-test-editor-steps.hook";

export function TestEditorSteps() {
  const {
    stepsContainerRef,
    steps,

    handleClickAddStep,

    handleStepEditorBlur,
    handleStepEditorGoPrevious,
    handleStepEditorGoNext,
    handleStepEditorDeleteClick,

    isAddingStep,
    addingStep,
    handleAddingStepEditorBlur,
    handleAddingStepEditorGoPrevious,
  } = useTestEditorSteps();

  return (
    <Styled.Container>
      <Stack spacing={1} ref={stepsContainerRef}>
        <Styled.StepsHeader>
          <Heading level={3}>Steps </Heading>
          <Button onClick={handleClickAddStep}>Add step</Button>
        </Styled.StepsHeader>

        <Styled.StepsMain>
          <Styled.StepsList>
            {steps.map((step, stepIndex) => (
              <Styled.StepsListItem
                key={`${step.text}_${stepIndex}`}
                $counter={stepIndex + 1}
              >
                <StepEditor
                  step={step}
                  stepIndex={stepIndex}
                  onBlur={handleStepEditorBlur(stepIndex)}
                  onGoPrevious={handleStepEditorGoPrevious(stepIndex)}
                  onGoNext={handleStepEditorGoNext(stepIndex)}
                  onDeleteClick={handleStepEditorDeleteClick(stepIndex)}
                />
              </Styled.StepsListItem>
            ))}

            <Styled.StepsListItem
              key="step-adder-item"
              $counter={steps.length + 1}
            >
              <StepAdder
                step={addingStep}
                stepIndex={steps.length}
                onBlur={handleAddingStepEditorBlur}
                onGoPrevious={handleAddingStepEditorGoPrevious}
              />
            </Styled.StepsListItem>

            {/*
              When the user is adding a step, provide visual feedback of
              where the next step will be positioned.
            */}
            {isAddingStep && (
              <Styled.StepsListItem
                key="step-adder-hint"
                $counter={steps.length + 2}
              >
                <StepAdderHint />
              </Styled.StepsListItem>
            )}
          </Styled.StepsList>
        </Styled.StepsMain>
      </Stack>
    </Styled.Container>
  );
}
