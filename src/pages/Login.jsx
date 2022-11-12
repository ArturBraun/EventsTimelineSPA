import React, { useState, useEffect } from "react";
import Checkbox from "../components/Checkbox";
import GuestLayout from "../layouts/GuestLayout";
import InputError from "../components/InputError";
import InputLabel from "../components/InputLabel";
import PrimaryButton from "../components/PrimaryButton";
import TextInput from "../components/TextInput";
import { Link } from "react-router-dom";
import { resetElements } from "../utils/CommonFunctions";
import { loginUser } from "../data/LocalDataService";
import { useNavigate } from "react-router-dom";

export default function Login({ props }) {
  const formData = {
    email: "",
    password: "",
  };
  const [errors, setErrors] = useState(formData);
  const [data, setData] = useState(formData);
  const navigate = useNavigate();

  const onHandleChange = (event) => {
    setData((data) => ({
      ...data,
      [event.target.name]: event.target.value,
    }));
  };

  const submit = (e) => {
    e.preventDefault();
    setErrors(formData);

    const userId = loginUser(data.email, data.password, setErrors);
    if (userId) {
      navigate("/events");
    }
  };

  return (
    <GuestLayout>
      <form id="login-form" onSubmit={submit}>
        <div>
          <InputLabel forInput="email" value="Email" />

          <TextInput
            id="email"
            type="text"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            autoComplete="username"
            isFocused={true}
            handleChange={onHandleChange}
          />

          <InputError message={errors.email} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel forInput="password" value="Password" />

          <TextInput
            id="password"
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full"
            autoComplete="current-password"
            handleChange={onHandleChange}
          />

          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="flex items-center justify-end mt-4">
          <Link
            to="/register"
            className="underline text-sm text-gray-600 hover:text-gray-900"
          >
            Account is needed?
          </Link>

          <PrimaryButton className="ml-4">Log in</PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  );
}
