import { ICityModel } from "../models/ICityModel";

export interface IGetCityByStateUseCase {
  getCityByState(state: string): Promise<ICityModel[]>;
}
