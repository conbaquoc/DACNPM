import { makeReducerCreator } from "../../utils/reduxUtils";
import { ClassTypes } from "./actions";

export const initialState = {
  currentClass: {},
  loading: false,
  listClassSuccess: undefined,
  listClassFailure: undefined,
  rollcallHistorySuccess: undefined,
  rollcallHistoryFailure: undefined,
};

// -----------------------------------------
const getOneClassSuccess =(state, {data}) => ({
  ...state,
  currentClass: data,
  loading:false,
})
const getOneClassFailure =(state) => ({
  ...state,
  loading:false,
})

// ---------------------------------------
const startRollcall = state => {
  return {
    ...state,
    loading:true,
  }
} 

const startRollcallSuccess = state => {

  return {
    ...state,
    loading:false,
    rollcallHistorySuccess: true,
    rollcallHistoryFailure: false,
  }
} 

const startRollcallFailure = state => ({
  ...state,
  loading:false,
  rollcallHistorySuccess: false,
  rollcallHistoryFailure: true,
})

export const classes = makeReducerCreator(initialState, {
  [ClassTypes.GET_DETAIL_SUCCESS]: getOneClassSuccess,
  [ClassTypes.GET_DETAIL_FAILURE]: getOneClassFailure,

  [ClassTypes.START_ROLLCALL]: startRollcall,
  [ClassTypes.START_ROLLCALL_SUCCESS]: startRollcallSuccess,
  [ClassTypes.START_ROLLCALL_FAILURE]: startRollcallFailure,
})