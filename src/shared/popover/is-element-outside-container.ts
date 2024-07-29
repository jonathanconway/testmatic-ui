function isDescendentOf(element: HTMLElement, parent: HTMLElement) {
  while (element) {
    if (element === parent) {
      return true;
    }
    element = element.parentElement as HTMLElement;
  }
  return false;
}

export function getIsElementOutsideContainer(
  element?: HTMLElement | null,
  containerElement?: HTMLDivElement | null,
) {
  if (!element) {
    return false;
  }

  if (!containerElement) {
    return false;
  }

  return !isDescendentOf(element as HTMLElement, containerElement);
}
