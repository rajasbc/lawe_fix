import { getCookie } from '../utils/cookies';

export const apiBaseRoute = 'https://data.lawe.co.in';

export enum MethodType {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export const individualLoginRoute = `/login`;
export const companyLoginRoute = `/loginCompany`;
export const findLawyerRoute = `/getalluser?status=lawyer`;
export const findJudgement = `/searchjudgement?content=`;
export const forgotPasswordRoute = `/forgotemail`;
export const resetPasswordRoute = `/forgotpassword`;
export const searchLawyer = '/searchlawyer';
export const saveCaseInquiryRoute = '/savecaseinquiry';
export const fileUploadRoute = '/uploadfile';
export const getCaseListRoute = '/casebyid';
export const getJuniorListRoute = '/getJuniorsCases';
export const getJudgementUrlRoute = '/getfile?s3_key=';
export const getCaseNotesRoute = '/casenotesbyid';
export const saveCaseNotesRoute = '/savecasenotes';
export const deleteCaseNotesRoute = '/deletecasenotes';
export const updateCaseNotesRoute = '/updatecasenotes';
export const getCaseStageRoute = '/getcasephases';
export const updateCaseRoute = '/updatecasephases';
export const getCaseFileRoute = '/getfile?s3_key=';
export const createOrderRoute = '/payment';
export const getFirmCaseListRoute = '/getfirmcaselist';
export const getFirmLawyersRoute = '/getfirmlawyers';
export const reAssignLawyerRoute = '/reassignlawyer';
export const getDashboardDetailsRoute = '/getDashboarddetails';
export const getLawCategory = '/lawcategory';
export const getLawCategoryById = '/lawcategorybyid';
export const getHearingsByDate = '/getHearingsbyDate'
export const saveHearing = '/saveHearing'
export const getCaseHearingsByDateRoute = '/getCaseHearingsByDate'
export const getHearingsByCaseId = '/getHearingsByCaseId'
export const createCaseFolder = '/createCaseFolder'
export const saveCaseFile = '/saveCaseFile'
export const getCaseDocuments = '/getCaseDocuments'
export const getCaseType = '/getCaseType'
export const getCourts = '/courts'
export const saveConnectedMatters = '/saveConnectedMatters'
export const getConnectedMatters = '/getConnectedMatters'
export const updateCaseDetails = '/updateCaseDetails'
export const getRelatedJudgements = '/getRelatedJudgements'
export const saveCaseContactRoute = '/saveLawyerCaseContact';
export const deleteCaseContactRoute = '/deleteLawyerCaseContact';
export const sendNotificationRoute = '/sendNotification';
export const getAllNotificationsRoute = '/getAllNotifications';
export const getNotificationsByCaseIdRoute = '/getNotificationsByCaseId';
export const createInvoice = '/createInvoice'
export const getInvoiceByCaseId = '/getInvoiceByCaseId'
export const updateInvoice = '/updateInvoice'
export const saveCaseTasksRoute = '/saveLawyerCaseTasks'
export const saveCaseRemaindersRoute = '/saveLawyerCaseRemainders'
export const updateTaskStatus = '/updateTaskStatus'
export const deleteTasks = '/deleteTasks'
export const sendRemainderRoute = '/sendRemainder';
export const getAllRemaindersRoute = '/getAllRemainders'
export const sendMailRoute = '/sendMail';
export const sendInviteMailRoute = '/sendInviteMail';
export const sendAppointmentRoute = '/sendAppointment';
export const getAllAppointmentsRoute = '/getAllAppointments';
export const getAllFromAppointmentRoute = '/getAllFromAppointments';
export const updateAppointmentRoute = '/updateAppointment'
export const deleteCaseFileRoute = '/deleteFile'
export const getRoles = '/getRoles'
export const updateRole = '/updateRole'
export const addCompanyLawyer = '/addCompanyLawyer'
export const saveCaseResultRoute = '/saveCaseResult'
export const getHighCourtRoute = '/getHighCourt'
export const getDetails = '/getDetails'
export const hideNotificationRoute= '/hideNotification'
export const addToFavoritesRoute= '/addToFavorites'
export const getFavoriteCasesRoute= '/getFavoriteCases'
export const deleteNotificationRoute = '/deleteNotification'
export const getCaseByLawyerId = '/getCaseByLawyerId'
export const getJudgementTextURL = '/getJudgementText'
export const updateNotificationStatus = '/updateNotificationStatus'
export const changePasswordRoute = '/changePassword'
export const updateProfileRoute = '/updateProfile'
export const getStatesRoute = '/states'
export const getCityRoute = '/citybystate'
export const getCourtRoute = '/courts'
export const getAllCasesRoute = '/getAllCases'
export const getAllUserRoute = '/getAllUsers'
export const getReferenceCases = '/getReferenceCases'
export const updateCaseStatus = '/updateCaseStatus'
export const reassignIndividualLawyer = '/reassignIndividualLawyer'
export const transferindividualLawyer = '/transferindividualLawyer'
export const aadhaarVerification = '/aadhaarOtpGeneration'
export const aadhaarOtpSubmit = '/aadhaarOtpSubmit'

export const createApiCall = async ({ method = 'GET', url = '', data = {}, auth = false }) => {

  const headers: any = {
    "Content-Type": "application/json",
  }
  if (auth) {
    headers["Authorization"] = getCookie('token');
  }
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), 60000);
  return fetch(`${apiBaseRoute}${url}`, {
    body: method === 'GET' ? undefined : JSON.stringify(data),
    cache: "no-cache",
    headers,
    method,
    signal: controller.signal
  })
    .then(response => {
      clearTimeout(id);
      if (!response.ok) {
        return response.text().then(text => { throw text });
      }
      return response.json();
    })
    .then(result => result)
    .catch(err => { throw err });
}

export const createFileUploadApiCall = async ({ method = 'POST', url = '', data, auth = false }) => {
  const headers: any = {}
  if (auth) {
    headers["Authorization"] = getCookie('token');
  }
  return fetch(`${apiBaseRoute}${url}`, {
    body: data,
    cache: "no-cache",
    headers,
    method,
  })
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => { throw text });
      }
      return response.json();
    })
    .then(result => result)
    .catch(err => { throw err });
}
