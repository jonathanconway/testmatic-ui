import { AddRemoveListBox } from "../../add-remove-list-box";
import { Heading } from "../../heading";
import { Stack } from "../../layout";
import { ListBoxItem } from "../../list-box";
import { Tooltip } from "../../tooltip";

import { LinksBoxAddLink } from "./test-editor-links-add-link";
import { useTestLinks } from "./use-test-editor-links.hook";

export function TestEditorLinks() {
  const { links, handleDeleteClick } = useTestLinks();

  return (
    <Stack spacing={1} flex={1}>
      <AddRemoveListBox
        headerContent={<Heading level={3}>Links</Heading>}
        renderAddItemPopupContent={({ close }) => (
          <LinksBoxAddLink close={close} />
        )}
      >
        {links.map((link) => (
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
