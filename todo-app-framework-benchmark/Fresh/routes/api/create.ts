import { define } from "@/utils.ts";
import { createTodo } from "@/db.ts";

export const handlers = define.handlers({
  async POST(ctx) {
    const body = await ctx.req.json();
    if (!body.todo) {
      return new Response(
        JSON.stringify({ status: "error", message: "todo is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }
    createTodo(body.todo);
    return new Response(JSON.stringify({ status: "ok" }), {
      headers: { "Content-Type": "application/json" },
    });
  },
});
