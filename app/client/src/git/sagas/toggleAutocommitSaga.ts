import toggleAutocommitRequest from "git/requests/toggleAutocommitRequest";
import type { ToggleAutocommitResponse } from "git/requests/toggleAutocommitRequest.types";
import { gitArtifactActions } from "git/store/gitArtifactSlice";
import type { GitArtifactPayloadAction } from "git/store/types";
import { call, put } from "redux-saga/effects";
import { validateResponse } from "sagas/ErrorSagas";
import handleApiErrors from "./helpers/handleApiErrors";

export default function* toggleAutocommitSaga(
  action: GitArtifactPayloadAction,
) {
  const { artifactDef } = action.payload;
  let response: ToggleAutocommitResponse | undefined;

  try {

    response = yield call(
      toggleAutocommitRequest,
      artifactDef.artifactType,
      artifactDef.baseArtifactId,
      true,
    );
    const isValidResponse: boolean = yield validateResponse(response);

    if (isValidResponse) {
      yield put(gitArtifactActions.toggleAutocommitSuccess({ artifactDef }));
      yield put(gitArtifactActions.fetchMetadataInit({ artifactDef }));
    }
  } catch (e) {
    const error = handleApiErrors(e as Error, response);

    if (error) {
      yield put(
        gitArtifactActions.toggleAutocommitError({ artifactDef, error }),
      );
    }
  }
}
