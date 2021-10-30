import { IClientModel } from "../models/IClientModel";

export interface IGetClientByIdUseCase {
  getClientById(id: string): Promise<IClientModel>;
}
