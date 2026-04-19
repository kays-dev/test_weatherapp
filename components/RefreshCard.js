import styles from "./RefreshCard.module.css";
import { getNextRefresh } from "../services/helpers";

export const RefreshCard = ({ unitSystem, time }) => {
  return (
    <div className={styles.wrapper}>
      <p>
        {time != "0"
          ? unitSystem == "metric"
            ? `Prochaine actualisation dans ${time} min` : `Next update in ${time} min`
          : time
        }
      </p>
    </div>
  );
};
