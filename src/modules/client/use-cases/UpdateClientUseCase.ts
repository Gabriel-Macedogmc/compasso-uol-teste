import { AppError } from "@shared/errors/AppError";
import { IClientRepository } from "@modules/client/domain/repositories/IClientRepository";
import { inject, injectable } from "tsyringe";
import {
  IUpdateClientModel,
  IClientModel,
} from "../domain/models/IClientModel";
import { IUpdateClientUseCase } from "./../domain/use-cases/IUpdateClientUseCase";

@injectable()
export class UpdateClientUseCase implements IUpdateClientUseCase {
  constructor(
    @inject("ClientRepository")
    private readonly clientRepository: IClientRepository,
  ) {}

  public async updateClient(params: IUpdateClientModel): Promise<IClientModel> {
    const clientExist = await this.clientRepository.getSingleById(params.id);

    if (!clientExist) {
      throw new AppError("Cliente não encontrado", 404);
    }

    Object.assign(clientExist, { full_name: params.full_name });

    const clientUpdated = await this.clientRepository.update(clientExist);

    return clientUpdated;
  }
}
