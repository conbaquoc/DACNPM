import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import I18n from 'i18next';
import { ButtonWrapper } from './styles';

const { confirm } = Modal;

class DeleteButton extends Component {
  onOk = () => {
    const { deleteItem, record } = this.props;
    deleteItem(record.id);
  };

  handleDelete = () => {
    const { record, source } = this.props;
    
    confirm({
      title: I18n.t('popup.alertDelete'),
      content: this.props.customMessage || I18n.t('popup.alertDeleteDes', { customMessage: `(#${record.id})` }),
      okText: I18n.t('button.ok'),
      cancelText: I18n.t('button.cancel'),
      onOk: () => {
        this.onOk(source);
      },
      onCancel: () => {},
    });
  };

  render() {
    return (
      <div>
        {/* <Tooltip header={<IntlMessages id="tooltip.delete" />}> */}
        <ButtonWrapper icon="delete" onClick={this.handleDelete}>
          {I18n.t('button.delete')}
        </ButtonWrapper>
        {/* </Tooltip> */}
      </div>
    );
  }
}

DeleteButton.propTypes = {
  deleteItem: PropTypes.func,
  record: PropTypes.object,
  source: PropTypes.string,
};

DeleteButton.defaultProps = {
  source: 'delete',
};

export default DeleteButton;
