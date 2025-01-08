"use client"
import React, { useState, useEffect, use } from "react";
import PageHeading from "@/component/core/PageHeading";
import useEventHooks from "@/hooks/useEventHooks";
import { useSelector } from "react-redux";
import axios from "@/services/axios";


const Event = () => {
  const {events} = useSelector((state) => state.eventSlice);
  const {fetchEvents} = useEventHooks();


  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="event-page">
      <PageHeading
        heading="Events"
        subHeading="Manage all events"
        placeholder="Search by Organization Name"
        // btns={[
        //   {
        //     label: "Add User",
        //     className: "",
        //     onClick: showAddUserModal,
        //   },
        // ]}
      />
      <div className="event-container">

      {Array.isArray(events) && events.length > 0 ? (
        events.map((event) => (
          <div key={event.id} className="event-card">
            <h2 className="event-name">{event.name}</h2>
            <p className="event-description">{event.description}</p>
            <p className="event-location">
              <strong>Location:</strong> {event.location}
            </p>
            <p className="event-date">
              <strong>Date:</strong>{" "}
              {new Date(event.date).toLocaleDateString("en-US")}
            </p>
          </div>
        )))
         : <p>No events found</p>}
       </div>
    </div>
  );
};

export default Event;
