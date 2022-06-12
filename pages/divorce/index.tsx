import { useEffect, useRef, useState } from "react";
import { Header } from "../../components/main/common/header.com";
import styles from "./home.module.less";
import { useObserver } from "mobx-react";
import { Web3Head } from "../../components/main/common/head.com";
import { WalletStore } from "../../stores/main/wallet.store";
import { useRouter } from "next/router";
import { Trans } from "@lingui/react";
import { OfferStore } from "../../stores/main/offer.store";
import useStore from "../../stores/useStore";
import { t } from "@lingui/macro";
import { v4 as uuidv4 } from "uuid";
import {
  Button,
  Dropdown,
  Form,
  Input,
  Menu,
  message,
  Select,
  Steps,
  StepsProps,
  Tooltip,
} from "antd";
import { NFTStore } from "../../stores/main/nfts.store";

import {
  QuestionCircleOutlined,
  LockOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import { Footer } from "../../components/main/common/footer.com";
import { MarryStore } from "../../stores/main/marry.store";
import { NFT } from "../../components/main/common/nft";
import { DivorceStore } from "../../stores/main/divorce.store";
import ClipboardJS from "clipboard";
import { Marry3Contract } from "../../contracts";

export default function Devorce(props) {
  const divorceStore = useStore(DivorceStore);
  const marryStore = useStore(MarryStore);
  const walletStore = useStore(WalletStore);
  const router = useRouter();
  const { id } = router.query;
  const [signaing, setSignaing] = useState(false);
  const [accepting, setAccepting] = useState(false);
  const [ensList, setEnsList] = useState<ItemType[]>([]);
  const [nftActiveIndex, setNftActiveIndex] = useState(0);
  const copyRef = useRef(null);
  const inputRef = useRef(null);
  const [burning, setBurning] = useState(false);

  useEffect(() => {
    divorceStore.getMintInfo();
    (async () => {
      const walletInfo = await walletStore.getWalletInfo();
      divorceStore.info.Aaddress = walletInfo.account;
      divorceStore.info.Aname = walletInfo.ens;
      const loading = message.loading("loading...", 0);
      await divorceStore.getOffer();
      await marryStore.getOffer();
      loading();
    })();
    const timer = setInterval(() => {
      if (copyRef.current && inputRef.current) {
        const clip = new ClipboardJS(copyRef.current!, {
          target: () => inputRef.current!,
        });
        clip.on("success", function () {
          message.success("copy success");
          marryStore.shareClicked = true;
        });
        clip.on("error", () => {
          message.error("copy fail");
        });
        clearInterval(timer);
      }
    }, 500);
  }, []);
  const burn = async () => {
    const uuid = uuidv4();
    const msg = await walletStore.signMessage(uuid);
    const body = {
      nonce: uuid,
      signature: msg,
      id: divorceStore.pendingOffer.id,
    };
    setBurning(true);
    const offer = await fetch(
      `/api/divorce/offer-setImage?nonce=${body.nonce}&signature=${body.signature}&id=${body.id}`,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const res = await offer.json();
    if (res.message) {
      message.error(res.message);
    } else {
      console.log("res", res);
      if (res.Bsignature) {
        const Bsignature = res.Bsignature;
        console.log("Bsignature", res);
        const loading = message.loading("please wait until success...", 0);
        try {
          const blockNo = await divorceStore.burn(res.Baddress, Bsignature);

          await divorceStore.getOffer();
        } catch (e) {
          console.error(e);
          message.error("burn error");
        }

        loading();
      } else {
        message.error("get signature error");
      }
    }
    setBurning(false);
  };
  return useObserver(() => {
    return (
      <div className={styles.upgrade}>
        <Header hasBack={true} />
        <div className={styles.content}>
          <div className={styles.Page_inner}>
            <Form layout={"vertical"} className={styles.mainForm}>
              {marryStore.pendingOffer.id &&
              marryStore.pendingOffer.status == 2 ? (
                <div className={styles.nfts}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                    className={[
                      styles.nft,
                      nftActiveIndex == 0 ? styles.nft_active : "",
                    ].join(" ")}
                  >
                    <NFT
                      offer={marryStore.pendingOffer}
                      width={340}
                      isA={true}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                    className={[
                      styles.nft,
                      nftActiveIndex == 1 ? styles.nft_active : "",
                    ].join(" ")}
                  >
                    <NFT
                      offer={marryStore.pendingOffer}
                      width={340}
                      isA={false}
                    />
                  </div>
                  <div className={styles.control}>
                    <div
                      className={[
                        styles.control_item,
                        nftActiveIndex == 0 ? styles.control_item_active : "",
                      ].join(" ")}
                      onClick={() => setNftActiveIndex(0)}
                    ></div>
                    <div
                      className={[
                        styles.control_item,
                        nftActiveIndex == 1 ? styles.control_item_active : "",
                      ].join(" ")}
                      onClick={() => setNftActiveIndex(1)}
                    ></div>
                  </div>
                </div>
              ) : (
                <div className={styles.no_offer}>暂无结婚记录</div>
              )}

              {walletStore.walletInfo.account ? (
                divorceStore.pendingOffer.status == 2 ? (
                  <Button
                    type="primary"
                    loading={signaing}
                    disabled={true}
                    style={{ width: "100%" }}
                    className="shake-little"
                  >
                    <Trans id="Burned" />
                  </Button>
                ) : divorceStore.pendingOffer.status == 1 ? (
                  <Button
                    onClick={async () => {
                      setSignaing(true);
                      await burn();
                      setSignaing(false);
                    }}
                    type="primary"
                    loading={signaing}
                    style={{ width: "100%" }}
                    className="shake-little"
                  >
                    <Trans id="Submit Burn" />
                  </Button>
                ) : divorceStore.pendingOffer.status == 0 ? (
                  <Input.Group
                    compact
                    style={{
                      display: "inline-block",
                      verticalAlign: "8px",
                      marginTop: "20px",
                    }}
                  >
                    <input
                      value={
                        window.location.origin +
                        `/divorce/offer/${divorceStore.pendingOffer.id}`
                      }
                      style={{
                        width: "calc(100% - 110px)",
                        color: "#999CA0",
                        fontWeight: "300",
                        border: "2px solid #EBEBEB ",
                        paddingLeft: "10px",
                      }}
                      id="copy-input"
                      ref={inputRef}
                    />
                    <Button
                      style={{ width: "110px" }}
                      id="copy"
                      data-clipboard-target="#copy-input"
                      ref={copyRef}
                    >
                      {t`复制并分享`}
                    </Button>
                  </Input.Group>
                ) : (
                  <Button
                    onClick={async () => {
                      setSignaing(true);
                      await divorceStore.signA();
                      setSignaing(false);
                    }}
                    type="primary"
                    loading={signaing}
                    disabled={
                      !(
                        marryStore.pendingOffer.id &&
                        marryStore.pendingOffer.status == 2
                      )
                    }
                    style={{ width: "100%" }}
                    className="shake-little"
                  >
                    <Trans id="发起离婚请求" />
                  </Button>
                )
              ) : (
                <Button
                  onClick={async () => {
                    walletStore.connect();
                  }}
                  type="primary"
                  style={{ width: "100%" }}
                >
                  <Trans id="Connect Wallet" />
                </Button>
              )}
              <Steps
                current={divorceStore.stepStatus()}
                progressDot={customDot}
                className={styles.steps}
                responsive={false}
              >
                <Steps.Step title={t`发起离婚（解除关系）请求`} />
                <Steps.Step title={t`等待对方签名同意`} />
                <Steps.Step title={t`提交 Burn 销毁 NFT`} />
              </Steps>
              {!divorceStore.info.Aaddress ? (
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
            </Form>
          </div>
        </div>
        <Footer />
      </div>
    );
  });
}
const customDot: StepsProps["progressDot"] = (dot, { status, index }) => {
  return status == "wait" ? (
    <img
      src="/form/0.png"
      className={[styles.dotimg, styles.dotimg0].join(" ")}
      title=""
    />
  ) : status == "process" ? (
    <img
      src="/form/1.png"
      className={[styles.dotimg, styles.dotimg1].join(" ")}
      title=""
    />
  ) : status == "finish" ? (
    <img
      src="/form/2.png"
      className={[styles.dotimg, styles.dotimg2].join(" ")}
      title=""
    />
  ) : null;
};
