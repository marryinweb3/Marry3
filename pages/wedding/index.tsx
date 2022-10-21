import { useEffect, useRef, useState } from "react";
import styles from "./wedding.module.less";
import useStore from "../../stores/useStore";
import { useObserver } from "mobx-react";
import { web3Config } from "../../stores/config";
import { message, Tooltip } from "antd";
import { WalletStore } from "../../stores/main/wallet.store";
import { WeddingStore } from "../../stores/main/wedding.store";
import { Trans } from "@lingui/react";
import { NFTStore } from "../../stores/main/nfts.store";
import { Header } from "../../components/main/common/header.com";
import { Footer } from "../../components/main/common/footer.com";
import WeddingForm from "../../components/main/wedding/weddingForm";
import WorkInfo from "../../components/main/wedding/workInfo";

export default function createWedding(props) {
  const wallet = useStore(WalletStore);
  const nftStore = useStore(NFTStore);

  const weddingStore = useStore(WeddingStore);

  const [state, setState] = useState("");
  useEffect(() => {
    (async () => {
      const loading = message.loading("loading...", 0);
      //根据地址获取结婚记录
      await weddingStore.getOffer();
      //如果没有结婚记录不予预约
      console.log("结婚记录", weddingStore.wedding);
      setState("create");
      //如果有
      loading();
    })();
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
          <WeddingForm state={state} info={weddingStore} />
          <WorkInfo state={state} info={weddingStore} />
        </div>
        <Footer />
      </div>
    );
  });
}
