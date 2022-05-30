import Head from "next/head";
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
      {/* <script src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"></script> */}
      {/* <script src="https://cdn.anychart.com/releases/v8/js/graphics.min.js"></script> */}
      <link
        rel="stylesheet"
        type="text/css"
        href="https://csshake.surge.sh/csshake.min.css"
      ></link>
      {/* <script src="/mo.umd.js"></script> */}
    </Head>
  );
}
