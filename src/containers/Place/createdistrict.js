/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { Select, Input, Button, DatePicker, Spin, Form } from "antd";
import moment from "moment";

import { get, del, put, post } from "../../api/utils";
import { history } from "../../redux/store";

const { Option } = Select;
export default class createdistrict extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: "",
      name: "",
      
      cityId:"",
    };
  }

  componentDidMount = async () => {
    const res = await get("/cities");
    console.log("HHHHHHH", res);
    this.setState({
      results: res,
    });
  };

  handleCreate = async () => {
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);
    const { cityId, name } = this.state;

    const data = {
        name,
        cityId,
      
    };

   
    const res = await post(`/districts`, data);
    
    this.componentDidMount();
    history.push("/district");
  };

  render() {
    console.log(this.state.cityId);
    return (
      <div>
        <label>Select City:</label>
        <br />
        <Select
          style={{ width: 200 }}
          name="cityId"
          onChange={(value) => {
            this.setState({ cityId: value });
          }}
          placeholder="Input City"
        >
          {this.state.results &&
            this.state.results.map((d) => <Option key={d.id}>{d.name}</Option>)}
        </Select>
        <br />
        <label>Input District:</label>

        <Input
          type="text"
          placeholder="Input District"
          
          onChange={(text) => {
            
            this.setState({ name: text.target.value });
          }}
        />
        <br />
        <br />
        <Button
          type="primary"
          style={{ marginLeft: "600px" }}
          onClick={this.handleCreate}
          

         >
          Create 
        </Button>
      </div>
    );
  }
}
