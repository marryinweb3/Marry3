import { t } from "@lingui/macro";
import { Trans } from "@lingui/react";
import { Button, Collapse, Form, Input, message, Select, Tooltip } from "antd";

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
      ? `/bg/${marryStore.pendingOffer.bgIndex}.png`
      : `/bg/1.png`;
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
      const msg = await walletStore.signMessage(uuid);
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
        marryStore.shareClicked = true;
      });
      clip.on("error", () => {
        message.error("copy fail");
      });
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
          <NFT offer={marryStore.pendingOffer} width={340} />
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
          <NFT offer={marryStore.pendingOffer} width={340} />
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
        <Button type="primary" style={{ width: "100%" }} disabled={true}>
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
