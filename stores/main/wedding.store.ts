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
export type wedding = {
  id: string;
  addressA: string | null;
  addressB: string | null;
  nameA: string | null;
  nameB: string | null;
  coverA: string | null;
  coverB: string | null;
  wedding_at: Date;
  type: number | null;
  comment: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type wedding_join = {
  id: string;
  weddingId: string | null;
  name: string | null;
  address: string | null;
  cover: string | null;
  createdAt: Date;
  updatedAt: Date;
};
type WeddingType = {
  status?: number;
  loading?: boolean;
  picture?: string;
  name?: string;
  inviteLink?: string;
  Acover?: string;
  Bcover?: string;
  Aaddress?: string | null;
  Baddress?: string | null;
  Aname?: string | null;
  Bname?: string | null;
};
type CurrentType = {
  message?: string;
  wedding?: wedding;
  joiners?: wedding_join[];
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
  wedding: WeddingType = {}; //History marry info
  weddingDetail: CurrentType = {}; //detail by id
  createInfo: COffers = {}; //create wedding info
  joinInfo: Offers = {}; //join wedding info
  weddingList: WeddingType[] = []; // wedding list
  total: number = 0; //list total
  shareClicked: boolean=false
  async getOffer() {
    //History
    const account = (await walletStore.getWalletInfo()).account;

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
    //get detail
    try {
      const result = await fetch("/api/wedding/" + id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await result.json();
      this.weddingDetail = json;
      
    } catch (e) {}

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
  async createWedding() {
    const body = { 
      ...this.wedding, 
      ...this.createInfo,
      addressA:this.wedding.Aaddress,
      addressB:this.wedding.Baddress,
      nameA:this.wedding.Aname,
      nameB:this.wedding.Bname,
      coverA:this.wedding.Acover,
      coverB:this.wedding.Bcover,
    };
    const offer = await fetch(`/api/wedding/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const res = await offer.json();
    if (res.id) {
      this.createInfo = {};
      this.wedding.inviteLink = "/wedding/" + res.id;
      this.weddingDetail=res
      this.getOffer();
    } else {
      message.error(res.message);
    }
    console.log(res);
  }
  async joinWedding() {
    const body: COffers = {};
    if (!body.wedding_at) {
      message.error("commet empty");
      return;
    }
    const offer = await fetch(`/api/wedding/` + this.weddingDetail.wedding.id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const res = await offer.json();
    if (res.id) {
      this.joinInfo = {};
      this.wedding.inviteLink = "/offer/" + res.id;
      this.getOffer();
    } else {
      message.error(res.message);
    }
    console.log(res);
  }
}
