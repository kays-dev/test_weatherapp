import { fetchWeatherApi } from "openmeteo";

import city from "location.json";

export default async function handler(req, res) {
  //Paramètres pour la requête
  const req = {
    latitude: city.latitude,
    longitude: city.longitude,
    hourly: "precipitation_probability",
    current: ["temperature_2m", "apparent_temperature", "is_day", "cloud_cover", "wind_speed_10m", "wind_direction_10m"],
    timezone: "auto",
    forecast_days: 1,
  };

  //URL de l'API
  const url = "https://api.open-meteo.com/v1/forecast";

  //Réponse de l'API en format JSON
  const openMeteoRes = await fetchWeatherApi(url, req);

  //Données de temps et d'espace de la réponse
  const latitude = openMeteoRes.latitude; // latitude
  const longitude = openMeteoRes.longitude; // longitude
  const elevation = openMeteoRes.elevation; // altitude
  const timezone = openMeteoRes.timezone; // fuseau horaire (au format continent/capitale)
  const timezoneAbbreviation = openMeteoRes.timezoneAbbreviation; // fuseau horaire (au format GMT+..)

  //Données météo en temps réel
  const currentWeather = openMeteoRes.current();

  const time = new Date((Number(currentWeather.time()) + utcOffsetSeconds) * 1000); // heure (au format ISO8601)
  const temperature_2m = currentWeather.variables(0).value(); // température (en °C)
  const apparent_temperature = currentWeather.variables(1).value(); // température ressentie (en °C)
  const is_day = currentWeather.variables(2).value(); // booléen jour (si faux alors nuit)
  const cloud_cover = currentWeather.variables(3).value(); // pourcentage de nuages (fortement nuageux ou non, en %)
  const wind_speed_10m = currentWeather.variables(4).value(); // vittesse du vent (en km/h)
  const wind_direction_10m = currentWeather.variables(5).value(); // direction du vent (en °)

  //Données météo prévisionnelles, par heure
  const hourlyWeather = openMeteoRes.hourly();

  const hourlyTimes = hourlyWeather.time();

  const now = new Date();
  const nowCurrentTZ = new Date(
    now.toLocaleString("sv-SE", { timeZone: timezone })
  );
  nowCurrentTZ.setMinutes(0, 0, 0);

  const hourlyPrecipitations = hourlyWeather.variables(0).valuesArray();
  let precipitation_probability = null;

  for (let i = 0; i < hourlyTimes.length; i++) {
    const formattedHourlyTime = new Date(hourlyTimes[i]);
    formattedHourlyTime.setMinutes(0, 0, 0);

    if (formattedHourlyTime.getTime() === nowCurrentTZ.getTime()) {
      precipitation_probability = hourlyPrecipitations[i];
      break;
    }
  };

  // Données nécessaires
  const data = {
    cityLat: latitude,
    cityLon: longitude,
    cityEle: elevation,
    timezone,

    temperature: temperature_2m,
    apparentTemperature: apparent_temperature,
    isDay: is_day,
    cloudCover: cloud_cover,
    windSpeed: wind_speed_10m,
    windDirection: wind_direction_10m,

    precipitationProbability: precipitation_probability
  };

  res.status(200).json(data);
}
