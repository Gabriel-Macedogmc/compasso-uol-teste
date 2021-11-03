import {
  CreateClientUseCase,
  GetClientByNameUseCase,
  GetClientByIdUseCase,
  UpdateClientUseCase,
  RemoveClientUseCase,
} from "@modules/client/useCases/index";
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

  public async update(
    req: HttpRequestAdapter,
    res: HttpResponseAdapter,
  ): Promise<HttpResponseAdapter> {
    const service = container.resolve(UpdateClientUseCase);
    const { id } = req.params;

    const client = await service.updateClient({ id, ...req.body });

    return res.json(client);
  }

  public async delete(
    req: HttpRequestAdapter,
    res: HttpResponseAdapter,
  ): Promise<HttpResponseAdapter> {
    const service = container.resolve(RemoveClientUseCase);
    const { id } = req.params;

    await service.removeClient(id);

    return res.status(204).json();
  }
}
