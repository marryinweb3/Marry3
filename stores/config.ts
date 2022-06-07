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
    marry3: "0xe8E468360a160647bb4AbC6A59dA82D5A01d5F5b",
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
    marry3: "0xe8E468360a160647bb4AbC6A59dA82D5A01d5F5b",
  },
  tokenName: "token",
  siteName: "site",
  ethName: "BNB",
  base_url: "/",
  api_url: "",
  scan: "https://rinkeby.etherscan.io/address/",
  opensea: "https://testnets.opensea.io/assets/rinkeby/",
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
};

const isOnline = String(process.env.NEXT_PUBLIC_ISONLINE);
const r_config = isOnline == "1" ? config_online : config;
export const web3Config = r_config;
