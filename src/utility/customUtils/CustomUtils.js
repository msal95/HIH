import moment from "moment/moment";
import { Clock, Rss } from "react-feather";

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

export const triggerData = [
  {
    id: 1,
    icon: <Rss size={16} className="me-1" />,
    title: "On App Event",
    description: "Run the flows every day, hour, or custom interval",
    // arrowIcon:
  },
  {
    id: 2,
    icon: <Clock size={16} className="me-1" />,
    title: "On a schedule",
    description: "Run the flows every day, hour, or custom interval",
    // arrowIcon:
  },
  {
    id: 3,
    icon: <Clock size={16} className="me-1" />,
    title: "On Webhook Call",
    description: "Run the flows every day, hour, or custom interval",
    // arrowIcon:
  },
  {
    id: 4,
    icon: <Clock size={16} className="me-1" />,
    title: "Manually",
    description: "Run the flows every day, hour, or custom interval",
    // arrowIcon:
  },
  {
    id: 5,
    icon: <Clock size={16} className="me-1" />,
    title: "When call by another workflow",
    description: "Run the flows every day, hour, or custom interval",
    // arrowIcon:
  },
  {
    id: 6,
    icon: <Clock size={16} className="me-1" />,
    title: "Other ways",
    description: "Run the flows every day, hour, or custom interval",
    // arrowIcon:
  },
];

const UserData = {
  saveItem(key, value) {
    try {
      const jsonValue = JSON.stringify(value);
      localStorage.setItem(key, jsonValue);
    } catch (error) {
      console.log(`localStorage Error: ${error.message}`);
    }
  },
  getItem(key) {
    try {
      const jsonValue = localStorage.getItem(key);
      return jsonValue !== null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.log(`localStorage Error: ${error.message}`);
    }
  },
};

export default UserData;

export const greetingMessage = () => {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  let greetingMessage;

  if (currentHour < 12) {
    greetingMessage = "Good morning";
  } else if (currentHour < 18) {
    greetingMessage = "Good afternoon";
  } else {
    greetingMessage = "Good evening";
  }

  return greetingMessage;
};
