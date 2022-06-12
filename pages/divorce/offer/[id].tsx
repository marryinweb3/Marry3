import { useEffect, useRef, useState } from "react";
import styles from "./home.module.less";
import { useObserver } from "mobx-react";
import { useRouter } from "next/router";
import { Trans } from "@lingui/react";
import { t } from "@lingui/macro";
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
import { NFTStore } from "../../../stores/main/nfts.store";

import {
  QuestionCircleOutlined,
  LockOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import { OfferStore } from "../../../stores/main/offer.store";
import { WalletStore } from "../../../stores/main/wallet.store";
import useStore from "../../../stores/useStore";
import { Header } from "../../../components/main/common/header.com";
import { DivorceStore } from "../../../stores/main/divorce.store";

export default function Offer(props) {
  const divorceStore = useStore(DivorceStore);

  const walletStore = useStore(WalletStore);
  const router = useRouter();
  const { id } = router.query;
  const [accepting, setAccepting] = useState(false);
  const [pendingOffer, setPendingOffer] = useState<any>({});
  const [is404, setIs404] = useState(false);
  const [form, setForm] = useState<any>({});
  const getOffer = async () => {
    const loading = message.loading("loading");
    try {
      const result = await fetch("/api/divorce/offer?id=" + id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await result.json();
      if (!json.message) {
        setPendingOffer(json);
      } else {
        setIs404(true);
      }
    } catch (e) {}
    loading();
  };
  const accept = async () => {
    const nonce = "fine";

    const body = {
      nonce,
      signature: "",
      id: pendingOffer.id,
      address: (await walletStore.getWalletInfo()).account,
    };

    const msg = await walletStore.signMessage(nonce);
    body.signature = msg;
    const offer = await fetch("/api/divorce/offer-b", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const json = await offer.json();
    if (json.message) {
      message.error(json.message);
    } else {
      setPendingOffer(json);
      message.success("accept success");
    }
  };
  useEffect(() => {
    if (id) {
      getOffer();
      (async () => {
        const walletInfo = await walletStore.getWalletInfo();

        const f = Object.assign({}, form);
        f.Baddress = walletInfo.account;
        setForm(f);
      })();
    }
  }, [router.query.id]);

  return useObserver(() => {
    return (
      <div className={styles.upgrade}>
        <div className={styles.content}>
          {is404 ? (
            <div className={styles.Page1}>
              <div className={styles.Page_inner}>
                <div className={styles.s404}>{t`no found offer`}</div>
              </div>
            </div>
          ) : (
            <div className={styles.Page1}>
              <div className={styles.Page_inner}>
                <Header hideAll={true} />
                <div className={styles.content}>
                  <h2 className={styles.subInfo}>
                    <p>
                      <Trans id="You will cancel marry relationship with  " />
                      {pendingOffer.Aname}
                    </p>
                    <p>
                      <Trans id="if you accept, your marriage NFT token will be burn" />
                    </p>
                  </h2>
                  <h2 className={styles.subInfo2}>
                    <p className={styles.subInfoMain}>
                      <div>
                        <img
                          src="/logo.png"
                          title="marry3"
                          className={styles.logo}
                        />
                      </div>
                      <Trans id="基于 ERC520 开发" />
                      <a
                        href="https://github.com/marryinweb3/erc520"
                        style={{ marginLeft: "10px" }}
                      >
                        Github
                      </a>
                    </p>
                  </h2>
                  <Form layout={"vertical"} className={styles.mainForm}>
                    {walletStore.walletInfo.account ? (
                      <Button
                        onClick={async () => {
                          setAccepting(true);
                          try {
                            await accept();
                          } catch (e) {
                            message.error(e);
                          }

                          setAccepting(false);
                        }}
                        disabled={pendingOffer.status !== 0}
                        type="primary"
                        loading={accepting}
                        style={{ width: "100%" }}
                        className="shake-little"
                      >
                        {pendingOffer.status == 0 ? (
                          <Trans id="签名回复对方" />
                        ) : (
                          <Trans id="accepted, wait for burn" />
                        )}
                      </Button>
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
                      current={pendingOffer.status + 1}
                      progressDot={customDot}
                      className={styles.steps}
                      responsive={false}
                    >
                      <Steps.Step title={t`发起离婚（解除关系）请求`} />
                      <Steps.Step title={t`等待对方签名同意`} />
                      <Steps.Step title={t`提交 Burn 销毁 NFT`} />
                    </Steps>
                    {!form.Baddress ? (
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
            </div>
          )}
        </div>
      </div>
    );
  });
}
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
