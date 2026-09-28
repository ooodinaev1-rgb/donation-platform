import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import jwt from "@fastify/jwt";
import dotenv from "dotenv";

dotenv.config();

const app = Fastify({
  logger: true
});

await app.register(helmet);

await app.register(cors, {
  origin: true
});

await app.register(jwt, {
  secret: process.env.JWT_SECRET as string
});

app.get("/health", async () => {
  return {
    success: true,
    service: "donation-platform-api",
    status: "online"
  };
});

app.listen({
  port: Number(process.env.PORT || 3000),
  host: "0.0.0.0"
}).then(() => {
  console.log("API server started");
});