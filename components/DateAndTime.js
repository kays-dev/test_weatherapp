import { getWeekDay, getTime, getAMPM } from "../services/helpers";
import styles from "./DateAndTime.module.css";

export const DateAndTime = ({ weatherData, unitSystem }) => {
  return (
    <div className={styles.wrapper}>
      <h2>
        {`${getWeekDay(unitSystem, weatherData.reqTime)}, ${getTime(
          unitSystem,
          Date.now(),
          weatherData.timezoneOffset
        )} ${unitSystem === "imperial" ? getAMPM(unitSystem, Date.now(), weatherData.timezoneOffset) : ""}`}
      </h2>
    </div>
  );
};
