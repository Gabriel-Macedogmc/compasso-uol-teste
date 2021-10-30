import { ICityModel } from "../models/ICityModel";

export interface IGetCityByNameUseCase {
  getCityByName(name: string): Promise<ICityModel | undefined>;
}
