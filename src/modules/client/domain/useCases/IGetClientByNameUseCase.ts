import { IClientModel } from "../models/IClientModel";

export interface IGetClientByNameUseCase {
  getClientByName(name: string): Promise<IClientModel[]>;
}
