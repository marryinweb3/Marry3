import { message } from "antd";
import { Modal } from "web3modal";
import { IStore, StoreType } from "../store.interface";
import useStore from "../useStore";
import { v4 as uuidv4 } from "uuid";
import { WalletStore } from "./wallet.store";
import { Marry3Contract } from "../../contracts";
import { BigNumber, utils } from "ethers";
import { action } from "mobx";
const walletStore = useStore(WalletStore);
type WeddingType = {
  status?: number;
  loading?: boolean;
  picture?: string;
  name?: string;
  inviteLink?: string;
  Acover?: string;
  Bcover?: string;
};
type CurrentType = {
  id?: number;
  addressA?: string | null;
  addressB?: string | null;
  nameA?: string | null;
  nameB?: string | null;
  coverA?: string | null;
  coverB?: string | null;
  wedding_at?: Date;
  type?: number | null;
  comment?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
};
type Offers = {
  weddingId?: string | null;
  name?: string | null;
  address?: string | null;
  cover?: string | null;
};
type COffers = {
  addressA?: string | null;
  addressB?: string | null;
  nameA?: string | null;
  nameB?: string | null;
  coverA?: string | null;
  coverB?: string | null;
  wedding_at?: Date | string;
  type?: number | null;
  comment?: string | null;
};
type Offers_ = {
  id: string;
  Aaddress: string;
  Baddress: string | null;
  Asignature: string;
  Bsignature: string | null;
  status: number;
  createdAt: Date;
  updatedAt: Date;
  Aname: string | null;
  Asex: number | null;
  Bname: string | null;
  Bsex: number | null;
  AtokenId: string | null;
  BtokenId: string | null;
  Acomment: string | null;
  Acover: string | null;
  Bcomment: string | null;
  Bcover: string | null;
  imageData: string | null;
  bgIndex: number | null;
  blockNo: string | null;
  mintedAt: Date | null;
  imageDataB: string | null;
  type: number;
};
export class WeddingStore implements IStore {
  static type = StoreType.wedding;
  type = StoreType.wedding;
  wedding: WeddingType = {}; //History info
  currentWedding: CurrentType = {};
  createInfo: COffers = {};
  joinInfo: Offers = {};
  weddingList: WeddingType[] = [];
  total: number = 0;
  async getOffer() {
    //History
    const account = "0xF95555A29E58188147D3A3AcD6e2Ffeb04EA7dd5"; //(await walletStore.getWalletInfo()).account;

    try {
      const result = await fetch("/api/offer-byaddress?address=" + account, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await result.json();
      if (!json.message) {
        this.wedding = json;
      }
    } catch (e) {}

    if (this.wedding?.status == 0) {
      setTimeout(() => {
        this.getOffer();
      }, 5000);
    }
  }
  async getWeddingInfo(id) {
    try {
      const result = await fetch("/api/wedding/" + id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await result.json();
      if (!json.message) {
        this.wedding = json;
      }
    } catch (e) {}

    if (this.wedding?.status == 0) {
      setTimeout(() => {
        this.getOffer();
      }, 5000);
    }
  }
  async getList(page = 1) {
    try {
      const result = await fetch(
        `/api/wedding/list?pageIndex=${page}&pageSize=20`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": "IgTNVFa5",
          },
        }
      );
      const data = await result.json();
      console.log("-------------------------------------------", data);
      if (data?.offers?.length) {
        this.weddingList = data.offers;
        this.total = data.total;
        console.log("all wedding", data);
      }
    } catch (e) {}
  }
  async getListByDate(year = 2022, month = 10) {
    try {
      const result = await fetch(
        `/api/wedding/monthlist?year=${year}&month=${month}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": "IgTNVFa5",
          },
        }
      );
      const data = await result.json();
      console.log("-------------------------------------------", data);
      if (data?.offers?.length) {
        this.weddingList = data.offers;
        this.total = data.total;
        console.log("all wedding", data);
      }
    } catch (e) {}
  }
  async createWedding(data) {
    const body: COffers = {};
    if (!body.wedding_at) {
      message.error("commet empty");
      return;
    }
    const offer = await fetch(`/api/ddeginw/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const res = await offer.json();
    if (res.id) {
      this.wedding = res;
      this.wedding.status = 1;
      this.wedding.inviteLink = "/offer/" + res.id;
      this.getOffer();
    } else {
      message.error(res.message);
    }
    console.log(res);
  }
  async joinWedding(data) {
    const body: COffers = {};
    if (!body.wedding_at) {
      message.error("commet empty");
      return;
    }
    const offer = await fetch(`/api/wedding/` + this.currentWedding.id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const res = await offer.json();
    if (res.id) {
      this.wedding = res;
      this.wedding.status = 1;
      this.wedding.inviteLink = "/offer/" + res.id;
      this.getOffer();
    } else {
      message.error(res.message);
    }
    console.log(res);
  }
}
