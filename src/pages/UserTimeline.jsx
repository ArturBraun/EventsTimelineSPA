import React, { useState } from "react";
import Timeline from "../components/Timeline";
import { Link } from "react-router-dom";

export default function UserTimeline({ props, events }) {
  return (
    <div className=" items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
      <div className="text-right top-0 right-0 px-6 py-4 sm:block">
        {props && props.auth.user ? (
          <Link
            to="/"
            className="text-sm text-gray-700 dark:text-gray-500 underline"
          >
            Dashboard
          </Link>
        ) : (
          <>
            <Link
              to="/login"
              className="text-sm text-gray-700 dark:text-gray-500 underline"
            >
              Log in
            </Link>

            <Link
              to="/register"
              className="ml-4 text-sm text-gray-700 dark:text-gray-500 underline"
            >
              Register
            </Link>
          </>
        )}
      </div>
      <Timeline events={events} forEditing={false} />
    </div>
  );
}
