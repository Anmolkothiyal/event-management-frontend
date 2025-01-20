"use client";

import React, { useState, useEffect } from "react";
import useTicketHook from "@/hooks/useTicketHook";
import { useSelector } from "react-redux";
import PageHeading from "@/component/core/PageHeading";
import withAuth from "@/component/HOC/withAuth";
import AddTicketModal from "@/component/model/AddTicketsModal";
import { Form } from "antd";
import useEventHooks from "@/hooks/useEventHooks";

const Ticket = () => {
  const [form] = Form.useForm();
  const {fetchTickets,ticketSubmitHandler,isAddTicketModalVisible,setAddTicketModalVisible,showTicketModal,} = useTicketHook();
  const {fetchEvents} =useEventHooks()

  const { tickets } = useSelector((state) => state.ticketSlice);
  const events = tickets.events;

  
  useEffect(() => {
    fetchTickets();
    fetchEvents();
  }, []);



  const TicketFormFields = [
    {
      label: "Event Name",
      name: "eventName",
      type: "select",
      options: [], 
      rules: [{ required: true, message: "Please select an event" }],
    },
    {
      name: "Tickets",
      label: "Tickets",
      type: "dynamicArray",
      fields: [
        {
          name: "category",
          label: "Category",
          type: "select",
          required: true,
          options: [
            { value: "Gold", label: "Gold" },
            { value: "Silver", label: "Silver" },
            { value: "Platinum", label: "Platinum" },
          ],
        },
        {
          name: "price",
          label: "Price",
          type: "number",
          required: true,
          rules: [{ required: true, message: "Please enter a price" }],
        },
        {
          name: "quantity",
          label: "Quantity",
          type: "number",
          required: true,
          rules: [{ required: true, message: "Please enter the quantity" }],
        },
      ],
    },
  ];


  return (
    <div className="user-container relative overflow-visible z-50">
      <PageHeading
        heading="Tickets Management System"
        subHeading="Manage all tickets"
        btns={[
          {
            label: "Add Tickets",
            className: "",
            onClick: showTicketModal,
          },
        ]}
      />
      {/* {JSON.stringify(events)} */}
      {events && events.length > 0 ? (
  events.map((event, index) => (
    <div key={index} className="table-responsive table-container mt-2">
      <h2>Event: {event.eventDetails.name}</h2>
      <p>Total Tickets: {event.totalStats.totalTickets}</p>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Category</th>
            <th>Price</th>
            <th>Total Tickets</th>
            <th>Available</th>
            <th>Sold</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {event.ticketCategories.length > 0 ? (
            event.ticketCategories.map((category, catIndex) => (
              <tr key={catIndex}>
                <td>{category.category}</td>
                <td>₹{category.price}</td>
                <td>{category.totalTickets}</td>
                <td>{category.availableTickets}</td>
                <td>{category.soldTickets}</td>
                <td>
                  {category.availableTickets > 0 ? (
                    <span style={{ color: "green" }}>Available</span>
                  ) : (
                    <span style={{ color: "red" }}>Sold Out</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No categories found for this event.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  ))
) : (
  <div className="no-events-message" style={{ textAlign: "center" }}>
    No events found.
  </div>
)}

      <AddTicketModal
        open={isAddTicketModalVisible}
        onCancel={() => setAddTicketModalVisible(false)}
        onFinish={ticketSubmitHandler}
        formFields={TicketFormFields}
        form={form}
        title="Add Ticket"
      />
    </div>
  );
};

export default withAuth(Ticket);
