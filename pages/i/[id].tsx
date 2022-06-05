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
import { Button, Form, Input, message, Select } from "antd";
import { NFTStore } from "../../stores/main/nfts.store";
import { NFT } from "../../components/main/common/nft";
import { Offers } from "../../stores/main/marry.store";
import { Footer } from "../../components/main/common/footer.com";
import { TwitterOutlined } from "@ant-design/icons";

import CyberConnect, { Env, Blockchain } from "@cyberlab/cyberconnect";
import wallet from "../../contracts/wallet";
import Head from "next/head";
export default function Offer(props) {
  const walletStore = useStore(WalletStore);

  const router = useRouter();
  const { id } = router.query;
  const [offer, setOffer] = useState<Offers>({});

  async function getOffer() {
    const loading = message.loading("loading...", 0);
    const result = await fetch("/api/offer-tokenid?id=" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await result.json();
    if (json.message) {
      message.error(json.message);
    } else {
      setOffer(json);
    }
    loading();
  }

  const [aconnectloading, setAconnectloading] = useState(false);
  const [bconnectloading, setBconnectloading] = useState(false);

  const shareText =
    "Marry in Web3 with another 0x address, mint the Paired Soulbound NFT Certificate on the chain, a non-financial Dapp";
  useEffect(() => {
    if (router.query.id) {
      getOffer();
    }
  }, [router.query.id]);

  return (
    <div className={styles.upgrade}>
      <Head>
        <meta name="twitter:site" content="@marryinweb3" />
        <meta
          name="twitter:title"
          content="Marry in Web3 with another 0x address"
        />
        <meta
          name="twitter:description"
          content="Marry in Web3 with another 0x address, mint the Paired Soulbound NFT Certificate on the chain, a non-financial Dapp"
        />
        <meta name="twitter:creator" content="@creator_username" />
        <meta
          name="twitter:image"
          content={
            "https://ipfs.infura.io/ipfs/" +
            (offer.AtokenId == id ? offer.imageData : offer.imageData2)
          }
        />
        <meta name="twitter:domain" content="YourDomain.com" />
      </Head>
      <div className={styles.content}>
        <div style={{ padding: "0 60px" }}>
          <Header hasBack={true} />
        </div>
        <div className={styles.container}>
          <div className={styles.left}>
            <div
              style={{
                marginBottom: "20px",
                background: "#fff",
                width: "400px",
              }}
            >
              <NFT offer={offer} width={400} isA={offer.AtokenId == id} />
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.info}>
              <p className={styles.name}>{offer?.Aname}</p>
              <p className={styles.address}>{offer?.Aaddress}</p>
              <p className={styles.actions}>
                <Button
                  type="primary"
                  loading={aconnectloading}
                  onClick={async () => {
                    const p = await wallet.getEthProvider();
                    setAconnectloading(true);
                    try {
                      const cyberConnect = new CyberConnect({
                        namespace: "CyberConnect",
                        env: Env.PRODUCTION,
                        chain: Blockchain.ETH,
                        provider: p,
                        signingMessageEntity:
                          "CyberConnect" || "YOUR_ENTITY_HERE",
                      });
                      // cyberConnect.on
                      await cyberConnect.connect(offer?.Aaddress);
                      message.success("success");
                    } catch (e) {
                      message.error(e.message);
                    }
                    setAconnectloading(false);
                  }}
                >
                  Cyber Connect
                </Button>
              </p>
            </div>
            <div className={styles.info}>
              <p className={styles.name}>{offer?.Bname}</p>
              <p className={styles.address}>{offer?.Baddress}</p>
              <p className={styles.actions}>
                <Button
                  type="primary"
                  loading={bconnectloading}
                  onClick={async () => {
                    const p = await wallet.getEthProvider();
                    setBconnectloading(true);
                    try {
                      const cyberConnect = new CyberConnect({
                        namespace: "CyberConnect",
                        env: Env.PRODUCTION,
                        chain: Blockchain.ETH,
                        provider: p,
                        signingMessageEntity:
                          "CyberConnect" || "YOUR_ENTITY_HERE",
                      });
                      // cyberConnect.on
                      await cyberConnect.connect(offer?.Baddress);
                      message.success("success");
                    } catch (e) {
                      message.error(e.message);
                    }
                    setBconnectloading(false);
                  }}
                >
                  Cyber Connect
                </Button>
              </p>
            </div>
            <div className={styles.info}>
              <p className={styles.shares}>
                Share:{" "}
                <a
                  href={
                    "https://twitter.com/intent/tweet?text=" +
                    window.location.href +
                    ", " +
                    shareText
                  }
                  target={"_blank"}
                >
                  <TwitterOutlined />
                </a>
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
