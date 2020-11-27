/* eslint-disable react/self-closing-comp */
/* eslint-disable no-sequences */
/* eslint-disable no-unused-vars */
/* eslint-disable react/sort-comp */
/* eslint-disable object-shorthand */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-undef */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import { Select, DatePicker, Input, Button} from "antd";
import { history } from "../../../redux/store";
import { get, post } from "../../../api/utils";


const { Option } = Select;
export default class createpost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      date:"",
      city: "",
      address:"",
      description:"",

    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount = async () => {
    const res = await get("/cities");
    console.log("HHHHHHH", res.results);
    this.setState({
      results: res,
    });
  };

  handleChange(e) {
    this.setState({ city: e.target.value });
    
  };

  handleCreate = async () => {
    const { date, city, address, description } = this.state;

    const dat = {
      date: date,
      city: city,
      address: address,
      description: description,
      
    };

    console.log("XXXXXXXXXX", dat);
    const res = await post("/places", dat);
    this.componentDidMount();
  };

  render() {
    console.log("AAAAAAA", this.state.date);
    console.log("LLLLLLLL",this.state.city);
    return (
      <div>
        <label>Input Date:</label>
        <br />
        <DatePicker
          onChange={(date, dateString) => {
                  console.log("AAAAQQQ", date);
                  this.setState({ date: dateString });
                }}
          
              />
        <br />
        <label>Input City:</label>
        <br />
        <Select
          style={{ width: 120 }}
          name="city"
          onChange={value => {
                this.setState({ city: value });
              }}
          
          placeholder="Input City"
        >
          {this.state.results.results &&
            this.state.results.results.map((d) => (
              <Option key={d.name}>{d.name}</Option>
            ))}
        </Select>
        <br />
        <label>Input Address:</label>
        <Input
          type="text"
          placeholder="Input Address"
          onChange={(text) => {
                  console.log("AAAAQQQ", text);
                  this.setState({ address: text.target.value });
                }}
              />
        <br />
        <label>Input Description:</label>
        <Input
          type="text"
          placeholder="Input Description"
          onChange={(text) => {
                  console.log("AAAAQQQ", text);
                  this.setState({ description: text.target.value });
                }}
              />
        <Button type="ghost" onClick={this.handleCreate}>Confirm</Button>
        <br></br>
        <Button type="primary" onClick={() => history.push("/post/finpost")}>Next</Button>
      </div>
    );
  }
}
