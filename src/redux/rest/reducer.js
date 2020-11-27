import { makeReducerCreator } from '../../utils/reduxUtils';
import { REST_ACTION_TYPES } from './actions';

const initialState = {
  errorRequest: false,
};


const retrieveList = (state, { resource, filter = {} }) => {
  let limit = filter.limit || 20;
  if (state[resource]) {
    limit = filter.limit || state[resource].limit || 20;
  }
  // console.log(`Source ${resource} >>`,filter);
  return {
    ...state,
    [resource]: {
      ...state[resource],
      ...filter,
      limit,
      loading: true,
    },
  };
};


const retrieveListSuccess = (state, action) => {
  return {
    ...state,
    [action.resource]: {
      ...state[action.resource],
      ...action.data,
      list: { ...state[action.resource].list, ...action.data.list },
      loading: false,
    },
  };
};

const retrieveListFailed = (state, { resource, error }) => {
  return {
    ...state,
    [resource]: {
      ...state[resource],
      loading: false,
    },
    error,
  };
};

const retrieveOneRecord = (state, { resource, id }) => {
  return {
    ...state,
    [resource]: state[resource]
      ? {
          ...state[resource],
          currentId: id,
        }
      : {
          currentId: id,
        },
    errorRequest: false,
  };
};

const retrieveOneRecordSuccess = (state, { resource, data }) => {
  return {
    ...state,
    [resource]: {
      ...state[resource],
      ...data,
      list: { ...state[resource].list, ...data.list },
    },
    errorRequest: false,
  };
};
const setCurrentData = (state, { resource, id }) => {
  return {
    ...state,
    [resource]: state[resource]
      ? {
          ...state[resource],
          currentId: id,
        }
      : {
          currentId: id,
        },
    errorRequest: false,
  };
};

const retrieveOneRecordFailed = (state, { error }) => {
  return {
    ...state,
    errorRequest: true,
    error,
  };
};

const deleteRecordSuccess = (state, action) => {
  return {
    ...state,
    [action.resource]: { ...state[action.resource], ...action.data },
    errorRequest: false,
  };
};

const deleteRecordFailed = (state, { error }) => {
  return {
    ...state,
    errorRequest: true,
    error,
  };
};

const cancelRecordSuccess = (state, action) => {
  return {
    ...state,
    [action.resource]: { ...state[action.resource], ...action.data },
    errorRequest: false,
  };
};

const cancelRecordFailed = (state, { error }) => {
  return {
    ...state,
    errorRequest: true,
    error,
  };
};

const confirmRecordSuccess = (state, action) => {
  return {
    ...state,
    [action.resource]: { ...state[action.resource], ...action.data },
    errorRequest: false,
  };
};

const confirmRecordFailed = (state, { error }) => {
  return {
    ...state,
    errorRequest: true,
    error,
  };
};

const editRecord = (state, action) => {
  return {
    ...state,
    [action.resource]: {
      ...state[action.resource],
      itemLoading:
        state[action.resource] && state[action.resource].itemLoading
          ? {
              ...state[action.resource].itemLoading,
              [action.id]: true,
            }
          : { [action.id]: true },
    },
    errorRequest: false,
  };
};

const editRecordSuccess = (state, action) => {
  return {
    ...state,
    [action.resource]: {
      ...state[action.resource],
      ...action.data,
      list: { ...state[action.resource].list, ...action.data.list },
    },
    errorRequest: false,
  };
};

const editRecordFailed = (state, { error, resource, id }) => {
  return {
    ...state,
    [resource]: {
      ...state[resource],
      itemLoading:
        state[resource] && state[resource].itemLoading
          ? {
              ...state[resource].itemLoading,
              [id]: false,
            }
          : { [id]: false },
    },
    errorRequest: true,
    error,
  };
};

const createRecordSuccess = (state, action) => {
  return {
    ...state,
    [action.resource]: {
      ...state[action.resource],
      ...action.data,
      list: { ...state[action.resource].list, ...action.data.list },
    },
    errorRequest: false,
  };
};

const createRecordFailed = (state, { error }) => {
  return {
    ...state,
    errorRequest: true,
    error,
  };
};

const retrieveReference = (state, action) => {
  return {
    ...state,
    [`${[action.resource]}Reference`]: {
      ...state[`${[action.resource]}Reference`],
      ...action.filter,
      loading: true,
      ids: [],
      list: state[`${action.resource}Reference`] ? state[`${action.resource}Reference`].list : {},
    },
  };
};

const retrieveReferenceSuccess = (state, action) => {
  return {
    ...state,
    [`${[action.resource]}Reference`]: {
      ...state[`${action.resource}Reference`],
      ...action.data,
      loading: false,
      list: { ...state[`${action.resource}Reference`].list, ...action.data.list },
    },
  };
};

const retrieveReferenceFailed = (state, { resource, error }) => {
  return {
    ...state,
    error,
    [`${resource}Reference`]: {
      loading: false,
    },
  };
};

