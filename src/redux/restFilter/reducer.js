import { makeReducerCreator} from '../../utils/reduxUtils';

import { REST_FILTER_ACTION_TYPES } from './actions';

const initialState = {
  errorRequest: false,
};
const search = (state, action) => {
  return {
    ...state,
    [action.resource]: {
      ...state[action.resource],
      ...action.filter,
    },
  };
};

const searchSuccess = (state, action) => {
  return {
    ...state,
    [action.resource]: { ...state[action.resource], ...action.data },
  };
};

const searchFailed = (state, { error }) => {
  return {
    ...state,
    error,
  };
};

export default makeReducerCreator(initialState, {
  [REST_FILTER_ACTION_TYPES.REST_SEARCH]: search,
  [REST_FILTER_ACTION_TYPES.REST_SEARCH_SUCCESS]: searchSuccess,
  [REST_FILTER_ACTION_TYPES.REST_SEARCH_FAILURE]: searchFailed,
});
