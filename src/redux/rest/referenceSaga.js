import { call, put, cancel, fork , delay } from 'redux-saga/effects';

import _ from 'lodash';
import * as actions from './actions';
import { convertRequestParams, convertResponseData } from './dataProvider';
import { apiWrapper } from '../../utils/reduxUtils';
import { getList } from '../../api/common/restApi';

const debouncedIds = {};
const mappeds = {};
const tasks = {};

const addIds = (resource, ids) => {
  if (!debouncedIds[resource]) {
    debouncedIds[resource] = [];
  }
  debouncedIds[resource] = _.union(debouncedIds[resource], ids);
};

const addMappedBy = (resource, mappedBy) => {
  if (!mappeds[resource]) {
    mappeds[resource] = [];
  }
  mappeds[resource] = mappedBy;
};

function* finalize(resource) {
  // combined with cancel(), this debounces the calls
  yield call(delay, 50);
  yield fork(retrieveReferenceList, resource);
  delete tasks[resource];
  delete debouncedIds[resource];
  delete mappeds[resource];
}

export function* retrieveReference({ resource, ids, mappedBy }) {
  if (tasks[resource]) {
    yield cancel(tasks[resource]);
  }
  addIds(resource, ids);
  addMappedBy(resource, mappedBy);
  tasks[resource] = yield fork(finalize, resource);
}

export function* retrieveReferenceList(resource) {
  try {
    const params = convertRequestParams(
      'getReference',
      debouncedIds[resource],
      resource,
      mappeds[resource],
    );
    const response = yield call(apiWrapper, getList, false, false, resource, params);
    const convertData = convertResponseData('getAll', response, mappeds[resource]);
    yield put(
      actions.retrieveReferenceSuccess(resource, {
        list: convertData.results,
        ids: convertData.ids,
        count: convertData.count,
      }),
    );
  } catch (error) {
    yield put(actions.retrieveReferenceFailed(resource, error));
  }
}
