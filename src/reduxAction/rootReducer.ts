import { History } from "history";
import { combineReducers } from "redux";
import { routerReducer, RouterState } from 'react-router-redux'

import { authenticationReducer, AuthenticationReducerType } from '../reduxAction/authentication/authenticationReducer';
import { findJudgementReducer, FindJudgementReducerType } from "../reduxAction/findJudgement/findJudgementReducer";
import { findLawyerReducer, FindALawyerReducerType } from "../reduxAction/findLawyer/findLawyerReducer";
import { passwordEmailLinkReducer, PasswordEmailLinkReducerType } from "../reduxAction/passwordEmailLink/passwordEmailLinkReducer";
import { resetPasswordReducer, ResetPasswordReducerType } from "../reduxAction/resetPassword/resetPasswordReducer";
import { snackbarsReducer, SnackbarReducerType } from "../reduxAction/snackbars/snackbarsReducer";
import { signUpReducer, SignUpReducerType } from "../reduxAction/signup/signupReducer";
import { saveCaseInquiryReducer, SaveCaseInquiryReducerType } from "../reduxAction/connectLawyer/connectLawyerReducer";
import { caseManagementReducer, caseManagementReducerType } from "../reduxAction/caseManagement/caseManagementReducer";
import { paymentReducer, CreateOrderReducerType } from "../reduxAction/payment/paymentReducer";
import { lawFirmDashboardReducer, LawFirmDashboardReducerType } from "../reduxAction/lawFirmDashboard/lawFirmDashboardReducer";
import { commonReducer, CommonReducerType } from "../reduxAction/common/commonReducer";
import { dashboardReducer, DashboardReducerType } from "../reduxAction/dashboard/dashboardReducer";

export interface RootState {
	loginForm: AuthenticationReducerType;
	dashboard:any;
	findLawyer: FindALawyerReducerType;
	findJudgement: FindJudgementReducerType;
	forgotPassword: PasswordEmailLinkReducerType;
	resetPassword: ResetPasswordReducerType;
	snackbars: SnackbarReducerType;
	signUpForm: SignUpReducerType;
	saveCaseInquiry: SaveCaseInquiryReducerType;
	caseManagement: caseManagementReducerType;
	order: CreateOrderReducerType;
	lawFirmDashboard:LawFirmDashboardReducerType;
	commonReducer:CommonReducerType;
	dashboardReducer: DashboardReducerType;
	routerReducer: RouterState;

}

export default (history: History) =>
	combineReducers({
		loginForm: authenticationReducer,
		findLawyer: findLawyerReducer,
		findJudgement: findJudgementReducer,
		forgotPassword: passwordEmailLinkReducer,
		resetPassword: resetPasswordReducer,
		snackbars: snackbarsReducer,
		signUpForm: signUpReducer,
		saveCaseInquiry: saveCaseInquiryReducer,
		caseManagement: caseManagementReducer,
		order: paymentReducer,
		lawFirmDashboard:lawFirmDashboardReducer,
		commonReducer:commonReducer,
		dashboard: dashboardReducer,
		routerReducer,
	});
