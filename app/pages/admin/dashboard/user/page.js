"use client";
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import useUserHooks from "@/hooks/useUserHooks";
import { MoreHorizontal, Trash, Edit, Save } from "lucide-react";
import { Form } from "antd";
import DeleteConfirmationModal from "@/component/model/deleteConfirmModel";
import PageHeading from "@/component/core/PageHeading";
import AddFormModal from "@/component/model/addFormModal ";
import withAuth from "@/component/HOC/withAuth";


const User = () => {
  const {
    fetchUsers,
    showDeleteModal,
    handleDeleteConfirm,
    handleDeleteCancel,
    isModalVisible,
    editingUserId,
    editableData,
    handleEdit,
    showAddUserModal,
    handleAddUser,
    isAddUserModalVisible,
    setAddUserModalVisible,
    handleInputChange,
    handleSave,
  } = useUserHooks();
  const [form] = Form.useForm();
  const dropdownRef = useRef(null);
  
  const [openMenuId, setOpenMenuId] = useState(null);
  const { user } = useSelector((state) => state.authSlice);

  const userFormFields = [
    { label: "Name", name: "name", rules: [{ required: true }] },
    {
      label: "Email",
      name: "email",
      rules: [{ required: true }],
      type: "email",
    },
    {
      label: "Password",
      name: "password",
      rules: [{ required: true }],
      type: "password",
    },
    {
      label: "Role",
      name: "role",
      type: "select",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Attendee", value: "attendee" },
      ],
      rules: [{ required: true }],
    },
  ];


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

  return (
    <div className="user-container relative overflow-visible z-50">
      <PageHeading
        heading="Users"
        subHeading="Manage all users"
        // placeholder="Search by Organization Name"
        btns={[
          {
            label: "Add User",
            className: "",
            onClick: showAddUserModal,
          },
        ]}
      />
      <div className="table-responsive table-container mt-2">
        <table className="table table-bordered">
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
                  <td>
                    {editingUserId === userData.id ? (
                      <input
                        type="text"
                        value={editableData.name || ""}
                        onChange={(e) => handleInputChange(e, "name")}
                        className="border p-1"
                      />
                    ) : (
                      userData.name
                    )}
                  </td>
                  <td>
                    {editingUserId === userData.id ? (
                      <input
                        type="email"
                        value={editableData.email || ""}
                        onChange={(e) => handleInputChange(e, "email")}
                        className="border p-1"
                      />
                    ) : (
                      userData.email
                    )}
                  </td>
                  <td>
                    {editingUserId === userData.id ? (
                      <select
                        value={editableData.role}
                        onChange={(e) => handleInputChange(e, "role")}
                        className="border p-1"
                      >
                        <option value="admin">admin</option>
                        <option value="attendee">attendee</option>
                      </select>
                    ) : (
                      userData.role
                    )}
                  </td>
                  <td>
                    {editingUserId === userData.id ? (
                      <select
                        value={editableData.isVerified || false}
                        onChange={(e) => handleInputChange(e, "isVerified")}
                        className="border p-1"
                      >
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                      </select>
                    ) : userData.isVerified ? (
                      "Yes"
                    ) : (
                      "No"
                    )}
                  </td>
                  <td className="relative">
                    {editingUserId === userData.id ? (
                      <button
                        onClick={handleSave}
                        className="flex items-center px-2 py-1 text-sm text-green-600 hover:bg-gray-100"
                      >
                        <Save className="h-4 w-4 mr-1" /> Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleMenuClick(userData.id)}
                        className="p-1 hover:bg-gray-100 rounded-full"
                      >
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                    )}
                    {openMenuId === userData.id && !editingUserId && (
                      <div
                        ref={dropdownRef}
                        className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                        style={{
                          position: "absolute",
                          transform: "translateY(-100%)",
                          right: 0,
                          zIndex: 1050,
                        }}
                      >
                        <div className="py-1">
                          <button
                            onClick={() => showDeleteModal(userData.id)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                          >
                            <Trash className="h-4 w-4 mr-2" /> Delete User
                          </button>
                          <button
                            onClick={() => handleEdit(userData)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                          >
                            <Edit className="h-4 w-4 mr-2" /> Edit User
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
      <AddFormModal
        open={isAddUserModalVisible}
        onCancel={() => setAddUserModalVisible(false)}
        onFinish={handleAddUser}
        formFields={userFormFields}
        title="Add User"
        form={form}
      />

      <DeleteConfirmationModal
        open={isModalVisible}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
  );
};

export default withAuth(User);
