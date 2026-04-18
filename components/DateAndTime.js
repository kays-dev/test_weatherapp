import { getFullDate, getFormattedTime, getAMPM } from "../services/helpers";
import styles from "./DateAndTime.module.css";

export const DateAndTime = ({ weatherData, unitSystem }) => {
  return (
    <div className={styles.wrapper}>
      <h2>
        {`${getFullDate(unitSystem, weatherData.reqTime)}, ${getFormattedTime(
          unitSystem,
          Date.now(),
          weatherData.timezoneOffset
        )} ${unitSystem === "imperial" ? getAMPM(unitSystem, Date.now(), weatherData.timezoneOffset) : ""}`}
      </h2>
      <h1 className={styles.location}>
        {weatherData.cityName}, {weatherData.cityCountry.substring(0, 2).toUpperCase()}
      </h1>
    </div>
  );
};
