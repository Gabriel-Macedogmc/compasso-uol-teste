import "reflect-metadata";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IClientModel } from "../domain/models/IClientModel";
import { IClientRepository } from "../domain/repositories/IClientRepository";
import { IGetClientByIdUseCase } from "../domain/useCases";

@injectable()
export class GetClientByIdUseCase implements IGetClientByIdUseCase {
  constructor(
    @inject("ClientRepository")
    private readonly clientRepository: IClientRepository,
  ) {}
  public async getClientById(id: string): Promise<IClientModel> {
    const clientExist = await this.clientRepository.getSingleById(id);

    if (!clientExist) {
      throw new AppError("Client não Encontrado", 404);
    }

    return clientExist;
  }
}
