import { ClientController } from "./../controllers/ClientController";
import { Router } from "express";
import { createClientValidation } from "../validations/ClientValidation";

const clientRoutes = Router();
const clientController = new ClientController();

clientRoutes.post("/", createClientValidation, clientController.create);
clientRoutes.get("/:id", clientController.show);
clientRoutes.get("/name/:name", clientController.index);

export { clientRoutes };
