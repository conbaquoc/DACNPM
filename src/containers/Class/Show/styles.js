import styled from 'styled-components';

const FormWrapper = styled.div`
  width: 100%;
  background: white;
  padding: 15px;
  .filterContainer .filterContent {
    margin-right: 100px;
    padding-top: 10px
  }
  .filterContainer .filterActions {
    right: -210px;
    width: 200px;
  }

  .filterActions .ant-col-24 {
    width: 50%;
  }

  .filterContainer .clearButton {
    margin-top: 0;
  }
`;

export default FormWrapper;
