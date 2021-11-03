import { IClientModel } from "@modules/client/domain/models/IClientModel";
import { GetClientByNameUseCase } from "./../../../useCases/GetClientByNameUseCase";
import { MockClientParams } from "../domain/MockClient";
import { ClientRepositorySpy } from "./mocks/MockClientRepository";

const params = MockClientParams();
const mockGetAllResult = (): IClientModel[] => [
  {
    ...params,
  },
  {
    ...params,
  },
];

const makeSut = () => {
  const clientRepositorySpy = new ClientRepositorySpy();

  const sut = new GetClientByNameUseCase(clientRepositorySpy);

  return {
    sut,
    clientRepositorySpy,
  };
};

describe("UseCase Get Client by Name", () => {
  it("should be return alls clients", async () => {
    const { sut } = makeSut();

    const clients = await sut.getClientByName("any_fullname");
    expect(clients.length).toEqual(2);
    expect(clients).toEqual(mockGetAllResult());
  });
});
