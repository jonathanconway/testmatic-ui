import { Link } from "react-router-dom";
import { Test } from "testmatic";

import { Box } from "../../box";
import { Heading } from "../../heading";
import { Icon } from "../../icon";
import { Stack } from "../../layout";
import { ListBox } from "../../list-box";
import { runEditorRoute, runResultEmoji } from "../../run";
import { formatDateTimeString } from "../../utils";

export interface TestEditorRunsProps {
  readonly test: Test;
}

export function TestEditorRuns(props: TestEditorRunsProps) {
  return (
    <Stack spacing={1}>
      <Heading level={3}>Runs</Heading>

      <ListBox>
        {props.test.runs.map((run) => (
          <Stack direction="row" gap={0.5} alignItems="center">
            <Icon icon="run" />
            <Box flex={1}>
              <Link
                to={runEditorRoute({
                  testName: props.test.name,
                  runDateTime: run.dateTime,
                })}
              >
                {formatDateTimeString(run.dateTime)}
              </Link>
            </Box>
            <Box>{runResultEmoji(run.result)}</Box>
          </Stack>
        ))}
      </ListBox>
    </Stack>
  );
}
