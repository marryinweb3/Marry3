import { useEffect, useRef, useState } from "react";
import { Footer } from "../../components/main/common/footer.com";
import { Header } from "../../components/main/common/header.com";
import styles from "./home.module.less";
import useStore from "../../stores/useStore";
import { useObserver } from "mobx-react";
import { web3Config } from "../../stores/config";
import ClipboardJS from "clipboard";
import { v4 as uuidv4 } from "uuid";
import { Web3Head } from "../../components/main/common/head.com";
import {
  Button,
  Collapse,
  Form,
  Input,
  message,
  Radio,
  Select,
  Tooltip,
} from "antd";
import { WalletStore } from "../../stores/main/wallet.store";
import { MarryStore } from "../../stores/main/marry.store";
import { Trans } from "@lingui/react";
import { t } from "@lingui/macro";

import { QuestionCircleOutlined, LockOutlined } from "@ant-design/icons";
import { NFTStore } from "../../stores/main/nfts.store";
import { NFT } from "../../components/main/common/nft";
import html2canvas from "html2canvas";
import { useRouter } from "next/router";
import { Banner } from "../../components/main/common/banner";
import { loveBubbles } from "../../utils/bubbles";
import { imageLoaded } from "../../utils/imageloaded";
// import "../../public/mo.umd.js";

