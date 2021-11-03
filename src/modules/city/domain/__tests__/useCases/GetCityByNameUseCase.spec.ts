import { AppError } from "@shared/errors/AppError";
import { MockCity } from "../domain/MockCity";
import { CreateCityUseCase } from "../../../useCases/CreateCityUseCase";
import { CityRepositorySpy } from "./mocks/MockCityRepository";
import { GetCityByNameUseCase } from "@modules/city/useCases";

const makeSut = () => {
  const cityRepositorySpy = new CityRepositorySpy();
  const sut = new GetCityByNameUseCase(cityRepositorySpy);

  return {
    sut,
    cityRepositorySpy,
  };
};

describe("useCase get city by name", () => {
  it("should throw a error if city not exist", async () => {
    const { sut, cityRepositorySpy } = makeSut();
    jest
      .spyOn(cityRepositorySpy, "getSingleByName")
      .mockImplementationOnce(() => new Promise(reject => reject(undefined)));

    await expect(sut.getCityByName("newCity")).rejects.toBeInstanceOf(AppError);
  });

  it("should return city if success", async () => {
    const { sut, cityRepositorySpy } = makeSut();

    const params = MockCity();
    jest
      .spyOn(cityRepositorySpy, "getSingleByName")
      .mockImplementationOnce(() => new Promise(resolve => resolve(params)));

    const city = await sut.getCityByName("newCity");
    expect(city).toEqual(params);
  });
});
