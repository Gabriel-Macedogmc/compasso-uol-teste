import { AppError } from "@shared/errors/AppError";
import { MockCity } from "@modules/city/domain/__tests__/domain/MockCity";
import { CreateClientUseCase } from "@modules/client/useCases";
import { MockClientParams } from "../domain/MockClient";
import { CityRepositorySpy } from "./../../../../city/domain/__tests__/useCases/mocks/MockCityRepository";
import { ClientRepositorySpy } from "./mocks/MockClientRepository";

const makeSut = () => {
  const clientRepositorySpy = new ClientRepositorySpy();
  const cityRepositorySpy = new CityRepositorySpy();

  const sut = new CreateClientUseCase(clientRepositorySpy, cityRepositorySpy);

  return {
    sut,
    clientRepositorySpy,
    cityRepositorySpy,
  };
};

describe("UseCase Create Client", () => {
  it("should be return new client", async () => {
    const { sut, cityRepositorySpy, clientRepositorySpy } = makeSut();

    const cityParams = MockCity();
    const { age, birth_date, full_name, sex } = MockClientParams();
    const city = await cityRepositorySpy.create(cityParams);

    jest
      .spyOn(cityRepositorySpy, "getSingleById")
      .mockImplementationOnce(() => new Promise(resolve => resolve(city)));

    const client = await sut.create({
      city_id: city.id,
      age,
      birth_date,
      full_name,
      sex,
    });

    expect(client.city_id).toEqual(city.id);
  });

  it("should be return error if not exist city", async () => {
    const { sut, cityRepositorySpy, clientRepositorySpy } = makeSut();

    const { age, birth_date, full_name, sex } = MockClientParams();

    jest
      .spyOn(cityRepositorySpy, "getSingleById")
      .mockImplementationOnce(() => new Promise(reject => reject(undefined)));

    await expect(
      sut.create({ age, birth_date, full_name, sex, city_id: "any_city" }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
