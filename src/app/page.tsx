import styles from "./page.module.css";

import { Cont } from "./component/data";

export default function Home() {
  return (
    <div className={styles.page}>
      <h2>Parking System</h2>
      <p>
        <span id="email">*****@gmail.com</span>
        |
        <span id="latest-update-at"></span>
        時点
      </p>
      <hr />
      <Cont />
    </div>
  );
}
