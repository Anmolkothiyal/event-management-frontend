"use client";

import React, { useEffect } from "react";
import PageHeading from "@/component/core/PageHeading";
import useEventHooks from "@/hooks/useEventHooks";
import { useSelector } from "react-redux";
import { Calendar, Clock, MapPin, Pencil, Trash2 } from "lucide-react";
import DeleteConfirmationModal from "@/component/model/deleteConfirmModel";
import AddFormModal from "@/component/model/addFormModal ";
import { Form } from "antd";
import { useRouter } from "next/navigation";
import PageRoutes from "@/utilis/PageRoute";
import withAuth from "@/component/HOC/withAuth";

const Event = () => {
  const { events } = useSelector((state) => state.eventSlice);
  const [form] = Form.useForm();
  const router = useRouter();
  const userFormFields = [
    { label: "Event Name", name: "name", rules: [{ required: true }] },
    { label: "Location", name: "location", rules: [{ required: true }] },
    { label: "Date", name: "date", rules: [{ required: true }], type: "date" },
    {
      label: "Start Time",
      name: "start_time",
      rules: [{ required: true }],
      type: "time",
    },
    {
      label: "End Time",
      name: "end_time",
      rules: [{ required: true }],
      type: "time",
    },
    {
      label: "Description",
      name: "description",
      type: "textarea",
      rules: [{ required: true }],
    },
    {
      label: "Upload Image",
      name: "image",
      type: "file",
      rules: [
        {
          required: true,
          validator: (_, value) => {
            if (!value || (Array.isArray(value) && !value.length)) {
              return Promise.reject("Please upload an image");
            }
            return Promise.resolve();
          },
        },
      ],
      uploadProps: {
        accept: "image/*",
        beforeUpload: (file) => {
          // Prevent automatic upload
          return false;
        },
        maxCount: 1,
      },
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
            className: "",
            onClick: () => router.push(PageRoutes.PREVIOUSEVENT()),
          },
          {
            label: "Add Event",
            className: "",
            onClick: showEventModal,
          },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {Array.isArray(events) && events.length > 0 ? (
          events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="relative rounded-lg overflow-hidden shadow-lg">
                <img
                  src={
                    event.image
                      ? `${process.env.NEXT_PUBLIC_API_URL}${event.image}`
                      : "/placeholder-image.jpg"
                  }
                  // alt={event.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>
                <div className="absolute top-4 left-4 space-y-2">
                  <h1 className="text-2xl font-bold text-white line-clamp-2">
                    {event.name}
                  </h1>
                </div>
                <div className="absolute bottom-4 left-4 space-y-2">
                  <p className="flex items-center text-sm text-gray-100">
                    <Calendar
                      className="w-4 h-4 mr-2"
                      style={{ stroke: 'white' }}
                    />

                    {new Date(event.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="flex items-center text-sm text-gray-100">
                    <Clock className="w-4 h-4 mr-2" style={{ stroke: 'white' }} />
                    {event.start_time} - {event.end_time}
                  </p>
                  <p className="flex items-center text-sm text-gray-100">
                    <MapPin
                      className="w-4 h-4 mr-2"
                      style={{ stroke: 'white' }}
                    />
                    {event.location}
                  </p>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-gray-600 text-sm">
                  {event.description}
                </p>

                <div className="mt-3 pt-2 border-t border-gray-200 flex justify-between">
                  <button
                    className="flex items-center gap-2 px-4 py-2 text-blue-600   text-sm font-medium"
                    onClick={() => {
                      form.setFieldsValue(event);
                      showUpdateEventModal(event);
                    }}
                  >
                    <Pencil className="w-4 h-4" />
                    Update
                  </button>

                  <button
                    className="flex items-center gap-2 px-4 py-2 text-red-500   text-sm font-medium"
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

export default withAuth(Event)
