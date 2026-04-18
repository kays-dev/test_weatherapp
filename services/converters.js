export const ctoF = (c) => (c * 9) / 5 + 32;

export const kmToMiles = (km) => (km / 1.609);

export const timeTo12HourFormat = (time) => {
  let [hours, minutes] = time.split(":");
  return `${(hours %= 12) ? hours : 12}:${minutes}`;
};

export const degToCompass = (num) => {
  var val = Math.round(num / 22.5);
  var arr = [
    "/direction_icons/north.svg",
    "/direction_icons/northeast.svg",
    "/direction_icons/east.svg",
    "/direction_icons/southeast.svg",
    "/direction_icons/south.svg",
    "/direction_icons/southwest.svg",
    "/direction_icons/west.svg",
    "/direction_icons/northwest.svg"
  ];

  return arr[val % 8];
};

export const unixToLocalTime = (unixMs, timezoneSec) => {
  let time = new Date(unixMs + timezoneSec * 1000)
    .toISOString()
    .match(/(\d{2}:\d{2})/)[0];

  return time.startsWith("0") ? time.substring(1) : time;
};
