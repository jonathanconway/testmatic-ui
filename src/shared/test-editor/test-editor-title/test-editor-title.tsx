import { TitleEditor } from "../../title-editor";
import { Ids } from "../test-editor.const";

import { useTestEditorTitle } from "./use-test-editor-title.hook";

export function TestEditorTitle() {
  const { title, isNewTest, handleChangeTitle } = useTestEditorTitle();

  return (
    <TitleEditor
      id={Ids.TitleEditor}
      defaultValue={title}
      autoFocus={isNewTest}
      autoSelect={isNewTest}
      onBlur={handleChangeTitle}
    />
  );
}
