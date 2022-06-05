import { t } from "@lingui/macro";
import { Trans } from "@lingui/react";
import { Collapse, Tooltip } from "antd";
import { useObserver } from "mobx-react";
import { QuestionCircleOutlined, LockOutlined } from "@ant-design/icons";
import styles from "./../../../../pages/home/home.module.less";
import { MarryStore } from "../../../../stores/main/marry.store";
import useStore from "../../../../stores/useStore";
import { web3Config } from "../../../../stores/config";

export const FormDesc = (props: {}) => {
  const marryStore = useStore(MarryStore);
  return useObserver(() => (
    <>
      {marryStore.pendingOffer?.status == 2 &&
      marryStore.pendingOffer.AtokenId ? (
        <div className={styles.price_desc}>
          <Trans id="查看 Marry3 Certificate 详情" />:
          <a
            href={`/i/${marryStore.pendingOffer.AtokenId}`}
            target={"_blank"}
            style={{ fontWeight: "500", marginLeft: "30px" }}
          >
            Token #{marryStore.pendingOffer.AtokenId}
          </a>
          <a
            href={`https://opensea.io/assets/ethereum/${web3Config.address.marry3}/${marryStore.pendingOffer.AtokenId}`}
            target={"_blank"}
            style={{ fontWeight: "500", marginLeft: "10px" }}
          >
            <img
              src="/opensea-logo.png"
              style={{
                width: "15px",
                height: "15px",
                verticalAlign: "-3px",
              }}
            />
          </a>
          <a
            href={`/i/${marryStore.pendingOffer.BtokenId}`}
            target={"_blank"}
            style={{ fontWeight: "500", marginLeft: "30px" }}
          >
            Token #{marryStore.pendingOffer.BtokenId}
          </a>
          <a
            href={`https://opensea.io/assets/ethereum/${web3Config.address.marry3}/${marryStore.pendingOffer.BtokenId}`}
            target={"_blank"}
            style={{ fontWeight: "500", marginLeft: "10px" }}
          >
            <img
              src="/opensea-logo.png"
              style={{
                width: "15px",
                height: "15px",
                verticalAlign: "-3px",
              }}
            />
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
                  <td>0.015</td>
                </tr>{" "}
                <tr>
                  <td>300~599</td>
                  <td>0.02</td>{" "}
                </tr>{" "}
                <tr>
                  <td>600~999</td>
                  <td>0.025</td>
                </tr>{" "}
                <tr>
                  <td>1000~1499</td>
                  <td>0.03</td>
                </tr>{" "}
                <tr>
                  <td>1500~2009</td>
                  <td>0.035</td>
                </tr>{" "}
                <tr>
                  <td>2100~1799</td>
                  <td>0.04</td>
                </tr>{" "}
                <tr>
                  <td>2800~3599</td>
                  <td>0.045</td>
                </tr>{" "}
                <tr>
                  <td>3600+</td>
                  <td>0.05</td>
                </tr>
              </table>
            }
          >
            <span>
              <Trans id="初始Mint价格仅0.01Ξ，但价格还是会随着参与人数的增加有所上涨，最终会恒定在0.05Ξ，具体的算法规则" />{" "}
              <QuestionCircleOutlined style={{ display: "inline" }} />
            </span>
          </Tooltip>
        </div>
      )}
    </>
  ));
};
