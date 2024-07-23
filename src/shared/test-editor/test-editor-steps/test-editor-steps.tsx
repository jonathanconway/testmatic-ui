import { createTestStepFromText } from "testmatic";

import { Button } from "../../button";
import { Heading } from "../../heading";
import { Stack } from "../../layout";
import { StepAdder, StepEditor } from "../../step";

import { TestEditorStepsIds } from "./test-editor-steps.const";
import * as Styled from "./test-editor-steps.styles";
import { useTestEditorSteps } from "./use-test-editor-steps.hook";

const STEP_EMPTY = createTestStepFromText("");

export function TestEditorSteps() {
  const {
    stepsContainerRef,
    stepAdderRef,
    steps,

    handleClickAddStep,

    handleStepEditorChange,
    handleStepEditorGoPrevious,
    handleStepEditorGoLast,
    handleStepEditorGoNext,
    handleStepEditorDeleteClick,

    handleStepAdderFocus,
    handleStepAdderInput,

    addingStep,
    addingStepRef,
    afterFocusRef,
    handleAddingStepEditorChange,
    handleAddingStepEditorGoPrevious,
    handleAddingStepEditorGoNext,
    handleAddingStepEditorDeleteClick,
    handleAddingStepEditorBlur,
    handleAddingStepEditorInput,
  } = useTestEditorSteps();

  return (
    <Styled.Container>
      <Stack
        spacing={1}
        id={TestEditorStepsIds.Container}
        ref={stepsContainerRef}
      >
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
                  onChange={handleStepEditorChange(stepIndex)}
                  onGoPrevious={handleStepEditorGoPrevious(stepIndex)}
                  onGoNext={handleStepEditorGoNext(stepIndex)}
                  onDeleteClick={handleStepEditorDeleteClick(stepIndex)}
                />
              </Styled.StepsListItem>
            ))}

            <Styled.StepsListItem
              key="adding-step-trigger"
              $counter={steps.length + 1}
            >
              <StepEditor
                step={addingStep}
                stepIndex={steps.length}
                onChange={handleAddingStepEditorChange}
                onGoPrevious={handleAddingStepEditorGoPrevious}
                onGoNext={handleAddingStepEditorGoNext}
                onDeleteClick={handleAddingStepEditorDeleteClick}
                placeholder="Add new step"
              />
            </Styled.StepsListItem>
          </Styled.StepsList>
          <span ref={afterFocusRef} tabIndex={0}></span>
        </Styled.StepsMain>
      </Stack>
    </Styled.Container>
  );
}
