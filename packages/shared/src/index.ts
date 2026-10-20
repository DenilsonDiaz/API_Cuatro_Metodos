export type SystemStatus = {
  application: string;
  message: string;
  status: "activo";
  sharedLibrary: string;
};

export function createSystemMessage(application: string): string {
  return `${application} está utilizando la librería @monorepo/shared`;
}

export function createSystemStatus(application: string): SystemStatus {
  return {
    application,
    message: createSystemMessage(application),
    status: "activo",
    sharedLibrary: "@monorepo/shared"
  };
}
