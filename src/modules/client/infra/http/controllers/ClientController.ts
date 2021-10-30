import {
  CreateClientUseCase,
  GetClientByNameUseCase,
  GetClientByIdUseCase,
} from "@modules/client/use-cases/index";
import { container } from "tsyringe";
import {
  HttpRequestAdapter,
  HttpResponseAdapter,
} from "@shared/infra/http/helper/HttpHelper";

export class ClientController {
  public async create(
    req: HttpRequestAdapter,
    res: HttpResponseAdapter,
  ): Promise<HttpResponseAdapter> {
    const service = container.resolve(CreateClientUseCase);

    const client = await service.create(req.body);

    return res.status(201).json(client);
  }

  public async show(
    req: HttpRequestAdapter,
    res: HttpResponseAdapter,
  ): Promise<HttpResponseAdapter> {
    const service = container.resolve(GetClientByIdUseCase);
    const { id } = req.params;

    const client = await service.getClientById(id);

    return res.json(client);
  }

  public async index(
    req: HttpRequestAdapter,
    res: HttpResponseAdapter,
  ): Promise<HttpResponseAdapter> {
    const service = container.resolve(GetClientByNameUseCase);
    const { name } = req.params;

    const client = await service.getClientByName(name);

    return res.json(client);
  }
}
