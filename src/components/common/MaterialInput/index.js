import React, { PureComponent } from 'react';
import { Input } from 'antd';
import MaterialInputWrapper from './styles';

class MaterialInput extends PureComponent {
  componentDidMount() { }

  render() {
    const { placeholder, prefix, suffix, ...params } = this.props;
    return (
      <MaterialInputWrapper isPrefix={!!prefix} isSuffix={!!suffix}>
        {prefix}
        <span className="suffix">{suffix}</span>
        <label>{placeholder}</label>
        <span className="bar" />
        {params.type === 'password' ? (
          <Input.Password {...params} />
        ) : (
          <Input {...params} />
          )}
      </MaterialInputWrapper>
    );
  }
}

export default MaterialInput;
