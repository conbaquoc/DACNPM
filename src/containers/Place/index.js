/* eslint-disable no-unused-expressions */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/button-has-type */
/* eslint-disable no-undef */
/* eslint-disable react/sort-comp */
/* eslint-disable object-shorthand */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */

import React, { Component } from "react";
import {
  Button,
  Table,
  Icon,
  Popconfirm,
  message,
  Form,
  Input,
  Modal,
  DatePicker,
} from "antd";
import { number } from "prop-types";
import Highlighter from "react-highlight-words";
import moment from "moment";
import { get, del, put, post } from "../../api/utils";

const { Column } = Table;
const onFinish = (values) => {
  console.log("Received values of form: ", values);
};
export default class Place extends Component {
  state = {
    idUser: null,

    searchText: "",
    searchedColumn: "",
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      visible: false,
      visibleAdd: false,
      results: [
        {
          id: number,
          address: "",
          date: "",
          description: "",
          city: "",
        },
      ],
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

  showModal = (record) => {
    this.setState({
      visible: true,
    });

    this.setState({
      address: record.address,
      id: record.id,
      typeBlood: record.typeBlood,
      date: record.date,
      city: record.city,
      description: record.description,
    });
    console.log("AAAAAA", record);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  componentDidMount = async () => {
    const res = await get("/places");
    console.log(res);
    const results = res;

    this.setState(results);
  };

  deleteUser = async (id) => {
    const res = await del(`/places`, { id });
    this.handleCancel();
    this.componentDidMount();
  };

  handleUpdate = async () => {
    const { date, city, address, description, id } = this.state;

    const dat = {
      id: id,
    };
    const data = {
      date: date,
      city: city,
      address: address,
      description: description,
    };
    console.log(data);

    const res = await put(`/places/${dat.id}`, data);
    this.componentDidMount();
    this.closeModalAdd();
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

  render() {
    const { visible, oneperson, visibleAdd, id } = this.state;

    return (
      <div className="all">
        <Table dataSource={this.state.results} bordered>
          <Column
            title="ID"
            dataIndex="id"
            key="id"
            {...this.getColumnSearchProps("id")}
          />
          <Column
            title="Address"
            dataIndex="address"
            key="address"
            {...this.getColumnSearchProps("address")}
          />
          <Column
            title="Date"
            dataIndex="date"
            key="date"
            {...this.getColumnSearchProps("date")}
            render={(date) => <>{moment(date).format("DD-MM-YYYY")}</>}
          />
          <Column
            title="Description"
            dataIndex="description"
            key="description"
          />
          <Column
            title="City"
            dataIndex="city"
            key="city"
            {...this.getColumnSearchProps("city")}
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
                <Button type="primary" icon="delete" />
              </Popconfirm>
            )}
          />
          <Column
            align="center"
            title="Update"
            render={(text, record) => (
              <Button
                type="primary"
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
          <Form initialValues={{ oneperson }} onFinish={onFinish}>
            <Form.Item
              name="date"
              rules={[{ required: true, message: "Please input Date" }]}
            >
              <Input
                type="text"
                placeholder="Date"
                value={this.state.date}
                onChange={(text) => {
                  console.log("AAAA", text);

                  console.log(text);
                  this.setState({ date: text.target.value });
                }}
              />
            </Form.Item>
            <Form.Item
              name="city"
              rules={[{ required: true, message: "Please input City" }]}
            >
              <Input
                type="text"
                placeholder="City"
                value={this.state.city}
                onChange={(text) => {
                  console.log("AAAA", text);
                  this.setState({ city: text.target.value });
                }}
              />
            </Form.Item>
            <Form.Item
              name="address"
              rules={[{ required: true, message: "Please input Address" }]}
            >
              <Input
                type="text"
                placeholder="Address"
                value={this.state.address}
                onChange={(text) => {
                  console.log("AAAA", text);
                  this.setState({ address: text.target.value });
                }}
              />
            </Form.Item>
            <Form.Item
              name="description"
              rules={[{ required: true, message: "Please input Description" }]}
            >
              <Input
                type="text"
                placeholder="Description"
                value={this.state.description}
                onChange={(text) => {
                  console.log("AAAA", text);
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
