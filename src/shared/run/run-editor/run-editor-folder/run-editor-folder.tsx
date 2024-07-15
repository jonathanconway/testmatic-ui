import { getRunFilepath } from "testmatic";

import { Box } from "../../../box";
import { testRunFolderOpen } from "../../../client";
import { Heading } from "../../../heading";
import { IconNames } from "../../../icon";
import { IconButton } from "../../../icon-button";
import { Stack } from "../../../layout";
import { Link } from "../../../link";
import { TextOverflow } from "../../../text-overflow";
import { Tooltip } from "../../../tooltip";
import { useEditingRun } from "../use-editing-run.hook";

export function RunEditorFolder() {
  const { test, run } = useEditingRun();

  if (!test || !run) {
    return null;
  }

  const runFilepath = getRunFilepath(test, run);
  const runFilepathUrl = `file:///${runFilepath}`;

  const handleOpenClick = () => {
    testRunFolderOpen(test.name, run.dateTime);
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
