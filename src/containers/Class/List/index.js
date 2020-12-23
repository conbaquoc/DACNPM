/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
/* eslint-disable no-restricted-globals */
/* eslint-disable import/order */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/sort-comp */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-unused-vars */
import React, { Component, Link } from "react";
import {
  Table,
  Popconfirm,
  Button,
  Modal,
  Form,
  Input,
  Icon,
  message,
} from "antd";
import Highlighter from "react-highlight-words";
import { number } from "prop-types";
import { get, del, put, post } from "../../../api/utils";
import "./styles.css";
import { history } from "../../../redux/store";
import moment from "moment";
import Resizer from "react-image-file-resizer";

const { Column } = Table;
export default class ListClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      placeid: "",
      des: "",
      open: false,
      visible: false,
      visibleAdd: false,
      id: number,
      ids: [],
      searchText: "",
      searchedColumn: "",
      imageUrl: "",
      idpost: "",
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount = async () => {
    const res = await get("/posts");
    console.log(res);
    this.setState({
      results: res,
    });
  };

  openModal() {
    this.setState({ open: true, visible: true });
  }

  openModalAdd() {
    this.setState({ visibleAdd: true });
  }

  closeModalAdd() {
    this.setState({ visibleAdd: false });
  }

  closeModal() {
    this.setState({ open: false });
  }

  showModal = (record) => {
    this.setState({
      visible: true,
    });

    this.setState({
      id: record.id,
      description: record.description,
      title: record.title,
      imageUrl: record.imageUrl,
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  deleteUser = async (id) => {
    const res = await del(`/posts`, { id });
    this.handleCancel();
    this.componentDidMount();
  };

  handleUpdate = async () => {
    const { id, description, title, imageUrl } = this.state;
    const data = {
      id,
    };
    const dat = {
      title,
      description,
      imageUrl,
    };
    console.log(id);
    console.log(imageUrl)

    const res = await put(`/posts/${data.id}`, dat);
    this.handleCancel();
    this.componentDidMount();
  };

  confirm() {
    this.deleteUser();
  }

  cancel() {
    message.error("Click on No");
  }

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
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
    const { visible, id } = this.state;
    console.log(this.state.idpost);

    return (
      <div>
        <Button
          type="primary"
          style={{ marginBottom: "1em" }}
          onClick={() => history.push("/post/finpost")}
        >
          Add Post +
        </Button>
        <br />

        <Table dataSource={this.state.results} className="admin-table">
          <Column
            title="Title"
            dataIndex="title"
            key="title"
            width="8em"
            {...this.getColumnSearchProps("title")}
          />
          <Column
            title="Address"
            dataIndex="place.address"
            key="place.address"
            width="10em"
            // {...this.getColumnSearchProps("placeId")}
          />
          
          <Column
            title="Time Donate"
            dataIndex="dateDonate"
            key="dateDonate"
            width="9em"
            render={(dateDonate) => <>{moment(dateDonate).format("DD-MM-YYYY")}</>}
          />
          <Column
            title="Description"
            dataIndex="description"
            key="description"
            
          />

          <Column
            align="center"
            title="Delete"
            render={(text, record) => (
              <Popconfirm
                title="Are you sure delete this user?"
                onConfirm={() => {
                  this.deleteUser(record.id);
                }}
                onCancel={this.cancel}
                okText="Yes"
                cancelText="No"
              >
                <Button type="dashed" icon="delete" />
              </Popconfirm>
            )}
          />
          <Column
            title="Update"
            align="center"
            render={(text, record) => (
              <Button
                type="dashed"
                onClick={() => this.showModal(record)}
                icon="edit"
              />
            )}
          />
          <Column
            title="List"
            align="center"
            render={(text, record) => (
              <Button
                type="dashed"
                onClick={() =>
                  this.props.history.push({
                    pathname: "/post/regis",
                    data: record.placeId,
                  })}
                icon="unordered-list"
              />
            )}
          />
          <Column
            title="QR Code"
            align="center"
            render={(text, record) => (
              <Button
                type="dashed"
                onClick={() =>
                  this.props.history.push({
                    pathname: "/post/qrcode",
                    data: record.id,
                  })}
                icon="scan"
              />
            )}
          />
        </Table>
        <Modal
          visible={visible}
          title="Update Post"
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>,
            <Button key="submit" type="primary" onClick={this.handleUpdate}>
              Submit
            </Button>,
          ]}
        >
          <Form>
            <Form.Item
              name="title"
              rules={[{ required: true, message: "Please input title" }]}
            >
              <Input
                type="text"
                placeholder="Title"
                value={this.state.title}
                onChange={(text) => {
                  this.setState({ title: text.target.value });
                }}
              />
            </Form.Item>
            <Form.Item
              name="description"
              rules={[{ required: true, message: "Please input description" }]}
            >
              <Input
                type="text"
                placeholder="Description"
                value={this.state.description}
                onChange={(text) => {
                  this.setState({ description: text.target.value });
                }}
              />
              <br />
              <br />
              <Input
                type="file"
                onChange={(e) => {
                  this.uploadImage(e);
                }}
              />
              {this.state.imgs &&
          [...this.state.imgs].map((file) => (
            <img
              src={URL.createObjectURL(file)}
              style={{ width: "400px", height: "400px" }}
            />
          ))}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
