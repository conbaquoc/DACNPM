import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { DatePicker } from 'antd';
import FormItem from '../FormItem';
// import FormTitle from '../FormTitle';
import { DateTimePickerWrapper } from './styles';

const FormDateTimePicker = props => {
  const { required, defaultValue, initialValue  } = props;
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
        {/* {title && <FormTitle title={title} required={required} />} */}
        <DatePicker showTime format="ddd - MMM DD YYYY - HH:mm" className="viewDatePicker" />
      </FormItem>
    </DateTimePickerWrapper>
  );
};

FormDateTimePicker.propTypes = {
  source: PropTypes.string,
  header: PropTypes.any,
  required: PropTypes.bool,
  requiredMessage: PropTypes.node,
  icon: PropTypes.string,
  form: PropTypes.object,
  defaultValue: PropTypes.any,
  initialValue: PropTypes.object,
  formOptions: PropTypes.object,
  // title: PropTypes.string,
};

FormDateTimePicker.defaultProps = {
  formOptions: {},
};

export default FormDateTimePicker;
