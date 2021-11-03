import { ICityModel } from "@modules/city/domain/models/ICityModel";
import { ICityRepository } from "@modules/city/domain/repositories/ICityRepositories";
import { MockCity } from "../../domain/MockCity";

export class CityRepositorySpy implements ICityRepository {
  public async create(params: Omit<ICityModel, "id">): Promise<ICityModel> {
    const data: ICityModel = {
      id: "any_id",
      ...params,
    };

    return data;
  }

  public async getSingleByName(name: string): Promise<ICityModel> {
    const params = MockCity();

    const data: ICityModel[] = [
      {
        ...params,
      },
      {
        ...params,
      },
    ];

    const city = data.find(city => city.name === name);

    return city;
  }

  public async getAllByState(state: string): Promise<ICityModel[]> {
    const params = MockCity();

    const data: ICityModel[] = [
      {
        ...params,
      },
      {
        ...params,
      },
    ];

    const filter = data.filter(city => city.state === state);

    return filter;
  }

  public async getSingleById(id: string): Promise<ICityModel> {
    const params = MockCity();

    const data: ICityModel[] = [
      {
        ...params,
      },
      {
        ...params,
      },
    ];

    const city = data.find(city => city.id === id);

    return city;
  }
}
