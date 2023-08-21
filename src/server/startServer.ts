import "dotenv";
import app from "./index.js";

const startServer = () => {
  const port = process.env.PORT ?? 4000;

  app.listen(Number(port), () => {
    console.log(`Listening on http://localhost:${port}`);
  });
};

export default startServer;
