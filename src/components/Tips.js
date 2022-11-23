import React from "react";
import { useStores } from "../stores";
import { observer } from "mobx-react";
import styled from "styled-components";

const Tips = styled.div`
  background: #f08300;
  padding: 10px;
  margin: 30px 0;
  color: #f3f3f3;
  border-radius: 4px;
`;

const Component = ({ children }) => {
  const { UserStore } = useStores()

  return (
    <>
      {
        UserStore.currentUser ? null : <Tips>{children}</Tips>
      }
    </>
  );
};

export default Component;
