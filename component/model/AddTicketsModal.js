import React from "react";
import { Modal, Form, Input, InputNumber, Button, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const AddTicketModal = ({ open, onCancel, onFinish, form, title }) => {
  return (
    <Modal
      title={title}
      visible={open}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          Tickets: [
            { category: "", price: null, quantity: null }, 
          ],
        }}
      >
        {/* Event Name */}
        <Form.Item
          name="eventName"
          label="Event Name"
          rules={[{ required: true, message: "Please enter the event name" }]}
        >
          <Input placeholder="Enter event name" />
        </Form.Item>

        {/* Tickets (Dynamic Fields) */}
        <Form.List name="Tickets">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "category"]}
                    fieldKey={[fieldKey, "category"]}
                    rules={[
                      { required: true, message: "Please enter a category" },
                    ]}
                  >
                    <Input placeholder="Category" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "price"]}
                    fieldKey={[fieldKey, "price"]}
                    rules={[
                      { required: true, message: "Please enter the price" },
                    ]}
                  >
                    <InputNumber placeholder="Price" min={1} />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "quantity"]}
                    fieldKey={[fieldKey, "quantity"]}
                    rules={[
                      { required: true, message: "Please enter the quantity" },
                    ]}
                  >
                    <InputNumber placeholder="Quantity" min={1} />
                  </Form.Item>
                  <MinusCircleOutlined
                    onClick={() => remove(name)}
                    style={{ color: "red" }}
                  />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                  block
                >
                  Add Ticket Category
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddTicketModal;
