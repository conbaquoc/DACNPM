import {
  takeEvery,
  put,
  call
} from "redux-saga/effects";
import {
  StaffTypes,
  loginSuccessAction,
  loginFailureAction,
} from "./actions";
import {
  staffLoginApi
} from "../../api/modules/staff";
import {
  apiWrapper
} from "../../utils/reduxUtils";


function* loginSaga({
  params,
}) {
  try {
    console.log(params);

    const response = yield call(
      apiWrapper, {
        isShowLoading: true,
        isShowSucceedNoti: false,
      },
      staffLoginApi,
      params,
    );
    console.log(response)
    if (response.token) {
      localStorage.setItem("sessionToken", response.token);
      localStorage.setItem("fullName", response.fullName)
      localStorage.setItem("id", response.id);
      localStorage.setItem("avatar", response.avatar);
      localStorage.setItem("role", response.role.name);
      yield put(loginSuccessAction(response));
    } else {
      yield put(loginFailureAction(response));
    }
  } catch (error) {
    yield put(loginFailureAction(error));
  }
}

function logoutSaga() {
  if (localStorage.getItem("sessionToken")) {
    localStorage.clear('sessionToken');
    localStorage.clear('fullName');
    localStorage.clear('id');
  }
}
export default [
  takeEvery(StaffTypes.LOGIN, loginSaga),
  takeEvery(StaffTypes.LOGOUT, logoutSaga),
];
