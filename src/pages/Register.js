import React from "react";
import { Button, Form, Input, message } from "antd";
import styled from "styled-components";
import { useStores } from "../stores";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  max-width: 600px;
  margin: 30px auto;
  box-shadow: 0 2px 6px 0 rgba(23, 23, 23, 0.22);
  border-radius: 4px;
  padding: 20px;
`;
const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
`;

const Component = () => {
  const { AuthStore } = useStores();
  const Navigate = useNavigate();

  const onFinish = (values) => {
    AuthStore.setUsername(values.username);
    AuthStore.setPassword(values.password);
    AuthStore.register()
      .then(() => {
        Navigate("/");
      })
      .catch(() => {
        message.warning("登录失败");
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const validateUsername = (rule, value) => {
    if (/\W/.test(value))
      return Promise.reject("不能出现字母数字下划线以外的字符");
    if (value.length < 4 || value.length > 10)
      return Promise.reject("长度为4～10个字符");
    return Promise.resolve();
  };
  const validateConfirm = ({ getFieldValue }) => ({
    validator(rule, value) {
      if (getFieldValue("password") === value) return Promise.resolve();
      return Promise.reject("两次密码不一致");
    },
  });

  return (
    <Wrapper>
      <Title>注册</Title>
      <Form
        name="basic"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 18,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[
            {
              required: true,
              message: "输入用户名",
            },
            {
              validator: validateUsername,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[
            {
              required: true,
              message: "输入密码",
            },
            {
              min: 4,
              message: "最少4个字符",
            },
            {
              max: 10,
              message: "最大10个字符",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="确认密码"
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: "确认密码",
            },
            validateConfirm,
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 6,
            span: 18,
          }}
        >
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  );
};

export default Component;
