import { ICityModel } from "../models/ICityModel";

export interface ICreateCityUseCase {
  create(params: Omit<ICityModel, "id">): Promise<ICityModel>;
}
