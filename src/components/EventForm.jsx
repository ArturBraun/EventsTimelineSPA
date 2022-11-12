import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toDateFromStr, getFormattedDate } from "../utils/CommonFunctions";
import TypePicker from "./TypePicker";

export default function EventForm({
  event,
  setEditing,
  isFormForEdit = false,
}) {
  const [isEvent, setIsEvent] = useState(event.start_date ? false : true);
  const [selectedType, setSelectedType] = useState(
    event.type ? event.type : {}
  );

  const getProcessDefaultStartDate = () => {
    let date = new Date();
    if (event.end_date) {
      date = new Date(event.end_date);
    }
    date.setDate(date.getDate() - 1);
    return date;
  };

  const convertDatesBack = () => {
    if (!data.start_date) {
      data.start_date = getFormattedDate(getProcessDefaultStartDate());
    }
    data.start_date = toDateFromStr(data.start_date);
    data.end_date = toDateFromStr(data.end_date);
  };

  const eventData = {
    name: event.name ? event.name : "",
    short_description: event.short_description ? event.short_description : "",
    detailed_description: event.detailed_description
      ? event.detailed_description
      : "",
    start_date: event.start_date
      ? toDateFromStr(event.start_date)
      : getProcessDefaultStartDate(),
    end_date: event.end_date ? toDateFromStr(event.end_date) : new Date(),
  };
  const { data, setData } = useState(eventData);

  const submit = (e) => {
    if (data.start_date) {
      data.start_date = getFormattedDate(data.start_date);
    }
    data.end_date = getFormattedDate(data.end_date);

    if (isEvent) {
      delete data.start_date;
    }

    if (selectedType.id) {
      data.type_id = selectedType.id;
    }

    e.preventDefault();
    // if (isFormForEdit) {
    //   Inertia.put(`/events/${event.id}`, data, {
    //     onSuccess: () => setEditing(false),
    //     onError: () => convertDatesBack(),
    //   });
    // } else {
    //   Inertia.post("/events", data, {
    //     onSuccess: () => setEditing(false),
    //     onError: () => convertDatesBack(),
    //   });
    // }
    console.log(JSON.stringify(data));
  };

  return (
    <form onSubmit={submit}>
      <div className="shadow sm:overflow-hidden sm:rounded-md">
        <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-3 sm:col-span-2">
              <label
                htmlFor="type-radio-group"
                className="block text-sm font-medium text-gray-700"
              >
                Class
              </label>
              <ul
                id="type-radio-group"
                className="items-center w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      checked={isEvent}
                      onChange={(e) => setIsEvent(e.target.value)}
                      id="radio-type-event"
                      type="radio"
                      name="event-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor="radio-type-event"
                      className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Event
                    </label>
                  </div>
                </li>
                <li className="w-full dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      checked={!isEvent}
                      onChange={(e) => setIsEvent(!e.target.value)}
                      id="radio-type-process"
                      type="radio"
                      name="process-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor="radio-type-process"
                      className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Process
                    </label>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <label
                htmlFor="textarea-detailed-description"
                className="block text-sm font-medium text-gray-700"
              >
                Type
              </label>
              <div className="mt-1">
                <TypePicker
                  selectedType={selectedType}
                  setSelectedType={setSelectedType}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-4">
              <label
                htmlFor="input-name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                type="text"
                name="name"
                id="input-name"
                placeholder="Name..."
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="col-span-6">
              <label
                htmlFor="input-short-description"
                className="block text-sm font-medium text-gray-700"
              >
                Short description
              </label>
              <input
                value={data.short_description}
                onChange={(e) => setData("short_description", e.target.value)}
                type="text"
                name="short-description"
                id="input-short-description"
                placeholder="Very important thing..."
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            {!isEvent ? (
              <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                <label
                  htmlFor="datepicker-start-date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Start date
                </label>
                <DatePicker
                  id="datepicker-start-date"
                  className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm sm:text-sm"
                  selected={data.start_date}
                  onChange={(date) => setData("start_date", date)}
                  dateFormat="yyyy-MM-dd"
                />
              </div>
            ) : (
              <></>
            )}

            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <label
                htmlFor="datepicker-end-date"
                className="block text-sm font-medium text-gray-700"
              >
                {isEvent ? "Date" : "End date"}
              </label>
              <DatePicker
                id="datepicker-end-date"
                className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm sm:text-sm"
                selected={data.end_date}
                onChange={(date) => setData("end_date", date)}
                dateFormat="yyyy-MM-dd"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="textarea-detailed-description"
              className="block text-sm font-medium text-gray-700"
            >
              Detailed description
            </label>
            <div className="mt-1">
              <textarea
                value={data.detailed_description}
                onChange={(e) =>
                  setData("detailed_description", e.target.value)
                }
                id="textarea-detailed-description"
                name="detailed-description"
                rows="3"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Highly detailed description..."
              ></textarea>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <button
            type="submit"
            className="mr-2 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save
          </button>
          <button
            onClick={() => setEditing(false)}
            type="button"
            className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
