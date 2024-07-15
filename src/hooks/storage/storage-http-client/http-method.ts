import { TypeOfConst } from "../../../shared";

export const HttpMethods = {
  Get: "GET",
  Put: "PUT",
  Post: "POST",
  Patch: "PATCH",
  Delete: "DELETE",
};

export type HttpMethod = TypeOfConst<typeof HttpMethods>;
