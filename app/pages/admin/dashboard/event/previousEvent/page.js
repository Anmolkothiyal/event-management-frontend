"use client";

import React, { useEffect } from "react";
import PageHeading from "@/component/core/PageHeading";
import { useSelector } from "react-redux";
import { Calendar, Clock, MapPin } from "lucide-react";
import useEventHooks from "@/hooks/useEventHooks";
import withAuth from "@/component/HOC/withAuth";

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
                  alt={event.name}
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

                <div className="mt-3 pt-2 border-t border-gray-200 flex justify-between"></div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 flex items-center justify-center h-64">
            <p className="text-gray-500 text-center text-lg">
              No previous events found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default withAuth(PreviousEvent)
