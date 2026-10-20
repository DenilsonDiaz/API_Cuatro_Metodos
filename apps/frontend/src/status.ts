import { createSystemStatus } from "@monorepo/shared";

export function getFrontendStatus() {
  return createSystemStatus("Frontend");
}
