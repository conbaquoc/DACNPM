import { makeActionCreator, makeConstantCreator } from '../../utils/reduxUtils';

export const REST_ACTION_TYPES = makeConstantCreator(
  'RETRIEVE_LIST',
  'RETRIEVE_LIST_SUCCESS',
  'RETRIEVE_LIST_FAILED',

  'RETRIEVE_ONE_RECORD',
  'RETRIEVE_ONE_RECORD_SUCCESS',
  'RETRIEVE_ONE_RECORD_FAILED',

  'DELETE_RECORD',
  'DELETE_RECORD_SUCCESS',
  'DELETE_RECORD_FAILED',

  'CANCEL_RECORD',
  'CANCEL_RECORD_SUCCESS',
  'CANCEL_RECORD_FAILED',

  'CONFIRM_RECORD',
  'CONFIRM_RECORD_SUCCESS',
  'CONFIRM_RECORD_FAILED',

  'EDIT_MULTI_RECORD',
  'EDIT_RECORD',
  'EDIT_RECORD_SUCCESS',
  'EDIT_RECORD_FAILED',

  'CREATE_RECORD',
  'CREATE_RECORD_SUCCESS',
  'CREATE_RECORD_FAILED',

  'SEARCH_MEMBER',
  'SEARCH_MEMBER_SUCCESS',
  'SEARCH_MEMBER_FAILED',

  'RETRIEVE_REFERENCE',
  'RETRIEVE_REFERENCE_SUCCESS',
  'RETRIEVE_REFERENCE_FAILED',

  'CUSTOM_QUERY_ONE_RECORD',
  'CUSTOM_QUERY_ONE_RECORD_SUCCESS',
  'CUSTOM_QUERY_ONE_RECORD_FAILED',

  'CLEAR_DATA',
  'SET_CURRENT_DATA',

  'EXPORT_EXCEL',
  'EXPORT_EXCEL_SUCCESS',
  'EXPORT_EXCEL_FAILED',
);

export const retrieveList = (resource, filter, isClear) =>
  makeActionCreator(REST_ACTION_TYPES.RETRIEVE_LIST, {
    resource,
    filter,
    isClear,
  });
export const retrieveListSuccess = (resource, data) =>
  makeActionCreator(REST_ACTION_TYPES.RETRIEVE_LIST_SUCCESS, {
    resource,
    data,
  });
export const retrieveListFailed = (resource, error) =>
  makeActionCreator(REST_ACTION_TYPES.RETRIEVE_LIST_FAILED, { resource, error });

export const retrieveOneRecord = (resource, id) =>
  makeActionCreator(REST_ACTION_TYPES.RETRIEVE_ONE_RECORD, { resource, id });
export const retrieveOneRecordSuccess = (resource, data) =>
  makeActionCreator(REST_ACTION_TYPES.RETRIEVE_ONE_RECORD_SUCCESS, {
    resource,
    data,
  });
export const retrieveOneRecordFailed = error =>
  makeActionCreator(REST_ACTION_TYPES.RETRIEVE_ONE_RECORD_FAILED, error);

export const deleteRecord = (resource, id) =>
  makeActionCreator(REST_ACTION_TYPES.DELETE_RECORD, { resource, id });
export const deleteRecordSuccess = (resource, data) =>
  makeActionCreator(REST_ACTION_TYPES.DELETE_RECORD_SUCCESS, {
    resource,
    data,
  });
export const deleteRecordFailed = error =>
  makeActionCreator(REST_ACTION_TYPES.DELETE_RECORD_FAILED, error);

export const cancelRecord = (resource, id) =>
  makeActionCreator(REST_ACTION_TYPES.CANCEL_RECORD, { resource, id });
export const cancelRecordSuccess = (resource, data) =>
  makeActionCreator(REST_ACTION_TYPES.CANCEL_RECORD_SUCCESS, {
    resource,
    data,
  });
export const cancelRecordFailed = error =>
  makeActionCreator(REST_ACTION_TYPES.CANCEL_RECORD_FAILED, error);

