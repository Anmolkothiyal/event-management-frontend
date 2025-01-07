import { useState } from "react";
import useActionDispatch from "@/hooks/useActionDispatch";
import axios from "@/services/axios";
import Api from "@/services/EndPoint";
import { toast } from "react-toastify";

const useUserHooks = () => {
  const { setUser } = useActionDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

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

  return {
    fetchUsers,
    isModalVisible,
    showDeleteModal,
    handleDeleteConfirm,
    handleDeleteCancel,
  };
};

export default useUserHooks;