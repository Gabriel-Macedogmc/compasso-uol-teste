import { IClientRepository } from "@modules/client/domain/repositories/IClientRepository";
import { ICityRepository } from "@modules/city/domain/repositories/ICityRepositories";
import { CityTypeormRepository } from "@modules/city/infra/typeorm/repositories/CityTypeormRepository";

import { container } from "tsyringe";
import { ClientTypeormRepository } from "@modules/client/infra/typeorm/repositories/ClientTypeormRepository";

container.registerSingleton<ICityRepository>(
  "CityRepository",
  CityTypeormRepository,
);

container.registerSingleton<IClientRepository>(
  "ClientRepository",
  ClientTypeormRepository,
);
