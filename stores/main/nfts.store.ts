import { action, computed, makeAutoObservable } from "mobx";
import { IStore, StoreType } from "../store.interface";
import useStore from "../useStore";
import { WalletStore } from "./wallet.store";
const walletStore = useStore(WalletStore);

type NftType = {
  contract_address: string;
  creator_address: string;
  token_id: string;
  detail?: any;
};

export class NFTStore implements IStore {
  static type = StoreType.nft;
  type = StoreType.nft;

  nfts: NftType[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async getNFTS() {
    const walletInfo = await walletStore.getWalletInfo();
    const result = await fetch(
      `https://api.nftport.xyz/v0/accounts/${walletInfo.account}?chain=ethereum`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "b39b03dc-3a0a-4611-98b0-efd81d23acff",
        },
      }
    );
    const data = await result.json();
    console.log("all nft", data.nfts);
    if (data.nfts?.length) {
      for (let i = 0; i < data.nfts.length; i++) {
        const nft = data.nfts[i];
        const meta = await this.getNFTMeta(nft.contract_address, nft.token_id);
        nft.detail = meta;
      }

      this.nfts = data.nfts.filter((nft: any) => {
        return nft.detail?.metadata;
      });

      console.log("nfts", this.nfts);
    }
  }

  async getNFTMeta(contract_address: string, token_id: string) {
    const cache = localStorage.getItem(`${contract_address}/${token_id}`);
    if (cache) {
      try {
        return JSON.parse(cache);
      } catch (e) {}
    }
    const result = await fetch(
      `https://api.nftport.xyz/v0/nfts/${contract_address}/${token_id}?chain=ethereum`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "b39b03dc-3a0a-4611-98b0-efd81d23acff",
        },
      }
    );
    const data = await result.json();
    console.log("getNFTMeta", data);
    if (data.nft) {
      if (data.nft.metadata_url?.startsWith("ipfs://")) {
        try {
          const meta = await fetch(
            data.nft.metadata_url
              .replace("ipfs://", "https://ipfs.infura.io/ipfs/")
              .replace("{id}", data.nft.token_id),
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const metajson = await meta.json();
          metajson.image = metajson.image.replace(
            "ipfs://",
            "https://ipfs.infura.io/ipfs/"
          );
          data.nft.metadata = metajson;
        } catch (e) {
          console.log(e);
        }
      }
      localStorage.setItem(
        `${contract_address}/${token_id}`,
        JSON.stringify(data.nft)
      );
      return data.nft;
    } else {
      if (data.error.status_code === 404) {
        localStorage.setItem(
          `${contract_address}/${token_id}`,
          JSON.stringify({})
        );
        return {};
      }
    }
    return null;
  }
}
