import { define } from "@/utils.ts";
import { getAllTodos } from "@/db.ts";

export const handlers = define.handlers({
  GET(_ctx) {
    const todos = getAllTodos();
    return new Response(JSON.stringify(todos), {
      headers: { "Content-Type": "application/json" },
    });
  },
});
