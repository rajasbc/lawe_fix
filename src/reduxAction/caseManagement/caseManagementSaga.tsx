import { put, takeLatest, fork, call } from 'redux-saga/effects';
import isEmpty from 'lodash/isEmpty'
import { createApiCall, getCaseNotesRoute, getHearingsByCaseId, saveCaseNotesRoute, updateCaseRoute, getCaseStageRoute, getCaseFileRoute, MethodType, createCaseFolder, getCaseListRoute } from '../../services/Api';
import { SaveCaseNotesData, GetCaseNotesData, AcceptCaseData, GetCaseFileData, ActionType, GetHearingsByCaseId } from '../../model/model';
import { createFileUploadApiCall, fileUploadRoute, getCaseDocuments, saveConnectedMatters, getConnectedMatters, updateCaseDetails, getRelatedJudgements, updateCaseNotesRoute, getInvoiceByCaseId, updateInvoice, saveCaseTasksRoute, saveCaseRemaindersRoute, deleteTasks, updateTaskStatus, sendRemainderRoute, sendMailRoute, sendAppointmentRoute, updateAppointmentRoute, deleteCaseFileRoute, saveCaseResultRoute, getHighCourtRoute, hideNotificationRoute, updateNotificationStatus, getCaseByLawyerId, sendInviteMailRoute, getNotificationsByCaseIdRoute, reassignIndividualLawyer, transferindividualLawyer } from '../../services/Api';
import { AppointmentData, CaseResultData, DeleteCaseContactData, DeleteCaseNotesData, FileUploadData, GetHighCourtData, HideNotificationData, InviteMailData, MailData, NotificationData, RemainderData, SaveCaseContactData, TaskData, UpdateAppointmentData, UpdateCaseNotesData, UpdateNotificationData } from '../../model/model';
import { deleteCaseContactRoute, saveCaseContactRoute, sendNotificationRoute, deleteCaseNotesRoute, createInvoice } from '../../services/Api';


function* getCaseNotesSaga({ payload }: any) {

  try {

    const caseId = payload?.length ? payload[0]?.caseId : payload?.caseId;
    const lawyerId = payload?.length ? payload[0]?.lawyerId : payload?.lawyerId;
    const clientId = payload?.length ? payload[0]?.clientId : payload?.clientId;

    const getCaseNotesUrl = `${getCaseNotesRoute}?id=${caseId}&lawyerid=${lawyerId}&clientId=${clientId}`;
    // const getCaseNotesUrl = `${getCaseNotesRoute}?id=${payload.caseId}&lawyerid=${payload.lawyerId}&clientId=${payload.clientId}`;
    const response = yield call(
      createApiCall, { method: MethodType.GET, url: getCaseNotesUrl, data: payload }
    );

    if (response) {
      yield put({ type: ActionType.GET_CASE_NOTES_SUCCESS, payload: isEmpty(response) ? [] : response });
    } else {
      yield put({ type: ActionType.GET_CASE_NOTES_ERROR, payload: 'error' })
    }

  } catch (error) {
    yield put({ type: ActionType.GET_CASE_NOTES_ERROR, payload: error })
  }
}


function* saveCaseNotesSaga({ payload }: { payload: SaveCaseNotesData }) {
  try {
    const response = yield call(
      createApiCall, { method: MethodType.POST, url: saveCaseNotesRoute, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.SAVE_CASE_NOTES_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.SAVE_CASE_NOTES_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.SAVE_CASE_NOTES_ERROR, payload: error })
  }
}

function* saveCaseContactsaga({ payload }: { payload: SaveCaseContactData }) {
  try {
    const response = yield call(
      createApiCall, { method: MethodType.POST, url: saveCaseContactRoute, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.SAVE_CASE_CONTACT_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.SAVE_CASE_CONTACT_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.SAVE_CASE_CONTACT_ERROR, payload: error })
  }
}

function* saveCaseTasksSaga({ payload }: { payload: TaskData }) {
  try {
    const response = yield call(
      createApiCall, { method: MethodType.POST, url: saveCaseTasksRoute, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.SAVE_CASE_TASKS_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.SAVE_CASE_TASKS_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.SAVE_CASE_TASKS_ERROR, payload: error })
  }
}

