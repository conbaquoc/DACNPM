import styled from 'styled-components';
import { Modal } from 'antd';

export const ModalWrapper = styled(Modal)`
  max-height: 90%;
  min-height: 30%;
  .ant-modal-header {
    background: #fff;
    border-bottom: 1px solid #f7f8fb;
    color: #6AA8FF;
  }
  .ant-modal-content {
    background: #f7f8fb;
    padding-top: 60px;
  }
  .ant-modal-title {
    color: #6AA8FF;
    font-size: 35px;
  }
  .ant-modal-close,
  .ant-modal-close-icon {
    display: none;
  }
  .ant-input,
  .ant-select-selection,
  .ant-input-number,
  .ant-select-dropdown-menu-item,
  .ant-select-dropdown-menu,
  .ant-select-dropdown,
  .ant-select-clear-icon,
  .ant-select-dropdown-menu-vertical {
    background: #fff;
    border: 1px solid rgba(212, 210, 244, 0.5);
    &:hover,
    &:focus,
    &:active {
      border: 1px solid rgba(212, 210, 244, 0.5);
    }
  }
  textarea {
    background: #fff;
    border: none;
    &:hover,
    &:focus,
    &:active {
      border: 1px solid rgba(212, 210, 244, 0.5);
    }
  }
  .ant-select-selection__clear {
    background-color: transparent;
    color: white;
    border-radius: 5px;
  }
  .ant-select-arrow-icon {
    background-color: transparent;
  }
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .ant-modal-footer {
    border-top: 1px solid #f7f8fb;
  }

  .ant-modal-body {
    padding: 10px 24px;
  }

  .ant-tabs-bar {
    border-bottom: none;
    padding-bottom: 10px;
    margin-bottom: 30px;
    border-bottom: 1px solid #f7f8fb;
  }
  .ant-tabs-tab {
    color: #000;
  }
  .ant-list {
    margin-top: 20px;
    overflow: auto;
    max-height: 460px;
  }
  div::-webkit-scrollbar-thumb {
    border-radius: 3px !important;
    background: #788195 !important;
    box-shadow: 1px 1px 2px 0 rgba(0, 0, 0, 0.5) !important;
  }
  div::-webkit-scrollbar-track {
    border-radius: 3px !important;
    background: #D8D8D8 !important;
  }
  div::-webkit-scrollbar-thumb:hover {
    border-radius: 3px !important;
    background: #788195 !important;
    box-shadow: 1px 1px 2px 0 rgba(0, 0, 0, 0.5) !important;
  }
  div::-webkit-scrollbar {
    width: 6px;
    border-radius: 3px !important;
    background: #D8D8D8 !important;
  }
  .ant-list-split .ant-list-item {
    border-bottom: none;
    padding: 1px 0px;
  }
  .ant-list-empty-text {
    color: #000;
  }
  .modalTitle {
    background: #0051FF;
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .ant-form-item {
    margin-bottom: 0px;
    margin-right: -1px;
  }
`;
