import React from 'react';
import PropTypes from 'prop-types';
import I18n from 'i18next';
import { Icon } from 'antd';
import { ButtonWrapper } from './styles';

const CreateButton = ({ header, gotoCreatePage, source, iconType }) => (
  <ButtonWrapper source={source} type="primary" onClick={gotoCreatePage}>
    <Icon type={iconType} />
    {I18n.t(header)}
  </ButtonWrapper>
);
CreateButton.propTypes = {
  gotoCreatePage: PropTypes.func,
  header: PropTypes.string,
  source: PropTypes.string,
};

CreateButton.defaultProps = {
  source: 'create',
  header: 'button.create',
  iconType: 'plus',
};

export default CreateButton;
