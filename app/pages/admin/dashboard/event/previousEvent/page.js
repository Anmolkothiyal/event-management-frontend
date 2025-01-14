'use client';

import React, { useEffect } from "react";
import PageHeading from "@/component/core/PageHeading";
import { useSelector } from "react-redux";
import { Calendar, Clock, MapPin } from 'lucide-react';
import useEventHooks from "@/hooks/useEventHooks";

const PreviousEvent = () => {
  const { previousEvents } = useSelector((state) => state.eventSlice);
  const { fetchPreviousEvents } = useEventHooks();

  useEffect(() => {
    fetchPreviousEvents();
  }, []);

  return (
    <div className="user-container relative overflow-visible z-5">
      <PageHeading
        heading="Previous Events"
        subHeading="View all past events"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {Array.isArray(previousEvents) && previousEvents.length > 0 ? (
          previousEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <img 
                src={event.image ? `${process.env.NEXT_PUBLIC_API_URL}${event.image}` : '/placeholder-image.jpg'} 
                alt={event.name} 
                className="w-full h-56 object-cover"
              />
              <div className="p-6 space-y-4">
                <h2 className="text-2xl font-bold text-gray-800 line-clamp-2">{event.name}</h2>
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
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 flex items-center justify-center h-64">
            <p className="text-gray-500 text-center text-lg">No previous events found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviousEvent;

