import styled from 'styled-components';

export const ComponentTitleWrapper = styled.h1`
  width: 100%;
  display: flex;
  white-space: nowrap;
  margin-top: 5px;
  @media only screen and (max-width: 767px) {
    ${''}
  }

  ${'' /* &:before {
    content: '';
    width: 5px;
    height: 40px;
    background-color: ${palette('secondary', 1)};
    display: flex;
    margin: ${props => (props['data-rtl'] === 'rtl' ? '0 0 0 15px' : '0 15px 0 0')};
    margin-right: 10px;
  }

  &:after {
    content: '';
    width: 100%;
    height: 1px;
    background-color: ${palette('secondary', 1)};
    display: flex;
    margin: ${props => (props['data-rtl'] === 'rtl' ? '0 15px 0 0' : '0 0 0 15px')};
  } */}
`;
