import chalk from "chalk";
import "dotenv/config";
import app from "./index.js";

const startServer = () => {
  const port = process.env.PORT ?? 4000;

  app.listen(() => {
    chalk.inverse.bgYellowBright(`Listening on http://localhost:${port}`);
  });
};

export default startServer;
