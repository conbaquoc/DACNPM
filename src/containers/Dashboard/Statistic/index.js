import React, { Component } from "react";
import { Statistic, Col, Row, Card, Icon } from "antd";
import { connect } from "react-redux";
import Wrapper from "./styles";
import * as DashboardAction from "../../../redux/dashboard/actions";

class StatisticData extends Component {
  constructor(props) {
    super(props);
    this.props.retrieveStatistic();
  }

  render() {
    const {
      realtors,
      commissionAmount,
      properties,
      transactions,
      // statisticLoading,
    } = this.props;

    return (
      <Wrapper>
       
        <Row gutter={24}>
          <Col xs={24} md={12} lg={6}>
            <Card>
              <Statistic
                className="left-info"
                title="Tổng dự án"
                value={(properties && properties.total) || 0}
              />
              <div className="shift">
                <Statistic
                  className="right-info"
                  value={(properties && properties.growth) || 0}
                  precision={2}
                  valueStyle={{
                    color:
                      (properties && properties.growth > 0 && "#3f8600") ||
                      (properties && properties.growth < 0 && "#F94747") ||
                      "#000",
                  }}
                  prefix={
                    (properties && properties.growth > 0 && (
                      <Icon type="rise" />
                    )) ||
                    (properties && properties.growth < 0 && (
                      <Icon type="fall" />
                    )) || <Icon type="line" />
                  }
                  suffix="%"
                />
              </div>
            </Card>
          </Col>
          <Col xs={24} md={12} lg={6}>
            <Card>
              <Statistic
                className="left-info"
                title="Tổng hoa hồng (VND)"
                value={(commissionAmount &&`${commissionAmount.total/1000000} M` ) || 0}
              />
              <div className="shift">
                <Statistic
                  className="right-info"
                  value={(commissionAmount && commissionAmount.growth) || 0}
                  precision={2}
                  valueStyle={{
                    color:
                      (commissionAmount &&
                        commissionAmount.growth > 0 &&
                        "#3f8600") ||
                      (commissionAmount &&
                        commissionAmount.growth < 0 &&
                        "#F94747") ||
                      "#000",
                  }}
                  prefix={
                    (commissionAmount && commissionAmount.growth > 0 && (
                      <Icon type="rise" />
                    )) ||
                    (commissionAmount && commissionAmount.growth < 0 && (
                      <Icon type="fall" />
                    )) || <Icon type="line" />
                  }
                  suffix="%"
                />
              </div>
            </Card>
          </Col>
          <Col xs={24} md={12} lg={6}>
            <Card className="blur-blue">
              <Statistic
                className="left-info"
                title="Tổng giao dịch"
                value={(transactions && transactions.total) || 0}
              />
              <div className="shift">
                <Statistic
                  className="right-info"
                  value={(transactions && transactions.growth) || 0}
                  precision={2}
                  valueStyle={{
                    color:
                      (transactions && transactions.growth > 0 && "#3f8600") ||
                      (transactions && transactions.growth < 0 && "#F94747") ||
                      "#000",
                  }}
                  prefix={
                    (transactions && transactions.growth > 0 && (
                      <Icon type="rise" />
                    )) ||
                    (transactions && transactions.growth < 0 && (
                      <Icon type="fall" />
                    )) || <Icon type="line" />
                  }
                  suffix="%"
                />
              </div>
            </Card>
          </Col>
          <Col xs={24} md={12} lg={6}>
            <Card className="blur-blue">
              <Statistic
                className="left-info"
                title="Người môi giới"
                value={(realtors && realtors.total) || 0}
              />
              <div className="shift">
                <Statistic
                  className="right-info"
                  value={(realtors && realtors.growth) || 0}
                  precision={2}
                  valueStyle={{
                    color:
                      (realtors && realtors.growth > 0 && "#3f8600") ||
                      (realtors && realtors.growth < 0 && "#F94747") ||
                      "#000",
                  }}
                  prefix={
                    (realtors && realtors.growth > 0 && <Icon type="rise" />) ||
                    (realtors && realtors.growth < 0 && (
                      <Icon type="fall" />
                    )) || <Icon type="line" />
                  }
                  suffix="%"
                />
              </div>
            </Card>
          </Col>
        </Row>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => {
  const { statistic, statisticLoading } = state.dashboard;
  return {
    ...statistic,
    statisticLoading,
  };
};

const mapDispatchToProps = (dispatch) => ({
  retrieveStatistic: () => {
    dispatch(DashboardAction.getStatisticAction());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(StatisticData);
