function formatTimestampToTime(timestamp: number): string {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const amOrPm = hours >= 12 ? "pm" : "am";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes.toString();

  return `${formattedHours}.${formattedMinutes}${amOrPm}`;
}

function formatTimestampToDateTime(timestamp: number): string {
  const options: Intl.DateTimeFormatOptions = {
    month: "short", // Abbreviated month name
    day: "numeric", // Day of the month
    hour: "numeric", // Hour (12-hour clock)
    minute: "numeric", // Minutes
    hour12: true, // Use 12-hour clock
  };

  const date = new Date(timestamp);
  const formattedDate = date.toLocaleDateString("en-US", options);

  return formattedDate;
}

export { formatTimestampToTime, formatTimestampToDateTime };
