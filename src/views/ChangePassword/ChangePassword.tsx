import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import { HeaderLinks } from "../../components/Header/HeaderLinks";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import * as FindLawyerActions from "../../reduxAction/findLawyer/findLawyerActions";
import * as FindJudgementActions from "../../reduxAction/findJudgement/findJudgementActions";
import { RootState } from "../../reduxAction/rootReducer";
import * as CaseManagementActions from "../../reduxAction/caseManagement/caseManagementActions";
import * as LoginActions from "../../reduxAction/authentication/authenticationActions";
import * as SnackbarsActions from "../../reduxAction/snackbars/snackbarsActions";
import * as CommonActions from "../../reduxAction/common/commonActions";
import "./ChangePassword.scss";
import { Theme } from "react-select";
import { createStyles, makeStyles } from "@material-ui/styles";
import { Box, Button,  InputLabel, TextField, Typography } from "@material-ui/core";
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import * as DashboardActions from "../../reduxAction/dashboard/dashboardActions";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const styles = (theme: Theme) =>
    createStyles({
        large: {
            width: "100px",
            height: "100px",
            border: "1px solid rgba(0, 0, 0, 0.12)",
            zIndex: 10,
        },
        backdrop: {
            // zIndex: theme.zIndex.drawer + 1,
            color: "#fff",
        },
        progressbar: {
            color: "#FFC602",
        },
    });

const useStyles = makeStyles(styles);

interface Props extends RouteComponentProps<any> {
    userName: string | null;
    CaseManagementActions: typeof CaseManagementActions;
    loginActions: typeof LoginActions;
    DashboardActions: typeof DashboardActions;
    snackbarsActions: typeof SnackbarsActions;
    isLoading: boolean;
    userInfo: any;
    caseManagement: any;
    commonActions: typeof CommonActions;
    common: any;
    finsJudgementActions: typeof FindJudgementActions;
    findJudgement: any;
    findJudgementLoaded: boolean;
    isJudgementLoading: boolean;
    casehearingslist: any[];
    caseNotes: any[];
    findLawyerActions: typeof FindLawyerActions;
    findLawyer: any;
    findLawyerLoaded: boolean;
    notifications: any;
    remainders: any;
    appointments: any;
    status: any;
    caseList: any,
    success: any;
    error: any;
    userRole: any | null;
}
interface State {
    oldPassword: string;
    showOldPassword: boolean;
    newPassword: string;
    showNewPassword: boolean;
    confirmPassword: string;
    showConfirmPassword: boolean;

}

