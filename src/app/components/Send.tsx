"use client";
import React from "react";
import Title from "./Title";
import Form from "./Form";

const Send = () => {
  return (
    <div
      style={{ height: "100vh" }}
      className="flex flex-col justify-center sm:px-6 lg:px-8"
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Title />
      </div>
      <div className=" sm:mx-auto sm:w-full sm:max-w-md">
        <Form />
      </div>
    </div>
  );
};

export default Send;
