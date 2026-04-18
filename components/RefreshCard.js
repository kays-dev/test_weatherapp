import styles from "./RefreshCard.module.css";
import { getNextRefresh } from "../services/helpers";

export const RefreshCard = ({ unitSystem, time }) => {
  return (
    <div className={styles.wrapper}>
      <p
        className={styles.active}>
        {unitSystem == "metric"
          ? time != "0"
            ? `Prochaine actualisation : ${time} min`
            : `Mis à jour`
          : time != "0"
            ? `Next update : ${time} min`
            : `Just updated`
        }
      </p>
    </div>
  );
};