function* saveCaseRemaindersSaga({ payload }: { payload: RemainderData }) {
  try {
    const response = yield call(
      createApiCall, { method: MethodType.POST, url: saveCaseRemaindersRoute, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.SAVE_CASE_REMAINDERS_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.SAVE_CASE_REMAINDERS_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.SAVE_CASE_REMAINDERS_ERROR, payload: error })
  }
}

function* getCaseStageSaga({ payload }: { payload: GetCaseNotesData }) {
  try {

    const getCaseStageUrl = `${getCaseStageRoute}?id=${payload.caseId}&lawyerid=${payload.lawyerId}&clientId=${payload.clientId}`;
    const response = yield call(
      createApiCall, { method: MethodType.GET, url: getCaseStageUrl, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.GET_CASE_STAGE_SUCCESS, payload: isEmpty(response) ? [] : response });
    } else {
      yield put({ type: ActionType.GET_CASE_STAGE_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.GET_CASE_STAGE_ERROR, payload: error })
  }
}

function* acceptCase({ payload }: { payload: AcceptCaseData }) {
  try {
    const response = yield call(
      createApiCall, { method: MethodType.POST, url: updateCaseRoute, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.ACCEPT_CASE_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.ACCEPT_CASE_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.ACCEPT_CASE_ERROR, payload: error })
  }
}


function* getCaseFileSaga({ payload }: { payload: GetCaseFileData }) {
  try {
    const getCaseFileUrl = `${getCaseFileRoute}${payload.fileName}`;
    const response = yield call(
      createApiCall, { method: MethodType.GET, url: getCaseFileUrl, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.GET_CASE_FILE_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.GET_CASE_FILE_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.GET_CASE_FILE_ERROR, payload: error })
  }
}

function* getCaseListSaga({ payload }: { payload: any }) {
  try {

    let getCaseListUrl = `${getCaseListRoute}?id=${payload.id}&type=${payload.type}&roleId=${payload.roleId}`;
    if (payload.userId) {
      getCaseListUrl += `&userId=${payload.userId}`
    }
    const response = yield call(
      createApiCall, { method: MethodType.GET, url: getCaseListUrl, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.GET_CASE_LIST_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.GET_CASE_LIST_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.GET_CASE_LIST_ERROR, payload: error })
  }
}

