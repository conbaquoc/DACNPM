/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/sort-comp */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
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
  import { get, del, put, post } from "../../api/utils";
  import { history } from "../../redux/store";

  const { Column } = Table;
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
export default class district extends Component {
    constructor(props) {
        super(props);
        this.state = {
          results: "",
          name:"",
          
        };
      }

      openModal() {
        this.setState({ open: true, visible: true });
      }
    
      closeModal() {
        this.setState({ open: false });
      }
    
      openModalAdd() {
        this.setState({ visibleAdd: true });
      }
    
      closeModalAdd() {
        this.setState({ visibleAdd: false });
      }

    componentDidMount = async () => {
        const res = await get("/districts");
        console.log(res);
        this.setState({
          results: res,
        });
        console.log(this.state.results);
      };

      deleteDistricts = async (id) => {
        const res = await del(`/districts`, { id });
    
        this.componentDidMount();
      };

      handleUpdate = async () => {
        const { idUser, name } = this.state;
    
        const data = {
          name,
        };
        console.log("KKKKKKKKKK", idUser);
        const res = await put(`/districts/${idUser}`, data);
        
        this.componentDidMount();
        this.closeModalAdd();
      };

      confirm() {
        this.deleteDistricts();
      }
    
      cancel() {
        message.error("Click on No");
      }

      showModal = (record) => {
        this.setState({
          visible: true,
        });
    
        this.setState({
          name: record.name,
          idUser: record.id,
          
        });
        console.log("AAAAAA", record);
      };
    
      handleCancel = () => {
        this.setState({ visible: false });
      };

    render() {
        const { visible, oneperson, visibleAdd } = this.state;
        return (
          <div>
            <Button
              type="primary"
              style={{ marginBottom: "1em" }}
              onClick={() => history.push("/district/createdistrict")}
        >
              Add District +
            </Button>
            <Table dataSource={this.state.results} bordered>
              <Column title="District" dataIndex="name" key="name" />
              <Column title="City" dataIndex="city.name" key="city.name" />
              <Column
                align="center"
                title="Delete"
                render={(text, record) => (
                  <Popconfirm
                    title="Are you sure delete this District?"
                    onConfirm={() => {
                  this.deleteDistricts(record.id);
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
                align="center"
                title="Update"
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
              <Form onFinish={onFinish}>
                <Form.Item
                  name="name"
                  rules={[{ required: true, message: "Please input Name District" }]}
            >
                  <Input
                    type="text"
                    placeholder="Name District"
                    value={this.state.name}
                    onChange={(text) => {
                  console.log("AAAA", text);
                  this.setState({ name: text.target.value });
                }}
              />
                </Form.Item>
              </Form>
            </Modal>
          </div>
        )
    }
}
