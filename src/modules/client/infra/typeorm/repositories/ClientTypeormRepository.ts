import { getRepository } from "typeorm";
import { ClientTypeormModel } from "./../models/ClientTypeormModel";
import { Repository } from "typeorm";
import { IClientModel } from "@modules/client/domain/models/IClientModel";
import { IClientRepository } from "@modules/client/domain/repositories/IClientRepository";

export class ClientTypeormRepository implements IClientRepository {
  private readonly ormRepository: Repository<ClientTypeormModel>;

  constructor() {
    this.ormRepository = getRepository(ClientTypeormModel);
  }

  public async create(params: Omit<IClientModel, "id">): Promise<IClientModel> {
    const client = this.ormRepository.create(params);

    await this.ormRepository.save(client);

    return client;
  }

  public async getAllByName(name: string): Promise<IClientModel[]> {
    const client = await this.ormRepository.find({
      relations: ["city"],
      where: { full_name: name },
    });

    return client;
  }

  public async getSingleById(id: string): Promise<IClientModel> {
    const client = await this.ormRepository.findOne(id, {
      relations: ["city"],
    });

    return client;
  }

  public async update(params: Omit<IClientModel, "id">): Promise<IClientModel> {
    const client = await this.ormRepository.save(params);

    return client;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
