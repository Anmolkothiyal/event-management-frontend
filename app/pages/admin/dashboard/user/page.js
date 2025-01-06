"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useUserHooks from "@/hooks/useUserHooks";

const User = () => {
  const { fetchUsers } = useUserHooks();
  const { user } = useSelector((state) => state.authSlice);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="user-container">
      <h1>User List</h1>
      <div className="table-container">
        <table className="responsive-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Verified</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(user) && user.length > 0 ? (
              user.map((userData) => (
                <tr key={userData.id}>
                  <td>{userData.id}</td>
                  <td>{userData.name}</td>
                  <td>{userData.email}</td>
                  <td>{userData.role}</td>
                  <td>{userData.isVerified ? "Yes" : "No"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-data">
                  User not found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
