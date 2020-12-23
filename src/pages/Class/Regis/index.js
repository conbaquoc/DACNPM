/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import { Button, Table } from "antd";
import moment from 'moment';
import { get } from "../../../api/utils";
import { history } from "../../../redux/store";

const { Column } = Table;
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
    };
  }

  componentDidMount = async () => {
    const res = await get(
      `/registers/many/${this.props.location.data}`,
      this.props.location.data,
    );

    const result = res.results;

    result.map((e) => {
      if (e.isDonate === 0) {
        e.status = "Chưa Hiến";
      } else {
        e.status = "Đã Hiến";
      }
    });
    result.map((e) => {
      
        e.posts.dateDonate = moment(e.posts.dateDonate).fromNow();
       
    });
    console.log("sadsadsadsad", result);
    this.setState({
      results: result,
    });
  };

  render() {
    console.log(this.props.location.data);
    console.log("MMMMMMMM",this.state.results.posts);

    return (
      <div>
        <Button
          onClick={() => history.push("/post")}
          icon="rollback"
          type="primary"
        >
          Back
        </Button>
        <br />
        <br />
        <Table dataSource={this.state.results} className="admin-table">
          <Column
            title="Name"
            dataIndex="users.fullName"
            key="users.fullName"
          />
          <Column
            title="Address"
            dataIndex="users.address"
            key="users.address"
          />
          <Column
            title="Phone Number"
            dataIndex="users.phoneNumber"
            key="users.phoneNumber"
          />
          <Column title="Amount" dataIndex="amount" key="amount" />
          <Column title="Tình Trạng" dataIndex="status" key="status " />
          
          <Column title="Lần hiến gần nhất" dataIndex="posts.dateDonate" key="posts.dateDonate" />
          
        </Table>
      </div>
    );
  }
}
