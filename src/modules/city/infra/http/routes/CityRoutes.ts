import { CityController } from "./../controllers/CityController";
import { createCityValidation } from "../validations/CityValidations";
import { Router } from "express";

const cityRouter = Router();
const cityController = new CityController();

cityRouter.post("/", createCityValidation, cityController.create);
cityRouter.get("/name/:name", cityController.show);
cityRouter.get("/state/:state", cityController.index);

export { cityRouter };
