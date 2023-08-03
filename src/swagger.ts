import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import ApiDocumentation from "@docs/api";

const serve = (app: Express) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(ApiDocumentation));
};

export default { serve };
