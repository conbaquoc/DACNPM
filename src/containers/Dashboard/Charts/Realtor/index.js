import React, { Component } from "react";
import Chart from "react-apexcharts";
import { Card, DatePicker, Popover, Button } from "antd";
import Wrapper, { FilterContentWrapper, TitleContentWrapper } from "./styles";


const { MonthPicker } = DatePicker;

export default class RealtorChart extends Component {
  constructor(props) {
    super(props);
    this.props.retrieveCharts({ resource: "realtors" });

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
    this.props.retrieveCharts({ resource: "realtors", filter });
  };

  render() {
    const { realtors } = this.props;
    let dataset = [];
    let categories = [];
    if (realtors && realtors.length > 0) {
      dataset = realtors.map((e) => e.total);
      categories = realtors.map((e) => `${e.month}/${e.year}`);
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
          title="Người môi giới"
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
  const { realtors, chartDataLoading } = state.dashboard;
  return { realtors, chartDataLoading };
};



