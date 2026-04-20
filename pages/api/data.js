import { fetchWeatherApi } from "openmeteo";

import city from "./location.json";

export default async function handler(req, res) {

  // Recherche des coordonnées de la ville choisie
  var name = city.name;
  var lat = 0;
  var long = 0;
  var country = "";
  var tz = "";

  const getCoordinates = async () => {
    const url = process.env.OPEN_METEO_GEOCODING;
    const params = {
      name: name,
      count: 1,
      language: "fr"
    };
    const query = `?name=${params.name}&count=${params.count}&language=${params.language}`;

    try {
      const response = await fetch(url + query);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
      };

      const json = await response.json();

      const cityData = json.results[0];

      name = cityData.name;
      lat = cityData.latitude;
      long = cityData.longitude;
      country = cityData.country_code;
      tz = cityData.timezone;

      return { name, lat, long, country, tz }
    } catch (error) {
      console.error("GEOCODING API ERROR:", error);
      return res.status(400).json({ error: "Ville introuvable", status: 400 })
    };
  };

  await getCoordinates();

  try {

    // Paramètres pour la requête
    const params = {
      latitude: lat,
      longitude: long,
      hourly: "precipitation_probability",
      current: ["temperature_2m", "apparent_temperature", "is_day", "cloud_cover", "wind_speed_10m", "wind_direction_10m"],
      timezone: tz,
      forecast_days: 1,
    };
    //

    // URL de l'API
    const url = process.env.OPEN_METEO_URL;
    //

    // Réponse de l'API en format JSON
    const weatherResponses = await fetchWeatherApi(url, params);
    const weatherData = weatherResponses[0];
    //

    // Données de temps et d'espace de la réponse
    const latitude = weatherData.latitude(); // latitude
    const longitude = weatherData.longitude(); // longitude
    const elevation = weatherData.elevation(); // altitude
    const timezone = weatherData.timezone(); // fuseau horaire (au format continent/capitale)
    const timezoneAbbreviation = weatherData.timezoneAbbreviation(); // fuseau horaire (au format GMT+..)
    const utcOffsetSeconds = weatherData.utcOffsetSeconds(); // fuseau horaire (au format GMT+..)
    //

    //Données météo en temps réel
    const currentWeather = weatherData.current();

    const time = new Date((Number(currentWeather.time()) + utcOffsetSeconds) * 1000); // heure (au format ISO8601)
    const temperature_2m = currentWeather.variables(0).value(); // température (en °C)
    const apparent_temperature = currentWeather.variables(1).value(); // température ressentie (en °C)
    const is_day = currentWeather.variables(2).value(); // booléen jour (si faux alors nuit)
    const cloud_cover = currentWeather.variables(3).value(); // pourcentage de nuages (fortement nuageux ou non, en %)
    const wind_speed_10m = currentWeather.variables(4).value(); // vittesse du vent (en km/h)
    const wind_direction_10m = currentWeather.variables(5).value(); // direction du vent (en °)
    //

    // Données météo prévisionnelles, par heure
    const hourlyWeather = weatherData.hourly();

    const hourlyTimes = Array.from(
      { length: (Number(hourlyWeather.timeEnd()) - Number(hourlyWeather.time())) / hourlyWeather.interval() },
      (_, i) => new Date((Number(hourlyWeather.time()) + i * hourlyWeather.interval() + utcOffsetSeconds) * 1000)
    );

    const now = Date.now();
    const nowCurrentTZ = new Date(now + utcOffsetSeconds * 1000);
    nowCurrentTZ.setUTCMinutes(0, 0, 0);

    const hourlyPrecipitations = hourlyWeather.variables(0).valuesArray();

    const index = hourlyTimes.findIndex(
      (t) => t.getTime() === nowCurrentTZ.getTime()
    );

    const precipitation_probability =
      hourlyPrecipitations[index] ?? null;
    //

    // Fin de la requête 
    const completed = new Date(now + utcOffsetSeconds * 1000);
    //

    // Données accessibles en front
    const data = {
      cityName: name,
      cityCountry: country,

      cityLat: latitude,
      cityLon: longitude,
      cityEle: elevation,
      timezone: timezone,
      timezoneOffset: utcOffsetSeconds,


      reqTime: completed,
      temperature: temperature_2m,
      feelsLike: apparent_temperature,
      isDay: is_day,
      clouds: cloud_cover,
      windSpeed: wind_speed_10m,
      windDirection: wind_direction_10m,

      precipitationProbability: precipitation_probability
    };
    //

    return res.status(200).json(data);
  } catch (error) {
    console.error("FORECAST API ERROR:", error);
    return res.status(500).json({ error: "Erreur serveur", status: 500 });
  }
}
