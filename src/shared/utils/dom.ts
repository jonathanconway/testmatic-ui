export function querySelectorParent(
  element: HTMLElement | null | undefined,
  selector: string
): HTMLElement | null {
  if (!element) {
    return null;
  }

  if (element.matches(selector)) {
    return element;
  }

  return querySelectorParent(element.parentElement, selector);
}
