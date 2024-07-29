export function addHTMLLineBreaksToPlainText(
  input?: string | number | readonly string[] | undefined,
) {
  return String(input ?? "").replaceAll("\n", "<br /> ") || "&nbsp;";
}
