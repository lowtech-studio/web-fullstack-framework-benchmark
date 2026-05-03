import type { RequestHandler } from "@builder.io/qwik-city";
import { createTodo } from "~/lib/db";

export const onPost: RequestHandler = async ({ request, json }) => {
  const body = await request.json();
  if (!body.todo) {
    json(400, { status: "error", message: "todo is required" });
    return;
  }
  createTodo(body.todo);
  json(200, { status: "ok" });
};
