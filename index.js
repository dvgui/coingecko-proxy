import express from "express";
import { createServer } from "http";
import morgan from "morgan";
import { createProxyMiddleware } from "http-proxy-middleware";

import basicAuth from "./lib/basic-auth.js";

// Server Variables

const PORT = process.env.PORT || 3000;

// Application Variables
const API_SERVICE_URL = "https://api.coingecko.com";

const app = express();
const server = createServer(app);

app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

// Authorization - not working for
//app.use(basicAuth);

app.use(
  "/",
  createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
  })
);

const srv = server.listen(PORT, () => {
  const addr = server.address();
  const binding =
    typeof addr === "string" ? `pipe/socket ${addr}` : `port ${addr?.port}`;
  console.log(`Http server listening in ${binding}`);
});

srv.on("error", (error) => console.log(`Server error ${error}`));
