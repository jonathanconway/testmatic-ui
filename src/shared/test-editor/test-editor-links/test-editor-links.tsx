import { AddRemoveListBox } from "../../add-remove-list-box";
import { Heading } from "../../heading";
import { Stack } from "../../layout";
import { ListBoxItem } from "../../list-box";
import { Tooltip } from "../../tooltip";
import { LinksBoxAddLink } from "./test-editor-links-add-link";
import { useTestLinks } from "./use-test-editor-links.hook";
import { Test } from "testmatic";

export interface TestEditorLinksProps {
  readonly test: Test;
}

export function TestEditorLinks(props: TestEditorLinksProps) {
  const { handleDeleteClick } = useTestLinks(props);

  return (
    <Stack spacing={1}>
      <AddRemoveListBox
        headerContent={<Heading level={3}>Links</Heading>}
        renderAddItemPopupContent={({ close }) => (
          <LinksBoxAddLink test={props.test} close={close} />
        )}
      >
        {props.test.links.map((link) => (
          <ListBoxItem
            key={link.href}
            value={link.href}
            onDeleteClick={() => handleDeleteClick(link)}
          >
            🔗&nbsp;
            <Tooltip
              contents={
                link.title && link.title !== link.href ? link.href : undefined
              }
            >
              <a href={link.href} target="_blank" rel="noreferrer">
                {link.title ?? link.href}
              </a>
            </Tooltip>
          </ListBoxItem>
        ))}
      </AddRemoveListBox>
    </Stack>
  );
}
