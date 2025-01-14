import { useState } from "react";
import useActionDispatch from "@/hooks/useActionDispatch";
import axios from "@/services/axios";
import Api from "@/services/EndPoint";
import toast from "react-hot-toast";
import { Form } from "antd";

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


  const handleEventUser = async (values) => {
    const formData = new FormData();
    
    // Handle all non-file fields
    Object.keys(values).forEach((key) => {
        if (key !== 'image') {
            formData.append(key, values[key]);
        }
    });
    
    // Handle file upload - Fix for Ant Design Upload component
    if (values.image?.[0]?.originFileObj) {
        formData.append('image', values.image[0].originFileObj);
    } else if (values.image?.file) {
        formData.append('image', values.image.file);
    } else if (values.image instanceof File) {
        formData.append('image', values.image);
    }

    try {
        const response = await axios.post(Api.EVENT(), formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        
        if (response.status === 200) {
            toast.success("Event added successfully!");
            setAddEventModalVisible(false);
            fetchEvents();
        }
    } catch (error) {
        console.error('Upload error:', error);
        // Log the actual error response for debugging
        if (error.response) {
            console.log('Error response:', error.response.data);
        }
        toast.error(error.response?.data?.message || "An error occurred while adding the event");
    }
};

  const handleUpdateEvent = async (values) => {
    const formData = new FormData();
    
    Object.keys(values).forEach((key) => {
        if (key !== 'image') {
            formData.append(key, values[key]);
        }
    });
    
    // Handle file upload - Fix for Ant Design Upload component
    if (values.image?.[0]?.originFileObj) {
        formData.append('image', values.image[0].originFileObj);
    } else if (values.image?.file) {
        formData.append('image', values.image.file);
    } else if (values.image instanceof File) {
        formData.append('image', values.image);
    }

    try {
        const response = await axios.put(`${Api.EVENT()}/${eventToUpdate.id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        
        if (response.status === 200) {
            toast.success("Event updated successfully!");
            setUpdateEventModalVisible(false);
            fetchEvents();
        }
    } catch (error) {
        console.error('Update error:', error);
        if (error.response) {
            console.log('Error response:', error.response.data);
        }
        toast.error(error.response?.data?.message || "An error occurred while updating the event");
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

