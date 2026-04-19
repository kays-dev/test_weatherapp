import { useState, useEffect } from "react";

import { useData } from "./api/useData";
import { getNextRefresh } from "../services/helpers";

import { MainCard } from "../components/MainCard";
import { ContentBox } from "../components/ContentBox";
import { Header } from "../components/Header";
import { DateAndTime } from "../components/DateAndTime";
import { MetricsBox } from "../components/MetricsBox";
import { RefreshCard } from "../components/RefreshCard";
import { LoadingScreen } from "../components/LoadingScreen";
import { ErrorScreen } from "../components/ErrorScreen";

import styles from "../styles/Home.module.css";

export const App = () => {
  const { weatherData, loading, error } = useData();

  const [unitSystem, setUnitSystem] = useState("metric");
  const changeTime = 120 * 1000;

  const [nextRefresh, setNextRefresh] = useState();

  //Changement de système
  useEffect(() => {
    const interval = setInterval(() => {
      setUnitSystem(prev =>
        prev === "metric" ? "imperial" : "metric"
      )
    }, changeTime)

    return () => {
      clearInterval(interval);
    }
  }, [changeTime]);

  //Countdown de la prochainne requête
  useEffect(() => {
    if (!weatherData) {
      setNextRefresh(unitSystem === "metric" ? "En attente du serveur..." : "Awaiting server response...");

      return;
    };

    const updateNexRefresh = () => {
      const next = getNextRefresh(weatherData.reqTime, weatherData.timezoneOffset);

      if (next == "0") {
        setNextRefresh(unitSystem === "metric" ? "Mise à jour..." : "Mise à jour...");

      } else {
        setNextRefresh(next);
      };
    };

    updateNexRefresh();

    const interval = setInterval(updateNexRefresh, 60 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, [weatherData]);

  return error ? (
    <ErrorScreen errorMessage="Une erreur s'est produite...">
    </ErrorScreen>
  ) : loading ? (
    <LoadingScreen loadingMessage="Loading data..." />
  ) : (
    <div className={styles.wrapper}>
      <Header>
        <DateAndTime weatherData={weatherData} unitSystem={unitSystem} />
        <RefreshCard time={nextRefresh} unitSystem={unitSystem} />
      </Header>

      <MainCard
        unitSystem={unitSystem}
        weatherData={weatherData}
      />

      <ContentBox>
        <MetricsBox weatherData={weatherData} unitSystem={unitSystem} />
      </ContentBox>
    </div>
  );
};

export default App;