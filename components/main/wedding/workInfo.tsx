import { useRouter } from "next/router";
import styles from "./wedding.module.less";
import { CountDown } from "../../../utils/count";
export default function WorkInfo(props: any) {
  const router = useRouter();
  const back = () => {};
  return (
    <div className={styles.workInfo}>
      <div className={styles.info}>
        <div className={styles.title}>How it works</div>
        <div className={styles.steps}>
          <div className={styles.icons}>
            <div>
              <div className={styles.flex}>
                <img src="/wedding/step-1.svg" className={styles.stepIcon} />
                <span className={styles.line}></span>
              </div>
              <div className={styles.text}>已经在Marry3结婚获得SBT</div>
            </div>
            <div>
              <div className={styles.flex}>
                <img src="/wedding/step-2.svg" className={styles.stepIcon} />
                <span className={styles.line}></span>
              </div>
              <div className={styles.text}>
                签名获得请帖链接，分享给你的朋友
              </div>
            </div>
            <div>
              <div className={styles.flex}>
                <img src="/wedding/step-3.svg" className={styles.stepIcon} />
              </div>
              <div className={styles.text}>等待婚礼时间进入MaryyVerse</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.title}>Wedding Guests</div>
        <div className={styles.steps}>
          <div className={styles.flex}>
            <div className={styles.radius}></div>
            <div className={styles.radius}></div>
            <div className={styles.radius}></div>
          </div>
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.title}>Countdown</div>
        <div className={styles.steps}>
          <div className={styles.flex}>
            <img src="/wedding/framedate.svg" className={styles.framedate} />
            <div>
              <div className={styles.firstText}>NaN</div>
              <div className={styles.secondText}>倒数日</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
