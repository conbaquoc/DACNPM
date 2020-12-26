/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import React, { Component } from "react";
import axios from "axios";
// import { post } from "../../../api/utils";
import {Button} from 'antd'
import { history } from "../../../redux/store";

export default class qrcode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      base: '',
    };
  }

  componentDidMount = () => {
    const accessToken = localStorage.getItem("token");
    console.log(accessToken);
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const data = {
        id: this.props.location.data,
    }
    axios.post('http://13.212.220.243:8080/api/v1/posts/QRCode', data, {headers} ).then(res => this.setState({base: res.data}))
  }
    

    

  render() {
    console.log(this.props.location.data);
    console.log(this.state.base);
    return (
      <div>
        <Button onClick={() => history.push("/post")} type="primary" >Back</Button>
        <img src={this.state.base} width="300" height="300" style={{marginLeft:"30em"}} />
      </div>
    );
  }
}
