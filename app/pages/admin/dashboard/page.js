"use client";
import React from "react";
import withAuth from "@/component/HOC/withAuth";

const AdminDashboard = () => {

  return (
    <>
      <h1 className="text-center">Welcome to admin AdminDashboard</h1>
    </>
  );
};
export default withAuth(AdminDashboard);

