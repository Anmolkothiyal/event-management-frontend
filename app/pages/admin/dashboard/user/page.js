"use client";
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import useUserHooks from "@/hooks/useUserHooks";
import { MoreHorizontal, Trash, Edit, Save } from "lucide-react";
import { Modal, Input, Select, Button, Form, message } from "antd";
import DeleteConfirmationModal from "@/component/model/deleteConfirmModel";
import PageHeading from "@/component/core/PageHeading";

const { Option } = Select;

const User = () => {
  const { fetchUsers, showDeleteModal, handleDeleteConfirm, handleDeleteCancel, isModalVisible, editingUserId, editableData, handleEdit, handleInputChange, handleSave } = useUserHooks();
  const { user } = useSelector((state) => state.authSlice);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [isAddUserModalVisible, setAddUserModalVisible] = useState(false);
  const [form] = Form.useForm();
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

  const showAddUserModal = () => {
    setAddUserModalVisible(true);
    form.resetFields(); 
  };

  const handleAddUser = async (values) => {
    try {
      const response = await fetch("https://event-mangement-backend-sj7x.onrender.com/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success("User added successfully!");
        setAddUserModalVisible(false);
        fetchUsers();
      } else {
        const error = await response.json();
        message.error(error.message || "Failed to add user");
      }
    } catch (error) {
      message.error("An error occurred while adding the user");
    }
  };

  return (
    <div className="user-container relative overflow-visible z-50">
      <PageHeading
        heading="Users"
        subHeading="Manage all users"
        placeholder="Search by Organization Name"
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
                  <td>{editingUserId === userData.id ? (
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
                  <td>{userData.email}</td>
                  <td>{userData.role}</td>
                  <td>{userData.isVerified ? "Yes" : "No"}</td>
                  <td className="relative">
                    {editingUserId === userData.id ? (
                      <button onClick={handleSave} className="flex items-center px-2 py-1 text-sm text-green-600 hover:bg-gray-100">
                        <Save className="h-4 w-4 mr-1" /> Save
                      </button>
                    ) : (
                      <button onClick={() => handleMenuClick(userData.id)} className="p-1 hover:bg-gray-100 rounded-full">
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

      <Modal
        title="Add User"
        open={isAddUserModalVisible}
        onCancel={() => setAddUserModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddUser}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter the name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter the email" }]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter the password" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Please select the role" }]}
          >
            <Select>
              <Option value="admin">Admin</Option>
              <Option value="attendee">User</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Add User
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <DeleteConfirmationModal open={isModalVisible} onConfirm={handleDeleteConfirm} onCancel={handleDeleteCancel} />
    </div>
  );
};

export default User;
