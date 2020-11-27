/* eslint-disable no-shadow */
/* eslint-disable no-restricted-globals */
/* eslint-disable import/order */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/sort-comp */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import {
  Tag,
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
import { useHistory } from "react-router-dom";
import { number } from "prop-types";
import { get, del, put, post } from "../../../api/utils";
import "./styles.css";

import { history } from "../../../redux/store";

const { Column } = Table;
export default class ListClass extends Component {
  state = {
    results: [
      {
        id: number,
        placeId: "",
        description: "",
      },
    ],
    searchText: "",
    searchedColumn: "",

    ids: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      placeid: "",
      des: "",
      open: false,
      visible: false,
      visibleAdd: false,
      id: number,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

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

  componentDidMount = async () => {
    const res = await get("/posts");
    console.log(res);
    const results = res;
    this.setState(results);
  };

  showModal = (record) => {
    this.setState({
      visible: true,
    });

    this.setState({
      id: record.id,
      description: record.description,
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  deleteUser = async (ids) => {
    console.log("TTTTTTTTT", ids);
    const res = await del(`/posts`, { ids });
    this.handleCancel();
    this.componentDidMount();
  };

  handleUpdate = async () => {
    const { id, description } = this.state;
    const data = {
      id,
    };
    const dat = {
      description,
    };
    console.log("BBBBBBBBBBBB", id);

    const res = await put(`/posts/${data.id}`, dat);
    this.handleCancel();
    this.componentDidMount();
  };

  handleCreate = async () => {
    const { placeid, des } = this.state;

    const dat = {
      description: des,
      placeId: placeid,
    };

    console.log("XXXXXXXXXX", dat);
    const res = await post("/posts", dat);
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
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
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

  render() {
    const { visible, visibleAdd, id } = this.state;
    console.log("XXXXXXXXXXXX", id);

    return (
      <div>
        <Button
          type="primary"
          style={{ marginBottom: "1em" }}
          onClick={() => history.push("/post/createpost")}
        >
          Add Post +
        </Button>
        <br />

        <Table dataSource={this.state.results} bordered className="admin-table">
          <Column title="ID" dataIndex="id" key="id" />
          <Column
            title="Place ID"
            dataIndex="placeId"
            key="placeId"
            {...this.getColumnSearchProps("placeId")}
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
                onConfirm={(onClick) => {
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
        </Table>

        <Modal
          visible={visible}
          title="Title"
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
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
