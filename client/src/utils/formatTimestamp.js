import date from "date-and-time";

export default function formatTimestamp(timestamp) {
  let formatedDate = new Date(timestamp);
  let now = new Date().getTime();

  if (now - formatedDate.getTime() < 86400000) {
    formatedDate = date.format(formatedDate, "hh:mm");
  } else if (now - formatedDate.getTime() < 31557600000) {
    formatedDate = date.format(formatedDate, "DD/MM");
  } else {
    formatedDate = date.format(formatedDate, "DD/MM/YYYY");
  }

  return formatedDate;
}
