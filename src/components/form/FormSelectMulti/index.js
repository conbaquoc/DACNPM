import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { map, isObject } from 'lodash';
import { Form, Select } from 'antd';
import i18n from 'i18next';
// import WayPoint from 'react-waypoint';
import FormTitle from '../FormTitle';
// import IntlMessages from '../../utility/IntlMessages';
import { getRecordData, onSearch as onChangeSearch  } from '../../../utils/tools';
import LoadingComponent from '../../common/Loading';

const FormItem = Form.Item;
const { Option } = Select;

class FormSelect extends Component {
  onSelectOption = (inputValue, option) => {
    if (
      onChangeSearch(
        isObject(option.props.children)
          ? getRecordData(
              option.props.children.props && option.props.children.props.record,
              this.props.searchKey,
            )
          : option.props.children,
        inputValue,
      )
    ) {
      return option.props.value;
    }

    if (this.props.addSelect) {
      this.props.resourceData.push({ valueProp: inputValue, titleProp: inputValue });
      return inputValue;
    }
    return null;
  };

  render() {
    const {
      source,
      title,
      required,
      requiredMessage,
      icon,
      placeholder,
      form,
      defaultValue,
      disabled,
      resourceData,
      valueProp,
      titleProp,
      children,
      rules,
      format,
      loading,
      // onEnter,
      onSearch,
    } = this.props;
    return (
      <div>
        <FormItem>
          {title && <FormTitle title={title} icon={icon} required={required} />}
          {form.getFieldDecorator(source, {
              rules: [{ required, message: requiredMessage, type: 'array' }, ...rules],
              initialValue: defaultValue,
            })(
              <Select
                disabled={disabled}
                mode="multiple"
                placeholder={i18n.t(placeholder)}
                filterOption={this.onSelectOption}
                onSearch={value => onSearch(value)}
              >
                {map(format ? format(resourceData) : resourceData, data => {
                  return children ? (
                    <Option
                      key={getRecordData(data, valueProp)}
                      value={valueProp ? getRecordData(data, valueProp) : data}
                    >
                      {React.cloneElement(children, {
                        key: getRecordData(data, valueProp),
                        record: data,
                        valueProp: getRecordData(data, valueProp),
                        titleProp: getRecordData(data, titleProp),
                      })}
                    </Option>
                  ) : (
                    <Option
                      key={getRecordData(data, valueProp)}
                      value={valueProp ? getRecordData(data, valueProp) : data}
                    >
                      {getRecordData(data, titleProp)}
                    </Option>
                  );
                })}
                <Option key="loading" disabled value="loadingTracking">
                  {loading && <LoadingComponent />}
                  {/* <WayPoint onEnter={onEnter} /> */}
                </Option>
              </Select>,
            )}
        </FormItem>
      </div>
    );
  }
}

FormSelect.propTypes = {
  source: PropTypes.string,
  title: PropTypes.any,
  required: PropTypes.bool,
  requiredMessage: PropTypes.node,
  icon: PropTypes.string,
  placeholder: PropTypes.string,
  form: PropTypes.object,
  defaultValue: PropTypes.any,
  disabled: PropTypes.bool,
  resourceData: PropTypes.any,
  valueProp: PropTypes.string,
  titleProp: PropTypes.string,
  children: PropTypes.node,
  rules: PropTypes.array,
  format: PropTypes.func,
  loading: PropTypes.bool,
  // onEnter: PropTypes.func,
  onSearch: PropTypes.func,
  searchKey: PropTypes.string,
  addSelect: PropTypes.bool,
};
FormSelect.defaultProps = {
  required: false,
  requiredMessage: 'The field is required',
  placeholder: 'placeholder.undefined',
  rules: [],
};

export default FormSelect;
