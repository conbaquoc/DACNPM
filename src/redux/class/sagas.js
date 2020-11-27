/* eslint-disable no-unused-vars */
import { takeEvery, put, call, take } from "redux-saga/effects";
import moment from "moment";
import {
  ClassTypes,
  getOneClassSuccessAction,
  getOneClassFailureAction,
  startRollcallSuccessAction,
  startRollcallFailureAction
} from './actions';
import { putApi, postApi, getDataByIdApi } from "../../api/common/crud";
import { apiWrapper } from "../../utils/reduxUtils";

function* getOne({ code }) {
  try {
    const data = yield call(
      apiWrapper,
      {
        isShowLoading: true,
        isShowSucceedNoti: false,
        errorDescription: "Có lỗi xảy ra",
      },
      getDataByIdApi,
      "classes",
      code,
    );
    console.log(data);
    

    yield put(getOneClassSuccessAction(data));
  } catch (error) {
    yield put(getOneClassFailureAction(error));
    console.log(error);
  }
}

function* startRollcall({values}) {
  try {
    const respone = yield call(
      apiWrapper,
      {
        isShowLoading: true,
        isShowSucceedNoti: true,
        successDescription: "Bắt đầu thành công",
        errorDescription: "Có lỗi xảy ra",
      },
      postApi,
      "rollcall/create",
      values,
    );
    console.log(respone);
    
    yield put(startRollcallSuccessAction());
  } catch (error) {
    yield put(startRollcallFailureAction());
  }
}

export default [
  takeEvery(ClassTypes.GET_DETAIL, getOne),
  takeEvery(ClassTypes.START_ROLLCALL, startRollcall)
];