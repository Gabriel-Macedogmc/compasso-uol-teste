export interface IRemoveClientUseCase {
  removeClient(id: string): Promise<void>;
}
