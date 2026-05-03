import type { RequestHandler } from "@builder.io/qwik-city";
import { getAllTodos } from "~/lib/db";

export const onGet: RequestHandler = ({ json }) => {
  json(200, getAllTodos());
};
