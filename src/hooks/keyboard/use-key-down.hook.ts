import { useEffect } from "react";

import { KeyCode } from "./key-codes";

interface UseKeyDownParams {
  readonly handlers: Record<KeyCode, (event: KeyboardEvent) => any>;
}

export function useWindowKeyDown(params: UseKeyDownParams) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      params.handlers[event.key]?.(event);
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
}

export function useKeyDown(params: UseKeyDownParams) {
  function onKeyDown(event: KeyboardEvent) {
    params.handlers[event.key]?.(event);
  }

  return { onKeyDown };
}
