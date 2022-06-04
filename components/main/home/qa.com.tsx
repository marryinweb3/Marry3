import { t } from "@lingui/macro";
import { Trans } from "@lingui/react";
import { Collapse } from "antd";
import { useObserver } from "mobx-react";
import styles from "./../../../pages/home/home.module.less";

export const QA = (props: {}) => {
  return useObserver(() => (
    <div className={[styles.Page_4, "shake-trigger"].join(" ")}>
      <div className={styles.Page_inner} id="qa">
        <div
          className={styles.circle_bg}
          style={{ left: "30%", top: "0px" }}
        ></div>
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
  ));
};
