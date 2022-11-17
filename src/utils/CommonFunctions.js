export function toDateFromStr(strDate) {
  const [year, month, day] = strDate.split("-");
  return new Date(+year, month - 1, +day);
}

export function getFormattedDate(date) {
  return date.toLocaleDateString("sv");
}

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function resetElements(...elementIds) {
  elementIds.forEach((elementId) => document.getElementById(elementId).reset());
}

function sortEventsByDateProperty(events, propertyName, sortDirection) {
  return events.sort((event1, event2) => {
    if (event2[propertyName] !== event1[propertyName]) {
      // validation check as start_date can be null
      if (!event1[propertyName]) {
        return sortDirection;
      }
      if (!event2[propertyName]) {
        return -1 * sortDirection;
      }
      return (
        sortDirection *
        (toDateFromStr(event1[propertyName]) -
          toDateFromStr(event2[propertyName]))
      );
    }
    return sortDirection * (event1.id - event2.id);
  });
}

function sortEventsByStrProperty(events, propertyName, sortDirection) {
  return events.sort((event1, event2) => {
    if (event1[propertyName] < event2[propertyName]) {
      return -1 * sortDirection;
    } else if (event1[propertyName] > event2[propertyName]) {
      return 1 * sortDirection;
    }
    return sortDirection * (event1.id - event2.id);
  });
}

function sortEventsByTypeName(events, sortDirection) {
  return events.sort((event1, event2) => {
    if (!event1.type_id) {
      return sortDirection;
    }
    if (!event2.type_id) {
      return -1 * sortDirection;
    }
    if (event1.type.name < event2.type.name) {
      return -1 * sortDirection;
    }
    if (event1.type.name > event2.type.name) {
      return 1 * sortDirection;
    }
    return sortDirection * (event1.type.id - event2.type.id);
  });
}

export function sortEventsByProperty(events, propertyName, sortDirection) {
  if (["start_date", "end_date"].includes(propertyName)) {
    return sortEventsByDateProperty(events, propertyName, sortDirection);
  } else if ("type_name" === propertyName) {
    return sortEventsByTypeName(events, sortDirection);
  }
  return sortEventsByStrProperty(events, propertyName, sortDirection);
}
