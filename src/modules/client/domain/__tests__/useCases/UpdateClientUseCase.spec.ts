import { UpdateClientUseCase } from "./../../../useCases/UpdateClientUseCase";
import { AppError } from "@shared/errors/AppError";
import { MockClientParams } from "../domain/MockClient";
import { ClientRepositorySpy } from "./mocks/MockClientRepository";

const makeSut = () => {
  const clientRepositorySpy = new ClientRepositorySpy();

  const sut = new UpdateClientUseCase(clientRepositorySpy);

  return {
    sut,
    clientRepositorySpy,
  };
};

describe("UseCase Updated Client", () => {
  it("should return client updated", async () => {
    const { sut } = makeSut();
    const params = MockClientParams();

    const notification = await sut.updateClient({
      ...params,
      full_name: "newName",
    });

    expect(notification.id).toBeTruthy();
    expect(notification.full_name).toBe("newName");
  });

  it("should return error if not exist ", async () => {
    const { sut, clientRepositorySpy } = makeSut();
    const params = MockClientParams();

    jest
      .spyOn(clientRepositorySpy, "getSingleById")
      .mockImplementationOnce(() => new Promise(reject => reject(undefined)));

    expect(sut.updateClient(params)).rejects.toBeInstanceOf(AppError);
  });
});
