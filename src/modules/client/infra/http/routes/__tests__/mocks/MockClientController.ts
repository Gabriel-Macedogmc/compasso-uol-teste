import { IClientModel } from "@modules/client/domain/models/IClientModel";

export const MockClientController = (): Omit<IClientModel, "id"> => ({
  age: "19",
  birth_date: "31/01/2002",
  city_id: "any_city",
  full_name: "any_fullname",
  sex: "Masculino",
});