export function ChangePassword(props: Props) {
    const classes = useStyles();
    const [isValidOldPassword, setIsValidOldPassword] = useState(true);
    const [isValidNewPassword, setIsValidNewPassword] = useState(true);
    const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(true);
    const [values, setValues] = React.useState<State>({
        oldPassword: '',
        showOldPassword: false,
        newPassword: '',
        showNewPassword: false,
        confirmPassword: '',
        showConfirmPassword: false
    });
    useEffect(() => {
        if (props.error) {
            props.snackbarsActions.showErrorSnackbarAction(props.error);
            props.loginActions.clearError({});
        }
    }, [props.error]);
    useEffect(() => {
        if (props.success) {
            props.snackbarsActions.showSuccessSnackbarAction(props.success);
            props.loginActions.clearSuccess({});
        }
    }, [props.success]);
    const handleChange =
        (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setValues({ ...values, [prop]: event.target.value });
        };

    const handleClickShowOldPassword = () => {
        setValues({
            ...values,
            showOldPassword: !values.showOldPassword,
        });
    };
    const handleClickShowNewPassword = () => {
        setValues({
            ...values,
            showNewPassword: !values.showNewPassword,
        });
    }
    const handleClickShowConfirmPassword = () => {
        setValues({
            ...values,
            showConfirmPassword: !values.showConfirmPassword,
        });
    }

    const handleChangePassword = () => {
        let validForm = true;
        let oldPassword:any = document.getElementById('old-password');
        let newPassword:any = document.getElementById('new-password')
        let confirmPassword:any  = document.getElementById('confirm-password')
        if (oldPassword.value === '') {
            setIsValidOldPassword(false)
            validForm = false
        }
        if (newPassword.value === '') {
            setIsValidNewPassword(false)
            validForm = false
        }
        if (confirmPassword.value === '') {
            setIsValidConfirmPassword(false)
            validForm = false
        }
        if (newPassword.value !== '' && newPassword.value === oldPassword.value) {
            props.snackbarsActions.showErrorSnackbarAction("Current Password and New Password should not be same");
            validForm = false
            setIsValidNewPassword(false)
            setIsValidOldPassword(false)
        }
        if (newPassword.value !== confirmPassword.value) {
            props.snackbarsActions.showErrorSnackbarAction("New Password and Confirm Password should be same");
            validForm = false
            setIsValidNewPassword(false)
            setIsValidConfirmPassword(false)
        }
        if (validForm) {
            let type = props.status;
            let id = props?.userInfo?.id
            let data  = {
                oldPassword: oldPassword.value,
                password: newPassword.value,
                id: id,
                type: type
            }
            props.loginActions.changePassword(data)
            props.snackbarsActions.showSuccessSnackbarAction(props.success);
            setTimeout(() => {
                props.loginActions.logoutUserAction();
                props.history.push('/');
                
            }, 1000);
            props.loginActions.clearError({});
    }
    }

    useEffect(() => {

    });

    return (
        <div>
            <Header links={<HeaderLinks  {...props} />} fixed color="primary" />
            <Box className="casemanagement-container-first" component="div" display="block" >
                <Typography variant="h5" gutterBottom align="center">
                    Change Password
                </Typography>
                <Box display="flex" component="div" className="cm-second d-flex justify-content-center">
                    <Typography variant="h6" gutterBottom align="center">
                        LAWE - An Integrated Legal Management Ecosystem
                    </Typography>
                </Box>

            </Box>
            <Box>
                <div className="container">
                    <div className="row mt-5">
                        <div className="col d-flex justify-center">
                            <InputLabel htmlFor="standard-adornment-password">Old Password</InputLabel>
                        </div>
                        <div className="col d-flex justify-content-start ">
                            <TextField
                                id="old-password"
                                style={{ width: "300px" }}
                                variant="outlined"
                                type={values.showOldPassword ? 'text' : 'password'}
                                error={!isValidOldPassword}
                                value={values.oldPassword}
                                onChange={handleChange('oldPassword')}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end" >
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowOldPassword}
                                            >
                                                {values.showOldPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col d-flex justify-center">
                            <InputLabel htmlFor="standard-adornment-password">New Password</InputLabel>
                        </div>
                        <div className="col d-flex justify-content-start">
                            <TextField
                                style={{ width: "300px" }}
                                id="new-password"
                                variant="outlined"
                                type={values.showNewPassword ? 'text' : 'password'}
                                value={values.newPassword}
                                error={!isValidNewPassword}
                                onChange={handleChange('newPassword')}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="Toggle password visibility"
                                                onClick={handleClickShowNewPassword}
                                            >
                                                {values.showNewPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}

                            />
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col d-flex justify-center">
                            <InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>
                        </div>
                        <div className="col d-flex justify-content-start">

                            <TextField
                                style={{ width: "300px" }}
                                id="confirm-password"
                                error={!isValidConfirmPassword}
                                variant="outlined"
                                type={values.showConfirmPassword ? 'text' : 'password'}
                                value={values.confirmPassword}
                                onChange={handleChange('confirmPassword')}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="Toggle password visibility"
                                                onClick={handleClickShowConfirmPassword}
                                            >
                                                {values.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col ">
                            <div className=" d-flex justify-content-center mt-4" style={{ width: "100%" }}>
                                <Button onClick={handleChangePassword} style={{ backgroundColor: "#292734", color: "#FFC602", height: "50px", width: "200px" }}>
                                    Change Password
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Box >
        </div >
    );
}



const mapStateToProps = (state: any) => ({
    userName: state.loginForm.userName,
    status: state.loginForm.status,
    userInfo: state.loginForm.userInfo,
    isLoading: state.caseManagement.loading,
    caseManagement: state.caseManagement,
    casehearingslist: state.caseManagement.casehearingslist,
    caseNotes: state.caseManagement.caseNotes,
    common: state.commonReducer,
    findJudgementLoaded: state.findJudgement.loaded,
    findJudgement: state.findJudgement.judgementList,
    isJudgementLoading: state.findJudgement.loading,
    findLawyer: state.findLawyer.lawyerList,
    findLawyerLoaded: state.findLawyer.loaded,
    notifications: state.loginForm.notifications,
    remainders: state.loginForm.remainders,
    appointments: state.loginForm.appointments,
    caseList: state.dashboard.caseList,
    success: state.loginForm.success,
    error: state.loginForm.error,
    userRole: state.loginForm.role,
});

function mapDispatchToProps(dispatch: any) {
    return {
        CaseManagementActions: bindActionCreators(CaseManagementActions as any, dispatch),
        snackbarsActions: bindActionCreators(SnackbarsActions as any, dispatch),
        loginActions: bindActionCreators(LoginActions as any, dispatch),
        commonActions: bindActionCreators(CommonActions as any, dispatch),
        finsJudgementActions: bindActionCreators(FindJudgementActions as any, dispatch),
        findLawyerActions: bindActionCreators(FindLawyerActions as any, dispatch),
        DashboardActions: bindActionCreators(DashboardActions as any, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChangePassword);
