import { useState, useEffect } from "react";
import AuthenticatedLayout from "../layouts/AuthenticatedLayout";
import { getLoggedInUser } from "../data/LocalDataService";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
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
          Dashboard
        </h2>
      }
    >
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              You're logged in!
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