export default function Upgrade(props) {
  const wallet = useStore(WalletStore);
  const nftStore = useStore(NFTStore);

  const marryStore = useStore(MarryStore);

  const [minting, setMinting] = useState(false);
  const svgref = useRef(null);
  const copyRef = useRef(null);
  const inputRef = useRef(null);
  const [submiting, setSubmiting] = useState(false);
  const circleDom = useRef<HTMLDivElement>(null);

  const [offerId, setOfferId] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (router.query.id) {
      setOfferId(router.query.id as string);
    }
  }, [router.query.id]);

  useEffect(() => {
    nftStore.getNFTS();
    marryStore.getMintInfo();

    (async () => {
      const loading = message.loading("loading...", 0);
      await marryStore.getOffer();
      loading();
      const walletInfo = await wallet.getWalletInfo();
      marryStore.info.Aaddress = walletInfo.account;
      marryStore.info.Aname = walletInfo.ens;
    })();
    const script = document.createElement("script");
    script.src = "/mo.umd.js";
    document.body.appendChild(script);
    script.onload = () => {
      loveBubbles(circleDom.current);
    };
    // setTimeout(() => {

    // }, 500);
  }, []);

  const createImage = async () => {
    const svg = svgref.current.getElementsByTagName("svg")[0];
    if (!svg) return;
    const size = 1080;
    const html = svg.outerHTML;

    const image1 = svgref.current.getElementsByClassName("cover_1")[0];
    const image2 = svgref.current.getElementsByClassName("cover_2")[0];
    const logo = svgref.current.getElementsByClassName("logo")[0];
    let canvas = document.createElement("canvas");

    const imageCompUp = new Image();
    imageCompUp.src = "/up.png";
    imageCompUp.width = 250;
    imageCompUp.height = 250;

    const imageCompDown = new Image();
    imageCompDown.src = "/down.png";
    imageCompDown.width = 250;
    imageCompDown.height = 250;

    const upcanvas = document.createElement("canvas");
    upcanvas.width = 250;
    upcanvas.height = 250;

    const downcanvas = document.createElement("canvas");
    downcanvas.width = 250;
    downcanvas.height = 250;

    const image1_r: any = await imageLoaded(image1);
    const imageCompUp_r: any = await imageLoaded(imageCompUp);
    upcanvas.getContext("2d").drawImage(image1_r, 0, 0, 250, 250);
    upcanvas.getContext("2d").globalCompositeOperation = "destination-in";
    upcanvas.getContext("2d").drawImage(imageCompUp_r, 0, 0, 250, 250);

    const image2_r: any = await imageLoaded(image2);
    const imageCompDown_r: any = await imageLoaded(imageCompDown);
    downcanvas.getContext("2d").drawImage(image2_r, 0, 0, 250, 250);
    downcanvas.getContext("2d").globalCompositeOperation = "destination-in";
    downcanvas.getContext("2d").drawImage(imageCompDown_r, 0, 0, 250, 250);

    canvas.width = size;

    canvas.height = size;
    let context = canvas.getContext("2d");

    const bgImage = new Image();
    bgImage.width = size;
    bgImage.height = size;
    bgImage.src = marryStore.pendingOffer?.bgIndex
      ? `/bg/0${marryStore.pendingOffer.bgIndex}.png`
      : `/bg/01.png`;
    const bgImage_r: any = await imageLoaded(bgImage);
    context.drawImage(bgImage_r, 0, 0, size, size);
    const svgImage = new Image();
    svgImage.src = `data:image/svg+xml;base64,${btoa(
      unescape(encodeURIComponent(html))
    )}`;
    const svgImage_r: any = await imageLoaded(svgImage);
    // draw image in canvas starting left-0 , top - 0
    context.drawImage(svgImage_r, 0, 0, size, size);

    context.drawImage(upcanvas, 90, 90, 250, 250);
    context.drawImage(downcanvas, 90, 340, 250, 250);
    const logo_r: any = await imageLoaded(logo);
    context.drawImage(
      logo_r,
      size - 70 - 160 * 1.5,
      size - 90 - 40 * 1.5,
      160 * 1.5,
      47 * 1.5
    );

    const png = canvas.toDataURL(); // default png
    // download(png, "xx.png");
    return png;
    // document.body.appendChild(bgImage);
  };
  const mint = async () => {
    let dataUrl;
    try {
      dataUrl = await createImage();
      const uuid = uuidv4();
      const msg = await wallet.signMessage(uuid);
      const body = {
        nonce: uuid,
        signature: msg,
        id: marryStore.pendingOffer.id,
        imageData: dataUrl,
      };
      setMinting(true);
      const offer = await fetch(
        `/api/offer-setImage?nonce=${body.nonce}&signature=${body.signature}&id=${body.id}`,
        {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const res = await offer.json();
      if (res.message) {
        message.error(res.message);
      } else {
        console.log("res", res);
        if (res.Bsignature) {
          const Bsignature = res.Bsignature;
          console.log("Bsignature", res);
          const loading = message.loading("please wait until success...", 0);
          const blockNo = await marryStore.mint(
            res.Aaddress,
            res.Baddress,
            res.Asex,
            res.Bsex,
            Bsignature
          );
          await fetch(`/api/offer-setBlockNo`, {
            method: "POST",
            body: JSON.stringify({
              Bsignature,
              id: body.id,
              blockNo,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          marryStore.getOffer();
          loading();
        } else {
          message.error("get signature error");
        }
      }
      setMinting(false);
    } catch (e) {
      message.error("create nft cover error");
    }
  };

  useEffect(() => {
    if (copyRef.current && inputRef.current) {
      const clip = new ClipboardJS(copyRef.current!, {
        target: () => inputRef.current!,
      });
      clip.on("success", function () {
        message.success("copy success");
      });
      clip.on("error", () => {
        message.error("copy fail");
      });
    }
  }, [copyRef.current]);

  const begin = async (e) => {
    e.preventDefault();
    setSubmiting(true);
    try {
      await marryStore.signA();
    } catch (e) {}

    setSubmiting(false);
  };
  const formItemLayout = {
    wrapperCol: { span: 24 },
  };
  return useObserver(() => {
    return (
      <div className={styles.upgrade}>
        <div className={styles.content}>
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
              <div className={styles.circle_bg}></div>
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
                  <img
                    src="/heart.png"
                    title="heart"
                    className={styles.heart}
                  />
                  <Trans id="ERC721-520 Token 不可转让，不可售卖，一个人同时只能有一个有效 Token" />
                </p>
                <p>
                  <img
                    src="/heart.png"
                    title="heart"
                    className={styles.heart}
                  />
                  <Trans id="ERC721-520 Token 由二者通过多签协商后，一次性 Mint 出 2 个 Token" />
                </p>
                <p>
                  <img
                    src="/heart.png"
                    title="heart"
                    className={styles.heart}
                  />
                  <Trans id="ERC721-520 Token 可以通过多签协商销毁，销毁后可以与其他地址铸造新的 Token" />
                </p>
              </h2>
              <img src="/flower.svg" className={styles.flower} title="flower" />
            </div>
          </div>
          <div className={styles.Page2}>
            <div className={styles.Page_inner}>
              <div className={styles.left}>
                <div className={styles.left_inner} ref={circleDom}></div>
                <div className={styles.circle_text}>
                  <div className={styles.t1}>
                    <Trans id="国库收益(ETH)" />
                  </div>
                  <div className={styles.t2}>
                    {marryStore.ethBalanceFormated}
                  </div>
                  <div className={styles.t3}>
                    <Trans id="协议已见证了" /> {marryStore.marryCount}{" "}
                    <Trans id="对新人" />
                  </div>
                  <div className={styles.t4}>
                    <Trans id="所有收益都将用于发行Token和空投" />
                    <br />
                    <Trans id="Marry3 合约地址：" /> {web3Config.address.marry3}
                    <br />
                    <Trans id="Marry3 NFT 合约地址：" />{" "}
                    {web3Config.address.marry3token}
                  </div>
                </div>
              </div>
              <div className={styles.right}>
                {marryStore.pendingOffer.status == 0 ||
                marryStore.pendingOffer.status == 1 ||
                marryStore.pendingOffer.status == 2 ? (
                  <Form
                    {...formItemLayout}
                    layout={"vertical"}
                    className={styles.mainForm}
                  >
                    <div
                      style={{
                        marginBottom: "20px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                      ref={svgref}
                    >
                      <NFT offer={marryStore.pendingOffer} width={400} />
                    </div>
                    {marryStore.pendingOffer.status == 0 ? (
                      <Button
                        disabled={marryStore.pendingOffer.status == 0}
                        type="primary"
                        loading={marryStore.pendingOffer.status == 0}
                        style={{ width: "100%" }}
                      >
                        <Trans id=" 等待接受" />
                      </Button>
                    ) : marryStore.pendingOffer.status == 2 ? (
                      <Button
                        type="primary"
                        style={{ width: "100%" }}
                        disabled={true}
                      >
                        <Trans id="Minted " />
                      </Button>
                    ) : (
                      <Button
                        onClick={async () => {
                          setMinting(true);
                          try {
                            await mint();
                          } catch (e) {
                            console.error(e);
                          }

                          setMinting(false);
                        }}
                        type="primary"
                        style={{ width: "100%" }}
                        className="shake-little"
                        loading={minting}
                      >
                        <Trans id="Mint " />({marryStore.marryPriceFormated} Ξ)
                      </Button>
                    )}

                    {marryStore.pendingOffer.status == 0 ? (
                      <Input.Group
                        compact
                        style={{
                          display: "inline-block",
                          verticalAlign: "8px",
                          marginTop: "20px",
                        }}
                      >
                        <input
                          value={
                            window.location.origin +
                            `/offer/${marryStore.pendingOffer.id}`
                          }
                          style={{
                            width: "calc(100% - 110px)",
                            color: "#999CA0",
                            fontWeight: "300",
                            border: "2px solid #EBEBEB ",
                            paddingLeft: "10px",
                          }}
                          id="copy-input"
                          ref={inputRef}
                        />
                        <Button
                          style={{ width: "110px" }}
                          id="copy"
                          data-clipboard-target="#copy-input"
                          ref={copyRef}
                        >
                          {t`复制并分享`}
                        </Button>
                      </Input.Group>
                    ) : null}
                  </Form>
                ) : (
                  <Form
                    {...formItemLayout}
                    layout={"vertical"}
                    className={styles.mainForm}
                  >
                    <Form.Item label={t`your address`}>
                      <Input
                        value={marryStore.info.Aaddress}
                        placeholder="your address"
                        disabled={true}
                      />
                    </Form.Item>
                    <Form.Item label={t`your name`}>
                      <Input.Group
                        compact
                        style={{
                          width: "calc(100% - 200px)",
                          display: "inline-block",
                          verticalAlign: "8px",
                        }}
                      >
                        <Input
                          value={marryStore.info.Aname}
                          placeholder="ENS OR NAME"
                          onChange={async (e) => {
                            marryStore.info.Aname = e.target.value;
                          }}
                          style={{ width: "calc(100% - 80px)" }}
                        />
                        <Select
                          value={marryStore.info.Asex}
                          onChange={(e) => (marryStore.info.Asex = e)}
                          style={{ width: "80px" }}
                        >
                          <Select.Option value={0}>
                            <Trans id="Man" />
                          </Select.Option>
                          <Select.Option value={1}>
                            <Trans id="Woman" />
                          </Select.Option>
                          <Select.Option value={2}>
                            <Trans id="X" />
                          </Select.Option>
                        </Select>
                      </Input.Group>
                      <Select
                        placeholder={t`请选择您的一个NFT作为头像`}
                        style={{ width: "200px" }}
                        value={marryStore.info.Acover}
                        onChange={(e) => {
                          if (e == "-100") {
                            window.open("https://myfirstnft.info/");
                            marryStore.info.Acover = "";
                          } else {
                            marryStore.info.Acover = e;
                          }
                          console.log(e);
                        }}
                      >
                        {nftStore.nfts.map((nft) => {
                          return (
                            <Select.Option
                              key={nft.token_id}
                              value={
                                nft.detail.cached_file_url ||
                                nft.detail?.metadata?.image
                              }
                            >
                              <img
                                src={
                                  nft.detail.cached_file_url ||
                                  nft.detail?.metadata?.image
                                }
                                title="nft"
                                style={{ width: "25px", height: "25px" }}
                              />
                              <span style={{ paddingLeft: "10px" }}>
                                {nft.detail?.metadata?.name}
                              </span>
                            </Select.Option>
                          );
                        })}
                        <Select.Option key="any" value="-100">
                          <span style={{ paddingLeft: "10px" }}>
                            <Trans id="还没有NFT？MFNFT（免费）" />
                          </span>
                        </Select.Option>
                      </Select>
                    </Form.Item>

                    <Form.Item label={t`爱情宣言`}>
                      <Input.TextArea
                        placeholder={t`亲爱的...`}
                        rows={5}
                        value={marryStore.info.Acomment}
                        onChange={(e) => {
                          marryStore.info.Acomment = e.target.value;
                        }}
                      />
                    </Form.Item>

                    {marryStore.info.Aaddress ? (
                      <Button
                        onClick={begin}
                        disabled={!marryStore.info.Aaddress}
                        type="primary"
                        loading={submiting}
                        style={{ width: "100%" }}
                        className="shake-little"
                      >
                        <LockOutlined style={{ marginRight: "10px" }} />
                        <Trans id="签名后获得求婚地址" />
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          wallet.connect();
                        }}
                        type="primary"
                        loading={submiting}
                        style={{ width: "100%" }}
                      >
                        <Trans id="Connect Wallet" />
                      </Button>
                    )}
                  </Form>
                )}
                {marryStore.pendingOffer?.status == 2 &&
                marryStore.pendingOffer.AtokenId ? (
                  <div className={styles.price_desc}>
                    <Trans id="查看 Marry3 Certificate 详情" />:
                    <a
                      href={`/i/${marryStore.pendingOffer.AtokenId}`}
                      target={"_blank"}
                      style={{ fontWeight: "500", marginLeft: "10px" }}
                    >
                      Token #{marryStore.pendingOffer.AtokenId}
                    </a>
                    <a
                      href={`/i/${marryStore.pendingOffer.BtokenId}`}
                      target={"_blank"}
                      style={{ fontWeight: "500", marginLeft: "10px" }}
                    >
                      Token #{marryStore.pendingOffer.BtokenId}
                    </a>
                  </div>
                ) : (
                  <div className={styles.price_desc}>
                    <Tooltip
                      title={
                        <table>
                          <tr>
                            <th style={{ width: "100px" }}>
                              <Trans id="总数" />
                            </th>
                            <th>
                              <Trans id="价格(ETH)" />
                            </th>
                          </tr>
                          <tr>
                            <td>0~99</td>
                            <td>0.01</td>
                          </tr>{" "}
                          <tr>
                            <td>100~299</td>
                            <td>0.02</td>
                          </tr>{" "}
                          <tr>
                            <td>300~599</td>
                            <td>0.03</td>{" "}
                          </tr>{" "}
                          <tr>
                            <td>600~999</td>
                            <td>0.04</td>
                          </tr>{" "}
                          <tr>
                            <td>1000~1499</td>
                            <td>0.05</td>
                          </tr>{" "}
                          <tr>
                            <td>1500~2009</td>
                            <td>0.06</td>
                          </tr>{" "}
                          <tr>
                            <td>2100~1799</td>
                            <td>0.07</td>
                          </tr>{" "}
                          <tr>
                            <td>2800~3599</td>
                            <td>0.08</td>
                          </tr>{" "}
                          <tr>
                            <td>3600~4499</td>
                            <td>0.09</td>
                          </tr>{" "}
                          <tr>
                            <td>4500+</td>
                            <td>0.10</td>
                          </tr>
                        </table>
                      }
                    >
                      <span>
                        <Trans id="初始Mint价格仅0.01Ξ，但价格还是会随着参与人数的增加有所上涨，最终会恒定在0.1Ξ，具体的算法规则" />{" "}
                        <QuestionCircleOutlined style={{ display: "inline" }} />
                      </span>
                    </Tooltip>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={[styles.Page_3, "shake-trigger"].join(" ")}>
            <div className={styles.Page_inner}>
              <div className={styles.about_title} id="about">
                <Trans id="关于项目" />
              </div>
              <div className={styles.about_content}>
                <p>
                  <span>
                    <Trans id="Web3 是一个从零开始重塑的新世界，它拥有全新的秩序和规则（Code is Law），全新的组织方式（DAO），全新的身份认同（NFT&ENS），以及全新的原住民（0x地址）。" />
                  </span>
                </p>
                <p>
                  <span>
                    <Trans id="新世界给人带来了无限的想象空间和自由度，但是同时也带来一些新的问题，例如更脆弱的经济泡沫和单调乏味的finance dapps。" />
                  </span>
                </p>
                <p>
                  <span>
                    <Trans id="所以，我们想要发挥它的优势，规避它的问题，让这个生态能够朝着更健康的方向发展" />
                  </span>{" "}
                </p>
                <p>
                  <Trans id="于是，就有了 " />{" "}
                  <img
                    src="/logo.png"
                    title="marry3"
                    style={{ width: "120px", verticalAlign: "-8px" }}
                  />
                </p>
                <p>
                  <span>
                    <Trans id="这是一场严肃的社会实验，我们想与新世界的所有住民一起探索一种全新的身份认同。" />
                  </span>{" "}
                </p>
                <p>
                  <span>
                    <Trans id="同时它也是 SBTs (Soulbound Tokens) 的一种垂直场景实现。它和其他 SBTs 应用产生的关系和身份数据，将会成为一个 0x 地址原住民非常生动的表达，使其具有人格、信誉、喜好，伪造这样一个身份人格的成本也将会越来越高，特别是在没有利益驱动（no-finance）的前提下" />
                  </span>{" "}
                </p>
                <p>
                  <span>
                    <Trans id="同时，因为它发生在新世界，所以它将破除物理空间的限制，不限性别、不限年龄、不限种族，甚至不限物种（0x地址原住民的背后可能是任何物种，例如阿猫或者阿狗）。" />
                  </span>{" "}
                </p>
                <p>
                  <span>
                    <Trans id="因为它发生在新世界，所以它将充分利用新世界的规则来见证一份亲密关系，它将两个地址的关系和约定写入 ERC721-520 合约，合约代码既是上帝和法律，自此之后，一人一证，一心一意。" />
                  </span>{" "}
                </p>
              </div>
              {/* <div className={styles.about_title}>
                <Trans id="Tech" />
              </div>
              <div className={styles.tech_content}>
                <img src={t`/Marry3eco.png`} alt="Marry3eco" />
              </div> */}
            </div>
          </div>
          <div className={[styles.Page_roadmap, "shake-trigger"].join(" ")}>
            <div className={styles.tech_content}>
              <img src={t`/roadmap2.png`} alt="Marry3eco" />
            </div>
            <div className={styles.socials}>
              <a
                href="https://twitter.com/marryinweb3"
                className={[styles.social, styles.twitter].join(" ")}
                target={"_blank"}
              >
                <svg width="19" height="17" viewBox="0 0 19 17" fill="none">
                  <path
                    id="路径"
                    fillRule="evenodd"
                    style={{ fill: "currentColor" }}
                    transform="translate(0 0)  rotate(0 9.5 8.5)"
                    opacity="1"
                    d="M7.75,4.67C5.78,4.47 4.01,3.57 2.54,1.41C2.33,1.11 1.96,0.94 1.59,0.98C1.22,1.03 0.91,1.27 0.78,1.62C0.59,2.1 0.46,2.61 0.34,3.12C0.14,4 -0.05,5.23 0.01,6.55C0.08,7.88 0.4,9.35 1.27,10.67C1.89,11.61 2.78,12.45 3.97,13.08C3.13,13.61 2.2,13.91 0.97,14.26C0.54,14.38 0.25,14.77 0.24,15.22C0.24,15.66 0.54,16.06 0.96,16.18C3.4,16.89 5.86,17.13 8.02,16.93C10.18,16.74 12.14,16.11 13.51,15C16.09,12.9 17.31,9.86 17.15,5.49L18.87,2.47C19.06,2.13 19.04,1.71 18.81,1.4C18.59,1.08 18.2,0.92 17.82,0.99L16.02,1.33C15.14,0.44 13.61,-0.29 11.6,0.11C10.14,0.41 9.12,1.2 8.5,2.27C8.07,3 7.85,3.83 7.75,4.67Z "
                  />
                </svg>
                Twitter
              </a>
              <a
                href="https://github.com/marryinweb3"
                target={"_blank"}
                className={[styles.social, styles.github].join(" ")}
              >
                <svg
                  width="19"
                  height="20.019999999999982"
                  viewBox="0 0 19 20.019999999999982"
                  fill="none"
                >
                  <path
                    id="路径"
                    fill-rule="evenodd"
                    style={{ fill: "currentcolor" }}
                    transform="translate(0 -1.8207657603852567e-14)  rotate(0 9.5 10.01)"
                    opacity="1"
                    d="M6,19.02C6,19.57 6.45,20.02 7,20.02L13,20.02C13.55,20.02 14,19.57 14,19.02L14,16.02C14,15.45 13.88,14.91 13.67,14.42C14.63,14.09 15.5,13.63 16.26,13.06C17.89,11.83 19,10.06 19,8.02C19,6.67 18.52,5.43 17.71,4.4C17.92,3.58 17.9,2.75 17.82,2.12C17.75,1.55 17.65,0.81 17.25,0.36C16.66,-0.29 15.67,0.09 14.97,0.33C14.35,0.54 13.59,0.88 12.85,1.38C11.95,1.14 10.99,1.02 10,1.02C9.01,1.02 8.05,1.14 7.15,1.38C6.41,0.88 5.64,0.54 5.02,0.33C4.33,0.09 3.33,-0.29 2.74,0.36C2.34,0.81 2.25,1.5 2.18,2.08C2.18,2.09 2.17,2.11 2.17,2.12C2.09,2.75 2.07,3.58 2.28,4.4C1.48,5.44 1,6.67 1,8.02C1,10.06 2.11,11.83 3.74,13.06C4.5,13.63 5.37,14.09 6.33,14.42C6.12,14.9 6,15.44 6,16L5.83,16.03C5.12,16.13 4.66,16.04 4.34,15.91C3.58,15.59 3.19,14.78 2.71,14.16C2.42,13.77 1.98,13.29 1.32,13.07C0.79,12.9 0.23,13.18 0.05,13.7C-0.12,14.23 0.16,14.79 0.68,14.97C1.24,15.15 1.63,16.11 1.98,16.54C2.35,16.98 2.85,17.45 3.56,17.75C4.24,18.04 5.04,18.15 6,18.03L6,19.02Z "
                  />
                </svg>
                Github
              </a>
              <a
                href="https://discord.gg/eAN9TaAaSq"
                target={"_blank"}
                className={[styles.social, styles.discord].join(" ")}
              >
                <svg
                  width="23"
                  height="17.529999999999973"
                  viewBox="0 0 23 17.529999999999973"
                  fill="none"
                >
                  <path
                    id="vector"
                    fill-rule="evenodd"
                    style={{ fill: "currentcolor" }}
                    transform="translate(0 8.881784197001252e-15)  rotate(0 11.5 8.765)"
                    opacity="1"
                    d="M5.87 17.53C4 16.95 2.09 16.07 0.12 14.62C0.11 14.61 0.1 14.59 0.09 14.57C-0.31 10.28 0.51 5.93 3.49 1.48L3.52 1.45C4.99 0.78 6.56 0.28 8.21 0C8.24 0 8.27 0.01 8.28 0.04C8.48 0.4 8.72 0.86 8.87 1.23C10.6 0.97 12.36 0.97 14.13 1.23C14.29 0.87 14.51 0.4 14.71 0.04C14.73 0.01 14.76 0 14.79 0C16.43 0.29 18 0.78 19.47 1.45L19.5 1.48C22.1 5.3 23.38 9.61 22.9 14.57C22.9 14.59 22.89 14.61 22.87 14.62C20.9 16.07 19 16.95 17.12 17.53C17.09 17.54 17.06 17.52 17.04 17.5C16.6 16.9 16.21 16.26 15.86 15.59C15.84 15.55 15.86 15.5 15.9 15.49C16.53 15.25 17.13 14.97 17.7 14.63C17.74 14.61 17.75 14.54 17.7 14.51C17.58 14.42 17.46 14.33 17.35 14.23C17.33 14.21 17.3 14.21 17.27 14.22C13.55 15.94 9.48 15.94 5.71 14.22C5.69 14.21 5.66 14.21 5.64 14.23C5.52 14.33 5.4 14.42 5.28 14.51C5.24 14.54 5.24 14.61 5.29 14.63C5.86 14.96 6.46 15.25 7.08 15.49C7.12 15.5 7.14 15.55 7.12 15.59C6.79 16.26 6.39 16.9 5.95 17.5C5.93 17.52 5.9 17.54 5.87 17.53ZM5.62 9.64C5.62 10.92 6.55 11.96 7.69 11.96C8.84 11.96 9.75 10.92 9.75 9.64C9.77 8.37 8.85 7.32 7.69 7.32C6.53 7.32 5.62 8.36 5.62 9.64ZM15.33 11.96C14.2 11.96 13.26 10.92 13.26 9.64C13.26 8.36 14.18 7.32 15.33 7.32C16.49 7.32 17.41 8.37 17.4 9.64C17.4 10.92 16.49 11.96 15.33 11.96Z"
                  />
                </svg>
                Discord
              </a>
            </div>
          </div>
          <div className={[styles.Page_4, "shake-trigger"].join(" ")}>
            <div className={styles.Page_inner} id="qa">
              <div className={styles.about_title}>
                <Trans id="问与答" />
              </div>
              <div className={styles.tech_content}>
                <Collapse
                  defaultActiveKey={["-1"]}
                  ghost
                  accordion
                  expandIconPosition="right"
                >
                  <Collapse.Panel
                    header={
                      <span>
                        <span className={styles.q}>Q</span>
                        <span>{t`一个人可以 mint 几个 Marry3 Certificate？`}</span>
                      </span>
                    }
                    key="-1"
                  >
                    <p>
                      <Trans id="一个地址在同一时间只能与另外一个地址 mint 出两个 Certificate，在此期间不可与其他地址再 mint。" />
                      <br />
                      <Trans id="你可以与另一半协商解除亲密关系，之后可以再同另外一个地址 mint ，之前 mint 的 Certificate 会被销毁" />
                    </p>
                  </Collapse.Panel>
                  <Collapse.Panel
                    header={
                      <span>
                        <span className={styles.q}>Q</span>
                        <span>{t`什么是 0x地址原住民？`}</span>
                      </span>
                    }
                    key="-3"
                  >
                    <p>
                      <Trans id="Web3 中的原住民是 42 位0x地址，而不是你或者我。" />
                      <br />
                      <Trans id="地址的背后可能是一个人，也可能是多个人，也可以是阿猫阿狗，甚至是一个没有生命的物体" />
                      <br />
                      <Trans id="在 Marry3 中，我们只关注 0x地址原住民，不关注它背后的关联人或者关联物，所以这场亲密关系可以跨域物种，例如为你的阿猫阿狗注册地址，然后为他们生成 Marry3 Certificate" />
                    </p>
                  </Collapse.Panel>
                  <Collapse.Panel
                    header={
                      <span>
                        <span className={styles.q}>Q</span>
                        <span>{t`Marry3 Certificate 可以交易吗？`}</span>
                      </span>
                    }
                    key="-2"
                  >
                    <p>
                      <Trans id="不可以，在尝试交易时，会报错！请不要尝试挂单。" />
                    </p>
                  </Collapse.Panel>
                  <Collapse.Panel
                    header={
                      <span>
                        <span className={styles.q}>Q</span>
                        <span>{t`为什么我需要付费？`}</span>
                      </span>
                    }
                    key="1"
                  >
                    <p>
                      <Trans id="我们一直希望做一个对 Web3 生态有推动作用，对用户来说有一定实用价值，同时有趣、好玩、新奇的应用。" />
                      <br />
                      <Trans id="希望你是抱着消费的心态使用它，而不是因为它未来会给你多大的回报，虽然未来我们也会有经济激励机制。" />
                      <br />
                      <Trans id="我们认为目前 Web3 的生态已经充斥着太多此类应用，而未来的 Web3 生态应该是百花齐放的。" />
                    </p>
                  </Collapse.Panel>
                  <Collapse.Panel
                    header={
                      <span>
                        <span className={styles.q}>Q</span>
                        <span>{t`后续资金将如何使用？`}</span>
                      </span>
                    }
                    key="2"
                  >
                    <p>
                      <Trans id="您支付的 eth 费用，将存入合约（国库），未来会作为初始资金进入 MarryDAO 运作，未来将作为以下几个用途（可能有调整）。" />
                    </p>
                    <p>
                      <Trans id="1. 初始开发团队的奖励，不超过 30%。" />
                    </p>
                    <p>
                      <Trans id="2. 后续 Marry metaverse 及相关应用的开发基金，不低于 20%，初始开发团队也会提供部分资金投入。" />
                    </p>
                    <p>
                      <Trans id="3. 项目营销和运营相关费用支出，不超过 20%。" />
                    </p>
                    <p>
                      <Trans id="4. 返还用户，不低于 30%，具体形式待定，不排除考虑转交境外专业团队负责后续 token 发行和运作，未来如果发行 token，所有持续收入都将 100% 打入 token lp pool，如果您对此项感兴趣，可以 twitter 私信我们洽谈。" />
                    </p>
                  </Collapse.Panel>
                  <Collapse.Panel
                    header={
                      <span>
                        <span className={styles.q}>Q</span>
                        <span>{t`Gas Fee 为什么较普通 NFT 项目高？`}</span>
                      </span>
                    }
                    key="3"
                  >
                    <p>
                      <Trans id="Marry3 合约一次性会 mint 两个 NFT 出来，所以会耗费普通 NFT mint 至少双倍的价格，建议在 Gas Fee 较低的时候再操作 mint。" />
                    </p>
                  </Collapse.Panel>
                  <Collapse.Panel
                    header={
                      <span>
                        <span className={styles.q}>Q</span>
                        <span>{t`MarryDAO 是什么？做什么？`}</span>
                      </span>
                    }
                    key="4"
                  >
                    <p>
                      <Trans id="MarryDAO 是一个组织，负责组织、开发、发展相关的应用生态，包括但不限于 DAPP 的更多功能，经济模型的制定和发行，Marry3 Metaverse 应用开发等。" />
                      <br />
                      <Trans id="MarryDAO 成员包括所有持有 Marry3 Certificate 的地址" />
                    </p>
                  </Collapse.Panel>
                  <Collapse.Panel
                    header={
                      <span>
                        <span className={styles.q}>Q</span>
                        <span>{t`如何解除亲密关系？`}</span>
                      </span>
                    }
                    key="5"
                  >
                    <p>
                      <Trans id="本应用会提供解除亲密关系的功能，近期上线。" />
                      <br />
                      <Trans id="因为我们不鼓励解除亲密关系的行为，所以解除关系需要得到双方共同签名的同时，需要支付同时期 mint 费用两倍的费用。" />
                      <br />
                      <Trans id="如果您的另一半因为特殊原因无法协商解除，我们后续会在 MarryDAO 中提供仲裁，仲裁后，官方直接接触二者亲密关系。" />
                    </p>
                  </Collapse.Panel>
                </Collapse>
              </div>
            </div>
          </div>
          <div className={[styles.Page_3, "shake-trigger"].join(" ")}>
            <div className={styles.Page_inner} id="team">
              <div className={styles.about_title}>
                <Trans id="团队" />
              </div>
              <div className={styles.team_content}>
                <div className={styles.teams}>
                  <div className={styles.team_item}>
                    <div className={styles.team_item_img}>
                      <img src={"/yootou.png"} alt="" />
                    </div>
                    <div className={styles.team_item_info}>
                      <div className={styles.team_item_info_title}>Yootou</div>
                      <div className={styles.team_item_info_desc}>
                        <Trans id="项目发起人 / 程序员 / 理想主义者" />
                        <br />
                      </div>
                      <div className={styles.links}>
                        <a
                          href="https://twitter.com/0xYootou"
                          className={styles.social}
                          target={"_blank"}
                        >
                          <svg
                            width="15"
                            height="13"
                            viewBox="0 0 19 17"
                            fill="none"
                          >
                            <path
                              id="路径"
                              fill-rule="evenodd"
                              style={{ fill: "currentColor" }}
                              transform="translate(0 0)  rotate(0 9.5 8.5)"
                              opacity="1"
                              d="M7.75,4.67C5.78,4.47 4.01,3.57 2.54,1.41C2.33,1.11 1.96,0.94 1.59,0.98C1.22,1.03 0.91,1.27 0.78,1.62C0.59,2.1 0.46,2.61 0.34,3.12C0.14,4 -0.05,5.23 0.01,6.55C0.08,7.88 0.4,9.35 1.27,10.67C1.89,11.61 2.78,12.45 3.97,13.08C3.13,13.61 2.2,13.91 0.97,14.26C0.54,14.38 0.25,14.77 0.24,15.22C0.24,15.66 0.54,16.06 0.96,16.18C3.4,16.89 5.86,17.13 8.02,16.93C10.18,16.74 12.14,16.11 13.51,15C16.09,12.9 17.31,9.86 17.15,5.49L18.87,2.47C19.06,2.13 19.04,1.71 18.81,1.4C18.59,1.08 18.2,0.92 17.82,0.99L16.02,1.33C15.14,0.44 13.61,-0.29 11.6,0.11C10.14,0.41 9.12,1.2 8.5,2.27C8.07,3 7.85,3.83 7.75,4.67Z "
                            />
                          </svg>
                        </a>
                        <a
                          href="https://github.com/yu-tou"
                          target={"_blank"}
                          className={styles.social}
                        >
                          <svg
                            width="15"
                            height="14.019999999999982"
                            viewBox="0 0 19 20.019999999999982"
                            fill="none"
                          >
                            <path
                              id="路径"
                              fill-rule="evenodd"
                              style={{ fill: "currentcolor" }}
                              transform="translate(0 -1.8207657603852567e-14)  rotate(0 9.5 10.01)"
                              opacity="1"
                              d="M6,19.02C6,19.57 6.45,20.02 7,20.02L13,20.02C13.55,20.02 14,19.57 14,19.02L14,16.02C14,15.45 13.88,14.91 13.67,14.42C14.63,14.09 15.5,13.63 16.26,13.06C17.89,11.83 19,10.06 19,8.02C19,6.67 18.52,5.43 17.71,4.4C17.92,3.58 17.9,2.75 17.82,2.12C17.75,1.55 17.65,0.81 17.25,0.36C16.66,-0.29 15.67,0.09 14.97,0.33C14.35,0.54 13.59,0.88 12.85,1.38C11.95,1.14 10.99,1.02 10,1.02C9.01,1.02 8.05,1.14 7.15,1.38C6.41,0.88 5.64,0.54 5.02,0.33C4.33,0.09 3.33,-0.29 2.74,0.36C2.34,0.81 2.25,1.5 2.18,2.08C2.18,2.09 2.17,2.11 2.17,2.12C2.09,2.75 2.07,3.58 2.28,4.4C1.48,5.44 1,6.67 1,8.02C1,10.06 2.11,11.83 3.74,13.06C4.5,13.63 5.37,14.09 6.33,14.42C6.12,14.9 6,15.44 6,16L5.83,16.03C5.12,16.13 4.66,16.04 4.34,15.91C3.58,15.59 3.19,14.78 2.71,14.16C2.42,13.77 1.98,13.29 1.32,13.07C0.79,12.9 0.23,13.18 0.05,13.7C-0.12,14.23 0.16,14.79 0.68,14.97C1.24,15.15 1.63,16.11 1.98,16.54C2.35,16.98 2.85,17.45 3.56,17.75C4.24,18.04 5.04,18.15 6,18.03L6,19.02Z "
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className={styles.team_item}>
                    <div className={styles.team_item_img}>
                      <img src={"/daodao.png"} alt="" />
                    </div>
                    <div className={styles.team_item_info}>
                      <div className={styles.team_item_info_title}>Daodao</div>
                      <div className={styles.team_item_info_desc}>
                        <Trans id="产品经理 / 设计师 / Web3 个人投研者" />{" "}
                        <br />
                        <Trans id="专注 #Tokenomics #DAO" />
                        <br />
                      </div>
                      <div className={styles.links}>
                        <a
                          href="https://twitter.com/daodao"
                          className={styles.social}
                          target={"_blank"}
                        >
                          <svg
                            width="15"
                            height="13"
                            viewBox="0 0 19 17"
                            fill="none"
                          >
                            <path
                              id="路径"
                              fill-rule="evenodd"
                              style={{ fill: "currentColor" }}
                              transform="translate(0 0)  rotate(0 9.5 8.5)"
                              opacity="1"
                              d="M7.75,4.67C5.78,4.47 4.01,3.57 2.54,1.41C2.33,1.11 1.96,0.94 1.59,0.98C1.22,1.03 0.91,1.27 0.78,1.62C0.59,2.1 0.46,2.61 0.34,3.12C0.14,4 -0.05,5.23 0.01,6.55C0.08,7.88 0.4,9.35 1.27,10.67C1.89,11.61 2.78,12.45 3.97,13.08C3.13,13.61 2.2,13.91 0.97,14.26C0.54,14.38 0.25,14.77 0.24,15.22C0.24,15.66 0.54,16.06 0.96,16.18C3.4,16.89 5.86,17.13 8.02,16.93C10.18,16.74 12.14,16.11 13.51,15C16.09,12.9 17.31,9.86 17.15,5.49L18.87,2.47C19.06,2.13 19.04,1.71 18.81,1.4C18.59,1.08 18.2,0.92 17.82,0.99L16.02,1.33C15.14,0.44 13.61,-0.29 11.6,0.11C10.14,0.41 9.12,1.2 8.5,2.27C8.07,3 7.85,3.83 7.75,4.67Z "
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={[styles.Page_partner, "shake-trigger"].join(" ")}>
                <div className={styles.Page_inner} id="team">
                  <div className={styles.partner_title}>
                    <Trans id="合作伙伴" />
                  </div>
                  <div className={styles.partner_content}>
                    <div className={styles.partner_item} style={{}}>
                      <a
                        className={styles.partner_item_link}
                        href="https://kencloud.com/"
                        target={"_blank"}
                      >
                        <img src="https://kencloud.com/images/jiaozidb/favicon.ico" />
                        KEN Labs
                      </a>
                    </div>
                    <div className={styles.partner_item} style={{}}>
                      <a
                        className={styles.partner_item_link}
                        href="https://twitter.com/marryinweb3"
                        target={"_blank"}
                        style={{ color: "#f41870" }}
                      >
                        联系我们
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  });
}
