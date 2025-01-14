'use client';

import React, { useEffect } from "react";
import PageHeading from "@/component/core/PageHeading";
import useEventHooks from "@/hooks/useEventHooks";
import { useSelector } from "react-redux";
import { Calendar, Clock, MapPin, Pencil, Trash2 } from 'lucide-react';
import DeleteConfirmationModal from "@/component/model/deleteConfirmModel";
import AddFormModal from "@/component/model/addFormModal ";
import { Form } from "antd";
import { useRouter } from "next/navigation";
import PageRoutes from "@/utilis/PageRoute";

const Event = () => {
  const { events } = useSelector((state) => state.eventSlice);
  const [form] = Form.useForm();
  const router = useRouter();
  const userFormFields = [
    { label: "Event Name", name: "name", rules: [{ required: true }] },
    { label: "Location", name: "location", rules: [{ required: true }] },
    { label: "Date", name: "date", rules: [{ required: true }], type: "date" },
    { label: "Start Time", name: "start_time", rules: [{ required: true }], type: "time" },
    { label: "End Time", name: "end_time", rules: [{ required: true }], type: "time" },
    { label: "Description", name: "description", type: "textarea", rules: [{ required: true }] },
    { 
        label: "Upload Image", 
        name: "image", 
        type: "file",
        rules: [{ 
            required: true,
            validator: (_, value) => {
                if (!value || (Array.isArray(value) && !value.length)) {
                    return Promise.reject('Please upload an image');
                }
                return Promise.resolve();
            }
        }],
        uploadProps: {
            accept: 'image/*',
            beforeUpload: (file) => {
                // Prevent automatic upload
                return false;
            },
            maxCount: 1
        }
    },
  ];

  const { 
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
  } = useEventHooks();

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="user-container relative overflow-visible z-50">
      <PageHeading
        heading="Event Management System"
        subHeading="Manage all events"
        btns={[
          {
            label: "Previous Event",
            className: "bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out mr-4",
            onClick: () => router.push(PageRoutes.PREVIOUSEVENT())
          },
          {
            label: "Add Event",
            className: "bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out",
            onClick: showEventModal,
          },
        ]}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {Array.isArray(events) && events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="relative">
                <img 
                  src={event.image ? `${process.env.NEXT_PUBLIC_API_URL}${event.image}` : '/placeholder-image.jpg'} 
                  alt={event.name} 
                  className="w-full h-56 object-cover"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-50"></div>
                <h2 className="absolute bottom-4 left-4 text-2xl font-bold text-white">{event.name}</h2>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Calendar className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    <span className="text-sm">{new Date(event.date).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gray-600">
                    <Clock className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">Start: {event.start_time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Clock className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <span className="text-sm">End: {event.end_time}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin className="w-5 h-5 text-purple-500 flex-shrink-0" />
                    <span className="text-sm truncate">{event.location}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mt-3 text-sm line-clamp-3">{event.description}</p>
                
                <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between">
                  <button 
                    className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-md transition-colors text-sm font-medium"
                    onClick={() => {
                      form.setFieldsValue(event);
                      showUpdateEventModal(event);
                    }}
                  >
                    <Pencil className="w-4 h-4" />
                    Update
                  </button>
                  
                  <button 
                    className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-500 hover:bg-red-100 rounded-md transition-colors text-sm font-medium" 
                    onClick={() => showDeleteModal(event.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 flex items-center justify-center h-64">
            <p className="text-gray-500 text-center text-lg">No events found</p>
          </div>
        )}
      </div>

      <AddFormModal
        open={isAddEventModalVisible}
        onCancel={() => setAddEventModalVisible(false)}
        onFinish={handleEventUser}
        formFields={userFormFields}
        title="Add Event"
        form={form}
      />
      <AddFormModal
        open={isUpdateEventModalVisible}
        onCancel={() => setUpdateEventModalVisible(false)}
        onFinish={handleUpdateEvent}
        formFields={userFormFields}
        title="Update Event"
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

export default Event;

