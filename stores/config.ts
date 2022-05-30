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
    marry3: "0x12f938AE64b4e73D7D8Ef30dA9A4BB45B944A595",
    marry3token: "0x5980d5E4F5e6ABeaBa2aC2d4038Eb4b49EC6B5e7",
  },
  tokenName: "token",
  siteName:
    "Marry with another 0x address, get the Soulbound NFT Certificate on the chain, a non-financial Dapp",
  ethName: "ETH",
  base_url: "/",
  api_url: "",
  host: "rinkeby.marry3.love",
  scan: "https://rinkeby.etherscan.io/address/",
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
    marry3: "0xF7bDAFD27b061fE5155e21a0da562bf4E21ad203",
    marry3token: "0xe2C43D3DC254B2e178f160f09d59d76a68930932",
  },
  tokenName: "token",
  siteName: "site",
  ethName: "BNB",
  base_url: "/",
  api_url: "",
  scan: "https://rinkeby.etherscan.io/address/",
};

const config_online = {
  site: 1,
  network: {
    url: "https://mainnet.infura.io/v3/",
    chainId: 1,
    gas: "auto",
    gasPrice: "auto",
    name: "Ethereum Mainnet",
  },
  address: {
    marry3: "",
    marry3token: "",
  },
  tokenName: "token",
  siteName:
    "Marry with another 0x address, get the Soulbound NFT Certificate on the chain, a non-financial Dapp",
  ethName: "ETH",
  base_url: "/",
  api_url: "",
  host: "marry3.love",
  scan: "https://etherscan.io/address/",
};

const isOnline = String(process.env.NEXT_PUBLIC_ISONLINE);
const r_config = isOnline == "1" ? config_online : config;
export const web3Config = r_config;
