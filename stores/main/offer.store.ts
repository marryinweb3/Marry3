import { message } from "antd";
import { BigNumber, utils } from "ethers";
import { action, computed, makeAutoObservable } from "mobx";
import { Marry3Contract } from "../../contracts";
import wallet from "../../contracts/wallet";
import { web3Config } from "../config";
import { IStore, StoreType } from "../store.interface";
import useStore from "../useStore";
import { WalletStore } from "./wallet.store";

import { NFTStore } from "./nfts.store";
const walletStore = useStore(WalletStore);
// 基地

export type Offers = {
  id?: string;
  Aaddress?: string;
  Baddress?: string;
  Asignature?: string;
  Bsignature?: string | null;
  Asex?: number | null;
  Bsex?: number | null;
  Aname?: string | null;
  Bname?: string | null;
  status?: number;
  AtokenId?: string | null;
  BtokenId?: string | null;
  Acomment?: string | null;
  Bcomment?: string | null;
  Acover?: string | null;
  Bcover?: string | null;
  inviteLink?: string | null;
};
export class OfferStore implements IStore {
  static type = StoreType.offer;
  type = StoreType.offer;

  offer: Offers = {};

  form = {
    Baddress: "",
    Bcomment: "Yes, i will",
    Bcover: null,
    Bname: "",
    Bsex: 1,
  };

  is404 = false;
  constructor() {
    makeAutoObservable(this);
  }

  async accept() {
    const nonce = "i will";
    const msg = await walletStore.signMessage(nonce);
    const body = {
      nonce,
      signature: msg,
      id: this.offer.id,
      address: (await walletStore.getWalletInfo()).account,
      Bsex: this.form.Bsex,
      Bname: this.form.Bname,
      Bcomment: this.form.Bcomment,
      Bcover: this.form.Bcover,
    };
    console.log("body", body);
    const offer = await fetch("/api/offer-b", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const json = await offer.json();
    console.log(json);
    if (json.message) {
      message.error(json.message);
    } else {
      this.offer = json as Offers;
      message.success("accept success");
    }
  }

  async getOffer() {
    const account = (await walletStore.getWalletInfo()).account;
    const result = await fetch("/api/offer?id=" + this.offer.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await result.json();
    if (json.message) {
      message.error(json.message);
      this.is404 = true;
    } else {
      this.offer = json;
    }
    // if (this.offer.status == 0) {
    //   setTimeout(() => {
    //     this.getOffer();
    //   }, 3000);
    // }
  }
}
