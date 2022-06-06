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
import { web3Config } from "../../stores/config";
import QRCode from "qrcode";
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
  const qrcode = useRef(null);
  const shareText =
    "Marry in Web3 with another 0x address, mint the Paired Soulbound NFT Certificate on the chain, a non-financial Dapp";
  useEffect(() => {
    if (router.query.id) {
      getOffer();
    }
    QRCode.toCanvas(
      qrcode.current,
      window.location.href,
      {
        margin: 1,
        width: 70,
        color: {
          dark: "#333", // Blue dots
          light: "#0000", // Transparent background
        },
      },
      function (error) {
        if (error) console.error(error);
        console.log("success!");
      }
    );
  }, [router.query.id]);
  const [nftActiveIndex, setNftActiveIndex] = useState(0);
  return (
    <div className={styles.upgrade}>
      <Head>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@marryinweb3" />
        <meta
          name="twitter:title"
          content="Marry in Web3 with another 0x address"
        />
        <meta
          name="twitter:description"
          content="Marry in Web3 with another 0x address, mint the Paired Soulbound NFT Certificate on the chain, a non-financial Dapp"
        />
        <meta
          name="twitter:image"
          content={
            "https://ipfs.infura.io/ipfs/" +
            (offer.AtokenId == id
              ? offer.imageData
              : offer.imageData2
            )?.replace("ipfs://", "")
          }
        />
        <meta name="twitter:domain" content="marry3.love" />
      </Head>
      <div className={styles.content}>
        <div style={{ padding: "0 60px" }}>
          <Header hasBack={true} hideIndex={true} />
        </div>
        <div className={styles.container}>
          <div className={styles.left}>
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
                <NFT offer={offer} width={340} isA={offer?.AtokenId == id} />
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
                <NFT offer={offer} width={340} isA={offer?.AtokenId != id} />
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
            <p className={styles.shares}>
              <canvas
                ref={qrcode}
                width={50}
                height={50}
                style={{
                  verticalAlign: "bottom",
                  marginRight: "20px",
                }}
              ></canvas>
              <a
                href={
                  "https://twitter.com/intent/tweet?text=" +
                  window.location.href +
                  ", " +
                  shareText
                }
                target={"_blank"}
              >
                <TwitterOutlined
                  size={20}
                  style={{ fontSize: "25px", color: "#0057D6" }}
                />
              </a>
              <a
                href={`${web3Config.opensea}${web3Config.address.marry3}/${id}`}
                target={"_blank"}
                style={{ marginLeft: "10px" }}
              >
                <img
                  src="/opensea-logo.png"
                  style={{
                    width: "21px",
                    height: "21px",
                    verticalAlign: "-1px",
                  }}
                />
              </a>
            </p>
          </div>
          <div className={styles.right}>
            <div className={styles.info}>
              <img
                className={styles.cover}
                style={{
                  background: "#fff",
                  borderTopLeftRadius: "50%",
                  borderTopRightRadius: "50%",
                  zIndex: 20,
                }}
                src={offer?.Acover || "/heart-cover.png"}
              />
              <div className={styles.detail}>
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
                    className={styles.button}
                  >
                    CyberConnect
                  </Button>
                </p>
              </div>
            </div>
            <div className={styles.info}>
              <img
                className={styles.cover}
                style={{
                  background: "#fff",
                  borderBottomLeftRadius: "50%",
                  borderBottomRightRadius: "50%",
                  zIndex: 20,
                }}
                src={offer?.Bcover || "/heart-cover.png"}
              />
              <div className={styles.detail}>
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
                    className={styles.button}
                  >
                    CyberConnect
                  </Button>
                </p>
              </div>
            </div>

            <div className={styles.info}></div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
function ref(arg0: null) {
  throw new Error("Function not implemented.");
}
