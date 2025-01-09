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
  const router=useRouter()
  const userFormFields = [
    { label: "Event Name", name: "name", rules: [{ required: true }] },
    { label: "Location", name: "location", rules: [{ required: true }] },
    { label: "Date", name: "date", rules: [{ required: true }], type: "date" },
    { label: "Start Time", name: "start_time", rules: [{ required: true }], type: "time" },
    { label: "End Time", name: "end_time", rules: [{ required: true }], type: "time" },
    { label: "Description", name: "description", type: "textarea", rules: [{ required: true }] },
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
            className: "",
            onClick:() => router.push(PageRoutes.PREVIOUSEVENT())
          },
          {
            label: "Add Event",
            className: "",
            onClick: showEventModal,
          },
        ]}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {Array.isArray(events) && events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="bg-white rounded-xl shadow-lg p-6 space-y-4 transition-all duration-300 hover:shadow-xl">
              <h2 className="text-2xl font-bold text-gray-800">{event.name}</h2>
              
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-gray-600">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  <span className="text-sm">{new Date(event.date).toLocaleDateString("en-US")}</span>
                </div>
                
                <div className="flex items-center gap-3 text-gray-600">
                  <Clock className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Start: {event.start_time}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Clock className="w-5 h-5 text-red-500" />
                  <span className="text-sm">End: {event.end_time}</span>
                </div>
                
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin className="w-5 h-5 text-purple-500" />
                  <span className="text-sm">{event.location}</span>
                </div>
              </div>
              
              <p className="text-gray-600 mt-3 text-sm">{event.description}</p>
              
              <div className="mt-6 pt-2 border-t border-gray-200 flex justify-between">
                <button 
                  className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors text-sm font-medium"
                  onClick={() => {
                    form.setFieldsValue(event);
                    showUpdateEventModal(event);
                  }}
                >
                  <Pencil className="w-4 h-4" />
                  Update
                </button>
                
                <button 
                  className="flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 rounded-md transition-colors text-sm font-medium" 
                  onClick={() => showDeleteModal(event.id)}
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-3 text-center text-lg">No events found</p>
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
