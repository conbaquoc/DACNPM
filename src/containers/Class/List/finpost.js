/* eslint-disable no-sequences */
/* eslint-disable object-shorthand */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import { Select, Input, Button } from "antd";
import { get, post } from "../../../api/utils";
import { history } from "../../../redux/store";

const { Option } = Select;
export default class finpost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      description: "",
      placeId: "",
    };
  }

  componentDidMount = async () => {
    const res = await get("/places");
    console.log("HHHHHHH", res.results);
    this.setState({
      results: res,
    });
  };

  handleCreate = async () => {
    const { description, placeId } = this.state;

    const dat = {
        description: description,
        placeId : placeId,
      
    };

    console.log("XXXXXXXXXX", dat);
    const res = await post("/posts", dat);
    this.componentDidMount();
  };

  render() {
    console.log("MMMMMMMMMMMM", this.state.placeId);
    return (
      <div>
        <label>Input Description:</label>
        <Input
          type="text"
          placeholder="Input Description"
          onChange={(text) => {
            console.log("AAAAQQQ", text);
            this.setState({ description: text.target.value });
          }}
        />
        <label>Select Place ID:</label>
        <br></br>
        <Select
          style={{ width: 200 }}
          name="placeId"
          onChange={(value) => {
            this.setState({ placeId: value });
          }}
          placeholder="Input Place ID"
        >
          {this.state.results.results &&
            this.state.results.results.map((d) => (
              <Option key={d.id}>{d.id}</Option>
            ))}
        </Select>
        <br></br>
        <br></br>
        <Button type="primary" onClick={this.handleCreate , () => history.push("/post")}>Create Post</Button>
      </div>
    );
  }
}
