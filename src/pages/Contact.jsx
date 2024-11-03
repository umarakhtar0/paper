

import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Typography } from "antd";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";

const { Title } = Typography;

const ContactPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await emailjs.send(
        "service_1rlx9f9", // Replace with your EmailJS service ID
        "template_sx2b3yw", // Replace with your EmailJS template ID
        {
          name: values.name,
          email: values.email,
          message: values.message,
        },
        "your_public_key_here" // Replace with your EmailJS public key
      );

      toast.success("Your message has been sent successfully!");
      form.resetFields();
    } catch (error) {
      toast.error("An error occurred while sending your message.");
      console.error("EmailJS error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <Row justify="center">
        <Col span={12}>
          <Title level={2}>Contact Us</Title>
          <Form layout="vertical" form={form} onFinish={onFinish}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter your name!" }]}
            >
              <Input placeholder="Your Name" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input placeholder="Your Email" />
            </Form.Item>
            <Form.Item
              label="Message"
              name="message"
              rules={[{ required: true, message: "Please enter your message!" }]}
            >
              <Input.TextArea rows={4} placeholder="Your Message" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Send Message
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default ContactPage;
