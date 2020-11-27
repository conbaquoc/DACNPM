import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { DatePicker } from 'antd';
import FormItem from '../FormItem';
import { DateTimePickerWrapper } from './styles';

const FormDatePicker = props => {
  const { required, defaultValue, initialValue } = props;
  return (
    <DateTimePickerWrapper>
      <FormItem
        {...props}
        formOptions={{
          getValueFromEvent: value => value.toISOString(),
          normalize: value => moment(value),
        }}
        ruleType="object"
        defaultValue={moment(defaultValue || initialValue)}
        className="title"
        required={required}
      >
        <DatePicker format="ddd - MMM DD YYYY" className="viewDatePicker" />
      </FormItem>
    </DateTimePickerWrapper>
  );
};

FormDatePicker.propTypes = {
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

FormDatePicker.defaultProps = {
  formOptions: {},
};

export default FormDatePicker;
