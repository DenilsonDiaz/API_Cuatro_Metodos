import assert from "node:assert/strict";
import test from "node:test";
import { createSystemStatus } from "@monorepo/shared";

test("el backend utiliza la librería compartida", () => {
  const result = createSystemStatus("Backend REST");
  assert.match(result.message, /@monorepo\/shared/);
});
