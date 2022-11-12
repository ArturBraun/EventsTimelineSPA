import { useEffect, useState } from "react";
import Event from "./Event";
import EventActions from "./EventActions";
import { getEvents } from "../data/LocalDataService";

export default function Timeline({ props, forEditing }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const eventsFormLocalStorage = getEvents();
    setEvents(eventsFormLocalStorage);
  }, []);

  return (
    <div className="container max-w-5xl px-4 py-12 mx-auto">
      <div className="grid gap-4 mx-4 sm:grid-cols-12">
        <div className="col-span-12 sm:col-span-3">
          <div className="w-24 h-2 bg-blue-300 rounded border-0 mt-10 my-5 dark:bg-blue-300" />
          <h3 className="text-3xl font-semibold">Timeline</h3>
          <span className="text-sm  tracking-wider text-gray-500">
            Events and processes
          </span>
        </div>
        <div className="relative col-span-12 px-4 space-y-6 sm:col-span-9">
          <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
            <ol className="relative border-l border-gray-200 dark:border-gray-700">
              <EventActions forEditing={forEditing} />
              {events.map((event) => (
                <Event key={event.id} event={event} forEditing={forEditing} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
