import React from "react";
import { useStores } from "../stores";
import { observer } from "mobx-react";
import styled from "styled-components";

const Tips = styled.div`
  background: #fceeef;
  padding: 10px;
  margin: 30px 0;
  color: #b6202a;
  border: 1px #fae1e2 solid;
  border-radius: 4px;
  font-size:14px;
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
