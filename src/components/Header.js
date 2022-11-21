import React from "react";
import { NavLink } from "react-router-dom";
import LogoUrl from "./logo.svg";
import styled from "styled-components";

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
  margin-left:auto;
`
const Button = styled.button`
  margin-left: 10px;
`;
const Component = () => {
  return (
    <Header>
      <Logo src={LogoUrl} />
      <nav>
        <StyleLink to="/">首页</StyleLink>
        <StyleLink to="./History">上传历史</StyleLink>
        <StyleLink to="/About">关于我</StyleLink>
      </nav>
      <Login>
        <Button><StyleLink to="/login">登录</StyleLink></Button>
        <Button><StyleLink to="/register">注册</StyleLink></Button>
      </Login>
    </Header>
  );
};

export default Component;
