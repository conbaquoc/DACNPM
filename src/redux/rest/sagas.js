import { call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';
import { goBack } from 'react-router-redux';
import { union, keyBy } from 'lodash';
import {
  getList,
  getOneRecord,
  putRecord,
  deleteRecord,
  cancelRecord,
  postRecord,
  batch,
  customQuery,
  exportExcel,
} from '../../api/common/restApi';
import * as actions from './actions';
import { apiWrapper } from '../../utils/reduxUtils';
import { retrieveReference as _retrieveReference } from './referenceSaga';
import { convertRequestParams, convertResponseData } from './dataProvider';
import { closeModal } from '../modal/actions';

const { REST_ACTION_TYPES } = actions;

export const retrieveReference = _retrieveReference;

export function* retrieveList({ resource }) {
  try {
    const { limit, skip, filter, include, order } = yield select(state => {
      return state.rest[resource];
    });
    // console.log("Saga: Resource: ", resource, " >>" ,{ limit, skip, filter, include, order });

    const params = convertRequestParams('getAll', {
      limit: limit < 1000 && limit,
      skip: skip || 0,
      filter,
      include,
      order,
    });

    // console.log("Saga: Params: ", resource, " >>", params)
    const response = yield call(
      apiWrapper,
      {
        isShowLoading: true,
        isShowSucceedNoti: false,
        errorDescription: "Lỗi !!",
      },
      getList,
      resource,
      params,
    );
    // console.log("Saga: Response: ",response);

    const convertData = convertResponseData('getAll', response);
    yield put(
      actions.retrieveListSuccess(resource, {
        list: convertData.results,
        ids: convertData.ids,
        count: convertData.count,
      }),
    );
  } catch (error) {
    // console.log("Error: ",error);

    yield put(actions.retrieveListFailed(resource, error));
  }
}

export function* retrieveOneRecord({ resource, id, data }) {
  try {
    const response = yield call(
      apiWrapper,
      {
        isShowLoading: true,
        isShowSucceedNoti: false,
        errorDescription: "Lỗi !!",
      },
      getOneRecord,
      resource,
      id,
      data,
    );

      // console.log(response);

    const rest = yield select(state => state.rest);
    const convertData = convertResponseData('getOne', response);
    const formattedData = {
      list: { [convertData.id]: convertData },
      ids: rest[resource] ? union(rest[resource].ids, [convertData.id]) : [convertData.id],
      count: rest[resource] ? rest[resource].count : 1,
    };
    yield put(actions.retrieveOneRecordSuccess(resource, formattedData));
  } catch (error) {
    yield put(actions.retrieveOneRecordFailed(error));
  }
}

export function* editMultiRecord({ resource, data }) {
  try {
    const requestParams = convertRequestParams('editMulti', data, resource);

    const response = yield call(apiWrapper, batch, true, false, requestParams);
    const convertData = convertResponseData('editMulti', response);

    yield put(
      actions.editRecordSuccess(resource, {
        list: keyBy(convertData.results, 'id'),
      }),
    );
  } catch (error) {
    yield put(actions.editRecordFailed(error));
  }
}

export function* editRecord({ resource, id, data, isGoBack }) {
  try {
    const currentModal = yield select(state => state.modal.current);
    // const response = yield call(apiWrapper, putRecord, true, false, resource, id, data);

    const response = yield call(
      apiWrapper,
      {
        isShowLoading: true,
        isShowSucceedNoti: true,
        successDescription: "Sửa thành công",
        errorDescription: "Lỗi !!",
      },
      putRecord,
      resource,
      id,
      data,
    );

    // console.log({ resource, id, data, isGoBack });
    // console.log(response);


    const rest = yield select(state => state.rest);
    const convertData = convertResponseData('update', response);
    yield put(
      actions.editRecordSuccess(resource, {
        list: { [convertData.id]: convertData },
        itemLoading: { ...rest[resource].itemLoading, [id]: false },
      }),
    );
    yield put(actions.retrieveOneRecord(resource, id));
    if (!isGoBack) {
      yield put(currentModal ? closeModal() : goBack());
    }
  } catch (error) {
    yield put(actions.editRecordFailed(error, resource, id));
  }
}

export function* createRecord({ resource, data, isGoToShowPage }) {
  try {
    const currentModal = yield select(state => state.modal.current);
    // const response = yield call(apiWrapper, postRecord, true, false, resource, data);
    const response = yield call(
      apiWrapper,
      {
        isShowLoading: true,
        isShowSucceedNoti: true,
        successDescription: "Thêm thành công",
        errorDescription: "Lỗi !!",
      },
      postRecord,
      resource,
      data,
    );
    // console.log(response);
    const rest = yield select(state => state.rest);
    const convertData = convertResponseData('create', response);
    yield put(
      actions.createRecordSuccess(resource, {
        list: { [convertData.id]: convertData },
        ids: rest[resource] ? [...rest[resource].ids, convertData.id] : [convertData.id],
        count: rest[resource] ? rest[resource].count + 1 : 1,
      }),
    );
    if(!isGoToShowPage) {
      return;
    }
    yield put(actions.retrieveOneRecord(resource, response.id));
    yield put(currentModal ? closeModal() : goBack());
  } catch (error) {
    yield put(actions.createRecordFailed(error));
  }
}
/* eslint no-unused-vars: 0 */
export function* searchMember({ resource, data }) {
  try {
    const response = yield call(apiWrapper, getOneRecord, true, false, 'users', data);
    const convertData = convertResponseData('getOne', response);
    yield put(actions.searchMemberSuccess(convertData));
  } catch (error) {
    yield put(actions.searchMemberFailed(error));
  }
}

export function* delRecord({ resource, id }) {
  try {
    // yield call(apiWrapper, deleteRecord, true, false, resource, id);

   yield call(
      apiWrapper,
      {
        isShowLoading: true,
        isShowSucceedNoti: false,
        successDescription: "Xóa thành công",
        errorDescription: "Lỗi !!",
      },
      deleteRecord,
      resource,
      id,
    );
    // const rest = yield select(state => state.rest);
    // const newList = _.xorBy(rest[resource].list, [{ id }], 'id');
    // yield put(
    //   actions.retr(resource, {
    //     list: newList,
    //     count: rest[resource].count - 1,
    //   }),
    // );
    yield put(actions.retrieveList(resource));
  } catch (error) {
    yield put(actions.deleteRecordFailed(error));
  }
}

export function* canlRecord({ resource, id }) {
  try {
   yield call(
      apiWrapper,
      {
        isShowLoading: true,
        isShowSucceedNoti: false,
        successDescription: "Hủy thành công",
        errorDescription: "Lỗi !!",
      },
      cancelRecord,
      resource,
      id,
    );
    yield put(actions.retrieveList(resource));
  } catch (error) {
    yield put(actions.cancelRecordFailed(error));
  }
}

export function* doneRecord({ resource, id, data }) {
  try {
   yield call(
      apiWrapper,
      {
        isShowLoading: true,
        isShowSucceedNoti: false,
        successDescription: "Hoàn tất thành công",
        errorDescription: "Lỗi !!",
      },
      putRecord,
      resource,
      id,
      data,
    );
    yield put(actions.retrieveList(resource));
  } catch (error) {
    yield put(actions.confirmRecordFailed(error));
  }
}

export function* customQuerySaga({ resource, id, data = {}, queryUrl }) {
  try {
    const response = yield call(apiWrapper, customQuery, true, false, resource, id, queryUrl, data);
    const rest = yield select(state => state.rest);
    const convertData = convertResponseData('update', response);
    yield put(
      actions.customQuerySuccess(resource, {
        list: { [convertData.id]: convertData },
        count: rest[resource].count,
        itemLoading: { ...rest[resource].itemLoading, [id]: false },
      }),
    );
    yield put(actions.retrieveOneRecord(resource, id));
  } catch (error) {
    yield put(actions.customQueryFailed(error, resource, id));
  }
}

export function* exportExcelSaga({ resource, data }) {
  try {
    const { filter, order } = data;
    const params = {};
    params.filter = filter;
    if (order) {
      params.order = order;
    }
    const response = yield call(apiWrapper, exportExcel, true, false, resource, params);
    window.open(response.url, '_blank');

    yield put(actions.exportExcelSuccess());
  } catch (error) {
    yield put(actions.retrieveOneRecordFailed(error));
  }
}

function restSagas() {
  return [
    takeEvery(REST_ACTION_TYPES.RETRIEVE_LIST, retrieveList),
    takeLatest(REST_ACTION_TYPES.RETRIEVE_ONE_RECORD, retrieveOneRecord),
    takeLatest(REST_ACTION_TYPES.EDIT_MULTI_RECORD, editMultiRecord),
    takeLatest(REST_ACTION_TYPES.EDIT_RECORD, editRecord),
    takeLatest(REST_ACTION_TYPES.DELETE_RECORD, delRecord),
    takeLatest(REST_ACTION_TYPES.CANCEL_RECORD, canlRecord),
    takeLatest(REST_ACTION_TYPES.CONFIRM_RECORD, doneRecord),
    takeLatest(REST_ACTION_TYPES.CREATE_RECORD, createRecord),
    takeEvery(REST_ACTION_TYPES.RETRIEVE_REFERENCE, retrieveReference),
    takeEvery(REST_ACTION_TYPES.CUSTOM_QUERY_ONE_RECORD, customQuerySaga),
    takeEvery(REST_ACTION_TYPES.SEARCH_MEMBER, searchMember),
    takeEvery(REST_ACTION_TYPES.EXPORT_EXCEL, exportExcelSaga),
  ];
}

export default restSagas();
