import React from 'react';
import PropTypes from 'prop-types';
import { Form, Switch } from 'antd';
import FormTitle from '../FormTitle';
// import IntlMessages from '../../utility/IntlMessages';
import { PlaceholderWrapper } from './styles';

const FormItem = Form.Item;
const FormSwitch = props => {
  const {
    source,
    title,
    required,
    requiredMessage,
    icon,
    form,
    defaultValue,
    disabled,
    rules,
    placeholder,
    label,
  } = props;
  return (
    <FormItem label={label}>
      {title && <FormTitle title={title} icon={icon} required={required} />}
      <PlaceholderWrapper>
        {placeholder && (
          <span className="txtPlaceholder">
            {/* <IntlMessages id={placeholder} /> */}
            {placeholder}
          </span>
        )}
        {form.getFieldDecorator(source, {
          rules: [{ required, message: requiredMessage }, ...rules],
          valuePropName: 'checked',
          initialValue: defaultValue,
        })(<Switch disabled={disabled} />)}
      </PlaceholderWrapper>
    </FormItem>
  );
};

FormSwitch.propTypes = {
  source: PropTypes.string,
  title: PropTypes.any,
  required: PropTypes.bool,
  requiredMessage: PropTypes.node,
  icon: PropTypes.string,
  placeholder: PropTypes.string,
  form: PropTypes.object,
  defaultValue: PropTypes.any,
  disabled: PropTypes.bool,
  rules: PropTypes.array,
  label: PropTypes.string,
};
FormSwitch.defaultProps = {
  defaultValue: true,
  rules: [],
};

export default FormSwitch;
