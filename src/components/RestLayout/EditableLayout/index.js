import React, { Component } from "react";
import { Input, InputNumber, Form, Switch } from "antd";

const EditableContext = React.createContext();

class EditableCell extends Component {
  getInput = () => {
    if (this.props.inputType === "number") {
      return <InputNumber />;
    }
    if (this.props.inputType === "switch") {
      return <Switch />;
    }
    return <Input />;
  };

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    if(editing) {
      if(inputType === "switch") {
        return (
          <td {...restProps}>
            <Form.Item style={{ margin: 0 }}>
              {getFieldDecorator(dataIndex, {
                    valuePropName: "checked",
                    initialValue: record[dataIndex],
                  })(this.getInput())}
            </Form.Item>
          </td>
        )
      } 
        return (
          <td {...restProps}>
            <Form.Item style={{ margin: 0 }}>
              {getFieldDecorator(dataIndex, {
            rules: [
              {
                required: true,
                message: `Vui lòng nhập ${title}!`,
              },
            ],
            initialValue: record[dataIndex],
          })(this.getInput())}
            </Form.Item>
          </td>
          
        )   
    }
      return (
        <td {...restProps}>{children}</td>
      )
  };

  render() {
    return (
      <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
    );
  }
}
Form.create()(EditableCell);

export { EditableContext, EditableCell };
