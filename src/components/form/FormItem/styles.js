import styled from 'styled-components';
import { Form } from 'antd';

const FormItem = Form.Item;

export const FormItemWrapper = styled(FormItem)`
  .ant-form-item-label {
    label {
      color: ${({ theme }) => theme.palette.primary};
      font-size: 14px;
      &:after {
        content: '';
      }
    }
  }
  .labelDiff {
    color: black;
    font-size: 14px;
    &:after {
      content: '';
    }
  }
`;
