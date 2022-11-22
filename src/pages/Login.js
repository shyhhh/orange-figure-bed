// import React, { useRef } from "react";
// import { observer } from "mobx-react";
// import { useStores } from "../stores";

// const Component = observer(() => {
//   const { AuthStore } = useStores();
//   const inputRef = useRef();
//   const bindChange = () => {
//     console.log(inputRef.current.value)
//     AuthStore.setUsername(inputRef.current.value)
//   }

//   return (
//     <div>
//       <h1>Login:{AuthStore.values.username}</h1>
//       <input ref={inputRef} onChange={()=>bindChange() } />
//     </div>
//   );
// });

// export default Component;
import React from "react";
import { Button, Form, Input } from "antd";
import styled from "styled-components";

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
  const onFinish = (values) => {
    console.log("Success:", values);
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

  return (
    <Wrapper>
      <Title>登录</Title>
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
