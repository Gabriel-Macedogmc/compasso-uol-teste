import "reflect-metadata";
import { AppError } from "@shared/errors/AppError";
import { ICityRepository } from "../domain/repositories/ICityRepositories";
import { inject, injectable } from "tsyringe";
import { ICityModel } from "../domain/models/ICityModel";
import { IGetCityByNameUseCase } from "../domain/useCases/IGetCityByNameUseCase";

@injectable()
export class GetCityByNameUseCase implements IGetCityByNameUseCase {
  constructor(
    @inject("CityRepository")
    private readonly cityRepository: ICityRepository,
  ) {}
  public async getCityByName(name: string): Promise<ICityModel> {
    const cityExist = await this.cityRepository.getSingleByName(name);

    if (!cityExist) {
      throw new AppError("Cidade não encontrada", 404);
    }
    const cityResponse = await this.cityRepository.getSingleById(cityExist.id);

    return cityResponse;
  }
}
