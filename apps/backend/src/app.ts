import cors from "cors";
import express from "express";
import { createSystemStatus } from "@monorepo/shared";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_request, response) => {
  response.json(createSystemStatus("Backend REST"));
});

app.get("/api/status", (_request, response) => {
  response.json(createSystemStatus("Backend REST"));
});
