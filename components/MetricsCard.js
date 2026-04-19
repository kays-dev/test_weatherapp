import Image from "next/image";
import styles from "./MetricsCard.module.css";

export const MetricsCard = ({ title, iconSrc, metric, unit, direction }) => {
  return (
    <div className={styles.wrapper}>
      <p>{title}</p>
      <div className={styles.content}>
        <Image width={50} height={32} src={direction ? direction : iconSrc} alt="weatherIcon" />
        <div className={styles.data}>
          <h3>{metric.toFixed(1)}</h3>
          <p>{unit}</p>
        </div>
      </div>
    </div>
  );
};
