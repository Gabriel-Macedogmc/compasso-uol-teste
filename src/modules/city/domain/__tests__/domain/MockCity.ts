import { ICityModel } from "@modules/city/domain/models/ICityModel";

const MockCity = (): ICityModel => ({
  id: "any_id",
  name: "any_name",
  state: "any_state",
});

export { MockCity };
