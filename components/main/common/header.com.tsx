import React, { useEffect, useState } from "react";
import styles from "./header.module.less";
import { useObserver } from "mobx-react";
import useStore from "../../../stores/useStore";
import { WalletStore } from "../../../stores/main/wallet.store";
import eth from "../../../contracts/wallet";
import { useRouter } from "next/router";
import { Button, message, Modal, Tooltip } from "antd";
import { web3Config } from "../../../stores/config";
import { i18n } from "@lingui/core";
import { Trans } from "@lingui/react";
import { t } from "@lingui/macro";
const walletStore = useStore(WalletStore);

export function WalletBar() {
  return useObserver(() => (
    <div className={styles.walletBar}>
      {walletStore.walletInfo.status == "connected" ? (
        <div className={styles.walletInfo}>
          <div className={styles.main} data-text="wallet connected">
            <img
              src="/wallet.png"
              title="wallet"
              className={styles.wallet_icon}
            />
            {/* <Trans id="Wallet Connected" /> */}
            <span className={styles.sub}>
              {walletStore.walletInfo.account
                ? walletStore.walletInfo.account.substr(0, 6) +
                  "..." +
                  walletStore.walletInfo.account.substr(
                    walletStore.walletInfo.account.length - 4,
                    4
                  )
                : ""}
            </span>
          </div>
        </div>
      ) : (
        <div
          className={styles.main}
          onClick={async () => {
            walletStore.connect();
          }}
          style={{ cursor: "pointer" }}
          data-text="connect wallet"
        >
          <img
            src="/wallet.png"
            title="wallet"
            className={styles.wallet_icon}
          />
          <Trans id="Connect Wallet" />
        </div>
      )}
    </div>
  ));
}

export const Header = (props: {
  hasBack?: boolean;
  hideAll?: boolean;
  hideIndex?: boolean;
}) => {
  const router = useRouter();

  return useObserver(() => (
    <div className={styles.header}>
      <div className={styles.left}>
        <a href="/">
          <img
            src="/logo.png"
            title="marry3"
            className={styles.logo}
            style={{ display: props.hideAll ? "none" : "" }}
          />
        </a>
      </div>
      <div
        className={styles.navs}
        style={{ display: props.hideAll ? "none" : "" }}
      >
        <span>
          <a href="/" title={t`结婚`}>
            <Trans id="建立关系" />
          </a>
        </span>
        <span>
          <a href="/divorce" title={t`离婚`}>
            <Trans id="解除关系" />
          </a>
        </span>
        <a href="/wedding/create" title={t`创建婚礼`} target={"_blank"}>
          <Trans id="创建婚礼" />
        </a>
        <a href="/wedding/list" title={t`婚礼列表`} target={"_blank"}>
          <Trans id="婚礼列表" />
        </a>
        <a href="/explore" title={t`已婚列表`} target={"_blank"}>
          <Trans id="档案室" />
          {!props.hideIndex ? (
            <span style={{ fontSize: "10px", marginLeft: "5px" }}>↗</span>
          ) : null}
        </a>
      </div>
      <div className={styles.right}>
        <img
          src="/i18n.png"
          title="i18n"
          className={styles.i18n}
          onClick={() => {
            i18n.locale == "cn" ? i18n.activate("en") : i18n.activate("cn");
            localStorage.setItem("locale", i18n.locale);
          }}
        />
        {!props.hideIndex ? <WalletBar /> : null}
      </div>
    </div>
  ));
};
