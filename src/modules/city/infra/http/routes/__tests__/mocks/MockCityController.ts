import { ICityModel } from "@modules/city/domain/models/ICityModel";

export const MockCityController = (): Omit<ICityModel, "id"> => ({
  name: "any_name",
  state: "any_state",
});
