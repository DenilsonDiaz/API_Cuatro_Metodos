import { app } from "./app.js";

const port = 3000;

app.listen(port, () => {
  console.log(`Backend disponible en http://localhost:${port}`);
});
