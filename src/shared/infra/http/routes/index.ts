import { cityRouter } from "@modules/city/infra/http/routes/CityRoutes";
import { clientRoutes } from "@modules/client/infra/http/routes/ClientRoutes";
import { Router } from "express";

const routers = Router();

routers.use("/city", cityRouter);
routers.use("/client", clientRoutes);
export { routers };
