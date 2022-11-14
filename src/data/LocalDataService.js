import { toDateFromStr, getFormattedDate } from "../utils/CommonFunctions";
import bcrypt from "bcryptjs";
import emailValidator from "email-validator";

export function initSampleData() {
  localStorage.clear();

  const events = `[
    {
        "id": 1,
        "name": "Initial meeting",
        "short_description": "Initial project meeting",
        "detailed_description": "Initial meeting to gather project requirements, timelines and expectations",
        "start_date": null,
        "end_date": "2022-09-20",
        "type_id": null
    },
    {
        "id": 2,
        "name": "Development",
        "short_description": "Marketing feature development",
        "detailed_description": "Designing, developing and testing new feature",
        "start_date": "2022-10-02",
        "end_date": "2022-10-31",
        "type_id": 2
    },
    {
        "id": 3,
        "name": "Meeting",
        "short_description": "Meeting about new release",
        "detailed_description": "Meeting about strategy and new features connected with new release",
        "start_date": null,
        "end_date": "2022-11-01",
        "type_id": 1
    },
    {
        "id": 4,
        "name": "Prod deployment",
        "short_description": "Deployment of new service",
        "detailed_description": "Marketing service with many new features was deployed",
        "start_date": "2022-11-02",
        "end_date": "2022-11-04",
        "type_id": 2
    }
]`;
  const types = `[
    {
        "id": 1,
        "name": "marketing",
        "color": "#e8abc4"
    },
    {
        "id": 2,
        "name": "engineering",
        "color": "#9fc3fc"
    }
]`;
  const users = "[]";

  localStorage.setItem("events", events);
  localStorage.setItem("types", types);
  localStorage.setItem("users", users);

  if (localStorage.getItem("loggedInUser")) {
    localStorage.removeItem("loggedInUser");
  }
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
  return events.sort((event1, event2) => {
    if (event2.end_date !== event1.end_date) {
      return toDateFromStr(event2.end_date) - toDateFromStr(event1.end_date);
    }
    return event2.id - event1.id;
  });
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

export function changeUserPassword(password, passwordConfirmation, setErrors) {
  const loggedInUser = getLoggedInUser();

  if (!loggedInUser) {
    setErrors((errors) => ({
      ...errors,
      password: "User is not signed in. Please sign in to change password.",
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

  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(password, salt);

  const users = JSON.parse(localStorage.getItem("users"));
  const userToEditIdx = users.findIndex((user) => user.id === loggedInUser.id);
  users[userToEditIdx].password = passwordHash;
  localStorage.setItem("users", JSON.stringify(users));

  return loggedInUser.id;
}

export function logoutUser() {
  localStorage.removeItem("loggedInUser");
}

function isValidEvent(event, setError) {
  if (!event) return false;

  if (!event.name) {
    setError("Name cannot be empty.");
    return false;
  }

  if (!event.short_description) {
    setError("Short description cannot be empty.");
    return false;
  }

  //ensures that start date is smaller than end date
  if (
    event.start_date &&
    toDateFromStr(event.end_date) - toDateFromStr(event.start_date) <= 0
  ) {
    setError("End date needs to be greater than start date.");
    return false;
  }

  if (!event.detailed_description) {
    setError("Datailed description cannot be empty.");
    return false;
  }

  return true;
}

export function addEvent(
  name,
  short_description,
  start_date,
  end_date,
  detailed_description,
  type_id,
  setEvents,
  setEditing,
  setError
) {
  const events = JSON.parse(localStorage.getItem("events"));
  const eventId = getLastIndex(events) + 1;

  const newEvent = {
    id: eventId,
    name: name,
    short_description: short_description,
    start_date: start_date,
    end_date: end_date,
    detailed_description: detailed_description,
    type_id: type_id,
  };

  if (!isValidEvent(newEvent, setError)) {
    return false;
  }

  events.push(newEvent);
  localStorage.setItem("events", JSON.stringify(events));

  setEditing(false);
  setEvents(getEvents());
  return true;
}

export function editEvent(
  event_id,
  name,
  short_description,
  start_date,
  end_date,
  detailed_description,
  type_id,
  setEvents,
  setEditing,
  setError
) {
  const events = JSON.parse(localStorage.getItem("events"));
  const eventToEditIndex = events.findIndex((event) => event.id === event_id);

  const editedEvent = {
    id: event_id,
    name: name,
    short_description: short_description,
    start_date: start_date,
    end_date: end_date,
    detailed_description: detailed_description,
    type_id: type_id,
  };

  if (!isValidEvent(editedEvent, setError)) {
    return false;
  }

  events[eventToEditIndex] = editedEvent;
  localStorage.setItem("events", JSON.stringify(events));

  setEditing(false);
  setEvents(getEvents());
  return true;
}

export function removeEvent(event_id, setEvents) {
  const events = JSON.parse(localStorage.getItem("events"));
  const eventsAfterDeletion = events.filter((event) => event.id !== event_id);

  localStorage.setItem("events", JSON.stringify(eventsAfterDeletion));
  setEvents(getEvents());
  return event_id;
}

function isValidType(type) {
  if (!type) return false;

  if (!type.name) {
    alert("Type name cannot be empty.");
    return false;
  }

  return true;
}

export function addType(name, color, setTypes) {
  const types = JSON.parse(localStorage.getItem("types"));
  const typeId = getLastIndex(types) + 1;
  const newType = {
    id: typeId,
    name: name,
    color: color,
  };

  if (!isValidType(newType)) {
    return false;
  }

  types.push(newType);
  localStorage.setItem("types", JSON.stringify(types));
  setTypes(types);
  return true;
}

export function removeType(type_id, setTypes) {
  const types = JSON.parse(localStorage.getItem("types"));
  const events = JSON.parse(localStorage.getItem("events"));

  //check if there are no events with this type
  const existingEvent = events.find((event) => event.type_id === type_id);
  if (existingEvent) {
    return;
  }

  const typesAfterDeletion = types.filter((type) => type.id !== type_id);
  localStorage.setItem("types", JSON.stringify(typesAfterDeletion));
  setTypes(typesAfterDeletion);
  return type_id;
}
