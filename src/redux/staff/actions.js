import { makeConstantCreator, makeActionCreator } from "../../utils/reduxUtils";

export const StaffTypes = makeConstantCreator(
  "LOGIN",
  "LOGIN_STAFF_FAIL",
  "LOGIN_STAFF_SUCCESS",
  "LOGOUT",
  "GET_CURRENT_USER",
);

// Login
export const loginAction = params => makeActionCreator(StaffTypes.LOGIN, { params });
export const loginSuccessAction = respone => makeActionCreator(StaffTypes.LOGIN_STAFF_SUCCESS, { respone });
export const loginFailureAction = error => makeActionCreator(StaffTypes.LOGIN_STAFF_FAIL, { error });

// Logout
export const logout = () => makeActionCreator(StaffTypes.LOGOUT);
// User
export const getCurentUser = () => makeActionCreator(StaffTypes.GET_CURRENT_USER);
