import React, { Component } from "react";
import { Button } from "antd";
import Modal from "../../common/Modal";

export default class ModalConfirm extends Component {
  handleCancel = () => {
    this.props.handleAction(false);
  };

  handleOk = () => {
    this.props.handleAction(true);
  };

  render() {
    const { label, visible, loading } = this.props;
    return (
      <Modal
        title={`${label} event`}
        visible={visible}
        okText={label}
        footer={[
          <Button key="cancel" onClick={this.handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={this.handleOk}
          >
            Submit
          </Button>,
        ]}
      >
        <p>
          Are you sure for your action (this cannot be changed later!)
        </p>
      </Modal>
    );
  }
}
