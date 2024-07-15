import { Button } from "../../button";
import { Heading } from "../../heading";
import { Stack } from "../../layout";
import { StepAdder, StepEditor } from "../../step";

import * as Styled from "./test-editor-steps.styles";
import { useTestEditorSteps } from "./use-test-editor-steps.hook";

export function TestEditorSteps() {
  const {
    stepsContainerRef,
    stepAdderRef,
    steps,

    handleClickAddStep,
    handleStepAdderInput,
    handleStepEditorChange,
    handleStepEditorGoPrevious,
    handleStepEditorGoLast,
    handleStepEditorGoNext,
    handleDeleteClick,
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
                  onChange={handleStepEditorChange(stepIndex)}
                  onGoPrevious={handleStepEditorGoPrevious(stepIndex)}
                  onGoNext={handleStepEditorGoNext(stepIndex)}
                  onDeleteClick={handleDeleteClick(stepIndex)}
                />
              </Styled.StepsListItem>
            ))}

            <Styled.StepsListItem key="adding-step" $counter={steps.length + 1}>
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
