import { useState } from "react";
import useActionDispatch from "@/hooks/useActionDispatch";
import axios from "@/services/axios";
import Api from "@/services/EndPoint";
import toast from "react-hot-toast";
import { Form } from "antd";

const useEventHooks = () => {
  const { setEvents } = useActionDispatch();
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [isAddEventModalVisible, setAddEventModalVisible] = useState(false);
  const [isUpdateEventModalVisible, setUpdateEventModalVisible] = useState(false);
  const [eventToUpdate, setEventToUpdate] = useState(null);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        "https://event-mangement-backend-sj7x.onrender.com/api/events"
      );
      const data = Array.isArray(response.data.events) ? response.data.events : response.data || [];
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const showDeleteModal = (eventId) => {
    setEventToDelete(eventId);
    setIsModalVisible(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete(`${Api.EVENT()}/${eventToDelete}`);
      if (response.status === 200) {
        toast.success("Event deleted successfully.");
        fetchEvents();
      } else {
        toast.error("Failed to delete event.");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the event.");
    }
    setIsModalVisible(false);
    setEventToDelete(null);
  };

  const handleDeleteCancel = () => {
    setIsModalVisible(false);
    setEventToDelete(null);
  };

  const showEventModal = () => {
    setAddEventModalVisible(true);
    form.resetFields();
  };

  const showUpdateEventModal = (event) => {
    setEventToUpdate(event);
    setUpdateEventModalVisible(true);
    form.setFieldsValue({
      name: event.name,
      description: event.description,
      location: event.location,
      date: event.date,
      start_time: event.start_time,
      end_time: event.end_time
    });
  };

  const handleEventUser = async (values) => {
    try {
      const response = await axios.post(Api.EVENT(), values);

      if (response.status === 200) {
        toast.success("Event added successfully!");
        setAddEventModalVisible(false);
        fetchEvents();
      } else {
        const error = await response.json();
        toast.error(error.message || "Failed to add event");
      }
    } catch (error) {
      toast.error("An error occurred while adding the event");
    }
  };

  const handleUpdateEvent = async (values) => {
    try {
      const response = await axios.put(`${Api.EVENT()}/${eventToUpdate.id}`, {
        name: values.name,
        description: values.description,
        location: values.location,
        date: values.date,
        start_time: values.start_time,
        end_time: values.end_time
      });

      if (response.status === 200) {
        toast.success("Event updated successfully!");
        setUpdateEventModalVisible(false);
        fetchEvents();
      } else {
        toast.error("Failed to update event");
      }
    } catch (error) {
      toast.error("An error occurred while updating the event");
    }
  };

  return {
    fetchEvents,
    isModalVisible,
    showDeleteModal,
    handleDeleteConfirm,
    handleDeleteCancel,
    isAddEventModalVisible,
    setAddEventModalVisible,
    isUpdateEventModalVisible,
    setUpdateEventModalVisible,
    handleEventUser,
    handleUpdateEvent,
    showEventModal,
    showUpdateEventModal,
  };
};

export default useEventHooks;

