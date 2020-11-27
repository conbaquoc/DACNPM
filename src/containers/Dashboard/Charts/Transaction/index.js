import React, { Component } from "react";
import Chart from "react-apexcharts";
import { Card, DatePicker, Button, Popover, Form } from "antd";
import { connect } from "react-redux";
import Wrapper, { FilterContentWrapper, TitleContentWrapper } from "./styles";
import * as DashboardAction from "../../../../redux/dashboard/actions";

const { MonthPicker } = DatePicker;

class TransactionChart extends Component {
  constructor(props) {
    super(props);

    this.props.retrieveCharts({ resource: "transactions" });

    this.options = {
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 1,
      },
      tooltip: {
        x: {
          show: false,
        },
        y: {
          title: false,
        },
      },
      chart: {
        toolbar: {
          show: true,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: false,
            customIcons: [],
          },
          autoSelected: "zoom",
        },
      },
      noData: {
        text: "Không có dữ liệu để hiển thị",
        align: "center",
        verticalAlign: "middle",
        offsetX: 0,
        offsetY: 0,
        style: {
          fontSize: "14px",
        },
      },
    };
  }

  
  applyFilter = async () => {
    const values = await this.props.form.getFieldsValue();
    const { from, to } = values;
    const filter = {
      from: (from && from.toDate()) || null,
      to: (to && to.toDate()) || null,
    };
    this.props.retrieveCharts({ resource: "transactions", filter });
  };

  render() {
    const { transactions } = this.props;
    let dataset = [];
    let categories = [];
    if (transactions && transactions.length > 0) {
      dataset = transactions.map((e) => e.total);
      categories = transactions.map((e) => `${e.month}/${e.year}`);
    }

    const series = [
      {
        name: "Số lượng",
        data: dataset,
      },
    ];
    const { getFieldDecorator } = this.props.form;

    const extraFilter = (
      <FilterContentWrapper>
        {getFieldDecorator("from")(<MonthPicker placeholder="From" />)}
        {getFieldDecorator("to")(<MonthPicker placeholder="To" />)}
      </FilterContentWrapper>
    );

    const popoverTitle = (
      <TitleContentWrapper>
        <span>Lọc theo tháng</span>
        <Button type="link" onClick={this.applyFilter}>
          OK
        </Button>
      </TitleContentWrapper>
    );
    return (
      <Wrapper>
        <Card
          title="Giao dịch"
          extra={(
            <Popover
              placement="bottomRight"
              title={popoverTitle}
              content={extraFilter}
              trigger="click"
            >
              <Button icon="filter" />
            </Popover>
          )}
        >
          <Chart
            options={{
              ...this.options,
              xaxis: {
                type: "string",
                categories,
              },
            }}
            series={series}
            type="area"
            height={350}
          />
        </Card>
      </Wrapper>
    );
  }
}
const mapStateToProps = (state) => {
  const { transactions, chartDataLoading } = state.dashboard;
  return { transactions, chartDataLoading };
};

const mapDispatchToProps = (dispatch) => ({
  retrieveCharts: (filterParams) => {
    dispatch(DashboardAction.getChartAction(filterParams));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(TransactionChart));

