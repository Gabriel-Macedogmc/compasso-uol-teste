import { ClientController } from "./../controllers/ClientController";
import { Router } from "express";
import {
  createClientValidation,
  updateClientValidation,
  paramsClientValidation,
} from "../validations/ClientValidation";

const clientRoutes = Router();
const clientController = new ClientController();

clientRoutes.post("/", createClientValidation, clientController.create);
clientRoutes.get("/:id", paramsClientValidation, clientController.show);
clientRoutes.get("/name/:name", clientController.index);
clientRoutes.put(
  "/:id",
  paramsClientValidation,
  updateClientValidation,
  clientController.update,
);
clientRoutes.delete("/:id", paramsClientValidation, clientController.delete);

export { clientRoutes };
