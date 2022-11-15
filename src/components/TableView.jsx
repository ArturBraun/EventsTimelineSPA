import { useState, useEffect } from "react";
import AuthenticatedLayout from "../layouts/AuthenticatedLayout";
import { getLoggedInUser, getEvents } from "../data/LocalDataService";
import { useNavigate } from "react-router-dom";
import ArrowSortAsc from "../icons/arrow-sort-asc.svg";
import { ReactComponent as ArrowSortDesc } from "../icons/arrow-sort-desc.svg";
import { sortEventsByProperty } from "../utils/CommonFunctions";

export default function TableView() {
  const navigate = useNavigate();
  const authInitData = {
    user: {
      id: "",
      name: "",
      email: "",
    },
  };
  const [auth, setAuth] = useState(authInitData);
  const [events, setEvents] = useState([]);

  // Custom object to store sorting preferences
  // 0    -> no sort
  // -1   -> desc sort
  // 1    -> asc sort
  const sortPreferences = {
    name: 0,
    short_description: 0,
    start_date: 0,
    end_date: -1,
    detailed_description: 0,
    type_name: 0,
  };

  const currSortColumn = {
    columnName: "end_date",
    sortOrder: -1,
  };

  const renderSortArrow = (columnName) => {
    if (sortPreferences[columnName] === 1) {
      return <ArrowSortAsc />;
    } else if (sortPreferences[columnName] === -1) {
      return <ArrowSortDesc />;
    } else return <></>;
  };

  const sortByColumn = (columnName) => {
    Object.keys(sortPreferences).forEach((key) => {
      sortPreferences[key] = 0;
    });

    if (columnName === currSortColumn.columnName) {
      currSortColumn.sortOrder = -1 * currSortColumn.sortOrder;
      const eventsSortedByColumn = sortEventsByProperty(
        events,
        columnName,
        currSortColumn.sortOrder
      );
      sortPreferences[columnName] = currSortColumn.sortOrder;
      setEvents(eventsSortedByColumn);
      return;
    }

    currSortColumn.sortOrder = 1;
    currSortColumn.columnName = columnName;
    const eventsSortedByColumn = sortEventsByProperty(
      events,
      columnName,
      currSortColumn.sortOrder
    );
    sortPreferences[columnName] = currSortColumn.sortOrder;
    setEvents(eventsSortedByColumn);
  };

  useEffect(() => {
    const user = getLoggedInUser();
    if (!user) {
      navigate("/login");
    }
    setAuth({ user: user });
    setEvents(getEvents());
  }, []);

  return (
    <AuthenticatedLayout
      auth={auth}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Events Table View
        </h2>
      }
    >
      <div className="mt-4 relative col-span-12 px-4 space-y-6 sm:col-span-9">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-s text-gray-700 bg-gray-200 dark:bg-gray-900 dark:text-gray-400">
                <tr>
                  <th
                    scope="col"
                    className="py-3 px-6 cursor-pointer"
                    onClick={() => sortByColumn("name")}
                  >
                    Name
                    {renderSortArrow("name")}
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-6 cursor-pointer"
                    onClick={() => sortByColumn("short_description")}
                  >
                    Short description
                    {renderSortArrow("short_description")}
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-6 cursor-pointer"
                    onClick={() => sortByColumn("start_date")}
                  >
                    Start date
                    {renderSortArrow("start_date")}
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-6 cursor-pointer"
                    onClick={() => sortByColumn("end_date")}
                  >
                    End date
                    {renderSortArrow("end_date")}
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-6 cursor-pointer"
                    onClick={() => sortByColumn("detailed_description")}
                  >
                    Detailed description
                    {renderSortArrow("detailed_description")}
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-6 cursor-pointer"
                    onClick={() => sortByColumn("type_name")}
                  >
                    Type
                    {renderSortArrow("type_name")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr
                    key={event.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {event.name}
                    </th>
                    <td className="py-4 px-6">{event.short_description}</td>
                    <td className="py-4 px-6">{event.start_date}</td>
                    <td className="py-4 px-6">{event.end_date}</td>
                    <td className="py-4 px-6">{event.detailed_description}</td>
                    <td className="py-4 px-6">
                      {event.type_id ? (
                        <div className="flex">
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
                        </div>
                      ) : (
                        <></>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
