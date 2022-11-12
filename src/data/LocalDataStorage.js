import { toDateFromStr, getFormattedDate } from "../utils/CommonFunctions";

export function initSampleData(){
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

    localStorage.setItem("events", events);
    localStorage.setItem("types", types);
}

export function getTypes(){
    return JSON.parse(localStorage.getItem("types"));
}

function sortEvents(events){
    return events.sort(
        (event1, event2) => toDateFromStr(event2.end_date) - toDateFromStr(event1.end_date)
    );
}

export function getEvents(){
    const events = JSON.parse(localStorage.getItem("events"));
    const types = getTypes();

    const eventsWithType = events.map(event => {
        if(!isNaN(event.type_id && event.type_id >= 0)){
            event.type = types[event.type_id - 1];
        }
        return event;
    });

    return sortEvents(eventsWithType);
}





