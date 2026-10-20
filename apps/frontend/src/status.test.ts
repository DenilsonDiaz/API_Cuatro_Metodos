import assert from "node:assert/strict";
import test from "node:test";
import { getFrontendStatus } from "./status.ts";

test("el frontend utiliza la librería compartida", () => {
  const result = getFrontendStatus();
  assert.equal(result.sharedLibrary, "@monorepo/shared");
});
