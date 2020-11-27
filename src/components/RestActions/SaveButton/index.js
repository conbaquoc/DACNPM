import React from 'react';
import { ButtonWrapper } from './styles';
import { RestInputContext } from '../../RestInput/RestInputContext';

const SaveButton = props => (
  <RestInputContext.Consumer>
    {({ handleSubmit }) => <ButtonWrapper {...props} icon="save" onClick={() => handleSubmit()} />}
  </RestInputContext.Consumer>
);

SaveButton.propTypes = {};

SaveButton.defaultProps = {};

export default SaveButton;
