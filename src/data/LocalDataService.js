import { toDateFromStr, getFormattedDate } from "../utils/CommonFunctions";
import bcrypt from "bcryptjs";
import emailValidator from "email-validator";

export function initSampleData() {
  localStorage.clear();

  const events = `[
        {
            "id": 1,
            "name": "w",
            "short_description": "www",
            "detailed_description": "wwwwwwwwww",
            "start_date": null,
            "end_date": "2022-11-04",
            "type_id": null
        },
        {
            "id": 2,
            "name": "c",
            "short_description": "ccccc",
            "detailed_description": "ccccccccccc",
            "start_date": null,
            "end_date": "2022-11-03",
            "type_id": 1
        }
    ]`;
  const types = `[
        {
            "id": 1,
            "name": "marketing",
            "color": "#e8abc4"
        }
    ]`;
  const users = "[]";

  localStorage.setItem("events", events);
  localStorage.setItem("types", types);
  localStorage.setItem("users", users);
}

export function getTypes() {
  const typesStr = localStorage.getItem("types");
  if (!typesStr) return [];

  return JSON.parse(typesStr);
}

function getLastIndex(items) {
  return Math.max(...items.map((item) => item.id), 0);
}

function sortEvents(events) {
  return events.sort(
    (event1, event2) =>
      toDateFromStr(event2.end_date) - toDateFromStr(event1.end_date)
  );
}

export function getEvents() {
  const eventsStr = localStorage.getItem("events");
  if (!eventsStr) return [];

  const events = JSON.parse(eventsStr);
  const types = getTypes();

  const eventsWithType = events.map((event) => {
    if (!isNaN(event.type_id && event.type_id >= 0)) {
      event.type = types[event.type_id - 1];
    }
    return event;
  });

  return sortEvents(eventsWithType);
}

export function registerUser(
  name,
  email,
  password,
  passwordConfirmation,
  setErrors
) {
  if (!name) {
    setErrors((errors) => ({
      ...errors,
      name: "Name cannot be empty.",
    }));
    return;
  }

  if (!emailValidator.validate(email)) {
    setErrors((errors) => ({
      ...errors,
      email: "Provided email address is not valid.",
    }));
    return;
  }

  if (password !== passwordConfirmation) {
    setErrors((errors) => ({
      ...errors,
      password: "The password confirmation does not match.",
    }));
    return;
  }

  const users = JSON.parse(localStorage.getItem("users"));

  // check if user exists with same email
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    setErrors("email", "There is registered account with this email.");
    return;
  }

  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(password, salt);

  const id = getLastIndex(users) + 1;
  const newUser = {
    id: id,
    name: name,
    email: email,
    password: passwordHash,
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  return newUser.id;
}

export function loginUser(email, password, setErrors) {
  const users = JSON.parse(localStorage.getItem("users"));
  const user = users.find(
    (user) =>
      user.email === email && bcrypt.compareSync(password, user.password)
  );

  if (!user) {
    setErrors((errors) => ({
      ...errors,
      email: "These credentials do not match our records.",
    }));
    return;
  }

  localStorage.setItem(
    "loggedInUser",
    JSON.stringify({
      id: user.id,
      name: user.name,
      email: user.email,
    })
  );
  return user.id;
}

export function getLoggedInUser() {
  const loggedInUser = localStorage.getItem("loggedInUser");
  return loggedInUser ? JSON.parse(loggedInUser) : undefined;
}

export function logoutUser() {
  localStorage.removeItem("loggedInUser");
}
