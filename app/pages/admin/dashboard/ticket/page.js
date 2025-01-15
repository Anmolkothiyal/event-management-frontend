"use client"

import React, { useState, useEffect } from "react";
import useTicketHook from "@/hooks/useTicketHook";
import { useSelector } from "react-redux";
import PageHeading from "@/component/core/PageHeading";
import withAuth from "@/component/HOC/withAuth";
import AddFormModal from "@/component/model/addFormModal ";
import { Form } from "antd";

const Ticket = () => {
  const [form] = Form.useForm();
  const { fetchEvents,ticketSubmitHandler,isAddTicketModalVisible,setAddTicketModalVisible,showTicketModal } = useTicketHook();
  const { tickets } = useSelector((state) => state.ticketSlice);
  const events = tickets.events;

  useEffect(() => {
    fetchEvents(); 
  }, []);

  const ticketSubmitHandlers = () => {
    console.log("ticketSubmitHandler");
  }



  return (
    <div className="user-container relative overflow-visible z-50">
    <PageHeading
      heading="Tickets Management System"
      subHeading="Manage all tickets"
      btns={[
        {
          label: "Add Tickets",
          className: "",
          onClick: ticketSubmitHandlers,
        },
      ]}
    />
      {/* {JSON.stringify(events)} */}
      {events && events.map((event, index) => (
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
              {event.ticketCategories.map((category, catIndex) => (
                <tr key={catIndex}>
                  <td>{category.category}</td>
                  <td>${category.price}</td>
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
              ))}
            </tbody>
          </table>
        </div>
      ))}

     <AddFormModal
        open={isAddTicketModalVisible}
        onCancel={() => setAddTicketModalVisible(false)}
        // onFinish={handleEventUser}
        // formFields={userFormFields}
        title="Add Ticket"
        form={form}
      />
    </div>
  );
};

export default withAuth(Ticket)
