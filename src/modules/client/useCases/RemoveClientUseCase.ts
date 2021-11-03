import "reflect-metadata";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IClientRepository } from "@modules/client/domain/repositories/IClientRepository";
import { IRemoveClientUseCase } from "../domain/useCases/IRemoveClientUseCase";

@injectable()
export class RemoveClientUseCase implements IRemoveClientUseCase {
  constructor(
    @inject("ClientRepository")
    private readonly clientRepository: IClientRepository,
  ) {}
  public async removeClient(id: string): Promise<void> {
    const clientExist = await this.clientRepository.getSingleById(id);

    if (!clientExist) {
      throw new AppError("Cliente não encontrado", 404);
    }

    await this.clientRepository.delete(clientExist.id);
  }
}
