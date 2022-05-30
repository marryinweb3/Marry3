import { ethers } from "ethers";
import { web3Config } from "../stores/config";

import ABI_MARRY3 from "../abi/Marry3.json";
import ABI_MARRY3TOKEN from "../abi/Marry3Token.json";

import wallet from "./wallet";
import { Marry3, Marry3Token } from "../typechain-types";
function factory(abi: any, address: string) {
  let contract;
  // let contract = Contract.connect(web3Provider.getSigner());
  wallet.on("connected", async () => {
    const signer = await wallet.getWalletSigner();
    const provider = await wallet.getEthProvider();
    const Contract = new ethers.Contract(address, abi, provider);
    contract = Contract.connect(signer);
  });

  return () => {
    return contract;
  };
}

export const Marry3Contract = factory(
  ABI_MARRY3,
  web3Config.address.marry3
) as () => Marry3;

export const Marry3TokenContract = factory(
  ABI_MARRY3TOKEN,
  web3Config.address.marry3token
) as () => Marry3Token;
