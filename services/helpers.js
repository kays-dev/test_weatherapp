import {
  unixToLocalTime,
  kmToMiles,
  timeTo12HourFormat,
} from "./converters";

export const getWindSpeed = (unitSystem, windInKmh) =>
  unitSystem == "metric" ? windInKmh : kmToMiles(windInKmh);

export const getFormattedTime = (unitSystem, currentTime, timezoneSec) =>
  unitSystem == "metric"
    ? unixToLocalTime(currentTime, timezoneSec)
    : timeTo12HourFormat(unixToLocalTime(currentTime, timezoneSec));

export const getNextRefresh = (lastRequestTime, timezoneSec) => {
  const now = new Date(Date.now() + timezoneSec * 1000);

  const reqTime = new Date(lastRequestTime);

  const diff = new Date(reqTime.getTime() - now.getTime());

  return diff.getMinutes();
};

export const getAMPM = (unitSystem, currentTime, timezoneSec) => {
  const hours = Number(unixToLocalTime(currentTime, timezoneSec).split(":")[0]);

  return hours >= 12
    ? "PM"
    : "AM"
};

export const getFullDate = (unitSystem, date) => {
  const today = new Date(date);

  const weekday = unitSystem === "imperial" ? [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ] : [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];

  const day = `${weekday[
    today.getUTCDay()
  ]} ${today.getDate()}`;

  return day;
};

export const weatherToIcon = (unitSystem, clouds, precipitation) => {
  var icon = "";
  var description = "";

  if (precipitation > 50) {
    icon = "/weather_icons/rainy.svg";
    description = unitSystem === "metric" ? "Pluvieux" : "Rainy";

  } else if (precipitation > 20) {
    icon = "/weather_icons/showers.svg";
    description = unitSystem === "metric" ? "Averses avec éclaircies" : "Showers";

  } else {
    if (clouds <= 20) {
      icon = "/weather_icons/sunny.svg";
      description = unitSystem === "metric" ? "Ensoleillé" : "Sunny";

    } else if (clouds <= 40) {
      icon = "/weather_icons/mostly_sunny.svg";
      description = unitSystem === "metric" ? "Voilé" : "Mostly sunny";

    } else if (clouds <= 60) {
      icon = "/weather_icons/partly_cloudy.svg";
      description = unitSystem === "metric" ? "Partiellement nuageux" : "Partly cloudy";

    } else if (clouds <= 80) {
      icon = "/weather_icons/overcast.svg";
      description = unitSystem === "metric" ? "Très nuageux" : "Overcast";

    } else if (clouds > 80) {
      icon = "/weather_icons/cloudy.svg";
      description = unitSystem === "metric" ? "Nuageux" : "Cloudy";

    };
  };

  return { icon, description };
};