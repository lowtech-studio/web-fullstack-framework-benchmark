import type { RequestHandler } from "@builder.io/qwik-city";
import { deleteTodoById } from "~/lib/db";

export const onDelete: RequestHandler = async ({ request, json }) => {
  const body = await request.json();
  if (!body.id) {
    json(400, { status: "error", message: "id is required" });
    return;
  }
  deleteTodoById(Number(body.id));
  json(200, { status: "ok" });
};
