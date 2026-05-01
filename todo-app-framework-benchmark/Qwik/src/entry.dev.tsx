/*
 * WHAT IS THIS FILE?
 *
 * Development entry point using only client-side modules:
 * - Do not use this mode in production!
 * - No SSR
 *
 * This is used for vite dev server when running: npm run dev
 */
import { render } from "@builder.io/qwik";
import Root from "./root";

render(document, <Root />);
