import { t } from "@lingui/macro";
import { Trans } from "@lingui/react";
import {
  Button,
  Collapse,
  Dropdown,
  Form,
  Input,
  Menu,
  message,
  Select,
  Space,
  Tooltip,
} from "antd";
import {
  QuestionCircleOutlined,
  LockOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { useObserver } from "mobx-react";
import wallet from "../../../../contracts/wallet";
import styles from "./../../../../pages/home/home.module.less";
import useStore from "../../../../stores/useStore";
import { MarryStore } from "../../../../stores/main/marry.store";
import { NFTStore } from "../../../../stores/main/nfts.store";
import { useEffect, useState } from "react";
import { messages } from "../../../../locale/en";
import { WalletStore } from "../../../../stores/main/wallet.store";
import { ItemType } from "antd/lib/menu/hooks/useItems";

export const Status0 = (props: {}) => {
  const formItemLayout = {
    wrapperCol: { span: 24 },
  };
  const marryStore = useStore(MarryStore);
  const walletStore = useStore(WalletStore);
  const nftStore = useStore(NFTStore);
  const [submiting, setSubmiting] = useState(false);

  const begin = async (e) => {
    e.preventDefault();
    setSubmiting(true);
    try {
      await marryStore.signA();
    } catch (e) {
      message.error(e.message);
    }

    setSubmiting(false);
  };
  const [ensList, setEnsList] = useState<ItemType[]>([]);
  useEffect(() => {
    (async () => {
      const walletInfo = await walletStore.getWalletInfo();
      const ens = walletInfo.ens;
      const bit = walletInfo.bit;
      const items = [];
      if (ens) {
        items.push({
          label: ens,
          key: ens,
        });
      }
      if (bit) {
        items.push({
          label: bit,
          key: bit,
        });
      }
      setEnsList(items);
    })();
  }, []);

  const menu = (
    <Menu
      onClick={(e) => {
        marryStore.info.Aname = e.key;
      }}
      items={[
        {
          disabled: true,
          label:
            ensList.length > 0
              ? "please choose .eth or .bit"
              : "no .eth or .bit bind",
          key: -1,
        },
        ...ensList,
      ]}
    />
  );
  return useObserver(() => (
    <Form {...formItemLayout} layout={"vertical"} className={styles.mainForm}>
      <Form.Item
        label={
          <span>
            {t`NFT PMP`}
            <Tooltip
              title={t`????????? NFT ?????????????????? Marry3 Certificate NFT ???`}
            >
              <QuestionCircleOutlined style={{ marginLeft: "5px" }} />
            </Tooltip>
          </span>
        }
      >
        <Select
          placeholder={t`?????????????????????NFT??????????????????????????????`}
          style={{ width: "100%" }}
          value={marryStore.info.Acover}
          onChange={(e) => {
            if (e == "-100") {
              window.open("https://myfirstnft.info/");
              marryStore.info.Acover = null;
            } else {
              marryStore.info.Acover = e;
            }
            console.log(e);
          }}
        >
          {nftStore.nfts.map((nft) => {
            return (
              <Select.Option
                key={nft.contract_address + ":" + nft.token_id}
                value={nft.cached_file_url || nft.metadata?.image}
              >
                <img
                  src={nft.cached_file_url || nft.metadata?.image}
                  title="nft"
                  style={{ width: "25px", height: "25px" }}
                />
                <span style={{ paddingLeft: "10px" }}>
                  {nft.metadata?.name}
                </span>
              </Select.Option>
            );
          })}
          <Select.Option key="any" value="-100">
            <span style={{ paddingLeft: "10px" }}>
              <Trans id="?????????NFT???MFNFT????????????" />
            </span>
          </Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label={t`your name`}>
        <Input.Group
          compact
          style={{
            width: "100%",
          }}
        >
          <Input
            value={marryStore.info.Aname}
            placeholder="will get your .eth/.bit name auto"
            onChange={async (e) => {
              marryStore.info.Aname = e.target.value;
            }}
            style={{ width: "calc(100% - 120px)" }}
          />
          <Dropdown overlay={menu}>
            <Button style={{ width: "40px" }}>
              <DownOutlined />
            </Button>
          </Dropdown>
          <Select
            value={marryStore.info.Asex}
            onChange={(e) => (marryStore.info.Asex = e)}
            style={{ width: "80px" }}
          >
            <Select.Option value={0}>
              <Trans id="Male" />
            </Select.Option>
            <Select.Option value={1}>
              <Trans id="Female" />
            </Select.Option>
            <Select.Option value={2}>
              <Trans id="X" />
            </Select.Option>
          </Select>
        </Input.Group>
      </Form.Item>

      <Form.Item label={t`????????????`}>
        <Input.TextArea
          placeholder={t`?????????...`}
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
          <Trans id="???????????????????????????" />
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
  ));
};
