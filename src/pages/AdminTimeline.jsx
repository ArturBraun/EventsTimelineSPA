import { useState, useEffect } from "react";
import AuthenticatedLayout from "../layouts/AuthenticatedLayout";
import Timeline from "../components/Timeline";
import { getLoggedInUser } from "../data/LocalDataService";
import { useNavigate, Navigate } from "react-router-dom";

export default function AdminTimeline() {
  const navigate = useNavigate();
  const authInitData = {
    user: {
      id: "",
      name: "",
      email: "",
    },
  };
  const [auth, setAuth] = useState(authInitData);

  useEffect(() => {
    const user = getLoggedInUser();
    if (!user) {
      navigate("/login");
    }
    setAuth({ user: user });
  }, []);

  return (
    <AuthenticatedLayout
      auth={auth}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Events Timeline
        </h2>
      }
    >
      <Timeline forEditing={true} />
    </AuthenticatedLayout>
  );
}
