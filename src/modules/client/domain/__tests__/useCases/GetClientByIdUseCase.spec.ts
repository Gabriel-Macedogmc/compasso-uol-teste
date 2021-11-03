import { GetClientByIdUseCase } from "./../../../useCases/GetClientByIdUseCase";
import { AppError } from "@shared/errors/AppError";
import { MockCity } from "@modules/city/domain/__tests__/domain/MockCity";
import { CreateClientUseCase } from "@modules/client/useCases";
import { MockClientParams } from "../domain/MockClient";
import { ClientRepositorySpy } from "./mocks/MockClientRepository";

const makeSut = () => {
  const clientRepositorySpy = new ClientRepositorySpy();

  const sut = new GetClientByIdUseCase(clientRepositorySpy);

  return {
    sut,
    clientRepositorySpy,
  };
};

describe("UseCase Get Client By ID", () => {
  it("should be return client", async () => {
    const { sut, clientRepositorySpy } = makeSut();

    const mockClient = MockClientParams();

    jest
      .spyOn(clientRepositorySpy, "getSingleById")
      .mockImplementationOnce(
        () => new Promise(resolve => resolve(mockClient)),
      );

    const client = await sut.getClientById(mockClient.id);

    expect(client.full_name).toBe(mockClient.full_name);
  });

  it("should be return error if not exist", async () => {
    const { sut, clientRepositorySpy } = makeSut();
    jest
      .spyOn(clientRepositorySpy, "getSingleById")
      .mockImplementationOnce(() => new Promise(reject => reject(undefined)));

    await expect(sut.getClientById("newClient")).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
