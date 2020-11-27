import React from "react";
import PropTypes from "prop-types";
// import FormItem from "../FormItem";
import { Form } from 'antd';
import Editor from "../../common/Editor"
import { getRecordData } from "../../../utils/tools";
import Wrapper from "./styles"
// import { RestInputContext } from "../../RestInput/RestInputContext";

const FormItem = Form.Item;

const FormEditor = (props) => {
  const { record, form, source, label } = props;
  return (
    <Wrapper>
      <FormItem label={label}>
        {form.getFieldDecorator(props.source, {
      })(
        <Editor
          content={
            props.defaultValue || getRecordData(record, source)
          }
        />,
      )}
      </FormItem>
    </Wrapper>
    
  );
};

FormEditor.propTypes = {
  source: PropTypes.string,
  record: PropTypes.object,
  defaultValue: PropTypes.string,
};

export default FormEditor;
