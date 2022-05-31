import { message } from "antd";
import { BigNumber, utils } from "ethers";
import { action, computed, makeAutoObservable } from "mobx";
import { Marry3Contract } from "../../contracts";
import wallet from "../../contracts/wallet";
import { web3Config } from "../config";
import { IStore, StoreType } from "../store.interface";
import useStore from "../useStore";
import { WalletStore } from "./wallet.store";
import { v4 as uuidv4 } from "uuid";
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
  bgIndex?: number | null;
};
export class MarryStore implements IStore {
  static type = StoreType.marry;
  type = StoreType.marry;

  marryPrice: BigNumber;
  ethBalance: BigNumber;
  ethBalanceFormated: string = "0.00";
  marryPriceFormated: string = "0.00";

  marryCount = 0;

  info: Offers = {
    Asex: 0,
  };

  pendingOffer: Offers = {};

  constructor() {
    makeAutoObservable(this);
  }

  async signA() {
    const uuid = uuidv4();

    const msg = await walletStore.signMessage(uuid);
    const body = {
      nonce: uuid,
      signature: msg,
      Aaddress: this.info.Aaddress,
      Asex: this.info.Asex,
      Aname: this.info.Aname,
      Acomment: this.info.Acomment,
      Acover: this.info.Acover,
    };
    if (body.Aname.indexOf(".eth") != -1) {
      const ens = await walletStore.getENS(this.info.Aaddress);
      if (body.Aname.toLowerCase() != ens.toLowerCase()) {
        return message.error(
          ".eth ens name must be yourself, you can input no .eth name"
        );
      }
    }
    const offer = await fetch("/api/offer-a", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const res = await offer.json();
    if (res.id) {
      this.pendingOffer = res;
      this.info.status = 1;
      this.info.inviteLink = "/offer/" + res.id;
    } else {
      message.error(res.message);
    }
    console.log(res);
  }
  async mint(
    _addressA: string,
    _addressB: string,
    _sexA: number,
    _sexB: number,
    _signatureB: string
  ) {
    const walletInfo = await walletStore.getWalletInfo();
    try {
      const result = await Marry3Contract().mint(
        _addressA,
        _addressB,
        _sexA,
        _sexB,
        _signatureB,
        {
          value: this.marryPrice,
        }
      );
      await result.wait();
      console.log("mint result", result);
      message.success("mint success");

      this.pendingOffer.status = 2;

      return result.blockNumber;
    } catch (e) {
      message.error(e.message);
    }
  }

  async getMintInfo() {
    const walletInfo = await walletStore.getWalletInfo();

    const mintPrice = await Marry3Contract().getPrice();
    this.marryPrice = mintPrice;
    this.marryPriceFormated = utils.formatEther(mintPrice);
    console.log("mintPrice", this.marryPriceFormated);

    const mintCount = await Marry3Contract().getMarryCount();
    this.marryCount = mintCount.toNumber();

    console.log("mintCount", this.marryCount);

    const ethBalance = await (
      await wallet.getEthProvider()
    ).getBalance(Marry3Contract().address);

    this.ethBalance = ethBalance;
    this.ethBalanceFormated = Number(
      Number(utils.formatEther(ethBalance)).toFixed(2)
    ).toLocaleString();
    console.log("ethBalance", ethBalance);
  }

  async getOffer() {
    const account = (await walletStore.getWalletInfo()).account;
    const result = await fetch("/api/offer-pending?Aaddress=" + account, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await result.json();
    if (!json.message) {
      this.pendingOffer = json;
    }
    // if (this.offer.status == 0) {
    //   setTimeout(() => {
    //     this.getOffer();
    //   }, 3000);
    // }
  }
}
