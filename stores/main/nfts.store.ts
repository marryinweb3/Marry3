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
  [key: string]: any;
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

    try {
      const result1155 = await fetch(
        `/api/opensea?address=${walletInfo.account}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data1155 = await result1155.json();
      const nfts = [];
      data1155.json.assets.forEach((asset: any) => {
        nfts.push({
          metadata: {
            image: asset.image_url,
            name: asset.name,
          },
          contract_address: asset.asset_contract.address,
          creator_address: asset.asset_contract.owner,
          token_id: asset.token_id,
        });
      });
      this.nfts = nfts.filter((nft: any) => {
        return nft.metadata;
      });
    } catch (e) {}
    if (this.nfts.length == 0) {
      const result = await fetch(
        `https://restapi.nftscan.com/api/v2/account/own/${walletInfo.account}?erc_type=erc721&limit=100`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": "IgTNVFa5",
          },
        }
      );
      const data = await result.json();

      if (data?.data?.content?.length) {
        const nfts = data.data.content;
        console.log("all nft", nfts);
        for (let i = 0; i < nfts.length; i++) {
          const nft = nfts[i];
          nfts[i] = await this.getNFTMeta(nft);
        }

        this.nfts = nfts.filter((nft: any) => {
          return nft.metadata;
        });

        console.log("nfts", this.nfts);
      }
    }
  }

  async getNFTMeta(nft: any) {
    // const cache = localStorage.getItem(
    //   `${nft.contract_address}/${nft.token_id}`
    // );
    // if (cache) {
    //   try {
    //     return JSON.parse(cache);
    //   } catch (e) {}
    // }
    // const result = await fetch(
    //   `https://api.nftport.xyz/v0/nfts/${contract_address}/${token_id}?chain=ethereum`,
    //   {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: "b39b03dc-3a0a-4611-98b0-efd81d23acff",
    //     },
    //   }
    // );
    // const data = await result.json();
    // console.log("getNFTMeta", data);

    // if (nft.metadata_url?.startsWith("ipfs://")) {
    //   try {
    //     const meta = await fetch(
    //       nft.metadata_url
    //         .replace("ipfs://", "https://ipfs.infura.io/ipfs/")
    //         .replace("{id}", nft.token_id),
    //       {
    //         method: "GET",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //       }
    //     );
    //     const metajson = await meta.json();
    const metajson = nft.metadata_json;
    if (metajson) {
      try {
        const json = JSON.parse(metajson);

        if (json.image) {
          json.image = json.image.replace(
            "ipfs://",
            "https://nftstorage.link/ipfs/"
          );
        }
        if (json.image_url) {
          json.image = json.image_url.replace(
            "ipfs://",
            "https://nftstorage.link/ipfs/"
          );
        }
        nft.metadata = json;
      } catch (e) {}
    }
    //   } catch (e) {
    //     console.log(e);
    //   }
    // }
    // localStorage.setItem(
    //   `${contract_address}/${token_id}`,
    //   JSON.stringify(nft)
    // );
    return nft;
    // } else {
    //   if (data.error.status_code === 404) {
    //     localStorage.setItem(
    //       `${contract_address}/${token_id}`,
    //       JSON.stringify({})
    //     );
    //     return {};
    //   }
    // }
    // return null;
  }
}
