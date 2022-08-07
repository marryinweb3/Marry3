import { t } from "@lingui/macro";
import { Trans } from "@lingui/react";
import { Collapse, message, Steps, StepsProps } from "antd";
import { useObserver } from "mobx-react";
import { QuestionCircleOutlined, LockOutlined } from "@ant-design/icons";
import { web3Config } from "../../../stores/config";
import { MarryStore } from "../../../stores/main/marry.store";
import { WalletStore } from "../../../stores/main/wallet.store";
import useStore from "../../../stores/useStore";
import styles from "./../../../pages/home/home.module.less";
import { FormDesc } from "./form/desc";
import { Status0 } from "./form/status-0";
import { StatusPending } from "./form/status-pending";
import { useEffect, useRef } from "react";
import { loveBubbles } from "../../../utils/bubbles";

export const FormPage = (props: {}) => {
  const marryStore = useStore(MarryStore);
  const walletStore = useStore(WalletStore);
  const circleDom = useRef<HTMLDivElement>(null);
  let hasLoadedBubbles = false;
  const loadBubbles = async () => {
    //@ts-ignore
    if (window.mojs) {
      loveBubbles(circleDom.current);
      return;
    }
    const script = document.createElement("script");
    script.src = "/mo.umd.js";
    document.body.appendChild(script);
    script.onload = () => {
      loveBubbles(circleDom.current);
    };
    hasLoadedBubbles = true;
  };
  useEffect(() => {
    loadBubbles();
  }, []);

  return useObserver(() => (
    <div className={styles.Page2}>
      <div className={styles.Page_inner}>
        <div className={styles.circle_bg}></div>
        <div className={styles.left}>
          <div className={styles.left_inner} ref={circleDom}></div>
          <div className={styles.circle_text}>
            <div className={styles.t1}>
              <Trans id="国库收益(ETH)" />
            </div>
            <div className={styles.t2}>{marryStore.ethBalanceFormated}</div>
            <div className={styles.t3}>
              <Trans id="协议已见证了" /> {marryStore.marryCount}{" "}
              <Trans id="对新人" />
            </div>
            <div className={styles.t4}>
              <div style={{ marginBottom: "0px", color: "#361041" }}>
                <Trans id="所有收益都将用于发行Token和空投" />
              </div>
              <br />
              <Trans id="Marry3 合约地址：" /> {web3Config.address.marry3}
              <a
                href={web3Config.scan + web3Config.address.marry3}
                target={"_blank"}
              >
                <img
                  src="/scan-logo.png"
                  style={{ width: 14, marginLeft: 10 }}
                />
              </a>
              <a
                href={"https://opensea.io/collection/marry3"}
                target={"_blank"}
              >
                <img
                  src="/opensea-logo.png"
                  style={{ width: 14, marginLeft: 10 }}
                />
              </a>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.mainFormWrapper}>
            <div className={styles.mainFormBG}></div>
            {marryStore.pendingOffer.status === 0 ||
            marryStore.pendingOffer.status === 1 ||
            marryStore.pendingOffer.status === 2 ? (
              <StatusPending />
            ) : (
              <Status0 />
            )}
            {!marryStore.info.Aaddress ? (
              <div className={styles.noconnectWrapper}>
                <div
                  className={styles.noconnect}
                  onClick={() => {
                    walletStore.connect();
                  }}
                >
                  <LockOutlined style={{ fontSize: "25px" }} /> <br />
                  <Trans id="连接钱包启动 DAPP" />
                </div>
              </div>
            ) : null}
            <Steps
              current={marryStore.stepStatus()}
              progressDot={customDot}
              className={styles.steps}
              responsive={false}
            >
              <Steps.Step title={t`签名`} />
              <Steps.Step title={t`分享结婚地址`} />
              <Steps.Step title={t`等待对方签名`} />
              <Steps.Step title={t`Mint SBTs`} />
            </Steps>
            <FormDesc />
          </div>
        </div>
      </div>
    </div>
  ));
};
const customDot: StepsProps["progressDot"] = (dot, { status, index }) => {
  return status == "wait" ? (
    <img
      src="/form/0.png"
      className={[styles.dotimg, styles.dotimg0].join(" ")}
    />
  ) : status == "process" ? (
    <img
      src="/form/1.png"
      className={[styles.dotimg, styles.dotimg1].join(" ")}
    />
  ) : status == "finish" ? (
    <img
      src="/form/2.png"
      className={[styles.dotimg, styles.dotimg2].join(" ")}
    />
  ) : null;
};
