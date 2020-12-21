/* eslint-disable array-callback-return */
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
} from "antd";
import { number } from "prop-types";
import Highlighter from "react-highlight-words";
import { get, del, put, post } from "../../../api/utils";

const { Column } = Table;
const onFinish = (values) => {
  console.log("Received values of form: ", values);
};
export default class ListUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      oneperson: {},
      idUser: "",
      fullName: "",
      typeBlood: "",
      avatar: "",
      open: false,
      visible: false,
      visibleAdd: false,
      password: "",
      name: "",
      phone: "",
      searchText: "",
      searchedColumn: "",
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
      fullName: record.fullName,
      idUser: record.id,
      typeBlood: record.typeBlood,
    });
    console.log("AAAAAA", record);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  componentDidMount = async () => {
    const res = await get('/admins/users');
    console.log(res);
    const result = res;

    result.map((e) => {
      if (e.role === 2) {
        e.status = "Mod";
      } else {
        e.status = "User";
      }
    });
    
    this.setState({
      res: result,
    });
  };

  deleteUser = async (idUser) => {
    console.log(idUser);
    const res = await del(`/admins/users/${idUser}`);
    this.componentDidMount();
  };

  handleUpdate = async () => {
    const { idUser, fullName, typeBlood } = this.state;

    const data = {
      fullName:fullName,
      typeBlood: typeBlood,
    };
    console.log("KKKKKKKKKK",idUser);
    const res = await put(`/admins/users/${idUser}`, data);
    this.componentDidMount();
  };

  confirm() {
    this.deleteUser();
    this.componentDidMount();
  }

  cancel() {
    message.error("Click on No");
  }

  handleCreate = async () => {
    const { name, phone, password } = this.state;

    const dat = {
      fullName: name,
      phoneNumber: phone,
      password: password,
    };

    console.log("XXXXXXXXXX", dat);
    const res = await post("/admins/register", dat);
    this.componentDidMount();
  };

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
    const { visible, oneperson, visibleAdd } = this.state;

    return (
      <div className="all">
        <Button
          type="primary"
          style={{ marginBottom: "1em" }}
          onClick={() => this.openModalAdd()}
        >
          Add User +
        </Button>
        <br />
        <Modal
          title="Add User"
          visible={visibleAdd}
          isOpen={() => this.openModalAdd()}
          onCancel={() => this.closeModalAdd()}
          footer={[
            <Button
              key="submit"
              type="submit"
              onClick={() => this.handleCreate()}
            >
              Submit
            </Button>,
          ]}
        >
          <Form>
            <Form.Item label="Full Name" rules={[{ required: true }]}>
              <Input
                type="text"
                onChange={(text) => {
                  console.log("AAAAQQQ", text);
                  this.setState({ name: text.target.value });
                }}
              />
            </Form.Item>
            <Form.Item label="Phone Number" rules={[{ required: true }]}>
              <Input
                type="text"
                onChange={(text) => {
                  console.log("AAAAQQQ", text);
                  this.setState({ phone: text.target.value });
                }}
              />
            </Form.Item>
            <Form.Item label="Password" rules={[{ required: true }]}>
              <Input
                type="password"
                onChange={(text) => {
                  console.log("AAAAQQQ", text);
                  this.setState({ password: text.target.value });
                }}
              />
            </Form.Item>
          </Form>
        </Modal>
        <Table dataSource={this.state.res} bordered>
          <Column
            title="Role"
            dataIndex="status"
            key="status"
            {...this.getColumnSearchProps("status")}
          />
          <Column
            title="Name"
            dataIndex="fullName"
            key="fullName"
            {...this.getColumnSearchProps("fullName")}
          />
          <Column
            title="SDT"
            dataIndex="phoneNumber"
            key="phoneNumber"
            {...this.getColumnSearchProps("phoneNumber")}
          />
          <Column
            title="Email"
            dataIndex="email"
            key="email"
            {...this.getColumnSearchProps("email")}
          />
          <Column title="City" dataIndex="district.name" key="district.name" />
          <Column title="Type Blood" dataIndex="typeBlood" key="typeBlood" />
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
              name="fullName"
              rules={[{ required: true, message: "Please input fullName" }]}
            >
              <Input
                type="text"
                placeholder="Full Name"
                value={this.state.fullName}
                onChange={(text) => {
                  console.log("AAAA", text);
                  this.setState({ fullName: text.target.value });
                }}
              />
            </Form.Item>
            <Form.Item
              name="typeBlood"
              rules={[{ required: true, message: "Please input Type Blood" }]}
            >
              <Input
                type="text"
                placeholder="Type Blood"
                value={this.state.typeBlood}
                onChange={(text) => {
                  console.log("AAAA", text);
                  this.setState({ typeBlood: text.target.value });
                }}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
