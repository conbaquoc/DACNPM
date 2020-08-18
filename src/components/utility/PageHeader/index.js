import React from 'react';
import PropTypes from 'prop-types';
import { ComponentTitleWrapper } from './style';
import Text from '../../common/Text';

const PageHeader = props => (
  <ComponentTitleWrapper className="isoComponentTitle">
    <Text type="h3">{props.children}</Text>
  </ComponentTitleWrapper>
);

PageHeader.propTypes = {
  children: PropTypes.any,
};

export default PageHeader;
