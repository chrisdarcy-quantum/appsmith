import fetchProtectedBranchesRequest from "git/requests/fetchProtectedBranchesRequest";
import type { FetchProtectedBranchesResponse } from "git/requests/fetchProtectedBranchesRequest.types";
import { gitArtifactActions } from "git/store/gitArtifactSlice";
import type { GitArtifactPayloadAction } from "git/store/types";
import { call, put } from "redux-saga/effects";
import { validateResponse } from "sagas/ErrorSagas";
import handleApiErrors from "./helpers/handleApiErrors";

export default function* fetchProtectedBranchesSaga(
  action: GitArtifactPayloadAction,
) {
  const { artifactDef } = action.payload;
  let response: FetchProtectedBranchesResponse | undefined;

  try {
    response = yield call(
      fetchProtectedBranchesRequest,
      artifactDef.artifactType,
      artifactDef.baseArtifactId,
      true,
    );

    const isValidResponse: boolean = yield validateResponse(response);

    if (response && isValidResponse) {
      yield put(
        gitArtifactActions.fetchProtectedBranchesSuccess({
          artifactDef,
          responseData: response.data,
        }),
      );
    }
  } catch (e) {
    const error = handleApiErrors(e as Error, response);

    if (error) {
      yield put(
        gitArtifactActions.fetchProtectedBranchesError({ artifactDef, error }),
      );
    }
  }
}
