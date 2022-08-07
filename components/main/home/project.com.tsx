import { Trans } from "@lingui/react";
import { useObserver } from "mobx-react";
import styles from "./../../../pages/home/home.module.less";

export const Project = (props: {}) => {
  return useObserver(() => (
    <div className={[styles.Page_3, "shake-trigger"].join(" ")}>
      <div className={styles.Page_inner}>
        <div
          className={styles.circle_bg}
          style={{ left: "300px", top: "-100px" }}
        ></div>
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
  ));
};
