import { message, Modal } from "antd";
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
  @action
  stepStatus() {
    if (this.offer.status === 0) {
      return 1;
    } else if (this.offer.status === 1) {
      return 2;
    } else if (this.offer.status === 2) {
      return 3;
    } else {
      return 0;
    }
  }
  async accept() {
    const nonce = "i will";

    const body = {
      nonce,
      signature: "",
      id: this.offer.id,
      address: (await walletStore.getWalletInfo()).account,
      Bsex: this.form.Bsex,
      Bname: this.form.Bname,
      Bcomment: this.form.Bcomment,
      Bcover: this.form.Bcover,
    };
    if (!body.Bname) {
      message.error("please input your nick");
      return;
    }
    if (body.Bname.indexOf(".eth") != -1) {
      const ens = await walletStore.getENS(body.address);
      console.log(ens);
      if (body.Bname?.toLowerCase() != ens?.toLowerCase()) {
        message.error(
          ".eth ens name must be yourself, you can input no .eth name"
        );
        return;
      }
    }
    if (!body.Bcover) {
      const confirm = async () => {
        return new Promise((resolve, reject) => {
          Modal.confirm({
            title: "Notice",
            content:
              "You have not yet selected PFP, are you sure you want to continue？if continue, your PFP will be set to default image",
            onOk: () => {
              resolve(true);
            },
            onCancel: () => {
              // throw new Error("cancel");
              reject(new Error("cancel"));
            },
          });
        });
      };
      await confirm();
    }
    const msg = await walletStore.signMessage(nonce);
    body.signature = msg;
    const offer = await fetch("/api/offer-b", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const json = await offer.json();
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
