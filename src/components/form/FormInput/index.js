import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';
import FormTitle, { IconWrapper } from '../FormTitle';
// import IntlMessages from '../../utility/IntlMessages';

const FormItem = Form.Item;
const { TextArea } = Input;
const FormInput = props => {
  const {
    textArea,
    prefixIcon,
    source,
    valuePropName,
    title,
    required,
    requiredMessage,
    icon,
    placeholder,
    form,
    defaultValue,
    type,
    ruleType,
    disabled,
    rules,
    normalize,
    autosize,
    className,
    inputClassName,
    suffix,
    addonBefore,
    addonAfter,
    wrapInputClass,
    onBlur,
  } = props;
  return (
    <div id={placeholder}>
      <FormItem className={`boxInput ${className}`}>
        {title && <FormTitle title={title} icon={icon} required={required} />}
        <div style={{ position: 'relative' }} className={wrapInputClass}>
          {form.getFieldDecorator(source, {
              rules: [{ type: ruleType, required, message: requiredMessage }, ...rules],
              initialValue: defaultValue,
              valuePropName,
              normalize,
            })(
              textArea ? (
                <TextArea
                  autosize={autosize || { minRows: 4, maxRows: 10 }}
                  disabled={disabled}
                  type={type || 'text'}
                  placeholder={placeholder}
                  className={inputClassName}
                />
              ) : (
                <Input
                  prefix={prefixIcon ? <IconWrapper type={prefixIcon} /> : null}
                  suffix={suffix}
                  disabled={disabled}
                  type={type || 'text'}
                  placeholder={placeholder}
                  className={inputClassName}
                  addonBefore={addonBefore}
                  addonAfter={addonAfter}
                  onBlur={onBlur}
                />
              ),
            )}
        </div>
      </FormItem>
    </div>
  );
};

FormInput.propTypes = {
  source: PropTypes.string,
  title: PropTypes.any,
  required: PropTypes.bool,
  requiredMessage: PropTypes.node,
  icon: PropTypes.string,
  placeholder: PropTypes.string,
  form: PropTypes.object,
  defaultValue: PropTypes.any,
  disabled: PropTypes.bool,
  ruleType: PropTypes.string,
  valuePropName: PropTypes.string,
  rules: PropTypes.array,
  textArea: PropTypes.bool,
  prefixIcon: PropTypes.string,
  type: PropTypes.string,
  normalize: PropTypes.func,
  autosize: PropTypes.object,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  suffix: PropTypes.any,
  addonBefore: PropTypes.any,
  addonAfter: PropTypes.any,
  wrapInputClass: PropTypes.string,
  onBlur: PropTypes.func,
};
FormInput.defaultProps = {
  required: false,
  requiredMessage: 'The field is required',
  rules: [],
  valuePropName: 'value',
  placeholder: 'placeholder.undefined',
  format: data => data,
};

export default FormInput;
