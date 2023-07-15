import { all } from 'redux-saga/effects';

import authenticationSagas from '../reduxAction/authentication/authenticationSaga';
import findJudgementSaga from '../reduxAction/findJudgement/findJudgementSaga';
import findLawyerSaga from '../reduxAction/findLawyer/findLawyerSaga';
import passwordEmailLinkSaga from '../reduxAction/passwordEmailLink/passwordEmailLinkSaga';
import resetPasswordSaga from '../reduxAction/resetPassword/resetPasswordSaga';
import signUpSaga from '../reduxAction/signup/signupSaga';
import signupCompanyLawyerSaga from '../reduxAction/signup/signupCompanyLawyerSaga';
import connectLawyerSaga from '../reduxAction/connectLawyer/connectLawyerSaga';
import caseManagementSaga from '../reduxAction/caseManagement/caseManagementSaga';
import createOrderSaga from '../reduxAction/payment/paymentSaga';
import lawFirmDashboardSaga from '../reduxAction/lawFirmDashboard/lawFirmDashboardSaga';
import commonSaga from '../reduxAction/common/commonSaga';
import dashboardSaga from '../reduxAction/dashboard/dashboardSaga';

export default function* startForman() {
  yield all([
    ...authenticationSagas,
    ...findJudgementSaga,
    ...findLawyerSaga,
    ...passwordEmailLinkSaga,
    ...resetPasswordSaga,
    ...signUpSaga,
    ...signupCompanyLawyerSaga,
    ...connectLawyerSaga,
    ...caseManagementSaga,
    ...createOrderSaga,
    ...lawFirmDashboardSaga,
    ...commonSaga,
    ...dashboardSaga
  ]);
}