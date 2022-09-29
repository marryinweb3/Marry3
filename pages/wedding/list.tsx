import React, { useEffect, useState, useRef } from "react";
import styles from "./wedding.module.less";
import useStore from "../../stores/useStore";
import { useObserver } from "mobx-react";
import { web3Config } from "../../stores/config";
import { message, Tooltip } from "antd";
import { WalletStore } from "../../stores/main/wallet.store";
import { MarryStore } from "../../stores/main/marry.store";
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
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;
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

  const marryStore = useStore(MarryStore);

  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);
  const [list, setList] = useState<any[]>();

  useEffect(() => {
    nftStore.getNFTS();
    marryStore.getMintInfo();
    (async () => {
      const walletInfo = await wallet.getWalletInfo();
      marryStore.info.Aaddress = walletInfo.account;
      marryStore.info.Aname = walletInfo.ens;
      const loading = message.loading("loading...", 0);
      await marryStore.getOffer();
      loading();
    })();

    setInterval(marryStore.getNowGas, 10000);
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        setInitLoading(false);
        setData(res.results);
        setList(res.results);
      });
  }, []);

  const onLoadMore = () => {
    setLoading(true);
    setList(
      data.concat(
        [...new Array(count)].map(() => ({
          loading: true,
          name: {},
          picture: {},
        }))
      )
    );
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        const newData = data.concat(res.results);
        setData(newData);
        setList(newData);
        setLoading(false);
        window.dispatchEvent(new Event("resize"));
      });
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
            dataSource={list}
            header={
              <div className={styles.listHead}>
                {headData.map((hh) => (
                  <div className={styles.listHeadItem}>{hh.title}</div>
                ))}
              </div>
            }
            renderItem={(item) => (
              <List.Item actions={[<a key="list-loadmore-edit">详情</a>]}>
                <Skeleton avatar title={false} loading={item.loading} active>
                  <List.Item.Meta
                    avatar={<Avatar src={item.picture?.large} />}
                    title={<a href="https://ant.design">{item.name?.last}</a>}
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
