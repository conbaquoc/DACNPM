import React from 'react';
import { ButtonWrapper } from './styles';

const Button = props => <ButtonWrapper {...props}>{props.children}</ButtonWrapper>;
Button.propTypes = {};

export default Button;
