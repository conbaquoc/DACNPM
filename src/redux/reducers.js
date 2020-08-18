import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { staff } from "./staff/reducer";
// import { dashboard } from "./dashboard/reducer";
import rest from './rest/reducer';
import restFilter from './restFilter/reducer';
import modal from './modal/reducer';
import {classes} from './class/reducer'
import { loading } from './loading/reducer';

export default history =>
  combineReducers({
    router: connectRouter(history),
    staff,
    classes,
    // dashboard,
    rest,
    restFilter,
    modal,
    loading,
  });
