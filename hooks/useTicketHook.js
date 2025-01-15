import { useState } from "react";
import useActionDispatch from "@/hooks/useActionDispatch";
import axios from "@/services/axios";
import Api from "@/services/EndPoint";
import toast from "react-hot-toast";
import {Form } from "antd";


const useTicketHook = () => {
  const [form] = Form.useForm();
  const { setTickets } = useActionDispatch();
  const [isAddTicketModalVisible, setAddTicketModalVisible] = useState(false);

  const showTicketModal = () => {
    console.log("showTicketModal");
    setAddTicketModalVisible(true);
    form.resetFields();
  };

  const ticketSubmitHandler = () => {
    console.log("ticketSubmitHandler");
  }

      const fetchEvents = async () => {
      try {
        const { data } = await axios.get(Api.ALLTICKETS());
        setTickets(data.data);
      } catch (error) {
       toast.error("Failed to fetch tickets", error);

      }
    };

  return {
    fetchEvents,
    ticketSubmitHandler,
    isAddTicketModalVisible,
    setAddTicketModalVisible,
    showTicketModal,

  };
};

export default useTicketHook;