import React, { useEffect, useState, useRef } from "react";
import styles from "./wedding.module.less";
import useStore from "../../stores/useStore";
import { useObserver } from "mobx-react";
import { web3Config } from "../../stores/config";
import { message, Space, Tag, Tooltip } from "antd";
import { WalletStore } from "../../stores/main/wallet.store";
import { WeddingStore } from "../../stores/main/wedding.store";
import { Trans } from "@lingui/react";
import { NFTStore } from "../../stores/main/nfts.store";
import { Header } from "../../components/main/common/header.com";
import { Footer } from "../../components/main/common/footer.com";
import { Avatar, Button, List, Skeleton } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import moment from "moment";
import { useRouter } from "next/router";

export default function createWedding(props) {
  const wallet = useStore(WalletStore);
  const nftStore = useStore(NFTStore);

  const weddingStore = useStore(WeddingStore);

  const router = useRouter();
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  const columns: ColumnsType<any> = [
    {
      title: "新人",
      dataIndex: "name",
      key: "name",
      width: 120,
      className: "weddings",
      render: (text) => <div className={styles.weddings}></div>,
    },
    {
      title: "嘉宾",
      dataIndex: "joiners",
      key: "joiners",
      className: "joiners",
      render: (joiners) => (
        <div className={styles.joiners}>
          {joiners.map((join, i) =>
            i < 5 ? (
              <div className={styles.radius} style={{ left: 20 * i }}></div>
            ) : null
          )}
          {joiners?.length > 5 ? (
            <div className={styles.moreRadius}>{joiners?.length}</div>
          ) : null}
        </div>
      ),
    },
    {
      title: "婚礼举行时间",
      dataIndex: "wedding_at",
      key: "wedding_at",
      align: "center",
      render: (text) => (text ? moment(text).format("YYYY-MM-DD") : "--"),
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      render: (text) => (text ? moment(text).format("YYYY-MM-DD") : "--"),
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Space
          size="middle"
          onClick={() => {
            router.push("/wedding/" + record.id);
          }}
        >
          <a>详情</a>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    (async () => {
      const loading = message.loading("loading...", 0);
      await weddingStore.getList();
      loading();
      setInitLoading(false);
    })();
  }, []);

  const onLoadMore = async () => {
    await weddingStore.getList();
    console.log("加载更多。。。");
  };

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: "32px",
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;

  return useObserver(() => {
    return (
      <div className={styles.wedding}>
        <img src="/wedding/BlurEffects.png" className={styles.bgImg} />
        <img src="/wedding/Ellipse.svg" className={styles.bgIcon} />
        <div className={styles.headDiv}>
          <Header hasBack={true} />
        </div>
        <div className={styles.title}>近期婚礼</div>
        <div className={styles.listContent}>
          <Table
            columns={columns}
            dataSource={weddingStore.weddingList}
            bordered={false}
            pagination={false}
            className={styles.table}
          />
        </div>
        <Footer />
      </div>
    );
  });
}
