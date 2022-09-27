import { useRouter } from "next/router";
import styles from "./wedding.module.less";
export default function WorkInfo() {
  const router = useRouter();
  const back = () => {
    router.push("/town");
  };
  return (
    <div className={styles.workInfo} onClick={back}>
      <div className={styles.info}>
        <div className={styles.title}>How it works</div>
        <div className={styles.steps}></div>
      </div>
      <div className={styles.info}>
        <div className={styles.title}>Wedding Guests</div>
        <div className={styles.steps}></div>
      </div>
      <div className={styles.info}>
        <div className={styles.title}>Countdown</div>
        <div className={styles.steps}></div>
      </div>
    </div>
  );
}
