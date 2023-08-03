import express from "express";
import cors from "cors";
import env from "@constants/envs";

import router from "@/router";
import swagger from "@/swagger";

const init = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(router);
  swagger.serve(app);

  return app;
};

const serve = () => {
  const app = init();
  app.listen(env.PORT);
};

export default { init, serve };
