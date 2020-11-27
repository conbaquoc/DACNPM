import React from "react";
import Wrapper from "./styles";
import ClassTable from '../../../containers/Class/List'

export default function ListEvent(props) {
  return (
    <Wrapper>
      <ClassTable {...props} />
    </Wrapper>
  );
}
