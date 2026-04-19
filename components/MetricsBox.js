import { degToCompass, ctoF } from "../services/converters";
import {
  getWindSpeed,
} from "../services/helpers";
import { MetricsCard } from "./MetricsCard";
import styles from "./MetricsBox.module.css";

export const MetricsBox = ({ weatherData, unitSystem }) => {
  return (
    <div className={styles.wrapper}>
      <MetricsCard
        title={unitSystem == "metric" ? "Ressenti" : "Feels like"}
        iconSrc={"/sect_icons/thermometer.svg"}
        metric={Math.round(unitSystem == "metric" ? weatherData.feelsLike : ctoF(weatherData.feelsLike))}
        unit={unitSystem == "metric" ? "°C" : "°F"}
      />
      <MetricsCard
        title={unitSystem == "metric" ? "Précipitations" : "Precipitation"}
        iconSrc={"/sect_icons/umbrella.svg"}
        metric={weatherData.precipitationProbability}
        unit={"%"}
      />
      <MetricsCard
        title={unitSystem == "metric" ? "Vitesse du vent" : "Wind speed"}
        metric={getWindSpeed(unitSystem, weatherData.windSpeed)}
        unit={unitSystem == "metric" ? "Km/h" : "m/h"}
        direction={degToCompass(weatherData.windDirection)}
      />
    </div>
  );
};
