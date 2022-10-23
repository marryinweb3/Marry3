import React, { useEffect, useState, useRef } from "react";
import styles from "./wedding.module.less";
import useStore from "../../stores/useStore";
import { useObserver } from "mobx-react";
import { web3Config } from "../../stores/config";
import { message, Tooltip } from "antd";
import { WalletStore } from "../../stores/main/wallet.store";
import { WeddingStore } from "../../stores/main/wedding.store";
import { Trans } from "@lingui/react";
import { NFTStore } from "../../stores/main/nfts.store";
import { Header } from "../../components/main/common/header.com";
import { Footer } from "../../components/main/common/footer.com";
import { Calendar } from "antd";
import type { CalendarMode } from "antd/es/calendar/generateCalendar";
import type { Moment } from "moment";

const getListData = (value: Moment) => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: "warning", content: "This is warning event." },
        { type: "success", content: "This is usual event." },
      ];
      break;
    case 10:
      listData = [
        { type: "warning", content: "This is warning event." },
        { type: "success", content: "This is usual event." },
        { type: "error", content: "This is error event." },
      ];
      break;
    case 15:
      listData = [
        { type: "warning", content: "This is warning event" },
        { type: "success", content: "This is very long usual event。。...." },
        { type: "error", content: "This is error event 1." },
        { type: "error", content: "This is error event 2." },
        { type: "error", content: "This is error event 3." },
        { type: "error", content: "This is error event 4." },
      ];
      break;
    default:
  }
  return listData || [];
};

const getMonthData = (value: Moment) => {
  if (value.month() === 8) {
    return 1394;
  }
};
export default function createWedding(props) {
  const wallet = useStore(WalletStore);
  const nftStore = useStore(NFTStore);

  const weddingStore = useStore(WeddingStore);

  useEffect(() => {
    (async () => {
      const loading = message.loading("loading...", 0);
      const now = new Date();
      await weddingStore.getListByDate(now.getFullYear(), now.getMonth() + 1);
      console.log(
        "weddingList by date---------------------",
        weddingStore.weddingList,
        now.getFullYear(),
        now.getMonth() + 1
      );
      loading();
    })();
  }, []);
  const onPanelChange = async (value: Moment, mode: CalendarMode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
    await weddingStore.getListByDate(value.year(), value.month());
  };

  const monthCellRender = (value: Moment) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Moment) => {
    const listData = getListData(value);
    return (
      <ul className={styles.events}>
        {listData.map((item, i) => (
          <div className={styles.raduis} style={{ left: 20 * i }} key={i}></div>
        ))}
      </ul>
    );
  };
  return useObserver(() => {
    return (
      <div className={styles.wedding}>
        <img src="/wedding/BlurEffects.png" className={styles.bgImg} />
        <img src="/wedding/Ellipse.svg" className={styles.bgIcon} />
        <div className={styles.headDiv}>
          <Header hasBack={true} />
        </div>
        <div className={styles.title}>婚礼日历</div>
        <div className={styles.dateContent}>
          <Calendar
            onPanelChange={onPanelChange}
            dateCellRender={dateCellRender}
            monthCellRender={monthCellRender}
            style={{ overflow: "hidden" }}
          />
        </div>
        <Footer />
      </div>
    );
  });
}
