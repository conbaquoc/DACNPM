import React from 'react';
import PropTypes from 'prop-types';
import I18n from 'i18next';
import { ButtonWrapper } from './styles';

const CustomEditButton = props => (
  <ButtonWrapper
    source={props.source}
    icon="edit"
    // resourcecustom={props.resourceCustom}
    onClick={() => props.gotoEditCustomPage(props.record ? props.record.id : '', props.resourceCustom)}
    >
    {I18n.t('button.edit')}
  </ButtonWrapper>
);

CustomEditButton.propTypes = {
  gotoEditCustomPage: PropTypes.func,
  record: PropTypes.object,
  source: PropTypes.string,
  resourceCustom: PropTypes.string,
};

CustomEditButton.defaultProps = {
  source: 'editCustom',
};

export default CustomEditButton;