function* uploadCaseFileSaga({ payload }: { payload: FileUploadData }) {
  try {

    const uploadURL = `${fileUploadRoute}?type=${payload.type}&contenttype=${payload.contenttype}&caseid=${payload.caseId}&folderId=${payload.folderId}`;
    const response = yield call(
      createFileUploadApiCall, { method: MethodType.POST, url: uploadURL, data: payload.formData }
    );
    if (response) {
      yield put({ type: ActionType.UPLOAD_CASE_FILE_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.UPLOAD_CASE_FILE_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.UPLOAD_CASE_FILE_ERROR, payload: error })
  }
}

function* getHearingsByCaseIdSaga({ payload }: any) {
  try {
    const getCaseHearing = `${getHearingsByCaseId}?caseId=${payload.caseId}&userId=${payload.userId}&type=${payload.type}`;
    const response = yield call(
      createApiCall, { method: MethodType.GET, url: getCaseHearing, data: payload }
    );

    if (response) {
      yield put({ type: ActionType.GET_CASE_HEARINGS_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.GET_CASE_HEARINGS_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.GET_CASE_HEARINGS_ERROR, payload: error })
  }
}
function* saveCaseFolderSaga({ payload }: { payload: any }) {
  try {
    const createCaseFol = `${createCaseFolder}`;
    const response = yield call(
      createApiCall, { method: MethodType.POST, url: createCaseFol, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.SAVE_CASE_FOLDER_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.SAVE_CASE_FOLDER_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.SAVE_CASE_FOLDER_ERROR, payload: error })
  }
}
function* getCaseDocumentsSaga({ payload }: { payload: any }) {
  try {
    let getCaseDocumentsUrl = payload.fileUploadedBy ? `${getCaseDocuments}?caseId=${payload.caseId}&parentId=${payload.parentId}&fileUploadedBy=${payload.fileUploadedBy}`
      : `${getCaseDocuments}?caseId=${payload.caseId}&parentId=${payload.parentId}`;
    const response = yield call(
      createApiCall, { method: MethodType.GET, url: getCaseDocumentsUrl }
    );
    if (response) {
      yield put({ type: ActionType.GET_CASE_DOCUMENTS_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.GET_CASE_DOCUMENTS_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.GET_CASE_DOCUMENTS_ERROR, payload: error })
  }
}
function* saveCaseFileSaga({ payload }: { payload: any }) {
  try {
    const uploadURL = `${fileUploadRoute}?type=${payload.type}&contenttype=${payload.contenttype}&caseid=${payload.caseId}&folder=${payload.folder}&folderId=${payload.folderId}&uploadedBy=${payload.uploadedBy}&fileUploadedBy=${payload?.userId}`
    const response = yield call(
      createFileUploadApiCall, { method: MethodType.POST, url: uploadURL, data: payload.formData }
    );
    if (response) {
      yield put({ type: ActionType.SAVE_CASE_FILE_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.SAVE_CASE_FILE_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.SAVE_CASE_FILE_ERROR, payload: error })
  }
}
function* saveConnectedMattersSaga({ payload }: { payload: any }) {
  try {
    const saveMatter = `${saveConnectedMatters}`;
    const response = yield call(
      createApiCall, { method: MethodType.POST, url: saveMatter, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.SAVE_CONNECTED_MATTERS_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.SAVE_CONNECTED_MATTERS_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.SAVE_CONNECTED_MATTERS_ERROR, payload: error })
  }
}
function* getConnectedMattersSaga({ payload }: { payload: any }) {
  try {
    const getConnectedMtrs = `${getConnectedMatters}?caseId=${payload.caseId}`;
    const response = yield call(
      createApiCall, { method: MethodType.GET, url: getConnectedMtrs }
    );
    if (response) {
      yield put({ type: ActionType.GET_CONNECTED_MATTERS_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.GET_CONNECTED_MATTERS_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.GET_CONNECTED_MATTERS_ERROR, payload: error })
  }
}
function* getRelatedJudgementsSaga({ payload }: { payload: any }) {
  try {
    const relatedJudgement = `${getRelatedJudgements}?product=${payload.product}&subproduct=${payload.subproduct}`;
    const response = yield call(
      createApiCall, { method: MethodType.GET, url: relatedJudgement }
    );
    if (response) {
      yield put({ type: ActionType.GET_RELATED_JUDGEMENTS_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.GET_RELATED_JUDGEMENTS_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.GET_RELATED_JUDGEMENTS_ERROR, payload: error })
  }
}
function* updateCaseDetail({ payload }: { payload: any }) {
  try {
    const update = `${updateCaseDetails}`;
    const response = yield call(
      createApiCall, { method: MethodType.POST, url: update, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.UPDATE_CASE_DETAILS_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.UPDATE_CASE_DETAILS_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.UPDATE_CASE_DETAILS_ERROR, payload: error })
  }
}

function* deleteCaseNotesSaga({ payload }: { payload: DeleteCaseNotesData }) {
  try {
    const response = yield call(
      createApiCall, { method: MethodType.POST, url: deleteCaseNotesRoute, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.DELETE_CASE_NOTES_SUCCESS, payload });
    } else {
      yield put({ type: ActionType.DELETE_CASE_NOTES_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.DELETE_CASE_NOTES_ERROR, payload: error })
  }
}
function* deleteCaseContactsaga({ payload }: { payload: DeleteCaseContactData }) {
  try {
    const response = yield call(
      createApiCall, { method: MethodType.POST, url: deleteCaseContactRoute, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.DELETE_CASE_CONTACT_SUCCESS, payload });
    } else {
      yield put({ type: ActionType.DELETE_CASE_CONTACT_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.DELETE_CASE_CONTACT_ERROR, payload: error })
  }
}
function* updateCaseNotesSaga({ payload }: { payload: UpdateCaseNotesData }) {
  try {
    const response = yield call(
      createApiCall, { method: MethodType.POST, url: updateCaseNotesRoute, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.UPDATE_CASE_NOTES_SUCCESS, payload });
    } else {
      yield put({ type: ActionType.UPDATE_CASE_NOTES_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.UPDATE_CASE_NOTES_ERROR, payload: error })
  }
}
function* sendNotificationSaga({ payload }: { payload: NotificationData }) {
  try {
    const response = yield call(
      createApiCall, { method: MethodType.POST, url: sendNotificationRoute, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.SEND_NOTIFICATION_SUCCESS, payload });
    } else {
      yield put({ type: ActionType.SEND_NOTIFICATION_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.SEND_NOTIFICATION_ERROR, payload: error })
  }
}


function* createInvoiceSaga({ payload }: { payload: any }) {
  try {
    const createInvo = `${createInvoice}`;
    const response = yield call(
      createApiCall, { method: MethodType.POST, url: createInvo, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.CREATE_INVOICE_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.CREATE_INVOICE_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.CREATE_INVOICE_ERROR, payload: error })
  }
}
function* getInvoiceByCaseIdSaga({ payload }: { payload: any }) {
  try {
    const getInvoice = `${getInvoiceByCaseId}?caseId=${payload.caseId}&isClient=${payload.isClient}`;
    const response = yield call(
      createApiCall, { method: MethodType.GET, url: getInvoice }
    );
    if (response) {
      yield put({ type: ActionType.GET_INVOICE_BY_CASE_ID_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.GET_INVOICE_BY_CASE_ID_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.GET_INVOICE_BY_CASE_ID_ERROR, payload: error })
  }
}

function* updateInvoiceSaga({ payload }: { payload: any }) {
  try {
    const update = `${updateInvoice}`;
    const response = yield call(
      createApiCall, { method: MethodType.POST, url: update, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.UPDATE_INVOICE_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.UPDATE_INVOICE_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.UPDATE_INVOICE_ERROR, payload: error })
  }
}
function* updateTaskStatusSaga({ payload }: { payload: TaskData }) {
  try {
    const update = `${updateTaskStatus}`;
    const response = yield call(
      createApiCall, { method: MethodType.POST, url: update, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.UPDATE_TASK_STATUS_SUCCESS, payload: payload });
    } else {
      yield put({ type: ActionType.UPDATE_TASK_STATUS_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.UPDATE_TASK_STATUS_ERROR, payload: error })
  }
}
function* deleteCaseTasksSaga({ payload }: { payload: TaskData }) {
  try {
    const update = `${deleteTasks}`;
    const response = yield call(
      createApiCall, { method: MethodType.POST, url: update, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.DELETE_CASE_TASKS_SUCCESS, payload: payload });
    } else {
      yield put({ type: ActionType.DELETE_CASE_TASKS_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.DELETE_CASE_TASKS_ERROR, payload: error })
  }
}
function* sendRemainderSaga({ payload }: { payload: RemainderData }) {
  try {
    const response = yield call(
      createApiCall, { method: MethodType.POST, url: sendRemainderRoute, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.SEND_REMAINDER_SUCCESS, payload });
    } else {
      yield put({ type: ActionType.SEND_REMAINDER_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.SEND_REMAINDER_ERROR, payload: error })
  }
}

function* sendMailSaga({ payload }: { payload: MailData }) {

  try {
    const response = yield call(
      createApiCall, { method: MethodType.POST, url: sendMailRoute, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.SEND_MAIL_SUCCESS, payload });
    } else {
      yield put({ type: ActionType.SEND_MAIL_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.SEND_MAIL_ERROR, payload: error })
  }
}


function* sendInviteMailSaga({ payload }: { payload: InviteMailData }) {

  try {
    const response = yield call(
      createApiCall, { method: MethodType.POST, url: sendInviteMailRoute, data: payload }
    );

    if (response) {
      yield put({ type: ActionType.SEND_INVITE_MAIL_SUCCESS, payload });
    } else {
      yield put({ type: ActionType.SEND_INVITE_MAIL_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.SEND_INVITE_MAIL_ERROR, payload: error })
  }
}

function* sendAppointmentSaga({ payload }: { payload: AppointmentData }) {
  try {
    const response = yield call(
      createApiCall, { method: MethodType.POST, url: sendAppointmentRoute, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.SEND_APPOINTMENT_SUCCESS, payload });
    } else {
      yield put({ type: ActionType.SEND_APPOINTMENT_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.SEND_APPOINTMENT_ERROR, payload: error })
  }
}
function* updateAppointmentSaga({ payload }: { payload: UpdateAppointmentData }) {
  try {
    const response = yield call(
      createApiCall, { method: MethodType.POST, url: updateAppointmentRoute, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.UPDATE_APPOINTMENT_SUCCESS, payload });
    } else {
      yield put({ type: ActionType.UPDATE_APPOINTMENT_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.UPDATE_APPOINTMENT_ERROR, payload: error })
  }
}
function* deleteCaseFileSaga({ payload }: { payload: { s3Key: string, caseId: number, id: number } }) {
  try {
    const response = yield call(
      createApiCall, { method: MethodType.POST, url: deleteCaseFileRoute, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.DELETE_CASE_FILE_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.DELETE_CASE_FILE_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.DELETE_CASE_FILE_ERROR, payload: error })
  }
}
function* saveCaseResultSaga({ payload }: { payload: CaseResultData }) {
  try {
    const response = yield call(
      createApiCall, { method: MethodType.POST, url: saveCaseResultRoute, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.SAVE_CASE_FOLDER_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.SAVE_CASE_FOLDER_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.SAVE_CASE_FOLDER_ERROR, payload: error })
  }
}
function* getHighCourtSaga({ payload }: { payload: GetHighCourtData }) {
  try {
    const getHighCourtUrl = `${getHighCourtRoute}?courtType=${payload.courtType}`;
    const response = yield call(
      createApiCall, { method: MethodType.GET, url: getHighCourtUrl, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.GET_HIGHCOURT_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.GET_HIGHCOURT_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.GET_HIGHCOURT_ERROR, payload: error })
  }
}

function* hideNotificationSaga({ payload }: { payload: HideNotificationData }) {
  try {
    const response = yield call(
      createApiCall, { method: MethodType.POST, url: hideNotificationRoute, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.HIDE_CASE_NOTIFICATION_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.HIDE_CASE_NOTIFICATION_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.HIDE_CASE_NOTIFICATION_ERROR, payload: error })
  }
}
function* getCaseByLawyerIdSaga({ payload }: { payload: any }) {
  try {
    const caseByLawyer = `${getCaseByLawyerId}?lawyerId=${payload.id}`;
    const response = yield call(
      createApiCall, { method: MethodType.GET, url: caseByLawyer, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.GET_CASE_BY_LAWYERID_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.GET_CASE_BY_LAWYERID_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.GET_CASE_BY_LAWYERID_ERROR, payload: error })
  }
}
function* updateNotificationStatusSaga({ payload }: { payload: UpdateNotificationData }) {
  try {
    const response = yield call(
      createApiCall, { method: MethodType.POST, url: updateNotificationStatus, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.UPDATE_NOTIFICATION_STATUS_SUCCESS, payload });
    } else {
      yield put({ type: ActionType.UPDATE_NOTIFICATION_STATUS_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.UPDATE_NOTIFICATION_STATUS_ERROR, payload: error })
  }
}

function* getNotiByCaseIdSaga({ payload }: { payload: any }) {

  try {

    let getNotiByCaseId = `${getNotificationsByCaseIdRoute}?caseId=${payload.caseId}`;
    const response = yield call(
      createApiCall, { method: MethodType.GET, url: getNotiByCaseId, data: payload }
    );

    if (response) {
      yield put({ type: ActionType.GET_NOTI_BY_CASEID_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.GET_NOTI_BY_CASEID_ERROR, payload: 'error' })
    }

  } catch (error) {
    yield put({ type: ActionType.GET_NOTI_BY_CASEID_ERROR, payload: error })
  }

}


function* transferindividualLawyerSaga({ payload }: { payload: any }) {
  try {
    const response = yield call(
      createApiCall, { method: MethodType.POST, url: transferindividualLawyer, data: payload }
    );
    if (response) {
      yield put({ type: ActionType.TRANSFER_INDIVIDUAL_LAWYER_SUCCESS, payload: response });
    } else {
      yield put({ type: ActionType.TRANSFER_INDIVIDUAL_LAWYER_ERROR, payload: 'error' })
    }
  } catch (error) {
    yield put({ type: ActionType.TRANSFER_INDIVIDUAL_LAWYER_ERROR, payload: error })
  }
}

function* onCaseManagementWatcher() {
  yield takeLatest(ActionType.GET_CASE_NOTES as any, getCaseNotesSaga);
  yield takeLatest(ActionType.SAVE_CASE_NOTES as any, saveCaseNotesSaga);
  yield takeLatest(ActionType.SAVE_CASE_NOTES_SUCCESS as any, getCaseNotesSaga);
  yield takeLatest(ActionType.GET_CASE_STAGE as any, getCaseStageSaga);
  yield takeLatest(ActionType.ACCEPT_CASE as any, acceptCase);
  yield takeLatest(ActionType.GET_CASE_FILE as any, getCaseFileSaga);
  yield takeLatest(ActionType.SAVE_CASE_FILE as any, saveCaseFileSaga);
  yield takeLatest(ActionType.SAVE_CASE_FOLDER as any, saveCaseFolderSaga);
  yield takeLatest(ActionType.GET_CASE_DOCUMENTS as any, getCaseDocumentsSaga);
  yield takeLatest(ActionType.SAVE_CONNECTED_MATTERS as any, saveConnectedMattersSaga);
  yield takeLatest(ActionType.GET_CONNECTED_MATTERS as any, getConnectedMattersSaga);
  yield takeLatest(ActionType.UPDATE_CASE_DETAILS as any, updateCaseDetail);
  yield takeLatest(ActionType.GET_RELATED_JUDGEMENTS as any, getRelatedJudgementsSaga);
  yield takeLatest(ActionType.GET_CASE_HEARINGS as any, getHearingsByCaseIdSaga);
  yield takeLatest(ActionType.DELETE_CASE_NOTES as any, deleteCaseNotesSaga);
  yield takeLatest(ActionType.UPDATE_CASE_NOTES as any, updateCaseNotesSaga);
  yield takeLatest(ActionType.DELETE_CASE_CONTACT as any, deleteCaseContactsaga);
  yield takeLatest(ActionType.SAVE_CASE_CONTACT as any, saveCaseContactsaga);
  yield takeLatest(ActionType.SEND_NOTIFICATION as any, sendNotificationSaga)
  yield takeLatest(ActionType.CREATE_INVOICE as any, createInvoiceSaga)
  yield takeLatest(ActionType.GET_INVOICE_BY_CASE_ID as any, getInvoiceByCaseIdSaga)
  yield takeLatest(ActionType.UPDATE_INVOICE as any, updateInvoiceSaga)
  yield takeLatest(ActionType.SAVE_CASE_TASKS as any, saveCaseTasksSaga);
  yield takeLatest(ActionType.SAVE_CASE_REMAINDERS as any, saveCaseRemaindersSaga);
  yield takeLatest(ActionType.UPLOAD_CASE_FILE as any, uploadCaseFileSaga);
  yield takeLatest(ActionType.UPDATE_TASK_STATUS as any, updateTaskStatusSaga)
  yield takeLatest(ActionType.DELETE_CASE_TASKS as any, deleteCaseTasksSaga)
  yield takeLatest(ActionType.SEND_REMAINDER as any, sendRemainderSaga)
  yield takeLatest(ActionType.SEND_MAIL as any, sendMailSaga)
  yield takeLatest(ActionType.SEND_INVITE_MAIL as any, sendInviteMailSaga)
  yield takeLatest(ActionType.SEND_APPOINTMENT as any, sendAppointmentSaga)
  yield takeLatest(ActionType.UPDATE_APPOINTMENT as any, updateAppointmentSaga)
  yield takeLatest(ActionType.DELETE_CASE_FILE as any, deleteCaseFileSaga)
  yield takeLatest(ActionType.SAVE_CASE_RESULT as any, saveCaseResultSaga);
  yield takeLatest(ActionType.GET_HIGHCOURT as any, getHighCourtSaga);
  yield takeLatest(ActionType.HIDE_CASE_NOTIFICATION as any, hideNotificationSaga);
  yield takeLatest(ActionType.GET_CASE_BY_LAWYERID as any, getCaseByLawyerIdSaga);
  yield takeLatest(ActionType.UPDATE_NOTIFICATION_STATUS as any, updateNotificationStatusSaga);
  yield takeLatest(ActionType.GET_NOTI_BY_CASEID as any, getNotiByCaseIdSaga);
  yield takeLatest(ActionType.TRANSFER_INDIVIDUAL_LAWYER as any, transferindividualLawyerSaga);
}

export default [
  fork(onCaseManagementWatcher),
];


