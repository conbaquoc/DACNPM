
import React from 'react';
import PropTypes from 'prop-types';
import Title from '../Title';
import Text from '../Text';
import { DivWrapper, IconWrapper } from './styles';


const TextField = props => {
  const { title, value, icon, className } = props;
  return title ? (
    <DivWrapper className={className}>
      <Title>
        {icon && <IconWrapper type={icon} />}
        {/* <Text type="text" style={{'lineHeight': '10px'}}>{title}</Text> */}
        {title}
      </Title>
      <Text type="body">{value}</Text>
    </DivWrapper>
  ) : (
    <Text type="body" className={className}>
      {value}
    </Text>
  );
};

TextField.propTypes = {
  className: PropTypes.string,
  title: PropTypes.node,
  value: PropTypes.any,
  icon: PropTypes.node,
};

export default TextField;

