import React from "react";
import PropTypes from "prop-types";
import { Input } from "antd";
import FormItem from "../../form/FormItem";
import { getRecordData } from "../../../utils/tools";
import { RestInputContext } from "../RestInputContext";

const RestInputItem = (props) => {
  const { record, form, handleSubmit } = props;
  return (
    <RestInputContext.Consumer>
      {() =>
        props.isReference ? (
          React.cloneElement(props.children, {
            record,
          })
        ) : (
          <FormItem
            {...props}
            form={form}
            defaultValue={
              props.defaultValue || getRecordData(record, props.source)
            }
          >
            {React.cloneElement(props.children, {
              record,
              handleSubmit,
            })}
          </FormItem>
        )}
    </RestInputContext.Consumer>
  );
};

RestInputItem.propTypes = {
  source: PropTypes.string,
  record: PropTypes.object,
  defaultValue: PropTypes.string,
  children: PropTypes.any,
};

RestInputItem.defaultProps = {
  children: <Input />,
};

export default RestInputItem;
