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


  const fetchTickets = async () => {
    try {
      const { data } = await axios.get(Api.ALLTICKETS());
      setTickets(data.data);
    } catch (error) {
      const errorMessage = error.response?.data?.msg || "Failed to create tickets"; 
      toast.error(errorMessage);

    }
  };

  const ticketSubmitHandler = async (formData) => {
    try {
      const { data } = await axios.post(Api.TICKETS(), formData);
      toast.success(data.message)
      fetchTickets();
      setAddTicketModalVisible(false);
    } catch (error) {
      const errorMessage = error.response?.data?.msg || "Failed to create tickets";
      toast.error(errorMessage);
    }
  };

  const showTicketModal = () => {
    setAddTicketModalVisible(true);
    form.resetFields();
  };


  return {
    fetchTickets,
    ticketSubmitHandler,
    isAddTicketModalVisible,
    setAddTicketModalVisible,
    showTicketModal,

  };
};

export default useTicketHook;