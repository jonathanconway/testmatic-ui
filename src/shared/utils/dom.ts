import { last } from "lodash";

export function querySelectorParent(
  element: HTMLElement | null | undefined,
  selector: string,
): HTMLElement | null {
  if (!element) {
    return null;
  }

  if (element.matches(selector)) {
    return element;
  }

  return querySelectorParent(element.parentElement, selector);
}

export function getElementsByClassName(className: string) {
  return Array.from(
    document.getElementsByClassName(className),
  ) as HTMLElement[];
}

export function getLastElementByClassName(className: string) {
  return last(getElementsByClassName(className));
}

// export function querySelectorAllLast(
//   selector: string,
//   container?: HTMLElement | null,
// ) {
//   const elements = Array.from(
//     container?.querySelectorAll(selector) ?? [],
//   ) as HTMLElement[];
//   return last(elements);
// }
