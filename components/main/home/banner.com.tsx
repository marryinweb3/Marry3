import { t } from "@lingui/macro";
import { Trans } from "@lingui/react";
import { Collapse } from "antd";
import { useObserver } from "mobx-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Banner } from "../common/banner";
import { Header } from "../common/header.com";
import styles from "./../../../pages/home/home.module.less";

export const MainBanner = (props: {}) => {
  const [offerId, setOfferId] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (router.query.id) {
      setOfferId(router.query.id as string);
    }
  }, [router.query.id]);
  return useObserver(() => (
    <>
      {offerId ? (
        <Banner
          onclick={() => {
            router.push(`/offer/${offerId}`);
          }}
        />
      ) : null}
      <div className={styles.bg} id="bg-index"></div>
      <div className={styles.Page1}>
        <div className={styles.header_wrapper}>
          <Header hasBack={true} />
        </div>
        <div className={styles.Page_inner}>
          <div
            className={styles.circle_bg}
            style={{ left: 0, top: "-100px" }}
          ></div>
          <h1 className={styles.title}>
            <Trans id="在Web3见证你们的“爱情宣言”，并获得在链上永恒的NFT凭证" />
            <img src="/fly.png" className={styles.fly} title="fly" />
          </h1>
          <h2 className={styles.subInfo}>
            <p className={styles.subInfoMain}>
              <Trans id="基于 ERC721-520 开发" />
              <a
                href="https://github.com/marryinweb3/ERC721-520"
                style={{ marginLeft: "10px" }}
              >
                (Github)
              </a>
            </p>

            <p>
              <img src="/heart.png" title="heart" className={styles.heart} />
              <Trans id="ERC721-520 Token 不可转让，不可售卖，一个人同时只能有一个有效 Token" />
            </p>
            <p>
              <img src="/heart.png" title="heart" className={styles.heart} />
              <Trans id="ERC721-520 Token 由二者通过多签协商后，一次性 Mint 出 2 个 Token" />
            </p>
            <p>
              <img src="/heart.png" title="heart" className={styles.heart} />
              <Trans id="ERC721-520 Token 可以通过多签协商销毁，销毁后可以与其他地址铸造新的 Token" />
            </p>
            <div className={styles.socials}>
              <a
                href="https://twitter.com/marryinweb3"
                className={[styles.social, styles.twitter].join(" ")}
                target={"_blank"}
              >
                Twitter
              </a>
              <a
                href="https://discord.gg/eAN9TaAaSq"
                target={"_blank"}
                className={[styles.social, styles.discord].join(" ")}
              >
                Discord
              </a>
              <a
                href="https://opensea.io/collection/marry3"
                target={"_blank"}
                className={[styles.social, styles.discord].join(" ")}
              >
                OpenSea
              </a>
              <a
                href="https://github.com/marryinweb3"
                target={"_blank"}
                className={[styles.social, styles.github].join(" ")}
              >
                Github
              </a>
            </div>
          </h2>

          <img src="/flower.svg" className={styles.flower} title="flower" />
        </div>
      </div>
    </>
  ));
};
