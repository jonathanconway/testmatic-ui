import { RefObject, useEffect } from "react";

interface UseTextBoxAutoSelectParams {
  readonly inputRef: RefObject<HTMLTextAreaElement>;
  readonly autoSelect?: boolean;
}

export function useTextBoxAutoSelect(params: UseTextBoxAutoSelectParams) {
  useEffect(() => {
    if (!params.autoSelect) {
      return;
    }

    setTimeout(() => {
      const current = params.inputRef.current;
      if (!current) {
        return;
      }
      current.focus();
      current.selectionStart = 0;
      current.selectionEnd = current.value.length;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
