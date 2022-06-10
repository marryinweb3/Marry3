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
            <div className={styles.team_item}>
              <div className={styles.team_item_img}>
                <img src={"/chou.jpg"} alt="" />
              </div>
              <div className={styles.team_item_info}>
                <div className={styles.team_item_info_title}>Len Chou</div>
                <div className={styles.team_item_info_desc}>
                  <Trans id="Operations Manager" /> <br />
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

              <div className={styles.partner_item} style={{}}>
                <a
                  className={styles.partner_item_link}
                  href="https://www.did.id/"
                  target={"_blank"}
                >
                  <img src="https://app.did.id/images/explorer/das-logo.png" />
                </a>
              </div>
              <div className={styles.partner_item} style={{}}>
                <a
                  className={styles.partner_item_link}
                  href="https://chainbase.online/"
                  target={"_blank"}
                >
                  <img
                    src="https://chainbase.online/assets/logo.png"
                    style={{ height: "15px" }}
                  />
                </a>
              </div>
              <div className={styles.partner_item} style={{}}>
                <a
                  className={styles.partner_item_link}
                  href="https://www.mail3.me/"
                  target={"_blank"}
                >
                  <svg
                    viewBox="0 0 124 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    focusable="false"
                  >
                    <path
                      d="M56.34 16.86c0-2.06-1.194-3.19-3.062-3.19-1.867 0-3.078 1.13-3.078 3.19v8.545h-4.845V16.86c0-2.06-1.193-3.19-3.054-3.19-1.862 0-3.061 1.13-3.061 3.19v8.545h-4.893V9.663h4.893v1.977a5.607 5.607 0 0 1 2.067-1.627c.81-.373 1.699-.55 2.592-.515a6.033 6.033 0 0 1 3.136.72 5.93 5.93 0 0 1 2.3 2.222 6.379 6.379 0 0 1 2.304-2.146 6.483 6.483 0 0 1 3.065-.796c3.944 0 6.492 2.478 6.492 6.709v9.198h-4.863l.006-8.545ZM70.112 9.439a5.625 5.625 0 0 1 2.791.583 5.536 5.536 0 0 1 2.131 1.871v-2.23h4.886v15.742h-4.886v-2.242a5.626 5.626 0 0 1-2.15 1.867 5.715 5.715 0 0 1-2.802.587c-3.89 0-7.004-3.154-7.004-8.121 0-4.967 3.114-8.057 7.034-8.057Zm1.432 4.202c-1.832 0-3.49 1.354-3.49 3.867 0 2.512 1.658 3.919 3.49 3.919 1.831 0 3.49-1.383 3.49-3.89s-1.635-3.896-3.49-3.896ZM82.447 5.431c0-1.465 1.193-2.625 2.917-2.625a2.738 2.738 0 0 1 2.017.7 2.638 2.638 0 0 1 .871 1.926 2.626 2.626 0 0 1-.878 1.91 2.699 2.699 0 0 1-2.01.684c-1.766 0-2.917-1.153-2.917-2.595Zm.453 4.231h4.893v15.743H82.9V9.662ZM91.319 4.53h4.892v20.875h-4.892V4.531ZM104.908 6.72c3.882 0 5.971 2.229 5.971 5.012a4.201 4.201 0 0 1-.715 2.527 4.184 4.184 0 0 1-2.074 1.604v.097c1.845.611 3.103 2.029 3.103 4.457 0 3.114-2.22 5.343-6.08 5.343-3.859 0-6.603-1.823-6.728-6h4.184c.028 1.44.808 2.406 2.396 2.406a1.91 1.91 0 0 0 1.513-.56 1.929 1.929 0 0 0 .554-1.52c0-1.646-.985-2.286-3.228-2.286h-.808v-3.526h.808c1.463 0 2.875-.36 2.875-2.028a1.764 1.764 0 0 0-.494-1.408 1.747 1.747 0 0 0-1.396-.512c-1.389 0-1.89 1.011-1.97 2.023h-4.206c.148-3.646 2.521-5.629 6.295-5.629Z"
                      fill="#231815"
                    ></path>
                    <path
                      d="M13.286 21.704c.465 1.246 1.181 1.246 1.416 1.246.701 0 1.207-.504 1.504-1.513a3.08 3.08 0 0 0 .107-1.21 7.07 7.07 0 0 0-1.6-3.698 7.078 7.078 0 0 0-1.59 3.44c-.097.583-.04 1.18.163 1.735ZM14.677 14.31c2.848-2.614 7.374-4.334 12.509-4.541a.401.401 0 0 0 .277-.12.39.39 0 0 0 .111-.278V2.949a1.279 1.279 0 0 0-.204-.671c-.13-.201-.314-.363-.53-.467a1.325 1.325 0 0 0-1.362.129l-10.796 8.071L3.88 1.971a1.32 1.32 0 0 0-1.902.353c-.128.205-.195.44-.195.68v6.402a.406.406 0 0 0 .118.275.417.417 0 0 0 .276.123c5.109.192 9.635 1.922 12.499 4.505Z"
                      fill="#4E51F4"
                    ></path>
                    <path
                      d="M15.75 15.439a8.52 8.52 0 0 1 2.087 4.64 4.565 4.565 0 0 1-.158 1.797c-.512 1.65-1.575 2.593-2.977 2.593-1.304 0-2.316-.792-2.858-2.235a4.945 4.945 0 0 1-.24-2.472 8.69 8.69 0 0 1 2.045-4.348c-2.66-2.406-6.97-3.995-11.84-4.132l.037 12.576a2.418 2.418 0 0 0 .733 1.732 2.483 2.483 0 0 0 1.762.71h20.794a2.516 2.516 0 0 0 1.76-.72 2.45 2.45 0 0 0 .726-1.737l-.036-12.535c-4.833.116-9.18 1.72-11.834 4.131Z"
                      fill="#4E51F4"
                    ></path>
                  </svg>
                </a>
              </div>
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
