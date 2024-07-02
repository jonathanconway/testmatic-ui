export function getProjectPathCwd() {
  // Get the path which the user ran the `testmatic-ui` cli command from
  // (Or fallback to process cwd)
  const cwd = process.env.TESTMATIC_CWD ?? process.cwd();

  return `${cwd}/.testmatic`;
}
