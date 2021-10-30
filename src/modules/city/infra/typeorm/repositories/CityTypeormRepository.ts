import { ICityModel } from "@modules/city/domain/models/ICityModel";
import { ICityRepository } from "@modules/city/domain/repositories/ICityRepositories";
import { getRepository, Repository } from "typeorm";
import { CityTypeormModel } from "../models/CityTypeormModel";

export class CityTypeormRepository implements ICityRepository {
  private readonly ormRepository: Repository<CityTypeormModel>;

  constructor() {
    this.ormRepository = getRepository(CityTypeormModel);
  }
  public async getSingleById(id: string): Promise<ICityModel> {
    const city = await this.ormRepository.findOne(id);

    return city;
  }

  public async create(params: Omit<ICityModel, "id">): Promise<ICityModel> {
    const city = this.ormRepository.create(params);

    await this.ormRepository.save(city);

    return city;
  }

  public async getSingleByName(name: string): Promise<ICityModel> {
    const city = await this.ormRepository.findOne({
      where: { name },
    });

    return city;
  }

  public async getAllByState(state: string): Promise<ICityModel[]> {
    const cities = await this.ormRepository
      .createQueryBuilder("cities")
      .leftJoinAndSelect("cities.clients", "client")
      .where("cities.state ILIKE :state", { state: `%${state}%` })
      .getMany();

    return cities;
  }
}
