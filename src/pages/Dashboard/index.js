import React from "react";
// import i18next from 'i18next';
import { Col, Row } from "antd";
import DashboardWrapper from "./styles";
// import StatisticData from "../../containers/Dashboard/Statistic";
// import TransactionChart from "../../containers/Dashboard/Charts/Transaction";
// import RealtorChart from "../../containers/Dashboard/Charts/Realtor";
// import PageTitle from '../../components/common/PageTitle/index';

export default function Dashboard() {
  return (
    <DashboardWrapper>
      
      <Row gutter={[32, 32]}>
        <Col xs={24}> 
          {/* <StatisticData /> */}
        </Col>
        <Col xs={24} md={12}>
          {/* <TransactionChart /> */}
        </Col>
        <Col xs={24} md={12}>
          {/* <RealtorChart /> */}
        </Col>
      </Row>
    </DashboardWrapper>
  );
}
