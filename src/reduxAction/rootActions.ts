import * as AuthenticationActions from '../reduxAction/authentication/authenticationActions';
import * as FindJudgementActions from '../reduxAction/findJudgement/findJudgementActions';
import * as FindLawyerActions from '../reduxAction/findLawyer/findLawyerActions';
import * as PasswordEmailLinkActions from '../reduxAction/passwordEmailLink/passwordEmailLinkActions';
import * as ResetPasswordActions from '../reduxAction/resetPassword/resetPasswordActions';
import * as SnackbarActions from '../reduxAction/snackbars/snackbarsActions';
import * as SignupUserActions from '../reduxAction/signup/signupActions';
import * as SaveCaseInquiryAction from '../reduxAction/connectLawyer/connectLawyerActions';
import * as caseManagementActions from '../reduxAction/caseManagement/caseManagementActions';
import * as PaymentActions from '../reduxAction/payment/paymentActions';
import * as LawFirmDashboardActions from '../reduxAction/lawFirmDashboard/lawFirmDashboardActions';
import * as CommonActions from '../reduxAction/common/commonActions';
import * as DashboardActions from '../reduxAction/dashboard/dashboardActions';

export const ActionCreators = Object.assign({}, {
    ...AuthenticationActions,
    ...FindJudgementActions,
    ...FindLawyerActions,
    ...PasswordEmailLinkActions,
    ...ResetPasswordActions,
    ...SnackbarActions,
    ...SignupUserActions,
    ...SaveCaseInquiryAction,
    ...caseManagementActions,
    ...PaymentActions,
    ...LawFirmDashboardActions,
    ...CommonActions,
    ...DashboardActions
});
