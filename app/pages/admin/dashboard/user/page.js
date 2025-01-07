"use client";
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import useUserHooks from "@/hooks/useUserHooks";
import { MoreHorizontal, Eye, Edit } from "lucide-react";

const User = () => {
  const { fetchUsers } = useUserHooks();
  const { user } = useSelector((state) => state.authSlice);
  const [openMenuId, setOpenMenuId] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchUsers();
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMenuClick = (userId) => {
    setOpenMenuId(openMenuId === userId ? null : userId);
  };

  const handleView = (userId) => {
    console.log("Viewing user:", userId);
    setOpenMenuId(null);
  };

  const handleEdit = (userId) => {
    console.log("Editing user:", userId);
    setOpenMenuId(null);
  };

  return (
    <div className="user-container relative overflow-visible z-50">
      <h1>User List</h1>
      <div className="table-container">
        <table className="responsive-table relative z-10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Verified</th>
              <th>Actions</th>
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
                  <td className="relative">
                    <button
                      onClick={() => handleMenuClick(userData.id)}
                      className="p-1 hover:bg-gray-100 rounded-full"
                    >
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                    {openMenuId === userData.id && (
                      <div
                        ref={dropdownRef}
                        className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                      >
                        <div className="py-1">
                          <button
                            onClick={() => handleView(userData.id)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View User
                          </button>
                          <button
                            onClick={() => handleEdit(userData.id)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit User
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-data">
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
