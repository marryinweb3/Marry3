import { message } from "antd";
import { Modal } from "web3modal";
import { IStore, StoreType } from "../store.interface";
import useStore from "../useStore";
import { Offers } from "./marry.store";
import { v4 as uuidv4 } from "uuid";
import { WalletStore } from "./wallet.store";
import { Marry3Contract } from "../../contracts";
import { BigNumber, utils } from "ethers";
import { action } from "mobx";
const walletStore = useStore(WalletStore);
export class DivorceStore implements IStore {
  static type = StoreType.devorce;
  type = StoreType.devorce;

  pendingOffer: Offers = {};
  info: Offers = {};

  marryPrice: BigNumber;
  marryPriceFormated: string = "0.00";
  async signA() {
    const uuid = uuidv4();

    const body = {
      nonce: uuid,
      signature: "",
      Aaddress: this.info.Aaddress,
    };

    const msg = await walletStore.signMessage(uuid);
    body.signature = msg;
    const offer = await fetch("/api/divorce/offer-a", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const res = await offer.json();
    if (res.id) {
      this.info.status = 1;
      this.info.inviteLink = "/divorce/offer/" + res.id;
    } else {
      message.error(res.message);
    }
    await this.getOffer();
    console.log(res);
  }

  async getOffer() {
    const account = (await walletStore.getWalletInfo()).account;

    try {
      const result = await fetch(
        "/api/divorce/offer-pending?Aaddress=" + account,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const json = await result.json();
      if (!json.message) {
        this.pendingOffer = json;
      }
    } catch (e) {}

    if (this.pendingOffer?.status == 0) {
      setTimeout(() => {
        this.getOffer();
      }, 5000);
    }

    if (account) {
      try {
        const pairedInfo = await Marry3Contract().getPairInfo(account);
        if (pairedInfo[0] && pairedInfo[1]) {
          this.pendingOffer.AtokenId = pairedInfo[0].tokenId.toString();
          this.pendingOffer.BtokenId = pairedInfo[1].tokenId.toString();
        }
      } catch (e) {}
    }
  }
  @action
  stepStatus() {
    if (this.pendingOffer.status === 0) {
      return 1;
    } else if (this.pendingOffer.status === 1) {
      return 2;
    } else if (this.pendingOffer.status === 2) {
      return 3;
    } else {
      return 0;
    }
  }
  async getMintInfo() {
    const account = await walletStore.getWalletInfo();
    const mintPrice = await Marry3Contract().getPrice();
    this.marryPrice = mintPrice;
    this.marryPriceFormated = utils.formatEther(mintPrice);
    console.log("mintPrice", this.marryPriceFormated);

    // const ethBalance = await (
    //   await wallet.getEthProvider()
    // ).getBalance(Marry3Contract().address);

    // this.ethBalance = ethBalance;
    // this.ethBalanceFormated = Number(
    //   Number(utils.formatEther(ethBalance)).toFixed(2)
    // ).toLocaleString();
    // console.log("ethBalance", ethBalance);
  }

  async burn(_addressB: string, _signatureB: string) {
    const walletInfo = await walletStore.getWalletInfo();
    try {
      const mintPrice = await Marry3Contract().getPrice();
      this.marryPrice = mintPrice;
      console.log("this.marryPrice.mod(2)", this.marryPrice.mul(2));
      const result = await Marry3Contract()["burn(address,bytes,bytes32[])"](
        _addressB,
        _signatureB,
        [],
        {
          value: this.marryPrice.mul(2),
        }
      );
      await result.wait();
      console.log("burn result", result);
      message.success("burn success");

      this.pendingOffer.status = 2;
    } catch (e) {
      throw new Error(e.error?.message || e.message);
    }
  }
}
