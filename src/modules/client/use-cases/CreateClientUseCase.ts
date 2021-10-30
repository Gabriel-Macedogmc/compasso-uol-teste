import { AppError } from "@shared/errors/AppError";
import { IClientModel } from "./../domain/models/IClientModel";
import { IClientRepository } from "./../domain/repositories/IClientRepository";
import { inject, injectable } from "tsyringe";
import { ICreateClientUseCase } from "../domain/use-cases/ICreateClientUseCase";
import { ICityRepository } from "@modules/city/domain/repositories/ICityRepositories";

@injectable()
export class CreateClientUseCase implements ICreateClientUseCase {
  constructor(
    @inject("ClientRepository")
    private readonly clientRepository: IClientRepository,
    @inject("CityRepository")
    private readonly cityRepository: ICityRepository,
  ) {}

  public async create(params: Omit<IClientModel, "id">): Promise<IClientModel> {
    const cityExist = await this.cityRepository.getSingleById(params.city_id);

    if (!cityExist) {
      throw new AppError("Cidade não Encontrada", 404);
    }

    const client = await this.clientRepository.create({
      ...params,
      city_id: cityExist.id,
    });

    return client;
  }
}
