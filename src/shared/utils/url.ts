export function isUrl(input: string) {
  try {
    return Boolean(new URL(input));
  } catch (e) {
    return false;
  }
}
