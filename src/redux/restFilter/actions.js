import { makeConstantCreator, makeActionCreator } from '../../utils/reduxUtils';


export const REST_FILTER_ACTION_TYPES = makeConstantCreator(
  'REST_SEARCH',
  'REST_SEARCH_SUCCESS',
  'REST_SEARCH_FAILURE',
);
export const search = (resource, filter, isRefresh) =>
  makeActionCreator(REST_FILTER_ACTION_TYPES.REST_SEARCH, {
    resource,
    filter,
    isRefresh,
  });

export const searchSuccess = (resource, data) =>
  makeActionCreator(REST_FILTER_ACTION_TYPES.REST_SEARCH_SUCCESS, {
    resource,
    data,
  });

export const searchFailure = (resource, data) =>
  makeActionCreator(REST_FILTER_ACTION_TYPES.REST_SEARCH_FAILURE, {
    resource,
    data,
  });
