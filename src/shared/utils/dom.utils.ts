export function querySelectorParent(
  element: HTMLElement | null | undefined,
  selector: string
) {
  if (!element) {
    return null;
  }

  if (element.matches(selector)) {
    return element;
  }

  return null;
}
