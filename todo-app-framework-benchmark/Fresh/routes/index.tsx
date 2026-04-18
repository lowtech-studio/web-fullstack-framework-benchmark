import { define } from "@/utils.ts";
import TodoApp from "@/islands/TodoApp.tsx";

export default define.page(function Home() {
  return (
    <>
      <h1>ToDo App Benchmark</h1>
      <TodoApp />
    </>
  );
});
