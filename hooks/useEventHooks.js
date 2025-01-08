import { useState } from "react";
import useActionDispatch from "@/hooks/useActionDispatch";
import axios from "@/services/axios";
import Api from "@/services/EndPoint";
import toast from "react-hot-toast";


const useEventHooks = () => {
  const { setEvents } = useActionDispatch();

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        "https://event-mangement-backend-sj7x.onrender.com/api/events"
      );
      const data = Array.isArray(response.data.events) ? response.data.events : response.data || [];
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };


 


  return {fetchEvents

  };
};

export default useEventHooks;