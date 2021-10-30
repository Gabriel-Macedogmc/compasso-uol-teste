import { ICityRepository } from "@modules/city/domain/repositories/ICityRepositories";
import { inject, injectable } from "tsyringe";
import { ICityModel } from "../domain/models/ICityModel";
import { IGetCityByStateUseCase } from "./../domain/use-cases/IGetCityByStateUseCase";

@injectable()
export class GetCityByStateUseCase implements IGetCityByStateUseCase {
  constructor(
    @inject("CityRepository")
    private readonly cityRepository: ICityRepository,
  ) {}

  public async getCityByState(state: string): Promise<ICityModel[]> {
    const cities = await this.cityRepository.getAllByState(state);

    return cities;
  }
}
