import { useState } from "react";
import useActionDispatch from "@/hooks/useActionDispatch";
import axios from "@/services/axios";
import Api from "@/services/EndPoint";
import toast from "react-hot-toast";
import { Form } from "antd";
import { uploadFile } from "@uploadcare/upload-client";
const useEventHooks = () => {
  const { setEvents,setPreviousEvents } = useActionDispatch();
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [isAddEventModalVisible, setAddEventModalVisible] = useState(false);
  const [isUpdateEventModalVisible, setUpdateEventModalVisible] = useState(false);
  const [eventToUpdate, setEventToUpdate] = useState(null);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(Api.EVENT());
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



const UPLOADCARE_PUBLIC_KEY = '92caec739e0a07cd0445';

const extractFileFromUpload = (imageData) => {
  if (Array.isArray(imageData)) {
    return imageData[0]?.originFileObj || imageData[0]?.file || imageData[0];
  }
  return imageData?.file || imageData?.originFileObj || imageData;
};
const handleFileUpload = async (file) => {
  if (!file) return null;

  try {
    const uploadedFile = await uploadFile(file, {
      publicKey: UPLOADCARE_PUBLIC_KEY,
      contentType: 'image/*',
    });
    return uploadedFile.cdnUrl;
  } catch (error) {
    console.error('Uploadcare upload error:', error);
    toast.error('Image upload failed');
    return null;
  }
};
const handleEventUser = async (values) => {
  try {
    const imageFile = extractFileFromUpload(values.image);
    const imageUrl = imageFile ? await handleFileUpload(imageFile) : null;

    const payload = {
      ...values,
      image: imageUrl
    };

    const response = await axios.post(Api.EVENT(), payload);
    
    if (response.status === 200) {
      toast.success("Event added successfully!");
      setAddEventModalVisible(false);
      fetchEvents();
    }
  } catch (error) {
    console.error('Event creation error:', error);
    toast.error(error.response?.data?.message || "Event creation failed");
  }
};

const handleUpdateEvent = async (values) => {
  try {
    const imageFile = extractFileFromUpload(values.image);
    const imageUrl = imageFile ? await handleFileUpload(imageFile) : eventToUpdate.image;

    const payload = {
      ...values,
      image: imageUrl
    };

    const response = await axios.put(`${Api.EVENT()}/${eventToUpdate.id}`, payload);
    
    if (response.status === 200) {
      toast.success("Event updated successfully!");
      setUpdateEventModalVisible(false);
      fetchEvents();
    }
  } catch (error) {
    console.error('Event update error:', error);
    toast.error(error.response?.data?.message || "Event update failed");
  }
};

const fetchPreviousEvents = async () => {
  try {
    const response = await axios.get(Api.PREVIOUEVENT());
    const data = Array.isArray(response.data.previousEvents) ? response.data.previousEvents : response.data || [];
    setPreviousEvents(data);
  } catch (error) {
    toast.error("Error fetching previous events:", error);
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
    fetchPreviousEvents
  };
};

export default useEventHooks;

