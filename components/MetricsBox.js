import { degToCompass, ctoF } from "../services/converters";
import {
  getTime,
  getAMPM,
  getWindSpeed,
} from "../services/helpers";
import { MetricsCard } from "./MetricsCard";
import styles from "./MetricsBox.module.css";

export const MetricsBox = ({ weatherData, unitSystem }) => {
  return (
    // if !isDay add new class to darkmode
    <div className={styles.wrapper}>
      <MetricsCard
        title={"Ressenti"}
        iconSrc={"/sect_icons/thermometer.svg"}
        metric={Math.round(unitSystem == "metric" ? weatherData.feelsLike : ctoF(weatherData.feelsLike))}
        unit={unitSystem == "metric" ? "°C" : "°F"}
      />
      <MetricsCard
        title={"Précipitations"}
        iconSrc={"/sect_icons/umbrella.svg"}
        metric={weatherData.precipitationProbability}
        unit={"%"}
      />
      <MetricsCard
        title={"Vitesse du vent"}
        metric={getWindSpeed(unitSystem, weatherData.windSpeed)}
        unit={unitSystem == "metric" ? "Km/h" : "m/h"}
        direction={degToCompass(weatherData.windDirection)}
      />
    </div>
  );
};
