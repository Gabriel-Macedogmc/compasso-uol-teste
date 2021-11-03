import {
  CreateCityUseCase,
  GetCityByNameUseCase,
  GetCityByStateUseCase,
} from "@modules/city/useCases/index";
import { container } from "tsyringe";
import {
  HttpRequestAdapter,
  HttpResponseAdapter,
} from "@shared/infra/http/helper/HttpHelper";

interface IQuery {
  name?: string;
}

export class CityController {
  public async create(
    req: HttpRequestAdapter,
    res: HttpResponseAdapter,
  ): Promise<HttpResponseAdapter> {
    const service = container.resolve(CreateCityUseCase);

    const city = await service.create(req.body);

    return res.status(201).json(city);
  }
  public async index(
    req: HttpRequestAdapter,
    res: HttpResponseAdapter,
  ): Promise<HttpResponseAdapter> {
    const service = container.resolve(GetCityByStateUseCase);
    const { state } = req.params;

    const cities = await service.getCityByState(state);

    return res.json(cities);
  }

  public async show(
    req: HttpRequestAdapter,
    res: HttpResponseAdapter,
  ): Promise<HttpResponseAdapter> {
    const service = container.resolve(GetCityByNameUseCase);
    const { name } = req.params;

    const city = await service.getCityByName(name);

    return res.json(city);
  }
}
