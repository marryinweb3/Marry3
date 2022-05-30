import { Provider } from "mobx-react";
import { I18nProvider } from "@lingui/react";
import { i18n } from "@lingui/core";
// import { en, sv } from "make-plural/plurals";
import { messages as enMessages } from "../locale/en";
import { messages as cnMessages } from "../locale/zh_CN";
i18n.load("en", enMessages);
i18n.load("cn", cnMessages);

i18n.activate("en");
import "../styles/var.less";
import "../styles/app.less";

import { useEffect } from "react";
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
  useEffect(() => {
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
      </SafeHydrate>
    </I18nProvider>
  );
}
