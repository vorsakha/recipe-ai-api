import express from "express";
import cors from "cors";
import env from "@/config/envs";

import router from "@/router";

const init = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(router);

  return app;
};

const serve = () => {
  const app = init();
  app.listen(env.PORT);
};

export default { init, serve };
