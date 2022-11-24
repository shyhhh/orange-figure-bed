import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import LogoUrl from "./logo.svg";
import styled from "styled-components";
import { Button } from "antd";
import { useStores } from "../stores";
import { observer } from "mobx-react";

const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 10px 100px;
  background-color: #02101f;
`;
const Logo = styled.img`
  height: 30px;
`;
const StyleLink = styled(NavLink)`
  color: #f3f3f3;
  margin-left: 30px;
  &.active {
    border-bottom: 1px solid;
  }
`;
const Login = styled.div`
  margin-left: auto;
`;
const StyleButton = styled(Button)`
  margin-left: 10px;
`;
const StyleSpan = styled.span`
  margin-right: 8px;
  color: #58a6ff;
  height: 100%;
  display: inline-block;
  cursor: pointer;
`;

const Component = observer(() => {
  const Navigate = useNavigate();
  const { UserStore, AuthStore } = useStores();

  const handleLogout = () => {
    AuthStore.logout();
  };
  const handleLogin = () => {
    console.log("跳转到登录页面");
    Navigate("/login");
  };
  const handleRegister = () => {
    console.log("跳转到注册页面");
    Navigate("/register");
  };

  return (
    <Header>
      <Logo src={LogoUrl} />
      <nav>
        <StyleLink to="/">首页</StyleLink>
        <StyleLink to="./History">上传历史</StyleLink>
        <StyleLink to="/About">关于我</StyleLink>
      </nav>
      <Login>
        {UserStore.currentUser ? (
          <>
            <StyleSpan>{UserStore.currentUser.attributes.username}</StyleSpan>
            <StyleButton type="primary" onClick={handleLogout}>
              注销
            </StyleButton>
          </>
        ) : (
          <>
            <StyleButton type="primary" onClick={handleLogin}>
              登录
            </StyleButton>
            <StyleButton type="primary" onClick={handleRegister}>
              注册
            </StyleButton>
          </>
        )}
      </Login>
    </Header>
  );
});

export default Component;
