import React from "react";
import LoginPage from "../components/forms/LoginForm";
import connect from "../utils/clientPromise";

const page = async () => {
  await connect();
  return (
    <div>
      <LoginPage />
    </div>
  );
};

export default page;
