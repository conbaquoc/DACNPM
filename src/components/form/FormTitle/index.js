import React from 'react';
import PropTypes from 'prop-types';
import { IconWrapper as _IconWrapper } from './styles';
import Title from '../../common/Title';
// import IntlMessages from '../../utility/IntlMessages';

const FormTitle = props => {
  const { title, icon, required } = props;
  return title ? (
    <Title>
      {icon && <IconWrapper type={icon} />}
      {title}
      {required && <span>*</span>}
    </Title>
  ) : null;
};

FormTitle.propTypes = {
  title: PropTypes.any,
  icon: PropTypes.string,
  required: PropTypes.bool,
};
export const IconWrapper = _IconWrapper;

export default FormTitle;
