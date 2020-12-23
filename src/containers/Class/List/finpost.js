/* eslint-disable import/no-unresolved */
/* eslint-disable camelcase */
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
import { Select, Input, Button, DatePicker, Spin, Form } from "antd";
import moment from "moment";
import Resizer from "react-image-file-resizer";
import { get, post } from "../../../api/utils";
import { history } from "../../../redux/store";

const { Option } = Select;
const { TextArea } = Input;
const _ = "aaa";
export default class finpost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      title: "",
      description: "",
      placeId: "",
      imageUrl: "",
      dateDonate: "",
      loading: false,
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
  
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);
    const { title, description, placeId, imageUrl, dateDonate } = this.state;

    const dat = {
      title: title,
      description: description,
      placeId: placeId,
      imageUrl: imageUrl,
      dateDonate: dateDonate,
    };

    console.log("XXXXXXXXXX", dat);
    const res = await post("/posts", dat);
    console.log(dat.description);
    this.componentDidMount();
    history.push("/post");
  };

  resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  uploadImage = async (e) => {
    const file = e.target.files[0];
    this.setState({
      imgs: e.target.files,
    });

    const image = await this.resizeFile(file);
    console.log("ZZZZZZZZZZZZZ", image);
    // const base64 = await this.convertBase64(file);
    const imageC = image.slice(image.indexOf(",") + 1);
    console.log("IIIIIIIIIIIII", imageC);

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
   
    const { loading } = this.state;
    
    return (
      <div>
        <label>Date Donate</label>
        <br></br>
        
        <DatePicker
          onChange={(date, dateString) => {
            console.log("AAAAQQQ", dateString);
           
            console.log("LLL", dateString);
            this.setState({ dateDonate: dateString });
          }}
        />

        <br></br>
        <br></br>
        <label>Input Title:</label>

        <Input
          type="text"
          placeholder="Input Title"
          
          onChange={(text) => {
            
            this.setState({ title: text.target.value });
          }}
        />

        <label>Input Description:</label>
        <TextArea
          rows={5}
          type="text"
          placeholder="Input Description"
          onChange={(text) => {
           
            this.setState({ description: text.target.value });
          }}
        />
        <label>Select Place:</label>
        <br></br>
        <Select
          style={{ width: 200 }}
          name="placeId"
          onChange={(value) => {
            this.setState({ placeId: value });
          }}
          placeholder="Input Place"
        >
          {this.state.results.results &&
            this.state.results.results.map((d) => (
              <Option key={d.id}>{d.address}</Option>
            ))}
        </Select>
        <Button
          type="primary"
          style={{ marginLeft: "0.5em" }}
          onClick={() => history.push("/post/createpost")}
        >
          +
        </Button>
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
        {this.state.imgs &&
          [...this.state.imgs].map((file) => (
            <img
              src={URL.createObjectURL(file)}
              style={{ width: "400px", height: "400px" }}
            />
          ))}

        <br></br>

        <br></br>
        <Button
          type="primary"
          style={{ marginLeft: "600px" }}
          onClick={this.handleCreate}
          disabled={loading}

        >
          {loading && <Spin></Spin>}
          {loading && <span>Loading</span>}
          {!loading && <span>Create Post</span>}

        </Button>
      </div>
    );
  }
}
