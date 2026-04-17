import { useState, useEffect } from "react";

import { useData } from "./api/useData";

import { MainCard } from "../components/MainCard";
import { ContentBox } from "../components/ContentBox";
import { Header } from "../components/Header";
import { DateAndTime } from "../components/DateAndTime";
import { MetricsBox } from "../components/MetricsBox";
import { UnitSwitch } from "../components/UnitSwitch";
import { LoadingScreen } from "../components/LoadingScreen";
import { ErrorScreen } from "../components/ErrorScreen";

import styles from "../styles/Home.module.css";

export const App = () => {
  const { weatherData, loading, error } = useData();

  const [unitSystem, setUnitSystem] = useState("metric");
  const changeSystem = () =>
    unitSystem == "metric"
      ? setUnitSystem("imperial")
      : setUnitSystem("metric");

  return error ? (
    <ErrorScreen errorMessage="Une erreur s'est produite...">
    </ErrorScreen>
  ) : loading ? (
    <LoadingScreen loadingMessage="Loading data..." />
  ) : (
    <div className={styles.wrapper}>
      <MainCard
        city={weatherData.cityName}
        country={weatherData.cityCountry}
        description={""}
        iconName={""}
        unitSystem={unitSystem}
        weatherData={weatherData}
      />
      {/* <ContentBox>
        <Header>
          <DateAndTime weatherData={weatherData} unitSystem={unitSystem} />
        </Header>
        <MetricsBox weatherData={weatherData} unitSystem={unitSystem} />
        <UnitSwitch onClick={changeSystem} unitSystem={unitSystem} />
      </ContentBox> */}
    </div>
  );
};

export default App;
