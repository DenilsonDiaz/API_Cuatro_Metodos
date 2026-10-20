import assert from "node:assert/strict";
import test from "node:test";
import { createSystemStatus } from "./index.ts";

test("crea un estado válido para una aplicación", () => {
  const result = createSystemStatus("Prueba");
  assert.equal(result.status, "activo");
  assert.equal(result.sharedLibrary, "@monorepo/shared");
});
