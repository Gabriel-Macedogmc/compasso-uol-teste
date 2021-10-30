import { IClientModel, IUpdateClientModel } from "./../models/IClientModel";

export interface IClientRepository {
  create(params: Omit<IClientModel, "id">): Promise<IClientModel>;
  getAllByName(name: string): Promise<IClientModel[]>;
  getSingleById(id: string): Promise<IClientModel>;
  delete(id: string): Promise<void>;
  update(params: Omit<IClientModel, "id">): Promise<IClientModel>;
}
