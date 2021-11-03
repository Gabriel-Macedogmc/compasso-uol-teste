import { ICityModel } from "@modules/city/domain/models/ICityModel";
import { MockCity } from "../domain/MockCity";
import { CityRepositorySpy } from "./mocks/MockCityRepository";
import { GetCityByStateUseCase } from "@modules/city/useCases";

const params = MockCity();
const mockGetAllResult = (): ICityModel[] => [
  {
    ...params,
  },
  {
    ...params,
  },
];

const makeSut = () => {
  const cityRepositorySpy = new CityRepositorySpy();
  const sut = new GetCityByStateUseCase(cityRepositorySpy);

  return {
    sut,
    cityRepositorySpy,
  };
};

describe("useCase get all cities by state", () => {
  it("must return city in an array", async () => {
    const { sut } = makeSut();

    const cities = await sut.getCityByState("any_state");
    expect(cities.length).toEqual(2);
    expect(cities).toEqual(mockGetAllResult());
  });
});
