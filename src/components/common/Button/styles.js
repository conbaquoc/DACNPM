import styled from 'styled-components';
import { Button } from 'antd';

export const ButtonWrapper = styled(Button)`
  border: 1px solid ${({ theme }) => theme.palette.lightPrimary};
  color: ${({ theme }) => theme.palette.lightPrimary};
  height: 32px;
  border-radius: 2px;
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
`;
