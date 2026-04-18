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
      <Image
        width="200px"
        height="200px"
        src={weatherToIcon(unitSystem, weatherData.clouds, weatherData.precipitationProbability).icon}
        alt="weatherIcon"
      />
      <h1 className={styles.temperature}>
        {unitSystem == "metric" ?
          Math.round(weatherData.temperature)
          : Math.round(ctoF(weatherData.temperature))}
        °{unitSystem == "metric" ? "C" : "F"}
      </h1>
      <p className={styles.description}>{weatherToIcon(unitSystem, weatherData.clouds, weatherData.precipitationProbability).description}</p>
    </div>
  );
};
