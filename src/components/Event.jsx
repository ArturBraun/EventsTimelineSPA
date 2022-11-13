import React, { useState } from "react";
import Dropdown from "./Dropdown";
import EventForm from "./EventForm";
import { removeEvent } from "../data/LocalDataService";

export default function Event({ event, forEditing, setEvents }) {
  const [editing, setEditing] = useState(false);
  const [detailed, setDetailed] = useState(false);

  return (
    <li className="mb-10 ml-6">
      <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
        <svg
          aria-hidden="true"
          className="w-3 h-3 text-blue-600 dark:text-blue-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
            clipRule="evenodd"
          ></path>
        </svg>
      </span>
      {editing ? (
        <EventForm
          event={event}
          setEditing={setEditing}
          isFormForEdit={true}
          setEvents={setEvents}
        />
      ) : (
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
          <div className="pt-6 pl-6 pr-6 flex space-x-2">
            <h3
              onClick={() => setDetailed(!detailed)}
              className="cursor-pointer text-lg font-medium leading-6 text-gray-900"
            >
              {event.name}
            </h3>
            {forEditing ? (
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <div></div>
                  <Dropdown>
                    <Dropdown.Trigger>
                      <button>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gray-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                      </button>
                    </Dropdown.Trigger>
                    <Dropdown.Content>
                      <button
                        className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 transition duration-150 ease-in-out"
                        onClick={() => setEditing(true)}
                      >
                        Edit
                      </button>
                      <button
                        className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 transition duration-150 ease-in-out"
                        onClick={() => removeEvent(event.id, setEvents)}
                      >
                        Delete
                      </button>
                    </Dropdown.Content>
                  </Dropdown>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>

          <div
            onClick={() => setDetailed(!detailed)}
            className="cursor-pointer px-4 pb-5 sm:px-6"
          >
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {" "}
              {event.start_date ? `${event.start_date} - ` : ""}{" "}
              {event.end_date}{" "}
            </p>
          </div>
          <div
            onClick={() => setDetailed(!detailed)}
            className="cursor-pointer border-t border-gray-200"
          >
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Short description
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {event.short_description}
                </dd>
              </div>
              {event.type_id ? (
                <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt
                    onClick={() => setDetailed(!detailed)}
                    className="cursor-pointer text-sm font-medium text-gray-500"
                  >
                    Type
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill={event.type.color}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 6h.008v.008H6V6z"
                      />
                    </svg>

                    <div className="pl-2">{event.type.name}</div>
                  </dd>
                </div>
              ) : (
                <></>
              )}
              {detailed ? (
                <div
                  className={`${
                    event.type_id ? "bg-gray-50" : "bg-white"
                  } px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
                >
                  <dt className="text-sm font-medium text-gray-500">
                    Detailed description
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {event.detailed_description}
                  </dd>
                </div>
              ) : (
                <></>
              )}
            </dl>
          </div>
        </div>
      )}
    </li>
  );
}
