import { call, put, cancel, fork, takeEvery, select, delay } from 'redux-saga/effects';
import { searchSuccess, searchFailure, REST_FILTER_ACTION_TYPES } from './actions';
import { getList } from '../../api/common/restApi';
import { apiWrapper } from '../../utils/reduxUtils';
import { convertRequestParams, convertResponseData } from '../rest/dataProvider';

const debouncedFilters = {};
const tasks = {};

const replaceFilter = (resource, filter) => {
  if (!debouncedFilters[resource]) {
    debouncedFilters[resource] = {};
  }
  debouncedFilters[resource] = filter;
};

function* finalize(resource) {
  // combined with cancel(), this debounces the calls
  yield call(delay, 200);
  yield fork(retrieveFilterList, resource, debouncedFilters[resource]);
  delete tasks[resource];
  delete debouncedFilters[resource];
}

export function* searchData({ resource, filter, isRefresh }) {
  if (tasks[resource]) {
    yield cancel(tasks[resource]);
  }
  replaceFilter(resource, filter);
  tasks[resource] = yield fork(finalize, resource, isRefresh);
}

export function* retrieveFilterList(resource) {
  try {
    const { limit, skip, filter } = yield select(state => state.restFilter[resource]);
    const params = convertRequestParams('getAll', { limit: limit || 20, skip: skip || 0, filter });
    const response = yield call(apiWrapper, getList, false, false, resource, params);
    // const rest = yield select(state => state.rest);
    const convertData = convertResponseData('getAll', response);
    // const newList =
    //   rest[resource] && !isRefresh
    //     ? _.unionBy(rest[resource].list, convertData.results, 'id')
    //     : convertData.results;
    yield put(
      searchSuccess(resource, {
        list: convertData.results,
        count: convertData.count,
      }),
    );
  } catch (error) {
    yield put(searchFailure(resource, error));
  }
}

function restSagas() {
  return [takeEvery(REST_FILTER_ACTION_TYPES.REST_SEARCH, searchData)];
}

export default restSagas();
