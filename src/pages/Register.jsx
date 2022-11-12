import React, { useState, useEffect } from "react";
import GuestLayout from "../layouts/GuestLayout";
import InputError from "../components/InputError";
import InputLabel from "../components/InputLabel";
import PrimaryButton from "../components/PrimaryButton";
import TextInput from "../components/TextInput";
import { Link } from "react-router-dom";
import { resetElements } from "../utils/CommonFunctions";
import { registerUser } from "../data/LocalDataService";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const formData = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
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

    registerUser(
      data.name,
      data.email,
      data.password,
      data.password_confirmation,
      setErrors,
      navigate
    );
  };

  return (
    <GuestLayout>
      <form onSubmit={submit}>
        <div>
          <InputLabel forInput="name" value="Name" />

          <TextInput
            id="name"
            type="text"
            name="name"
            value={data.name}
            className="mt-1 block w-full"
            autoComplete="name"
            isFocused={true}
            handleChange={onHandleChange}
            required
          />

          <InputError message={errors.name} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel forInput="email" value="Email" />

          <TextInput
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            autoComplete="username"
            handleChange={onHandleChange}
            required
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
            autoComplete="new-password"
            handleChange={onHandleChange}
            required
          />

          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel
            forInput="password_confirmation"
            value="Confirm Password"
          />

          <TextInput
            id="password_confirmation"
            type="password"
            name="password_confirmation"
            value={data.password_confirmation}
            className="mt-1 block w-full"
            handleChange={onHandleChange}
            required
          />

          <InputError message={errors.password_confirmation} className="mt-2" />
        </div>

        <div className="flex items-center justify-end mt-4">
          <Link
            to="/login"
            className="underline text-sm text-gray-600 hover:text-gray-900"
          >
            Already registered?
          </Link>

          <PrimaryButton className="ml-4">Register</PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  );
}
