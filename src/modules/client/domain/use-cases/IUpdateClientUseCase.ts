import { IClientModel, IUpdateClientModel } from "../models/IClientModel";

export interface IUpdateClientUseCase {
  updateClient(params: IUpdateClientModel): Promise<IClientModel>;
}
