import { IClientModel } from "../models/IClientModel";

export interface ICreateClientUseCase {
  create(params: Omit<IClientModel, "id">): Promise<IClientModel>;
}
