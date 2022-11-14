import React, { useState, useEffect } from "react";
import GuestLayout from "../layouts/GuestLayout";
import InputError from "../components/InputError";
import InputLabel from "../components/InputLabel";
import PrimaryButton from "../components/PrimaryButton";
import TextInput from "../components/TextInput";
import { getLoggedInUser, changeUserPassword } from "../data/LocalDataService";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();
  const passwordResetForm = {
    password: "",
    password_confirmation: "",
  };
  const [errors, setErrors] = useState(passwordResetForm);
  const [data, setData] = useState(passwordResetForm);

  useEffect(() => {
    const user = getLoggedInUser();
    if (!user) {
      navigate("/login");
    }
  }, []);

  const onHandleChange = (event) => {
    setData((data) => ({
      ...data,
      [event.target.name]: event.target.value,
    }));
  };

  const submit = (e) => {
    e.preventDefault();

    const userId = changeUserPassword(
      data.password,
      data.password_confirmation,
      setErrors
    );
    if (userId) {
      navigate("/timeline-view");
    }
  };

  return (
    <GuestLayout>
      <form onSubmit={submit}>
        <div className="mt-4">
          <InputLabel forInput="password" value="Password" />

          <TextInput
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full"
            autoComplete="new-password"
            isFocused={true}
            handleChange={onHandleChange}
          />

          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel
            forInput="password_confirmation"
            value="Confirm Password"
          />

          <TextInput
            type="password"
            name="password_confirmation"
            value={data.password_confirmation}
            className="mt-1 block w-full"
            autoComplete="new-password"
            handleChange={onHandleChange}
          />

          <InputError message={errors.password_confirmation} className="mt-2" />
        </div>

        <div className="flex items-center justify-end mt-4">
          <PrimaryButton className="ml-4">Change password</PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  );
}
