"use client";

import React, { useEffect } from "react";
import PageHeading from "@/component/core/PageHeading";
import withAuth from "@/component/HOC/withAuth";
import useFeedbackHooks from "@/hooks/useFeedbackHooks";

const Feedback = () => {
  const { groupedFeedbacks, fetchFeedbacks } = useFeedbackHooks();

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div className="user-container relative overflow-visible z-50">
      <PageHeading
        heading="Event Feedback System"
        subHeading="View all event feedbacks"
      />
      
      {Object.values(groupedFeedbacks).length > 0 ? (
        Object.values(groupedFeedbacks).map((eventGroup, index) => (
          <div key={index} className="table-responsive table-container mt-2">
            <h2>Event: {eventGroup.eventDetails.name}</h2>
            <p>Date: {new Date(eventGroup.eventDetails.date).toLocaleDateString()}</p>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Attendee Name</th>
                  <th>Rating</th>
                  <th>Comment</th>
                  <th>Submitted On</th>
                </tr>
              </thead>
              <tbody>
                {eventGroup.feedbacks.map((feedback, feedbackIndex) => (
                  <tr key={feedbackIndex}>
                    <td>{feedback.attendee.name}</td>
                    <td>
                      <div className="flex">
                        {[...Array(feedback.rating)].map((_, i) => (
                          <span key={i} className="text-yellow-500">★</span>
                        ))}
                        {[...Array(5 - feedback.rating)].map((_, i) => (
                          <span key={i} className="text-gray-300">★</span>
                        ))}
                      </div>
                    </td>
                    <td>{feedback.comment}</td>
                    <td>{new Date(feedback.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      ) : (
        <div className="no-feedback-message text-center mt-4">
          No feedback found.
        </div>
      )}
    </div>
  );
};

export default withAuth(Feedback);