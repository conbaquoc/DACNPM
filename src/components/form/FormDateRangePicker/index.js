import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { DatePicker } from "antd";
import FormItem from "../FormItem";
import { DateRangePickerWrapper } from "./styles";

const { RangePicker } = DatePicker;
const FormDateRangePicker = (props) => {
  const {
    required,
    defaultValue,
    // initialValue
  } = props;
  
  return (
    <DateRangePickerWrapper>
      <FormItem
        {...props}
        valuePropName="value"
        formOptions={{
          getValueFromEvent: (e) => {
            return [moment(e[0]), moment(e[1])];
          },
          normalize: (value) => {
            if (value && value.length > 1) {
              return [moment(value[0]), moment(value[1])];
            }
            return undefined;
          },
        }}
        ruleType="array"
        defaultValue={
          defaultValue && [moment(defaultValue.$gte), moment(defaultValue.$lte)]
        }
        className="title"
        required={required}
      >
        <RangePicker format={["DD-MM-YYYY", "DD-MM-YYYY"]} />
      </FormItem>
    </DateRangePickerWrapper>
  );
};

FormDateRangePicker.propTypes = {
  source: PropTypes.string,
  header: PropTypes.any,
  required: PropTypes.bool,
  requiredMessage: PropTypes.node,
  icon: PropTypes.string,
  form: PropTypes.object,
  defaultValue: PropTypes.any,
  initialValue: PropTypes.object,
  formOptions: PropTypes.object,
};

FormDateRangePicker.defaultProps = {
  formOptions: {},
};

export default FormDateRangePicker;
