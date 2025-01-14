import { useState } from "react";
import useActionDispatch from "@/hooks/useActionDispatch";
import axios from "@/services/axios";
import Api from "@/services/EndPoint";
import toast from "react-hot-toast";
import {Form } from "antd";

const useTicketHook = () => {
  const { setTickets } = useActionDispatch();

      const fetchEvents = async () => {
      try {
        const { data } = await axios.get(Api.ALLTICKETS());
        setTickets(data.data);
        toast.success("tickets fetched successfully");
      } catch (error) {
       toast.error("Failed to fetch tickets", error);

      }
    };

  return {
    fetchEvents

  };
};

export default useTicketHook;