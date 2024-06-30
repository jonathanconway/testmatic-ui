import { SERVER_BASE_URL } from "./base";

export function projectGet() {
  return fetch(`${SERVER_BASE_URL}/project`);
}
