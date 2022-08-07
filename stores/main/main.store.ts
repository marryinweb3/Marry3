import { message, Modal } from "antd";
import { BigNumber, utils } from "ethers";
import { action, computed, makeAutoObservable } from "mobx";
import { Marry3Contract } from "../../contracts";
import wallet from "../../contracts/wallet";
import { web3Config } from "../config";
import { IStore, StoreType } from "../store.interface";
import useStore from "../useStore";
import { WalletStore } from "./wallet.store";
import { v4 as uuidv4 } from "uuid";
import Color from "colorjs.io";
const walletStore = useStore(WalletStore);

// 基地

export class MainStore implements IStore {
  static type = StoreType.main;
  type = StoreType.main;

  constructor() {
    makeAutoObservable(this);
  }

  addressList = [];

  letters = {};
  lettersMaxLen = 0;
  resultBGColor = `hsl(${Math.floor(Math.random() * 200)}, 100%, 30%)`;

  listLoading = false;

  async add() {
    const walletInfo = await walletStore.getWalletInfo();
    const uuid = uuidv4();
    const nonce = `add me to metaverse ${uuid}`;
    const body = {
      nonce: nonce,
      signature: "",
      address: walletInfo.account,
    };

    const msg = await walletStore.signMessage(nonce);
    body.signature = msg;
    const offer = await fetch("/api/measuring", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const res = await offer.json();
    if (res.success == false) {
      message.error(res.message);
    } else {
      message.success("add success");
      this.getList();
    }
    console.log(res);
  }
  @action
  async getList() {
    this.listLoading = true;
    const offer = await fetch("/api/measuring");
    const res = await offer.json();
    if (res && res.length) {
      this.addressList = res.map((item) => item.address);
      const _letters = {};
      this.addressList.forEach((address: string) => {
        address
          .substr(2, address.length - 2)
          .split("")
          .forEach((letter, index) => {
            const o = {
              address,
              color: "#" + address.substr(address.length - 6, 6),
              textColor: "#fff",
            };
            let color = new Color(o.color);
            let onWhite = Math.abs(color.contrastWCAG21("white"));
            let onBlack = Math.abs(color.contrastWCAG21("black"));
            let textColor = onWhite > onBlack ? "white" : "black";
            o.textColor = textColor;
            if (_letters[letter]) {
              _letters[letter].push(o);
            } else {
              _letters[letter] = [o];
            }
          });
      });
      this.letters = _letters;
      let lettersMaxLen = 0;
      for (let key in this.letters) {
        if (this.letters[key].length > lettersMaxLen) {
          lettersMaxLen = this.letters[key].length;
        }
      }
      this.lettersMaxLen = lettersMaxLen;
    } else {
      message.error(res.message);
    }
    console.log(res);
    this.listLoading = false;
  }
}
