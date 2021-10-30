import { ICityModel } from "../models/ICityModel";

export interface ICityRepository {
  create(params: Omit<ICityModel, "id">): Promise<ICityModel>;
  getSingleByName(name: string): Promise<ICityModel | undefined>;
  getAllByState(state: string): Promise<ICityModel[]>;
  getSingleById(id: string): Promise<ICityModel>;
}
