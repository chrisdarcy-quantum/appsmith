import { call, put } from "redux-saga/effects";
import fetchGlobalProfileRequest from "../requests/fetchGlobalProfileRequest";
import type { FetchGlobalProfileResponse } from "../requests/fetchGlobalProfileRequest.types";

// internal dependencies
import { validateResponse } from "sagas/ErrorSagas";
import { gitGlobalActions } from "git/store/gitGlobalSlice";
import handleApiErrors from "./helpers/handleApiErrors";

export default function* fetchGlobalProfileSaga() {
  let response: FetchGlobalProfileResponse | undefined;

  try {
    response = yield call(fetchGlobalProfileRequest, true);

    const isValidResponse: boolean = yield validateResponse(response);

    if (response && isValidResponse) {
      yield put(
        gitGlobalActions.fetchGlobalProfileSuccess({
          responseData: response.data,
        }),
      );
    }
  } catch (e) {
    const error = handleApiErrors(e as Error, response);

    if (error) {
      yield put(gitGlobalActions.fetchGlobalProfileError({ error }));
    }
  }
}
