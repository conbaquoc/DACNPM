/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/sort-comp */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-sequences */
/* eslint-disable object-shorthand */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prefer-stateless-function */
import React, { Component, useState } from "react";
import { Select, Input, Button, Upload, Modal, Icon } from "antd";
import { get, post } from "../../../api/utils";
import { history } from "../../../redux/store";

const { Option } = Select;

export default class finpost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      title: "",
      description: "",
      placeId: "",
      imageUrl: "",
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
    const { title, description, placeId, imageUrl } = this.state;

    const dat = {
      title: title,
      description: description,
      placeId: placeId,
      imageUrl: imageUrl,
    };

    console.log("XXXXXXXXXX", dat);
    const res = await post("/posts", dat);
    this.componentDidMount();
    history.push("/post");
  };

  uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await this.convertBase64(file);
    const imageC = base64.slice(base64.indexOf(",") + 1);

    this.setState({
      imageUrl: imageC,
    });
  };

  convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  render() {
    console.log("MMMMMMMMMMMM", this.state.placeId);
    console.log("TTTTTTTTTTT", this.state.imageUrl);
    return (
      <div>
        <label>Input Title:</label>
        <Input
          type="text"
          placeholder="Input Title"
          onChange={(text) => {
            console.log("AAAAQQQ", text);
            this.setState({ title: text.target.value });
          }}
        />
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
        <Input
          type="file"
          onChange={(e) => {
            this.uploadImage(e);
          }}
        />
        <br></br>

        <br></br>
        <Button type="primary" style={{marginLeft:"600px"}} onClick={this.handleCreate}>
          Create Post
        </Button>
      </div>
    );
  }
}
