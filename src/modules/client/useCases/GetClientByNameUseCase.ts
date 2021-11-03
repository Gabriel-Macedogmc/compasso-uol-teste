import "reflect-metadata";
import { IClientRepository } from "../domain/repositories/IClientRepository";
import { inject, injectable } from "tsyringe";
import { IClientModel } from "../domain/models/IClientModel";
import { IGetClientByNameUseCase } from "../domain/useCases";

@injectable()
export class GetClientByNameUseCase implements IGetClientByNameUseCase {
  constructor(
    @inject("ClientRepository")
    private readonly clientRepository: IClientRepository,
  ) {}

  public async getClientByName(name: string): Promise<IClientModel[]> {
    const clientExist = await this.clientRepository.getAllByName(name);

    return clientExist;
  }
}
