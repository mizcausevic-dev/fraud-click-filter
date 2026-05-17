import http from "node:http";
import { AddressInfo } from "node:net";

import app from "../src/app";

const routes = [
  "/",
  "/filter-lane",
  "/threat-signals",
  "/verification",
  "/docs",
  "/api/dashboard/summary",
  "/api/filter-lane",
  "/api/rules",
  "/api/threat-signals",
  "/api/verification",
  "/api/sample"
];

async function request(port: number, path: string) {
  return new Promise<number>((resolve, reject) => {
    const req = http.request(
      {
        hostname: "127.0.0.1",
        port,
        path,
        method: "GET"
      },
      (res) => {
        res.resume();
        res.on("end", () => resolve(res.statusCode ?? 0));
      }
    );

    req.on("error", reject);
    req.end();
  });
}

async function main() {
  const server = app.listen(0, "127.0.0.1");
  await new Promise<void>((resolve) => server.once("listening", () => resolve()));
  const { port } = server.address() as AddressInfo;

  try {
    for (const path of routes) {
      const status = await request(port, path);
      if (status !== 200) {
        throw new Error(`Smoke check failed for ${path} with status ${status}`);
      }
    }
    console.log("smoke ok");
  } finally {
    server.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
