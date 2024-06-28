import { BASE_URL } from "./base";

export function projectGet() {
  return fetch(`${BASE_URL}/project`);
}
