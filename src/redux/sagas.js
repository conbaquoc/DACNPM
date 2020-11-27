import { all } from "redux-saga/effects";
import staffSaga from "./staff/sagas";
import classSaga from "./class/sagas";
// eslint-disable-next-line import/no-cycle
// import dashboardSaga from "./dashboard/sagas";
import restSaga from './rest/sagas';
import restFilterSaga from './restFilter/sagas';

export default function* root() {
  yield all([
    ...staffSaga,
    ...classSaga,
    // ...dashboardSaga,
    ...restSaga,
    ...restFilterSaga,
  ]);
}
