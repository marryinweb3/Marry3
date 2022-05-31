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
        {!props.hideIndex ? (
          <span>
            <a href="#about" title={t`关于项目`}>
              <Trans id="关于项目" />
            </a>
            <a href="#qa" title={t`问与答`}>
              <Trans id="问与答" />
            </a>
            <a href="#team" title={t`团队`}>
              <Trans id="团队" />
            </a>
          </span>
        ) : null}
        <a href="" title={t`离婚`}>
          <Trans id="解除（即将上线）" />
        </a>
        <a href="/history" title={t`已婚列表`}>
          <Trans id="档案室" />
          <span style={{ fontSize: "10px", marginLeft: "5px" }}>↗</span>
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
        <WalletBar />
      </div>
    </div>
  ));
};
