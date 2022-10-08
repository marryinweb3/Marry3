import { useEffect, useRef, useState } from "react";
import styles from "./wedding.module.less";
import useStore from "../../stores/useStore";
import { useObserver } from "mobx-react";
import { web3Config } from "../../stores/config";
import { message, Tooltip } from "antd";
import { WalletStore } from "../../stores/main/wallet.store";
import { MarryStore } from "../../stores/main/marry.store";
import { Trans } from "@lingui/react";
import { NFTStore } from "../../stores/main/nfts.store";
import { Header } from "../../components/main/common/header.com";
import { Footer } from "../../components/main/common/footer.com";
import WeddingForm from "../../components/main/wedding/weddingForm";
import WorkInfo from "../../components/main/wedding/workInfo";

export default function createWedding(props) {
  const wallet = useStore(WalletStore);
  const nftStore = useStore(NFTStore);

  const marryStore = useStore(MarryStore);

  const [state, setState] = useState("join");
  useEffect(() => {
    nftStore.getNFTS();
    marryStore.getMintInfo();
    (async () => {
      const walletInfo = await wallet.getWalletInfo();
      marryStore.info.Aaddress = walletInfo.account;
      marryStore.info.Aname = walletInfo.ens;
      const loading = message.loading("loading...", 0);
      await marryStore.getOffer();
      loading();
    })();

    setInterval(marryStore.getNowGas, 10000);
  }, []);

  return useObserver(() => {
    return (
      <div className={styles.wedding}>
        <img src="/wedding/BlurEffects.png" className={styles.bgImg} />
        <img src="/wedding/Ellipse.svg" className={styles.bgIcon} />
        <div className={styles.headDiv}>
          <Header hasBack={true} />
        </div>
        <div className={styles.title}>
          {state == "create" ? "创建婚礼" : "参加婚礼"}
        </div>
        <div className={styles.weddingContent}>
          <WeddingForm state={state} />
          <WorkInfo state={state} />
        </div>
        <Footer />
      </div>
    );
  });
}
