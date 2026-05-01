/*
 * WHAT IS THIS FILE?
 *
 * It's the entry point for the Express HTTP server when building for production.
 *
 * Learn more about Node.js server integrations here:
 * - https://qwik.dev/docs/deployments/node/
 *
 */
import { createQwikCity } from "@builder.io/qwik-city/middleware/node";
import render from "./entry.ssr";
import { manifest } from "@qwik-client-manifest";
import { join } from "node:path";

const { router, notFound } = createQwikCity({
  render,
  manifest,
  qwikCityPlan: await import("@qwik-city-plan"),
  static: {
    root: join(import.meta.dirname, "..", "dist"),
    cacheControl: "public, max-age=31557600",
  },
});

export { router, notFound };
