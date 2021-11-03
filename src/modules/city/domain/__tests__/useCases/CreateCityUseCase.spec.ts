import { AppError } from "@shared/errors/AppError";
import { MockCity } from "../domain/MockCity";
import { CreateCityUseCase } from "../../../useCases/CreateCityUseCase";
import { CityRepositorySpy } from "./mocks/MockCityRepository";

const makeSut = () => {
  const cityRepositorySpy = new CityRepositorySpy();
  const sut = new CreateCityUseCase(cityRepositorySpy);

  return {
    sut,
    cityRepositorySpy,
  };
};

describe("db create city", () => {
  it("should call CreateCityUseCase with correct values", async () => {
    const { sut, cityRepositorySpy } = makeSut();
    const params = MockCity();

    jest
      .spyOn(cityRepositorySpy, "getSingleByName")
      .mockImplementationOnce(() => new Promise(reject => reject(undefined)));

    const city = await sut.create({ ...params, name: "newCity" });

    expect(city).toEqual({ ...params, name: "newCity" });
  });

  it("should throw a error if city already exist", async () => {
    const { sut, cityRepositorySpy } = makeSut();
    const params = MockCity();
    jest
      .spyOn(cityRepositorySpy, "getSingleByName")
      .mockImplementationOnce(() => new Promise(resolve => resolve(params)));

    await expect(
      sut.create({
        ...params,
        name: "existName",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
