import React from "react";
import { Modal } from "antd";

const DeleteConfirmationModal = ({ onConfirm, open, onCancel }) => {
  return (
    <Modal title="Delete User" open={open} onOk={onConfirm} onCancel={onCancel}  okText={<span style={{ color: "white" }}>Delete</span>}  cancelText="Cancel"  okButtonProps={{ style: { backgroundColor: "black" } }}> 
      <p>Are you sure you want to delete this user?</p>
    </Modal>
  );
};

export default DeleteConfirmationModal;