import { useRouter } from "next/router";
import styles from "./back.module.less";
export default function Back() {
  const router = useRouter();
  const back = () => {
    router.push("/town");
  };
  return (
    <div className={styles.back} onClick={back}>
      back to home
    </div>
  );
}
