import { t } from "@lingui/macro";
import { Trans } from "@lingui/react";
import { Collapse } from "antd";
import { useObserver } from "mobx-react";
import styles from "./../../../pages/home/home.module.less";

export const Team = (props: {}) => {
  return useObserver(() => (
    <div className={[styles.Page_3, "shake-trigger"].join(" ")}>
      <div className={styles.Page_inner} id="team">
        <div
          className={styles.circle_bg}
          style={{ left: "30%", top: "0px" }}
        ></div>
        <div className={styles.about_title}>
          <Trans id="团队" />
        </div>
        <div className={styles.team_content}>
          <div className={styles.teams}>
            <div className={styles.team_item}>
              <div className={styles.team_item_img}>
                <img src={"/yootou.png"} alt="" />
              </div>
              <div className={styles.team_item_info}>
                <div className={styles.team_item_info_title}>Yootou</div>
                <div className={styles.team_item_info_desc}>
                  <Trans id="项目发起人 / 程序员 / 理想主义者" />
                  <br />
                </div>
                <div className={styles.links}>
                  <a
                    href="https://twitter.com/0xYootou"
                    className={styles.social}
                    target={"_blank"}
                  >
                    <svg width="15" height="13" viewBox="0 0 19 17" fill="none">
                      <path
                        id="路径"
                        fill-rule="evenodd"
                        style={{ fill: "currentColor" }}
                        transform="translate(0 0)  rotate(0 9.5 8.5)"
                        opacity="1"
                        d="M7.75,4.67C5.78,4.47 4.01,3.57 2.54,1.41C2.33,1.11 1.96,0.94 1.59,0.98C1.22,1.03 0.91,1.27 0.78,1.62C0.59,2.1 0.46,2.61 0.34,3.12C0.14,4 -0.05,5.23 0.01,6.55C0.08,7.88 0.4,9.35 1.27,10.67C1.89,11.61 2.78,12.45 3.97,13.08C3.13,13.61 2.2,13.91 0.97,14.26C0.54,14.38 0.25,14.77 0.24,15.22C0.24,15.66 0.54,16.06 0.96,16.18C3.4,16.89 5.86,17.13 8.02,16.93C10.18,16.74 12.14,16.11 13.51,15C16.09,12.9 17.31,9.86 17.15,5.49L18.87,2.47C19.06,2.13 19.04,1.71 18.81,1.4C18.59,1.08 18.2,0.92 17.82,0.99L16.02,1.33C15.14,0.44 13.61,-0.29 11.6,0.11C10.14,0.41 9.12,1.2 8.5,2.27C8.07,3 7.85,3.83 7.75,4.67Z "
                      />
                    </svg>
                  </a>
                  <a
                    href="https://github.com/yu-tou"
                    target={"_blank"}
                    className={styles.social}
                  >
                    <svg
                      width="15"
                      height="14.019999999999982"
                      viewBox="0 0 19 20.019999999999982"
                      fill="none"
                    >
                      <path
                        id="路径"
                        fill-rule="evenodd"
                        style={{ fill: "currentcolor" }}
                        transform="translate(0 -1.8207657603852567e-14)  rotate(0 9.5 10.01)"
                        opacity="1"
                        d="M6,19.02C6,19.57 6.45,20.02 7,20.02L13,20.02C13.55,20.02 14,19.57 14,19.02L14,16.02C14,15.45 13.88,14.91 13.67,14.42C14.63,14.09 15.5,13.63 16.26,13.06C17.89,11.83 19,10.06 19,8.02C19,6.67 18.52,5.43 17.71,4.4C17.92,3.58 17.9,2.75 17.82,2.12C17.75,1.55 17.65,0.81 17.25,0.36C16.66,-0.29 15.67,0.09 14.97,0.33C14.35,0.54 13.59,0.88 12.85,1.38C11.95,1.14 10.99,1.02 10,1.02C9.01,1.02 8.05,1.14 7.15,1.38C6.41,0.88 5.64,0.54 5.02,0.33C4.33,0.09 3.33,-0.29 2.74,0.36C2.34,0.81 2.25,1.5 2.18,2.08C2.18,2.09 2.17,2.11 2.17,2.12C2.09,2.75 2.07,3.58 2.28,4.4C1.48,5.44 1,6.67 1,8.02C1,10.06 2.11,11.83 3.74,13.06C4.5,13.63 5.37,14.09 6.33,14.42C6.12,14.9 6,15.44 6,16L5.83,16.03C5.12,16.13 4.66,16.04 4.34,15.91C3.58,15.59 3.19,14.78 2.71,14.16C2.42,13.77 1.98,13.29 1.32,13.07C0.79,12.9 0.23,13.18 0.05,13.7C-0.12,14.23 0.16,14.79 0.68,14.97C1.24,15.15 1.63,16.11 1.98,16.54C2.35,16.98 2.85,17.45 3.56,17.75C4.24,18.04 5.04,18.15 6,18.03L6,19.02Z "
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className={styles.team_item}>
              <div className={styles.team_item_img}>
                <img src={"/daodao.png"} alt="" />
              </div>
              <div className={styles.team_item_info}>
                <div className={styles.team_item_info_title}>Daodao</div>
                <div className={styles.team_item_info_desc}>
                  <Trans id="产品经理 / 设计师 / Web3 个人投研者" /> <br />
                  <Trans id="专注 #Tokenomics #DAO" />
                  <br />
                </div>
                <div className={styles.links}>
                  <a
                    href="https://twitter.com/daodao"
                    className={styles.social}
                    target={"_blank"}
                  >
                    <svg width="15" height="13" viewBox="0 0 19 17" fill="none">
                      <path
                        id="路径"
                        fill-rule="evenodd"
                        style={{ fill: "currentColor" }}
                        transform="translate(0 0)  rotate(0 9.5 8.5)"
                        opacity="1"
                        d="M7.75,4.67C5.78,4.47 4.01,3.57 2.54,1.41C2.33,1.11 1.96,0.94 1.59,0.98C1.22,1.03 0.91,1.27 0.78,1.62C0.59,2.1 0.46,2.61 0.34,3.12C0.14,4 -0.05,5.23 0.01,6.55C0.08,7.88 0.4,9.35 1.27,10.67C1.89,11.61 2.78,12.45 3.97,13.08C3.13,13.61 2.2,13.91 0.97,14.26C0.54,14.38 0.25,14.77 0.24,15.22C0.24,15.66 0.54,16.06 0.96,16.18C3.4,16.89 5.86,17.13 8.02,16.93C10.18,16.74 12.14,16.11 13.51,15C16.09,12.9 17.31,9.86 17.15,5.49L18.87,2.47C19.06,2.13 19.04,1.71 18.81,1.4C18.59,1.08 18.2,0.92 17.82,0.99L16.02,1.33C15.14,0.44 13.61,-0.29 11.6,0.11C10.14,0.41 9.12,1.2 8.5,2.27C8.07,3 7.85,3.83 7.75,4.67Z "
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={[styles.Page_partner, "shake-trigger"].join(" ")}>
          <div className={styles.Page_inner}>
            <div className={styles.partner_title}>
              <Trans id="合作伙伴" />
            </div>
            <div className={styles.partner_content}>
              <div className={styles.partner_item} style={{}}>
                <a
                  className={styles.partner_item_link}
                  href="https://twitter.com/theNextDAO"
                  target={"_blank"}
                >
                  <img src="/NextDAO.png" />
                  NextDAO
                </a>
              </div>
              <div className={styles.partner_item} style={{}}>
                <a
                  className={styles.partner_item_link}
                  href="https://kencloud.com/"
                  target={"_blank"}
                >
                  <img src="https://kencloud.com/images/jiaozidb/favicon.ico" />
                  KEN Labs
                </a>
              </div>
              <div className={styles.partner_item} style={{}}>
                <a
                  className={styles.partner_item_link}
                  href="https://cyberconnect.me/"
                  target={"_blank"}
                >
                  <img src="https://cyberconnect.me/_next/image?url=%2Fassets%2Fgrains.svg&w=32&q=75" />
                  CyberConnect
                </a>
              </div>
              {/* <div className={styles.partner_item} style={{}}>
                <a
                  className={styles.partner_item_link}
                  href="https://metamail.ink/"
                  target={"_blank"}
                >
                  <img src="https://metamail.ink/favicon/64x.ico" />
                  MetaMail.ink
                </a>
              </div> */}
              <div className={styles.partner_item} style={{}}>
                <a
                  className={styles.partner_item_link}
                  href="https://twitter.com/PoorLandNFT"
                  target={"_blank"}
                >
                  <img src="/poorland.jpeg" style={{ borderRadius: "50%" }} />
                  PoorLandNFT
                </a>
              </div>
              <div className={styles.partner_item} style={{}}>
                <a
                  className={styles.partner_item_link}
                  href="https://twitter.com/marryinweb3"
                  target={"_blank"}
                  style={{ color: "#f41870" }}
                >
                  <Trans id="联系我们" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));
};
