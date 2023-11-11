import styles from "./styles.module.css";
import LeftPanel from "../../components/LeftPanel";
export default function MonitoringLayout({ children }) {
  return (
    <div className={styles.containerLayout}>
      <div className={styles.leftPanel}>
        <LeftPanel />
      </div>
      <div className={styles.rightPanel}>
        <div className={styles.rightPanelChild}>{children}</div>
      </div>
    </div>
  );
}
