import { BigNumber } from "ethers";

export interface IWallet {
  status?: "connected" | "disconnected";
  account?: string;
  ens?: string;
  chainId?: number;
  balance?: BigNumber;
  balanceFormated?: string;
  balanceCountdown?: number;
  rewardTaxFee?: number;
  bnbhBalance?: BigNumber;
  bnbhBalanceFormated?: string;
  bit?: string;
}
