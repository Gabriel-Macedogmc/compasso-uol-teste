import { app } from "./app";

const port = process.env.APP_PORT || 3333;

const currentHour = new Date(Date.now()).getHours();
const currentMinutes = new Date(Date.now()).getMinutes();
const currentSeconds = new Date(Date.now()).getSeconds();

const server = app.listen(port, () => {
  console.info(
    "\x1b[32m",
    `[SERVER] ${currentHour}:${currentMinutes}:${currentSeconds} > server online 🚀`,
    "\x1b[0m",
  );
  console.info(
    "\x1b[32m",
    `[PORT] ${currentHour}:${currentMinutes}:${currentSeconds} > running on port: ${port} 🚪`,
    "\x1b[0m",
  );
});

process.on("SIGINT", () => {
  server.close();
  console.info(
    "\x1b[33m",
    `[SERVER] ${currentHour}:${currentMinutes}:${currentSeconds} > server offline`,
    "\x1b[0m",
  );
});