const clearData = (state, action) => {
  switch (action.key) {
    case 'list':
      return {
        ...state,
        [action.resource]: {
          ...state[action.resource],
          list: [],
          ...action.filter,
          loading: false,
        },
      };
    case 'reference':
      return {
        ...state,
        [`${[action.resource]}Reference`]: {
          ...state[`${[action.resource]}Reference`],
          ...action.filter,
          loading: false,
          list: [],
        },
      };
    case 'record':
      return {
        ...state,
        [action.resource]: {},
      };
    default:
      return { ...state };
  }
};

const customQuery = (state, action) => {
  return {
    ...state,
    [action.resource]: {
      ...state[action.resource],
      itemLoading: state[action.resource].itemLoading
        ? {
            ...state[action.resource].itemLoading,
            [action.id]: true,
          }
        : { [action.id]: true },
    },
    errorRequest: false,
  };
};

const customQuerySuccess = (state, action) => {
  return {
    ...state,
    [action.resource]: {
      ...state[action.resource],
      ...action.data,
      list: { ...state[action.resource].list, ...action.list },
    },
    errorRequest: false,
  };
};

const customQueryFailed = (state, { error, resource, id }) => {
  return {
    ...state,
    [resource]: {
      ...state[resource],
      itemLoading: state[resource].itemLoading
        ? { ...state[resource].itemLoading, [id]: false }
        : {},
    },
    errorRequest: true,
    error,
  };
};
const searchMemberSuccess = (state, action) => {
  return {
    ...state,
    resultSearch: action.resource,
  };
};

const searchMemberFailed = (state, { error }) => {
  return {
    ...state,
    errorRequest: true,
    error,
  };
};

const exportExcel = state => {
  return {
    ...state,
    loadingExport: true,
  };
};

const exportExcelSuccess = state => {
  return {
    ...state,
    loadingExport: false,
  };
};

export default makeReducerCreator(initialState, {
  [REST_ACTION_TYPES.RETRIEVE_LIST]: retrieveList,
  [REST_ACTION_TYPES.RETRIEVE_LIST_SUCCESS]: retrieveListSuccess,
  [REST_ACTION_TYPES.RETRIEVE_LIST_FAILED]: retrieveListFailed,

  [REST_ACTION_TYPES.RETRIEVE_ONE_RECORD]: retrieveOneRecord,
  [REST_ACTION_TYPES.RETRIEVE_ONE_RECORD_SUCCESS]: retrieveOneRecordSuccess,
  [REST_ACTION_TYPES.RETRIEVE_ONE_RECORD_FAILED]: retrieveOneRecordFailed,

  [REST_ACTION_TYPES.DELETE_RECORD_SUCCESS]: deleteRecordSuccess,
  [REST_ACTION_TYPES.DELETE_RECORD_FAILED]: deleteRecordFailed,

  [REST_ACTION_TYPES.CANCEL_RECORD_SUCCESS]: cancelRecordSuccess,
  [REST_ACTION_TYPES.CANCEL_RECORD_FAILED]: cancelRecordFailed,

  [REST_ACTION_TYPES.CONFIRM_RECORD_SUCCESS]: confirmRecordSuccess,
  [REST_ACTION_TYPES.CONFIRM_RECORD_FAILED]: confirmRecordFailed,

  [REST_ACTION_TYPES.EDIT_RECORD]: editRecord,
  [REST_ACTION_TYPES.EDIT_RECORD_SUCCESS]: editRecordSuccess,
  [REST_ACTION_TYPES.EDIT_RECORD_FAILED]: editRecordFailed,

  [REST_ACTION_TYPES.CREATE_RECORD_SUCCESS]: createRecordSuccess,
  [REST_ACTION_TYPES.CREATE_RECORD_FAILED]: createRecordFailed,

  [REST_ACTION_TYPES.RETRIEVE_REFERENCE]: retrieveReference,
  [REST_ACTION_TYPES.RETRIEVE_REFERENCE_SUCCESS]: retrieveReferenceSuccess,
  [REST_ACTION_TYPES.RETRIEVE_REFERENCE_FAILED]: retrieveReferenceFailed,

  [REST_ACTION_TYPES.CLEAR_DATA]: clearData,
  [REST_ACTION_TYPES.SET_CURRENT_DATA]: setCurrentData,

  [REST_ACTION_TYPES.CUSTOM_QUERY_ONE_RECORD]: customQuery,
  [REST_ACTION_TYPES.CUSTOM_QUERY_ONE_RECORD_SUCCESS]: customQuerySuccess,
  [REST_ACTION_TYPES.CUSTOM_QUERY_ONE_RECORD_FAILED]: customQueryFailed,

  [REST_ACTION_TYPES.SEARCH_MEMBER_SUCCESS]: searchMemberSuccess,
  [REST_ACTION_TYPES.SEARCH_MEMBER_FAILED]: searchMemberFailed,
  [REST_ACTION_TYPES.EXPORT_EXCEL]: exportExcel,
  [REST_ACTION_TYPES.EXPORT_EXCEL_SUCCESS]: exportExcelSuccess,
});
