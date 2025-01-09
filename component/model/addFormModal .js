"use client";
import React from "react";
import { Modal, Form, Input, Select, Button } from "antd";

const { Option } = Select;

const AddFormModal = ({
  open,
  onCancel,
  onFinish,
  formFields,
  title,
  form,
}) => {
  return (
    <Modal title={title} open={open} onCancel={onCancel} footer={null}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        {formFields.map((field) => (
          <Form.Item
            key={field.name}
            label={field.label}
            name={field.name}
            rules={field.rules}
          >
            {field.type === "select" ? (
              <Select>
                {field.options.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            ) : field.type === "textarea" ? (
              <Input.TextArea rows={4} placeholder="Enter the event description" />
            ) : (
              <Input type={field.type || "text"} />
            )}
          </Form.Item>
        ))}

        {/* Submit Button */}
        <Form.Item>
          <Button className="bg-black text-white" type="primary" htmlType="submit" block>
            <p className="text-white">Submit</p>
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddFormModal;
