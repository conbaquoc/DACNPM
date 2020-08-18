import { ModalTypes } from './actions';
import { makeReducerCreator } from '../../utils/reduxUtils';

export const initialState = {
    current: null,
};

const showModal = (state, { data }) => {
  return {
    current: data,
  };
};

const closeModal = () => {
    return {
        current: null,
    };
  };

export default makeReducerCreator(initialState, {
  [ModalTypes.SHOW_MODAL]: showModal,
  [ModalTypes.CLOSE_MODAL]: closeModal,
});
