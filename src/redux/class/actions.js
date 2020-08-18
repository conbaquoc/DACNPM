import { makeConstantCreator, makeActionCreator } from "../../utils/reduxUtils";

export const ClassTypes = makeConstantCreator(
  "GET_DETAIL",
  "GET_DETAIL_SUCCESS",
  "GET_DETAIL_FAILURE",

  "START_ROLLCALL",
  "START_ROLLCALL_SUCCESS",
  "START_ROLLCALL_FAILURE"
);

// Get one class
export const getOneClassAction = (code) =>
  makeActionCreator(ClassTypes.GET_DETAIL, {code});
export const getOneClassSuccessAction = (data) =>
  makeActionCreator(ClassTypes.GET_DETAIL_SUCCESS, {data});
export const getOneClassFailureAction = error =>
  makeActionCreator(ClassTypes.GET_DETAIL_FAILURE, { error });

//start rollcall action
export const startRollcallAction = (values) =>
  makeActionCreator(ClassTypes.START_ROLLCALL, {values});
export const startRollcallSuccessAction = () =>
  makeActionCreator(ClassTypes.START_ROLLCALL_SUCCESS);
export const startRollcallFailureAction = error =>
  makeActionCreator(ClassTypes.START_ROLLCALL_FAILURE, { error });