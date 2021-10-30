import { ICityRepository } from "./../domain/repositories/ICityRepositories";
import { inject, injectable } from "tsyringe";
import { ICityModel } from "../domain/models/ICityModel";
import { ICreateCityUseCase } from "./../domain/use-cases/ICreateCityUseCase";
import { AppError } from "@shared/errors/AppError";

@injectable()
export class CreateCityUseCase implements ICreateCityUseCase {
  constructor(
    @inject("CityRepository")
    private readonly cityRepository: ICityRepository,
  ) {}

  public async create(params: Omit<ICityModel, "id">): Promise<ICityModel> {
    const cityExist = await this.cityRepository.getSingleByName(params.name);

    if (cityExist) {
      throw new AppError("Cidade Já Registrada", 401);
    }

    const city = await this.cityRepository.create(params);

    return city;
  }
}
