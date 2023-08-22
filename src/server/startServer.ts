import debugCreator from "debug";
import app from "./index.js";

const debug = debugCreator("things:server:start");

const startServer = (port: number | string) => {
  app.listen(port, () => {
    debug(`Listening on http://localhost:${port}`);
  });
};

export default startServer;
