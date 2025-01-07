import { useState } from "react";
import useActionDispatch from "@/hooks/useActionDispatch";
import axios from "@/services/axios";
import Api from "@/services/EndPoint";
import { toast } from "react-toastify";

const useUserHooks = () => {
  const { setUser } = useActionDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editableData, setEditableData] = useState({});
  

  const fetchUsers = async () => {
    try {
      const response = await axios.get(Api.USER());
      const data = Array.isArray(response.data) ? response.data : response.data.users || [];
      setUser(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
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
      console.error("Error deleting user:", error);
      toast.error("An error occurred while deleting the user.");
    }
    setIsModalVisible(false);
    setUserToDelete(null);
  };

  const handleDeleteCancel = () => {
    setIsModalVisible(false);
    setUserToDelete(null);
  };

  const handleEdit = (userData) => {
    setEditingUserId(userData.id);
    setEditableData(userData); // Set the initial values for editing.
  };

  const handleInputChange = (e, field) => {
    setEditableData({ ...editableData, [field]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`https://event-mangement-backend-sj7x.onrender.com/api/user/${editingUserId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editableData),
      });

      if (response.ok) {
        alert("User updated successfully!");
        fetchUsers(); // Refresh the user list.
        setEditingUserId(null); // Exit editing mode.
      } else {
        alert("Failed to update user.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("An error occurred while updating the user.");
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
    handleInputChange,handleSave
  };
};

export default useUserHooks;