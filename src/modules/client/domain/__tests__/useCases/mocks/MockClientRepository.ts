import { MockClientParams } from "./../../domain/MockClient";
import { IClientModel } from "@modules/client/domain/models/IClientModel";
import { IClientRepository } from "@modules/client/domain/repositories/IClientRepository";

export class ClientRepositorySpy implements IClientRepository {
  public async create(params: Omit<IClientModel, "id">): Promise<IClientModel> {
    const data: IClientModel = {
      id: "any_id",
      ...params,
    };

    return data;
  }

  public async getAllByName(name: string): Promise<IClientModel[]> {
    const params = MockClientParams();
    const data: IClientModel[] = [
      {
        id: "any_id",
        ...params,
      },
      { id: "any_id", ...params },
    ];

    const clients = data.filter(client => client.full_name === name);

    return clients;
  }

  public async getSingleById(id: string): Promise<IClientModel> {
    const params = MockClientParams();

    const data: IClientModel[] = [
      {
        id: "any_id",
        ...params,
      },
      { id: "any_id", ...params },
    ];

    const client = data.find(client => client.id === id);

    return client;
  }

  public async delete(id: string): Promise<void> {
    const params = MockClientParams();

    const data: IClientModel[] = [
      {
        id: "any_id",
        ...params,
      },
      { id: "any_id", ...params },
    ];

    const findIndex = data.findIndex(client => client.id === id);

    data.splice(findIndex, 1);
  }

  public async update(params: Omit<IClientModel, "id">): Promise<IClientModel> {
    const data: IClientModel = {
      id: "any_id",
      ...params,
    };

    return data;
  }
}
