import { useState, useEffect } from "react";
import axios from "@/services/axios";
import toast from "react-hot-toast";
import Api from "@/services/EndPoint";

const useFeedbackHooks = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedbacks = async () => {
    try {
      const { data } = await axios.get(Api.FEEDBACK()); 
      const previousEventFeedbacks = data.feedbacks.filter(
        feedback => feedback.event && new Date(feedback.event.date) < new Date()
      );
      setFeedbacks(previousEventFeedbacks);
    } catch (error) {
      toast.error(error.response?.data?.msg || "Failed to fetch feedbacks");
    }
  };
  const groupedFeedbacks = feedbacks.reduce((acc, feedback) => {

    if (feedback.event && feedback.event.id) {
      const eventId = feedback.event.id;
      if (!acc[eventId]) {
        acc[eventId] = {
          eventDetails: feedback.event,
          feedbacks: []
        };
      }
      acc[eventId].feedbacks.push(feedback);
    }
    return acc;
  }, {});

  return {
    feedbacks,
    groupedFeedbacks,
    fetchFeedbacks
  };
};

export default useFeedbackHooks;