import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import productRouter from "./routes/productRoutes.js";
import uploadRouter from "./routes/uploadRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Ruta principal de salud
app.get("/", (req: Request, res: Response) => {
  res.send("Server is Live!");
});

// Rutas de la API
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/orders", orderRouter);
app.use("/api/inngest", serve({ client: inngest, functions }));

// Control de errores global
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  res.status(500).json({ message: error.message });
});

// EXPORTACIÓN OBLIGATORIA PARA VERCEL
export default app;

// Escuchar solo en entorno local de desarrollo
if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Servicio esta Corriendo en http://localhost:${port}`);
  });
}