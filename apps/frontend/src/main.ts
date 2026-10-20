import { createSystemMessage, type SystemStatus } from "@monorepo/shared";
import "./style.css";

const frontendMessage = document.querySelector<HTMLParagraphElement>("#frontend-message");
const backendMessage = document.querySelector<HTMLParagraphElement>("#backend-message");
const backendBadge = document.querySelector<HTMLSpanElement>("#backend-badge");

if (frontendMessage) frontendMessage.textContent = createSystemMessage("Frontend");

async function loadBackendStatus(): Promise<void> {
  try {
    const response = await fetch("http://localhost:3000/api/status");
    if (!response.ok) throw new Error("Respuesta no válida");
    const data = (await response.json()) as SystemStatus;
    if (backendMessage) backendMessage.textContent = data.message;
    if (backendBadge) {
      backendBadge.textContent = data.status;
      backendBadge.classList.remove("pending", "error");
    }
  } catch {
    if (backendMessage) backendMessage.textContent = "No fue posible conectar con el backend.";
    if (backendBadge) {
      backendBadge.textContent = "Sin conexión";
      backendBadge.classList.add("error");
    }
  }
}

void loadBackendStatus();
