import { useState } from "react";
import useActionDispatch from "@/hooks/useActionDispatch";
import axios from "@/services/axios";
import Api from "@/services/EndPoint";
import toast from "react-hot-toast";
import {Form } from "antd";

const useUserHooks = () => {
  const { setUser } = useActionDispatch();
  const [form] = Form.useForm();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editableData, setEditableData] = useState({});
  const [isAddUserModalVisible, setAddUserModalVisible] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(Api.USER());
      const data = Array.isArray(response.data) ? response.data : response.data.users || [];
      setUser(data);
    } catch (error) {
      toast.error(error);
    }
  };

  const showDeleteModal = (userId) => {
    setUserToDelete(userId);
    setIsModalVisible(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete(`${Api.USER()}/${userToDelete}`);
      if (response.status === 200) {
        toast.success("User deleted successfully.");
        fetchUsers();
      } else {
        toast.error("Failed to delete user.");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the user.");
    }
    setIsModalVisible(false);
    setUserToDelete(null);
  };

  const handleDeleteCancel = () => {
    setIsModalVisible(false);
    setUserToDelete(null);
  };

  const handleEdit = async (userData) => {
    try {
      const response = await axios.get(`${Api.USER()}/${userData.id}`);
      const completeUserData = response.data;
      setEditingUserId(userData.id);
      setEditableData({
        ...userData,
        password: completeUserData.password
      });
    } catch (error) {
      toast.error("Failed to fetch user details");
    }
  };

  const handleInputChange = (e, field) => {
    setEditableData({ 
      ...editableData, 
      [field]: e.target.value 
    });
  };

  const handleSave = async () => {
    try {
      const updateData = {
        name: editableData.name,
        email: editableData.email,
        role: editableData.role,
        isVerified: editableData.isVerified,
        password: editableData.password
      };

      const response = await axios.put(
        `${Api.USER()}/${editingUserId}`,
        updateData
      );
      
      if (response.status === 200) {
        toast.success("User updated successfully!");
        await fetchUsers();
        setEditingUserId(null);
      } else {
        toast.error("Failed to update user.");
      }
    } catch (error) {
      toast.error("An error occurred while updating the user.");
    }
  };

  const showAddUserModal = () => {
    setAddUserModalVisible(true);
    form.resetFields(); 
  };

  const handleAddUser = async (values) => {
    try {
      const response = await axios.post(Api.SIGNUP(), values);

      if (response.status === 200) {
        toast.success("User added successfully!");
        setAddUserModalVisible(false);
        fetchUsers();
      } else {
        const error = await response.json();
        toast.error(error.message || "Failed to add user");
      }
    } catch (error) {
      toast.error("An error occurred while adding the user");
    }
  };


  return {
    fetchUsers,
    isModalVisible,
    editingUserId,
    editableData,
    showDeleteModal,
    handleDeleteConfirm,
    handleDeleteCancel,
    handleEdit,
    handleInputChange,
    handleSave,
    isAddUserModalVisible,
    setAddUserModalVisible,
    showAddUserModal,
    handleAddUser,
  };
};

export default useUserHooks;