import React from "react";
import PageWrapper from "./styles";
import PageTitle from "../../../components/common/PageTitle/index";
import DetailClass from '../../../containers/Class/Show'

export default function DetailEvent(props){
  return (
    <PageWrapper>
      <PageTitle>Chi tiết lớp học phần</PageTitle>
      <DetailClass {...props} />
    </PageWrapper>
  
  );
  
}
