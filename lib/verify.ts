import { ethers } from "ethers";
import { web3Config } from "../stores/config";
// let privateKey = process.env.PRIVATE_KEY_mainnet;

import abi from "../abi/Marry3.json";
import { Marry3 } from "../typechain-types";

const provider = new ethers.providers.JsonRpcProvider(web3Config.network.url);

const marry3TokenContract = new ethers.Contract(
  web3Config.address.marry3,
  abi,
  provider
) as Marry3;

export const verifyMarried = async function (address: string) {
  try {
    const result = await marry3TokenContract.getPairInfo(address);
    return result;
  } catch (e) {
    return false;
  }
};

export const getTokenPairInfo = async function (tokenId: string) {
  try {
    const address = await marry3TokenContract.ownerOf(Number(tokenId));
    console.log("ownerOf", address);
    const result = await marry3TokenContract.getPairInfo(address);

    return result;
  } catch (e) {
    console.log(e);
    return false;
  }
};