export const confirmRecord = (resource, id, data) =>
  makeActionCreator(REST_ACTION_TYPES.CONFIRM_RECORD, { resource, id, data });
export const confirmRecordSuccess = (resource, data) =>
  makeActionCreator(REST_ACTION_TYPES.CONFIRM_RECORD_SUCCESS, {
    resource,
    data,
  });
export const confirmRecordFailed = error =>
  makeActionCreator(REST_ACTION_TYPES.CONFIRM_RECORD_FAILED, error);

export const editMultiRecord = (resource, data) =>
  makeActionCreator(REST_ACTION_TYPES.EDIT_MULTI_RECORD, { resource, data });
export const editRecord = (resource, id, data, isGoBack) =>
  makeActionCreator(REST_ACTION_TYPES.EDIT_RECORD, { resource, id, data, isGoBack });
export const editRecordSuccess = (resource, data) =>
  makeActionCreator(REST_ACTION_TYPES.EDIT_RECORD_SUCCESS, { resource, data });
export const editRecordFailed = (error, resource, id) =>
  makeActionCreator(REST_ACTION_TYPES.EDIT_RECORD_FAILED, { error, resource, id });

export const createRecord = (resource, data, isGoToShowPage) =>
  makeActionCreator(REST_ACTION_TYPES.CREATE_RECORD, {
    resource,
    data,
    isGoToShowPage,
  });
export const createRecordSuccess = (resource, data) =>
  makeActionCreator(REST_ACTION_TYPES.CREATE_RECORD_SUCCESS, {
    resource,
    data,
  });
export const createRecordFailed = error =>
  makeActionCreator(REST_ACTION_TYPES.CREATE_RECORD_FAILED, error);

export const retrieveReference = (resource, ids, mappedBy) =>
  makeActionCreator(REST_ACTION_TYPES.RETRIEVE_REFERENCE, { resource, ids, mappedBy });

export const retrieveReferenceSuccess = (resource, data) =>
  makeActionCreator(REST_ACTION_TYPES.RETRIEVE_REFERENCE_SUCCESS, {
    resource,
    data,
  });
export const retrieveReferenceFailed = error =>
  makeActionCreator(REST_ACTION_TYPES.RETRIEVE_REFERENCE_FAILED, error);

export const customQuery = (resource, id, queryUrl, data) =>
  makeActionCreator(REST_ACTION_TYPES.CUSTOM_QUERY_ONE_RECORD, { resource, queryUrl, id, data });
export const customQuerySuccess = (resource, data) =>
  makeActionCreator(REST_ACTION_TYPES.CUSTOM_QUERY_ONE_RECORD_SUCCESS, { resource, data });
export const customQueryFailed = (error, resource, id) =>
  makeActionCreator(REST_ACTION_TYPES.CUSTOM_QUERY_ONE_RECORD_FAILED, { error, resource, id });

export const clearData = (key, resource) =>
  makeActionCreator(REST_ACTION_TYPES.CLEAR_DATA, { key, resource });

export const setCurrentDataShow = (resource, id) =>
  makeActionCreator(REST_ACTION_TYPES.SET_CURRENT_DATA, { id, resource });

// search donator
export const searchMember = (resource, data) =>
  makeActionCreator(REST_ACTION_TYPES.SEARCH_MEMBER, {
    resource,
    data,
  });
export const searchMemberSuccess = (resource, data) =>
  makeActionCreator(REST_ACTION_TYPES.SEARCH_MEMBER_SUCCESS, {
    resource,
    data,
  });
export const searchMemberFailed = error =>
  makeActionCreator(REST_ACTION_TYPES.SEARCH_MEMBER_FAILED, error);

// export excel
export const exportExcelAction = (resource, data) =>
  makeActionCreator(REST_ACTION_TYPES.EXPORT_EXCEL, {
    resource,
    data,
  });

export const exportExcelSuccess = (resource, data) =>
  makeActionCreator(REST_ACTION_TYPES.EXPORT_EXCEL_SUCCESS, {
    resource,
    data,
  });
