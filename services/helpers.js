import {
  unixToLocalTime,
  kmToMiles,
  timeTo12HourFormat,
} from "./converters";

export const getWindSpeed = (unitSystem, windInKmh) =>
  unitSystem == "metric" ? windInKmh : kmToMiles(windInKmh);

export const getTime = (unitSystem, currentTime, timezoneSec) =>
  unitSystem == "metric"
    ? unixToLocalTime(currentTime, timezoneSec)
    : timeTo12HourFormat(unixToLocalTime(currentTime, timezoneSec));

export const getAMPM = (unitSystem, currentTime, timezoneSec) => {
  const hours = Number(unixToLocalTime(currentTime, timezoneSec).split(":")[0]);

  return hours >= 12
    ? "PM"
    : "AM"
};

export const getWeekDay = (unitSystem, date) => {
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
  return weekday[
    new Date(date).getUTCDay()
  ];
};
