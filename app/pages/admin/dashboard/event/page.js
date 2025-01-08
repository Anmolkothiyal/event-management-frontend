"use client"
import React, { useEffect } from "react";
import PageHeading from "@/component/core/PageHeading";
import useEventHooks from "@/hooks/useEventHooks";
import { useSelector } from "react-redux";
import { Calendar, Clock, MapPin, Pencil, Trash2 } from 'lucide-react';

const Event = () => {
  const { events } = useSelector((state) => state.eventSlice);
  const { fetchEvents } = useEventHooks();

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="p-6">
      <PageHeading
        heading="Event Management System"
        subHeading="Manage all events"
        // placeholder="Search by Organization Name"
        btns={[
            {
              label: "Add Event",
              className: "",
              onClick: "",
            },
          ]}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {Array.isArray(events) && events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-md p-6 space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">{event.name}</h2>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-5 h-5" />
                  <span>{new Date(event.date).toLocaleDateString("en-US")}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-5 h-5" />
                  <span>{event.time || "09:00"}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <span>{event.location}</span>
                </div>
              </div>
              
              <p className="text-gray-600 mt-2">{event.description}</p>
              
              <div className="flex gap-4 mt-4 pt-4 border-t border-gray-100">
                <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md transition-colors">
                  <Pencil className="w-4 h-4" />
                  Update
                </button>
                
                <button className="flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 rounded-md transition-colors">
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No events found</p>
        )}
      </div>
    </div>
  );
};

export default Event;
