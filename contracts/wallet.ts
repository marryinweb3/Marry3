import { ethers } from "ethers";
import Web3Modal from "web3modal";
// import WalletConnectProvider from "@walletconnect/web3-provider";
import { EventEmitter } from "eventemitter3";
import { web3Config } from "../stores/config";
import { message } from "antd";
// import { Web3Provider } from "@ethersproject/providers";
// import Torus from "@toruslabs/torus-embed";
// @ts-ignore
// import WalletLink from "walletlink";
import WalletConnect from "@walletconnect/web3-provider";
// import Torus from "@toruslabs/torus-embed";

const providerOptions = {
  /* See Provider Options Section */
  // huobi: {
  //   display: {
  //     logo: "/huobi-token.jpeg",
  //     name: "Injected",
  //     description: "Connect with the provider in your Browser",
  //   },
  //   package: null,
  // },

  walletconnect: {
    package: WalletConnect,
    options: {
      infuraId: "29N8IEWHRA4oUiY5hOnSKS1wMER",
    },
  },
  // // torus: {
  // //   package: Torus,
  // // },
  // walletlink: {
  //   package: WalletLink,
  //   options: {
  //     appName: "Web3Modal Example App",
  //     infuraId: "pk_test_391E26A3B43A3350",
  //   },
  // },
};

class Wallet extends EventEmitter {
  private web3Modal: Web3Modal = null;
  private ethProvider: ethers.providers.Web3Provider = null;
  private web3ModalProvider = null;
  init() {
    // if (!this.web3Modal) {
    this.web3Modal = new Web3Modal({
      cacheProvider: true, // optional
      providerOptions, // required
    });
    // }
  }
  async getEthProvider() {
    if (!this.ethProvider) {
      await this.connect();
      return this.ethProvider;
    } else {
      return this.ethProvider;
    }
  }

  async getWalletSigner() {
    const walletSigner = await (await this.getEthProvider()).getSigner();
    return walletSigner;
  }

  async connect() {
    console.log("connect wallet");
    const loading = message.loading("connecting wallet...", 0);
    this.init();
    this.web3ModalProvider = await this.web3Modal.connect();
    this.ethProvider = new ethers.providers.Web3Provider(
      this.web3ModalProvider
      // web3Config.network.chainId
    );

    console.log("connected");
    loading();

    this.web3ModalProvider.on("accountsChanged", (accounts: string[]) => {
      console.log("accountsChanged", accounts);
      this.emit("connected");
      window.location.reload();
    });

    // Subscribe to chainId change
    this.web3ModalProvider.on("chainChanged", (chainId: number) => {
      console.log(chainId);
      window.location.reload();
    });

    // Subscribe to provider connection
    this.web3ModalProvider.on("connect", (info: { chainId: number }) => {
      console.log(info);
    });

    // Subscribe to provider disconnection
    this.web3ModalProvider.on(
      "disconnect",
      (error: { code: number; message: string }) => {
        console.log(error);
        this.emit("disconnected");
      }
    );
    const network = await this.ethProvider.detectNetwork();
    console.log("network", network);
    if (network.chainId != web3Config.network.chainId) {
      message.error(
        "please connect to " + web3Config.network.name + " network",
        0
      );
      return this.switchNetwork();
    }
    this.emit("connected");
    return this.ethProvider;
  }
  // 恢复
  async restore() {
    console.log("restore");
    if (this.web3Modal.cachedProvider) {
      return this.connect();
    } else {
    }
  }
  async reconnect() {
    this.disconnect();
    this.connect();
  }
  async disconnect() {
    await this.web3Modal.clearCachedProvider();
    this.emit("disconnected");
    if (
      this.web3ModalProvider?.disconnect &&
      typeof this.web3ModalProvider.disconnect === "function"
    ) {
      await this.web3ModalProvider.disconnect();
    }
  }
  async switchNetwork() {
    try {
      await this.ethProvider.send("wallet_switchEthereumChain", [
        { chainId: "0x" + web3Config.network.chainId.toString(16) },
      ]);
    } catch (error) {
      console.log(error);

      throw error;
    }
  }
}
export default new Wallet();
