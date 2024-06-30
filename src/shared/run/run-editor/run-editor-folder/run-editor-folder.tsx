import { Run, Test, getRunFilepath } from "testmatic";

import { Box } from "../../../box";
import { testRunFolderOpen } from "../../../client";
import { Heading } from "../../../heading";
import { IconNames } from "../../../icon";
import { IconButton } from "../../../icon-button";
import { Stack } from "../../../layout";
import { Link } from "../../../link";
import { TextOverflow } from "../../../text-overflow";
import { Tooltip } from "../../../tooltip";

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
            <Link to={runFilepathUrl}>
              <Tooltip contents={runFilepath}>{runFilepath}</Tooltip>
            </Link>
          </TextOverflow>

          <Tooltip contents="Open folder">
            <IconButton icon={IconNames.FolderOpen} onClick={handleOpenClick} />
          </Tooltip>
        </Stack>
      </Box>
    </Stack>
  );
}
