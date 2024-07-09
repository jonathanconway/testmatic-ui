import { Button } from "../../button";
import { IconButton } from "../../icon-button";
import { TEST_NEW_NAME } from "../../test-editor";
import { Tooltip } from "../../tooltip";
import * as Styled from "../project-explorer.styles";

import { ProjectExplorerTestItem } from "./project-explorer-test-item";
import { useProjectExplorerTests } from "./use-project-explorer-tests.hook";

export function ProjectExplorerTests() {
  const {
    project,
    selectedItemId,
    handleTestAddClick,
    handleTestAddCancelClick,
  } = useProjectExplorerTests();

  return (
    <Styled.ProjectExplorerSection>
      <Styled.ProjectExplorerSubheading>
        Tests <Button onClick={handleTestAddClick}>Add</Button>
      </Styled.ProjectExplorerSubheading>

      <div>
        {selectedItemId === TEST_NEW_NAME && (
          <Styled.ProjectExplorerItem
            key={TEST_NEW_NAME}
            $selected={test.name === selectedItemId}
            title="New test"
          >
            <Styled.ProjectExplorerItemMain>
              <span>✨ </span>
              <span>New test</span>
            </Styled.ProjectExplorerItemMain>

            <Styled.ProjectExplorerItemActions>
              <Tooltip contents="Cancel new test">
                <IconButton
                  size="small"
                  icon="delete"
                  onClick={handleTestAddCancelClick}
                />
              </Tooltip>
            </Styled.ProjectExplorerItemActions>
          </Styled.ProjectExplorerItem>
        )}

        {project?.tests.map((test) => (
          <ProjectExplorerTestItem key={test.name} test={test} />
        ))}
      </div>
    </Styled.ProjectExplorerSection>
  );
}
