import { Box } from "../../../box";
import { CheckBox } from "../../../check-box";
import { Heading } from "../../../heading";
import { Stack } from "../../../layout";
import { StepEditorDisplay } from "../../../step";

import * as Styled from "./run-editor-steps.styles";
import { useRunEditorSteps } from "./use-run-editor-steps.hook";

export function RunEditorSteps() {
  const { steps, completed, stepsContainerRef, handleClickStepCompleted } =
    useRunEditorSteps();

  return (
    <Styled.Container>
      <Stack spacing={1}>
        <Styled.StepsHeader>
          <Heading level={3}>Steps</Heading>
        </Styled.StepsHeader>

        <Styled.StepsMain ref={stepsContainerRef}>
          <Styled.StepsList>
            {steps.map((step, stepIndex) => (
              <Styled.StepsListItem
                key={`${step.text}_${stepIndex}`}
                $checked={completed[stepIndex]}
              >
                <Styled.StepsListItemLabel
                  htmlFor={`${step.text}_${stepIndex}`}
                  style={{ display: "inline-block" }}
                >
                  <Stack direction="row" alignItems="center">
                    <CheckBox
                      id={`${step.text}_${stepIndex}`}
                      checked={completed[stepIndex]}
                      onChange={() => handleClickStepCompleted(stepIndex)}
                    />

                    <Box mx={1}>{stepIndex + 1}.</Box>

                    <StepEditorDisplay step={step} />
                  </Stack>
                </Styled.StepsListItemLabel>
              </Styled.StepsListItem>
            ))}
          </Styled.StepsList>
        </Styled.StepsMain>
      </Stack>
    </Styled.Container>
  );
}
