import moment from "moment/moment";

export const getDMYFromDate = (date = "2023-05-11T07:59:13.000000Z") => {
  const dateTime = date;

  const currentDate = moment();
  const creationDate = moment(dateTime);

  const duration = moment.duration(currentDate.diff(creationDate));

  const years = duration.years();
  const months = duration.months();
  const days = duration.days();

  let relativeTime = "";
  if (years > 0) {
    relativeTime = `Last ${years} year${years > 1 ? "s" : ""} ago`;
  } else if (months > 0) {
    relativeTime = `Last ${months} month${months > 1 ? "s" : ""} ago`;
  } else if (days > 0) {
    relativeTime = `Last ${days} day${days > 1 ? "s" : ""} ago`;
  } else {
    relativeTime = "Just Today";
  }

  return relativeTime;
};
