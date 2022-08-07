import { useEffect, useRef, useState } from "react";
import { Footer } from "../../components/main/common/footer.com";
import styles from "./home.module.less";
import useStore from "../../stores/useStore";
import { useObserver } from "mobx-react";
import { web3Config } from "../../stores/config";
import { message, Tooltip } from "antd";
import { WalletStore } from "../../stores/main/wallet.store";
import { MainStore } from "../../stores/main/main.store";

const LETTERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];
export default function Upgrade(props) {
  const wallet = useStore(WalletStore);
  const mainStore = useStore(MainStore);
  // const [addressList, setAddressList] = useState([]);
  useEffect(() => {
    (async () => {
      mainStore.getList();
    })();
  }, []);

  return useObserver(() => {
    return (
      <div className={styles.upgrade}>
        <div className={styles.content}>
          <div className={styles.boardHeader}>
            {LETTERS.map((l) => {
              return <div className={styles.letter}>{l}</div>;
            })}
          </div>
          <div className={styles.board}>
            {LETTERS.map((l) => {
              if (mainStore.letters[l]) {
                return (
                  <div className={styles.letterSpace}>
                    {mainStore.letters[l].map((addr) => {
                      return (
                        <Tooltip title={addr.address}>
                          <a
                            className={styles.letter}
                            style={{
                              backgroundColor: addr.color,
                              color: addr.textColor,
                            }}
                          >
                            <span className={styles.letterInner}>{l}</span>
                          </a>
                        </Tooltip>
                      );
                    })}
                  </div>
                );
              } else {
                return <div className={styles.letterSpace}></div>;
              }
            })}
          </div>
          <div className={styles.action}>
            <h1 className={styles.desc}>Measuring the Metaverse</h1>
            <div className={styles.desc}>
              This is an art experiment for web3 0x addresses
            </div>
            <div className={styles.desc}>Join and Measuring the Metaverse</div>
            <div className={styles.desc}>↓</div>
            {wallet.walletInfo.account ? (
              <>
                <div className={styles.desc}>
                  0x{wallet.walletInfo.account?.substring(2).toUpperCase()}
                </div>
                <button
                  className={styles.measuring}
                  onClick={() => {
                    mainStore.add();
                  }}
                  type="button"
                >
                  {mainStore.listLoading ? "Loading MetaVerse..." : "Measuring"}
                </button>
              </>
            ) : (
              <>
                <button
                  className={styles.measuring}
                  onClick={() => {
                    wallet.connect();
                  }}
                  type="button"
                >
                  Connect Wallet
                </button>
              </>
            )}
          </div>
          <div className={styles.result}>
            {LETTERS.map((l) => {
              if (mainStore.letters[l]) {
                return (
                  <div
                    className={styles.resultLine}
                    style={{
                      opacity:
                        mainStore.letters[l].length / mainStore.lettersMaxLen,
                      backgroundColor: mainStore.resultBGColor,
                    }}
                  >
                    <a>{l}</a>
                    <div>{mainStore.letters[l].length}</div>
                  </div>
                );
              } else {
                return <div className={styles.letterSpace}></div>;
              }
            })}
          </div>
          <div className={styles.action}>
            <div className={styles.desc}>
              Archive the metaverse status to chain and restart it!
            </div>
            <div className={styles.desc}>↓</div>
            <button
              className={styles.archive}
              onClick={() => {
                mainStore.add();
              }}
              type="button"
            >
              Archive to Chain
            </button>
          </div>
          <div className={styles.action}>
            <h1 className={styles.desc}>Archive History</h1>
          </div>
        </div>
        <Footer />
      </div>
    );
  });
}
