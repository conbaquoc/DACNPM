import React from 'react';
import PropTypes from 'prop-types';
import I18n from 'i18next';
import { FormItemWrapper } from './styles';

const FormItemUI = props => {
  const {
    source,
    header,
    required,
    requiredMessage,
    form,
    defaultValue,
    ruleType,
    rules,
    children,
    valuePropName,
    errorMessageType,
    className,
    formOptions,
    disabled,
    label,
  } = props;
  // console.log(props);
  return (
    <FormItemWrapper className={className} label={header? I18n.t(header): label}>
      {form.getFieldDecorator(source, {
        rules: [
          { required, message: requiredMessage },
          ruleType !== undefined && { type: ruleType, message: errorMessageType },
          ...rules,
        ],
        valuePropName,
        initialValue: defaultValue && defaultValue !== 'undefined' ? defaultValue : undefined,
        ...formOptions,
      })(
        React.cloneElement(children, {
          disabled,
        }),
      )}
    </FormItemWrapper>
  );
};

FormItemUI.propTypes = {
  source: PropTypes.string,
  header: PropTypes.any,
  required: PropTypes.bool,
  requiredMessage: PropTypes.node,
  form: PropTypes.object,
  defaultValue: PropTypes.any,
  rules: PropTypes.array,
  valuePropName: PropTypes.string,
  ruleType: PropTypes.string,
  children: PropTypes.node,
  errorMessageType: PropTypes.string,
  className: PropTypes.string,
  formOptions: PropTypes.object,
  disabled: PropTypes.bool,
  label: PropTypes.string,
};
FormItemUI.defaultProps = {
  required: false,
  requiredMessage: 'The field is required',
  errorMessageType: 'The field is error format.',
  rules: [],
  valuePropName: 'value',
  formOptions: {},
  disabled: false,
};

export default FormItemUI;
