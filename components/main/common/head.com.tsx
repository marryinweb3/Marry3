import Head from "next/head";
import Script from "next/script";
import { web3Config } from "../../../stores/config";

export function Web3Head() {
  return (
    <Head>
      <title>{web3Config.siteName}</title>
      <link rel="icon" href="/heart.png" type="image/x-icon" />
      <link rel="shortcut icon" href="/heart.png" type="image/x-icon"></link>
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no,shrink-to-fit=no"
      ></meta>
      <link
        rel="stylesheet"
        type="text/css"
        href="https://csshake.surge.sh/csshake.min.css"
      ></link>
      <Script strategy="lazyOnload">
        {` (function(w,d,s,l,i){w[l] = w[l] || [];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-NV95S3L');
        `}
      </Script>
    </Head>
  );
}
