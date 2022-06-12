const config = {
  site: 1,
  network: {
    url: "https://rinkeby.infura.io/v3/f4dd6db18a6f4ea98151892c0fa8e074",
    chainId: 4,
    gas: "auto",
    gasPrice: "auto",
    name: "Rinkeby Testnet",
  },
  address: {
    marry3: "0x3D6822377A86CfB9ca0e5C52fbe865f9d63BfE70",
  },
  tokenName: "token",
  siteName:
    "Marry with another 0x address, get the Soulbound NFT Certificate on the chain, a non-financial Dapp",
  ethName: "ETH",
  base_url: "/",
  api_url: "",
  host: "rinkeby.marry3.love",
  scan: "https://rinkeby.etherscan.io/address/",
  opensea: "https://testnets.opensea.io/assets/rinkeby/",
  chainbase_key: "2ANDzY2fVrENXwUSGjyI20vaFKR",
};

const config_local = {
  site: 1,
  network: {
    url: "http://localhost:8545/",
    chainId: 31337,
    gas: "auto",
    gasPrice: "auto",
    name: "Rinkeby",
  },
  address: {
    marry3: "0x2984Ed3c0A8d46a8AaE3066F164D590fAF11f557",
  },
  tokenName: "token",
  siteName: "site",
  ethName: "BNB",
  base_url: "/",
  api_url: "",
  scan: "https://rinkeby.etherscan.io/address/",
  opensea: "https://testnets.opensea.io/assets/rinkeby/",
  chainbase_key: "2ANDzY2fVrENXwUSGjyI20vaFKR",
};

const config_online = {
  site: 1,
  network: {
    url: "https://mainnet.infura.io/v3/f4dd6db18a6f4ea98151892c0fa8e074",
    chainId: 1,
    gas: "auto",
    gasPrice: "auto",
    name: "Ethereum Mainnet",
  },
  address: {
    marry3: "0xb92cF71Bb9dF4Dd30598fec340C1b8f22Ea30846",
  },
  tokenName: "token",
  siteName:
    "Marry with another 0x address, get Paired Soulbound NFT Certificate on the chain, a non-financial Dapp",
  ethName: "ETH",
  base_url: "/",
  api_url: "",
  host: "marry3.love",
  scan: "https://etherscan.io/address/",
  opensea: "https://opensea.io/assets/ethereum/",
  chainbase_key: "2ANDzY2fVrENXwUSGjyI20vaFKR",
};

const isOnline = String(process.env.NEXT_PUBLIC_ISONLINE);
const r_config = isOnline == "1" ? config_online : config;
export const web3Config = r_config;
