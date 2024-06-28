import { Run, Test, getRunFilepath } from "testmatic";
import { Heading } from "../../../heading";
import { Stack } from "../../../layout";
import { Box } from "../../../box";
import { testRunFolderOpen } from "../../../client";
import { IconButton } from "../../../icon-button";
import { IconNames } from "../../../icon";
import { Tooltip } from "../../../tooltip";
import { TextOverflow } from "../../../text-overflow";

interface RunEditorFolderProps {
  readonly test: Test;
  readonly run: Run;
}

export function RunEditorFolder(props: RunEditorFolderProps) {
  const runFilepath = getRunFilepath(props.test, props.run);
  const runFilepathUrl = `file:///${runFilepath}`;

  const handleOpenClick = () => {
    testRunFolderOpen(props.test.name, props.run.dateTime);
  };

  return (
    <Stack spacing={1}>
      <Heading level={3}>Folder</Heading>

      <Box width="100%">
        <Stack direction="row" alignItems="center" spacing={1} flex={1}>
          <TextOverflow>
            <Tooltip contents={runFilepath}>
              <a
                style={{
                  maxWidth: "14rem",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "inline-block",
                }}
                href={runFilepathUrl}
              >
                {runFilepath}
              </a>
            </Tooltip>
          </TextOverflow>

          <Tooltip contents="Open folder">
            <IconButton icon={IconNames.FolderOpen} onClick={handleOpenClick} />
          </Tooltip>
        </Stack>
      </Box>
    </Stack>
  );
}
