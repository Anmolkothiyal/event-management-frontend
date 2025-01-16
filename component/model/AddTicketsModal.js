import React from "react";
import { useSelector } from "react-redux";
import { Modal, Form, Select, InputNumber, Button, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
 
const AddTicketModal = ({ open, onCancel, onFinish, form, title }) => {
  // Fetch event options from Redux
  const events = useSelector((state) => state.eventSlice.events || []);
  const eventOptions = events.map((event) => ({
    value: event.name,
    label: event.name,
  }));
 
  const ticketFields = [
    {
      name: "Tickets",
      label: "Tickets",
      type: "dynamicArray",
      fields: [
        {
          name: "category",
          label: "Category",
          type: "select",
          required: true,
          options: [
            { value: "Gold", label: "Gold" },
            { value: "Silver", label: "Silver" },
            { value: "Platinum", label: "Platinum" },
          ],
        },
        {
          name: "price",
          label: "Price",
          type: "number",
          required: true,
        },
        {
          name: "quantity",
          label: "Quantity",
          type: "number",
          required: true,
        },
      ],
    },
  ];
 
  return (
    <Modal
      title={title}
      open={open}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          Tickets: [{ category: "", price: null, quantity: null }],
        }}
      >
        {/* Event Name */}
        <Form.Item
          name="eventName"
          label="Event Name"
          rules={[{ required: true, message: "Please select an event" }]}
        >
          <Select placeholder="Select an Event">
            {eventOptions.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
 
        {/* Dynamic Ticket Fields */}
        {ticketFields.map((field) => {
          if (field.type === "dynamicArray") {
            return (
              <Form.List key={field.name} name={field.name}>
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                      <Space key={key} style={{ display: "flex", marginBottom: 8 }} align="baseline">
                        {field.fields.map((subField) => (
                          <Form.Item
                            key={subField.name}
                            {...restField}
                            name={[name, subField.name]}
                            label={subField.label}
                            rules={[
                              {
                                required: subField.required,
                                message: `Please enter ${subField.label}`,
                              },
                            ]}
                          >
                            {subField.type === "select" ? (
                              <Select placeholder={`Select ${subField.label}`}>
                                {subField.options?.map((option) => (
                                  <Select.Option key={option.value} value={option.value}>
                                    {option.label}
                                  </Select.Option>
                                ))}
                              </Select>
                            ) : (
                              <InputNumber
                                placeholder={subField.label}
                                min={1}
                                style={{ width: "100%" }}
                              />
                            )}
                          </Form.Item>
                        ))}
                        <MinusCircleOutlined
                          onClick={() => remove(name)}
                          style={{ color: "red", marginTop: "30px" }}
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
            );
          }
          return null;
        })}
 
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
 
export default AddTicketModal;