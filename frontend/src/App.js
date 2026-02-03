import { useState } from "react";
import { Form, Input, Button, message as antdMessage } from "antd";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);

    fetch("http://localhost:3000/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          antdMessage.success(data.message);
        } else {
          antdMessage.error(data.message);
        }
      })
      .catch(() => {
        antdMessage.error("Server error");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="App" style={{ padding: 40 }}>
      <h2>Contact Form</h2>

      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input placeholder="Enter your name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Enter a valid email" },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          label="Message"
          name="message"
          rules={[{ required: true, message: "Please enter your message" }]}
        >
          <Input.TextArea rows={4} placeholder="Enter your message" />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default App;
