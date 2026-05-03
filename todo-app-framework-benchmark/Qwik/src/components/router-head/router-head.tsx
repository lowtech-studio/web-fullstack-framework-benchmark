import { component$ } from "@builder.io/qwik";

/**
 * The RouterHead component is placed inside of the document `<head>` element.
 */
export const RouterHead = component$(() => {
  return (
    <>
      <title>ToDo App</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </>
  );
});
