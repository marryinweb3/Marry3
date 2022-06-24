import { t } from "@lingui/macro";
import { Trans } from "@lingui/react";
import { Button, Collapse, Form, Input, message, Select, Tooltip } from "antd";
import { TwitterOutlined } from "@ant-design/icons";
import { useObserver } from "mobx-react";
import wallet from "../../../../contracts/wallet";
import styles from "./../../../../pages/home/home.module.less";
import useStore from "../../../../stores/useStore";
import { MarryStore } from "../../../../stores/main/marry.store";
import { NFTStore } from "../../../../stores/main/nfts.store";
import { useEffect, useRef, useState } from "react";
import ClipboardJS from "clipboard";
import { NFT } from "../../common/nft";
import { imageLoaded } from "../../../../utils/imageloaded";
import { WalletStore } from "../../../../stores/main/wallet.store";
import { v4 as uuidv4 } from "uuid";
import { utils } from "ethers";
import QRCode from "qrcode";
import { Marry3Contract } from "../../../../contracts";

export const StatusPending = (props: {}) => {
  const formItemLayout = {
    wrapperCol: { span: 24 },
  };
  const marryStore = useStore(MarryStore);
  const walletStore = useStore(WalletStore);
  const [minting, setMinting] = useState(false);

  const svgref = useRef(null);
  const svgref2 = useRef(null);
  const copyRef = useRef(null);
  const inputRef = useRef(null);

  const createImage = async (svgRef: any, tokenId?: string) => {
    console.log(svgRef.current.getElementsByTagName("div")[0]);
    const image1 = svgRef.current.getElementsByClassName("cover_1")[0];
    const image2 = svgRef.current.getElementsByClassName("cover_2")[0];
    const logo = svgRef.current.getElementsByClassName("logo")[0];

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

    const svg = svgRef.current.getElementsByTagName("svg")[0];
    if (!svg) return;
    const size = 1080;
    const html = svg.outerHTML;

    let canvas = document.createElement("canvas");

    canvas.width = size;

    canvas.height = size;
    let context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0, 0, size, size);

    const image = new Image();
    image.width = 1080;
    image.height = 1080;
    image.src = marryStore.pendingOffer?.bgIndex
      ? `/bg/${marryStore.pendingOffer.bgIndex}.png`
      : `/bg/1.png`;

    const image_r: any = await imageLoaded(image);

    context.drawImage(image_r, 0, 0, size, size);
    const svgImage = new Image();
    svgImage.src = `data:image/svg+xml;base64,${btoa(
      unescape(encodeURIComponent(html))
    )}`;
    const svgImage_r: any = await imageLoaded(svgImage);
    // draw image in canvas starting left-0 , top - 0
    context.drawImage(svgImage_r, 0, 0, size, size);
    context.drawImage(upcanvas, 90, 90, 250, 250);
    context.drawImage(downcanvas, 90, 340, 250, 250);
    // context.drawImage(upcanvas, 90, 90, 250, 250);
    // context.drawImage(downcanvas, 90, 340, 250, 250);
    // // const logo_r: any = await imageLoaded(logo);
    // context.drawImage(
    //   logo_r,
    //   size - 70 - 160 * 1.5,
    //   size - 90 - 40 * 1.5,
    //   160 * 1.5,
    //   47 * 1.5
    // );
    if (tokenId) {
      let canvasQR = document.createElement("canvas");

      canvasQR.width = 70;

      canvasQR.height = 70;
      let contextQR = canvasQR.getContext("2d");
      contextQR.fillStyle = "white";
      contextQR.fillRect(0, 0, 70, 70);
      const gen = () => {
        return new Promise((resolve) => {
          QRCode.toCanvas(
            canvasQR,
            window.location.origin + "/i/" + tokenId,
            {
              margin: 2,
              width: 70,
              color: {
                dark: "#333", // Blue dots
                light: "#fff", // Transparent background
              },
            },
            function (error) {
              if (error) console.error(error);
              resolve(null);
            }
          );
        });
      };
      await gen();
      context.drawImage(canvasQR, 30, size - 120, 70, 70);
    }
    const png = canvas.toDataURL(); // default png
    // var a = document.createElement("a");
    // a.href = png;
    // a.download = "output.png";
    // document.body.appendChild(a);
    // a.click();
    // document.body.removeChild(a);
    return png;
    // document.body.appendChild(bgImage);
  };
  const [downloading, setDownloading] = useState(false);
  const download = async () => {
    let dataUrl, dataUrl2;
    setDownloading(true);
    try {
      dataUrl = await createImage(svgref, marryStore.pendingOffer.AtokenId);
      dataUrl2 = await createImage(svgref2, marryStore.pendingOffer.BtokenId);
      var a = document.createElement("a");
      a.href = dataUrl;
      a.download = `Marry3 Certificate #${marryStore.pendingOffer.AtokenId}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      var a = document.createElement("a");
      a.href = dataUrl2;
      a.download = `Marry3 Certificate #${marryStore.pendingOffer.BtokenId}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (e) {
      message.error(
        "Create NFT cover error, make sure all pictures are loaded correct, if not, revoke and select another nft pfp "
      );
    }
    setDownloading(false);
  };
  const mint = async () => {
    let dataUrl, dataUrl2;
    try {
      dataUrl = await createImage(svgref);
      dataUrl2 = await createImage(svgref2);
      const uuid = uuidv4();
      const msg = await walletStore.signMessage(uuid);
      const body = {
        nonce: uuid,
        signature: msg,
        id: marryStore.pendingOffer.id,
        imageData: dataUrl,
        imageData2: dataUrl2,
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
          try {
            const blockNo = await marryStore.mint(
              res.Aaddress,
              res.Baddress,
              res.Asex,
              res.Bsex,
              Bsignature
            );
            try {
              const pairedInfo = await Marry3Contract().getPairInfo(
                res.Aaddress
              );
              if (pairedInfo[0] && pairedInfo[1]) {
                await fetch(
                  `/api/meta/${pairedInfo[0].tokenId.toString()}.json`,
                  {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );
                window.open(
                  "https://twitter.com/intent/tweet?text=" +
                    encodeURIComponent(
                      "I just marry in web3 with my lover, and mint Paired Soubound Marry3 Certificate, https://marry3.love/i/" +
                        pairedInfo[0].tokenId +
                        " @marryinweb3 #marry3"
                    )
                );
              }
            } catch (e) {}

            await marryStore.getOffer();
          } catch (e) {
            console.error(e);
            message.error("mint error");
          }

          loading();
        } else {
          message.error("get signature error");
        }
      }
      setMinting(false);
    } catch (e) {
      console.error(e);
      message.error(
        "Create NFT cover error, make sure all pictures are loaded correct, if not, revoke and select another nft pfp"
      );
    }
  };
  let clip: any;
  useEffect(() => {
    if (copyRef.current && inputRef.current) {
      if (!clip) {
        clip = new ClipboardJS(copyRef.current!, {
          target: () => inputRef.current!,
        });
        clip.on("success", function () {
          message.success("copy success");
          marryStore.shareClicked = true;
        });
        clip.on("error", () => {
          message.error("copy fail");
        });
      }
    }
  }, [copyRef.current]);
  const [nftActiveIndex, setNftActiveIndex] = useState(0);
  return useObserver(() => (
    <Form {...formItemLayout} layout={"vertical"} className={styles.mainForm}>
      <div className={styles.nfts}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
          ref={svgref}
          className={[
            styles.nft,
            nftActiveIndex == 0 ? styles.nft_active : "",
          ].join(" ")}
        >
          <NFT offer={marryStore.pendingOffer} width={340} isA={true} />
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
          ref={svgref2}
        >
          <NFT offer={marryStore.pendingOffer} width={340} isA={false} />
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
        <>
          <Button
            style={{ width: "calc(100% - 70px)" }}
            onClick={download}
            loading={downloading}
          >
            <Trans id=" Minted, Click to Download PNG " />
          </Button>
          <a
            style={{
              width: "40px",
              marginLeft: "10px",
              background: "#fff",
              display: "inline-block",
              height: "40px",
              verticalAlign: "-2px",
              textAlign: "center",
              borderRadius: "50%",
              lineHeight: "40px",
              border: "2px solid #eee",
            }}
            href={
              "https://twitter.com/intent/tweet?text=" +
              encodeURIComponent(
                "I just marry in web3 with my lover, and mint Paired Soubound Marry3 Certificate, https://marry3.love/i/" +
                  marryStore.pendingOffer.AtokenId +
                  " @marryinweb3 #marry3"
              )
            }
            target={"_blank"}
          >
            <TwitterOutlined
              size={20}
              style={{ fontSize: "18px", color: "#0057D6" }}
            />
          </a>
        </>
      ) : (
        <>
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
            style={{ width: "78%" }}
            className="shake-little"
            loading={minting}
          >
            <Trans id="Mint " />(
            {marryStore.marryPrice &&
            Number(utils.formatEther(marryStore.marryPrice)) == 0
              ? "Free"
              : marryStore.marryPriceFormated + " Ξ"}
            )
          </Button>
          <Button
            onClick={async () => {
              const loading = message.loading(
                "please wait until success...",
                0
              );
              try {
                await marryStore.revoke();
                window.location.reload();
              } catch (e) {
                console.error(e);
              }
              loading();
            }}
            style={{ width: "20%", marginLeft: "2%" }}
            className="shake-little"
          >
            Revoke
          </Button>
        </>
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
              window.location.origin + `/offer/${marryStore.pendingOffer.id}`
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
  ));
};
