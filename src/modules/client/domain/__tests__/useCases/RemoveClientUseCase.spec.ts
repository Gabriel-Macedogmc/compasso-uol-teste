import { AppError } from "@shared/errors/AppError";
import { RemoveClientUseCase } from "@modules/client/useCases";
import { MockClientParams } from "../domain/MockClient";
import { ClientRepositorySpy } from "./mocks/MockClientRepository";

const makeSut = () => {
  const clientRepositorySpy = new ClientRepositorySpy();

  const sut = new RemoveClientUseCase(clientRepositorySpy);

  return {
    sut,
    clientRepositorySpy,
  };
};

describe("UseCase Remove Client", () => {
  it("Should delete client", async () => {
    const { sut, clientRepositorySpy } = makeSut();
    const params = MockClientParams();

    const methodDelete = jest.spyOn(clientRepositorySpy, "delete");
    await sut.removeClient(params.id);

    expect(methodDelete).toHaveBeenCalledWith(params.id);
  });

  it("should return error if not exist client", async () => {
    const { sut, clientRepositorySpy } = makeSut();

    const params = MockClientParams();

    jest
      .spyOn(clientRepositorySpy, "getSingleById")
      .mockImplementationOnce(() => new Promise(reject => reject(undefined)));

    expect(sut.removeClient(params.id)).rejects.toBeInstanceOf(AppError);
  });
});
