// prettier-ignore
import { withWidth } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { WithWidth } from "@material-ui/core/withWidth";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { connect } from "react-redux";
import { Route, RouteComponentProps, Router } from "react-router-dom";
// config
import { history } from "./reduxAction/configureStore";
import { RootState } from "./reduxAction/rootReducer";
import withRoot from "./withRoot";


// pages
import HomePageComponent from "./views/HomePage/HomePage";
import LoginPageComponent from "./views/Login/Login";
import ForgotPassword from "./views/ForgotPassword/ForgotPassword";
import ResetPassword from "./views/ResetPassword/ResetPassword";
import SignUpPageComponent from "./views/SignUp/Signup";
import LawyerList from "./views/LawyerList/LawyerList";
import JudgementList from "./views/JudgementList/JudgementList";
import LawyerProfile from "./views/LawyerProfile/LawyerProfile";
import ConnectLawyer from "./views/ConnectLawyer/ConnectLawyer";
import SuccessSnackbar from "./views/SuccessSnackbar/SuccessSnackbar";
import ErrorSnackbar from "./views/ErrorSnackbar/ErrorSnackbar"
import InfoSnackbar from "./views/InfoSnackbar/InfoSnackbar";
import CustomerCaseAccept from "./views/CustomerCaseNote/CustomerCaseNote";
import LawyerCaseAccept from "./views/LawyerCaseAccept/LawyerCaseAccept";
import CaseManagementPage from "./views/CaseManagementPage/CaseManagementPage";
import Dashboard from "./views/Dashboard/Dashboard";
import PlatformAdminDashboard  from "./views/Dashboard/PlatformAdminDashboard";
import ChangePassword from "./views/ChangePassword/ChangePassword";
import Profile from "./views/Profile/Profile";
import MultiPDFViewer from "./views/JudgementList/MultiPDFViewer";

function Routes() {
	const classes = useStyles();

	return (
		<div className={classes.content}>
			<Route exact path="/" component={HomePageComponent} />
			<Route exact path="/login-page" component={LoginPageComponent} />
			<Route exact path="/signup-page" component={SignUpPageComponent} />
			<Route exact path="/lawyer" component={LawyerList} />
			<Route exact path="/judgement" component={JudgementList} />
			<Route exact path="/forgot-password" component={ForgotPassword} />
			<Route exact path="/forgotpassword/:userId/:type" component={ResetPassword} />
			<Route exact path="/lawyer-profile/:id" component={LawyerProfile} />
			<Route exact path="/connect-lawyer/:id?" component={ConnectLawyer} />
			<Route exact path="/customer-case-note" component={CustomerCaseAccept} />
			<Route exact path="/lawyer-case-inquiry-accept" component={LawyerCaseAccept} />
			<Route exact path="/case-management" component={CaseManagementPage} />
			<Route exact path="/dashboard/:status?" component={Dashboard} />
			<Route exact path="/platform-admin-dashboard" component={PlatformAdminDashboard} />
			<Route exact path="/change-password" component={ChangePassword} />
			<Route exact path="/profile" component={Profile} />

			{/* //Commenting since react-pdf has some issue with vite need to check */}
			<Route exact path="/judgment/pdf" component={MultiPDFViewer} />

			{ /* <PrivateRoute path='/listing' component={ListingPage} /> */ }
		</div>
	);
}

interface Props extends RouteComponentProps<void>, WithWidth { }

function App(props?: Props) {
	const classes = useStyles();
	if (!props) {
		return null;
	}

	return (
		<React.Fragment>
			<SuccessSnackbar />
			<ErrorSnackbar />
			<InfoSnackbar />
			<Router history={history}>
				<div className={classes.root}>
					<div className={classes.appFrame}>
						<Routes />
					</div>
				</div>
			</Router>
		</React.Fragment>
	);
}

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) => ({
	root: {
		width: "100%",
		height: "100%",
		zIndex: 1,
		overflow: "hidden",
	},
	appFrame: {
		position: "relative",
		display: "flex",
		width: "100%",
		height: "100%",
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		position: "absolute",
	},
	navIconHide: {
		[theme.breakpoints.up("md")]: {
			display: "none",
		},
	},
	drawerHeader: theme.mixins.toolbar,
	drawerPaper: {
		width: 250,
		backgroundColor: theme.palette.background.default,
		[theme.breakpoints.up("md")]: {
			width: drawerWidth,
			position: "relative",
			height: "100%",
		},
	},
	content: {
		backgroundColor: theme.palette.background.default,
		width: "100%",
		height: "calc(100% - 56px)",
		// marginTop: 56,
		[theme.breakpoints.up("sm")]: {
			height: "calc(100% - 64px)",
			// marginTop: 64,
		},
	},
}));

function mapStateToProps(state: RootState) {
	return {
	};
}

export default connect(mapStateToProps)(withRoot(withWidth()(App)));
