import { Provider } from "mobx-react";
import { I18nProvider } from "@lingui/react";
import { i18n } from "@lingui/core";
// import { en, sv } from "make-plural/plurals";
import { messages as enMessages } from "../locale/en";
import { messages as cnMessages } from "../locale/zh_CN";

i18n.load("cn", cnMessages);
i18n.load("en", enMessages);
import "../styles/var.less";
import "../styles/app.less";

import { useEffect, useState } from "react";
import wallet from "../contracts/wallet";
import router, { Router, useRouter } from "next/router";
import { message, notification } from "antd";
import { Web3Head } from "../components/main/common/head.com";
import { web3Config } from "../stores/config";
import { t } from "@lingui/macro";
function SafeHydrate({ children }) {
  return (
    <div suppressHydrationWarning>
      {typeof window === "undefined" ? null : children}
    </div>
  );
}

message.config({
  top: 50,
});
export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [showLang, setShowLang] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("locale")) {
      // const hasZH = window.navigator.languages.findIndex((f) => {
      //   return f.indexOf("zh") != -1;
      // });
      // if (hasZH > 0 && hasZH < 1) {
      //   i18n.activate("cn");
      // } else {
      i18n.activate("en");
      // }
      // setShowLang(true);
    } else {
      localStorage.getItem("locale") == "cn"
        ? i18n.activate("cn")
        : i18n.activate("en");
    }

    document.documentElement.style.fontSize = `${
      (window.innerWidth * 100) / 1920
    }px`;
    window.addEventListener("resize", () => {
      document.documentElement.style.fontSize = `${
        (window.innerWidth * 100) / 1920
      }px`;
    });
    if (
      window.location.host.indexOf("localhost") == -1 &&
      window.location.host != web3Config.host
    ) {
      window.location.href = window.location.href.replace(
        window.location.host,
        web3Config.host
      );
    }
    if (web3Config.network.chainId == 4) {
      notification.warning({
        placement: "bottomRight",
        bottom: 50,
        duration: 0,
        message: t`网站正在测试中，当前网络为测试网络，所有数据都将会在上线后销毁`,
      });
    }
    function getJsonFromUrl(url?: string) {
      if (!url) url = location.search;
      const query = url.substr(1);
      const result: any = {};
      query.split("&").forEach(function (part) {
        var item = part.split("=");
        result[item[0]] = decodeURIComponent(item[1]);
      });
      return result;
    }
    const query = getJsonFromUrl();

    // 初始化
    wallet.init();
    // 恢复本地缓存
    wallet.restore();
  }, []);

  return (
    <I18nProvider i18n={i18n}>
      <SafeHydrate>
        <Web3Head />
        <Component {...pageProps} />
        <div className="mobile-tip">
          Use desktop version to get more friendly experience
        </div>
        {/* {showLang ? (
          <div className="sc-AxgMl hkzEld web3modal-modal-lightbox">
            <div className="sc-AxheI fdbjE web3modal-modal-container">
              <div className="sc-Axmtr hvJMgY web3modal-modal-hitbox"></div>
              <div className="sc-AxmLO bfIkEQ web3modal-modal-card">
                <div className="sc-AxhUy kaSVED web3modal-provider-wrapper">
                  <div className="sc-AxhCb xPSun web3modal-provider-container">
                    <div
                      className="sc-AxirZ hBmmHr web3modal-provider-name"
                      style={{ opacity: 0.4 }}
                    >
                      Choose Your language
                    </div>
                    <div
                      className="sc-AxirZ hBmmHr web3modal-provider-name"
                      onClick={() => {
                        i18n.activate("en");
                        localStorage.setItem("locale", i18n.locale);
                        setShowLang(false);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      English
                    </div>
                    <div
                      className="sc-AxirZ hBmmHr web3modal-provider-name"
                      onClick={() => {
                        i18n.activate("cn");
                        localStorage.setItem("locale", i18n.locale);
                        setShowLang(false);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      中文
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null} */}
      </SafeHydrate>
    </I18nProvider>
  );
}
