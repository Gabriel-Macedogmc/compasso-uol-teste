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

    const city = await sut.create({ ...params, name: "newCity" });

    expect(city).toEqual({ ...params, name: "newCity" });
  });

  it("should throw a error if city already exist", async () => {
    const { sut, cityRepositorySpy } = makeSut();
    const params = MockCity();

    const cityExist = await cityRepositorySpy.create(params);

    jest
      .spyOn(cityRepositorySpy, "getSingleByName")
      .mockImplementationOnce(() => new Promise(resolve => resolve(cityExist)));

    await expect(
      sut.create({ ...params, name: cityExist.name }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
