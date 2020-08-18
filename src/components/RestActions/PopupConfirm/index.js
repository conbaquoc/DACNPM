import React from "react";
import { Popconfirm, Button } from "antd";
import PropTypes from "prop-types";

const PopupConfirm = props => {
  return (
    <Popconfirm
      title="Sure to delete the event?"
      okText="DELETE"
      cancelText="No"
      onConfirm={() => {
        props.handleDelete();
      }}
    >
      <Button icon="close" type="default" className="isoDeleteBtn" />
    </Popconfirm>
    
  );
};

PopupConfirm.propTypes = {
  handleDelete: PropTypes.func,
};


export default PopupConfirm;