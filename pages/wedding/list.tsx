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
import { Avatar, Button, List, Skeleton } from "antd";

interface DataType {
  gender?: string;
  name: {
    title?: string;
    first?: string;
    last?: string;
  };
  email?: string;
  picture: {
    large?: string;
    medium?: string;
    thumbnail?: string;
  };
  nat?: string;
  loading: boolean;
}

const count = 3;
const headData = [
  {
    title: "新人",
  },
  {
    title: "嘉宾",
  },
  {
    title: "婚礼举行时间",
  },
  {
    title: "创建时间",
  },
  {
    title: "",
  },
];
export default function createWedding(props) {
  const wallet = useStore(WalletStore);
  const nftStore = useStore(NFTStore);

  const weddingStore = useStore(WeddingStore);

  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);

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
          <List
            className={styles.demoLoadmoreList}
            loading={initLoading}
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={weddingStore.weddingList}
            header={
              <div className={styles.listHead}>
                {headData.map((hh) => (
                  <div className={styles.listHeadItem}>{hh.title}</div>
                ))}
              </div>
            }
            renderItem={(item, i) => (
              <List.Item
                actions={[<a key="list-loadmore-edit">详情</a>]}
                key={i}
              >
                <Skeleton avatar title={false} loading={item.loading} active>
                  <List.Item.Meta
                    avatar={<Avatar src={item.picture} />}
                    title={<a href="https://ant.design">{item.name}</a>}
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  />
                  <div>content</div>
                </Skeleton>
              </List.Item>
            )}
          />
        </div>
        <Footer />
      </div>
    );
  });
}
