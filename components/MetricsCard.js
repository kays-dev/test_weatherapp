import Image from "next/image";
import styles from "./MetricsCard.module.css";

export const MetricsCard = ({ title, iconSrc, metric, unit, direction }) => {
  return (
    <div className={styles.wrapper}>
      <p>{title}</p>
      <div className={styles.content}>
        <Image width="50px" height="50px" src={direction ? direction : iconSrc} alt="weatherIcon" />
        <div>
          <h1>{metric.toFixed(1)}</h1>
          <p>{unit}</p>
        </div>
      </div>
    </div>
  );
};
