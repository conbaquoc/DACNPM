import styled from 'styled-components';
import { Icon } from 'antd';

export const DivWrapper = styled('div')`
  margin-bottom: 15px;
  font-size: 16px
`;
export const IconWrapper = styled(Icon)`
  color: ${props => props.theme.text};
  padding-right: 5px;
`;
