import Image from "next/image";
import { ctoF } from "../services/converters";
import { weatherToIcon } from "../services/helpers";
import styles from "./MainCard.module.css";

export const MainCard = ({
  unitSystem,
  weatherData
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.weather}>
        <Image
          width="200%"
          height="200%"
          src={weatherToIcon(unitSystem, weatherData.clouds, weatherData.precipitationProbability).icon}
          alt="weatherIcon"
        />

        <p className={styles.description}>{weatherToIcon(unitSystem, weatherData.clouds, weatherData.precipitationProbability).description}
        </p>
      </div>

      <h1 className={styles.temperature}>
        {unitSystem == "metric" ?
          Math.round(weatherData.temperature)
          : Math.round(ctoF(weatherData.temperature))}
        °{unitSystem == "metric" ? "C" : "F"}
      </h1>
    </div>
  );
};
