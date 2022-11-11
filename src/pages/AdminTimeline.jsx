import React, { useState } from "react";
import AuthenticatedLayout from "../layouts/AuthenticatedLayout";
import Timeline from "../components/Timeline";

export default function AdminTimeline({ auth, events }) {
  return (
    <AuthenticatedLayout
      auth={auth}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Events Timeline
        </h2>
      }
    >
      <Timeline events={events} forEditing={true} />
    </AuthenticatedLayout>
  );
}
