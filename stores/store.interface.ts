export enum StoreType {
  test = "test",
  main = "main",
  nft = "nft",
  offer = "offer",
  devorce = "devorce",
  web3modal = "web3modal",
}
export interface IStore {
  type: StoreType;
}
