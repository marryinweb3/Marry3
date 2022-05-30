import { action, makeAutoObservable } from "mobx";
import { IStore, StoreType } from "../store.interface";
import { IWallet } from "../model/wallet.const";
import { BigNumber, ethers } from "ethers";
import wallet from "../../contracts/wallet";
import { message } from "antd";
import { EventEmitter } from "eventemitter3";
const bus = new EventEmitter();
export class WalletStore implements IStore {
  type = StoreType.web3modal;
  static type = StoreType.web3modal;
  showModal = false;
  walletInfo: IWallet = {
    balance: BigNumber.from(0),
    balanceFormated: "0.00",
    status: "disconnected",
    account: "",
    ens: "",
    bnbhBalance: BigNumber.from(0),
    bnbhBalanceFormated: "0.00",
  };
  constructor() {
    makeAutoObservable(this);

    wallet.on("connected", () => {
      this.getAccountWalletInfo();
    });

    wallet.on("disconnected", () => {
      this.setWalletInfo({
        status: "disconnected",
        balanceFormated: "0.00",
        bnbhBalanceFormated: "0.00",
        balance: BigNumber.from(0),
        bnbhBalance: BigNumber.from(0),
      });
    });
  }
  // 获取钱包余额详情
  async getAccountWalletInfo() {
    console.log("getAccountWalletInfo");
    const walletInfo: IWallet = {};
    try {
      const signer = await wallet.getWalletSigner();
      console.log("signer", signer);
      const account = await signer.getAddress();
      if (account) {
        walletInfo.account = account;
        console.log("user", walletInfo.account);

        try {
          var ens = await this.getENS(account);
          walletInfo.ens = ens;
        } catch (e) {
          console.log("e", e);
        }

        this.setWalletInfo(walletInfo);
        this.setWalletInfo({
          status: "connected",
        });
        bus.emit("connected");
      }
    } catch (e) {
      message.error("connect account error,please check your network");
      // wallet.reconnect();
    }
  }
  // 连接
  @action
  private setWalletInfo(walletInfo: IWallet) {
    console.log("setWalletInfo", walletInfo);
    Object.assign(this.walletInfo, walletInfo);
  }

  async connect() {
    await wallet.connect();
    return;
  }

  async refreshWalletInfo() {
    await this.getAccountWalletInfo();
  }

  async getWalletInfo(): Promise<IWallet> {
    return new Promise((resolve) => {
      if (this.walletInfo.status !== "connected") {
        bus.on("connected", () => {
          resolve(this.walletInfo);
        });
      } else {
        resolve(this.walletInfo);
      }
    });
  }

  async signMessage(_message: string): Promise<string> {
    const signer = await wallet.getWalletSigner();
    const hash = ethers.utils.keccak256(
      ethers.utils.defaultAbiCoder.encode(["string"], [_message])
    );

    const message = ethers.utils.arrayify(hash);
    const signature = await signer.signMessage(message);
    return signature;
  }

  async getENS(address: string): Promise<string> {
    try {
      console.log("getENS", address);
      const provider = ethers.getDefaultProvider("mainnet");
      return await provider.lookupAddress(address);
    } catch (e) {
      console.log("e", e);
    }
  }
}
