import {
    Avatar,
    Box, Card,
    CardActionArea,
    CardActions,
    CardContent,
    FormControl,
    Grid,
    TextField
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from "@material-ui/core/Typography";
import { Theme, makeStyles } from "@material-ui/core/styles";
import FindReplaceSharpIcon from "@material-ui/icons/FindReplaceSharp";
import { CssBaseline, Drawer, ListItemText } from "@mui/material";
import classNames from "classnames";
import { filter } from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { bindActionCreators } from "redux";
import { CASE_STATUS } from "../../assets/constant/stage";
import face from "../../assets/img/faces/avatar.png";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { HeaderLinks } from "../../components/Header/HeaderLinks";
import * as LoginActions from "../../reduxAction/authentication/authenticationActions";
import * as CaseManagementActions from "../../reduxAction/caseManagement/caseManagementActions";
import * as CommonActions from "../../reduxAction/common/commonActions";
import * as SaveCaseInquiryAction from "../../reduxAction/connectLawyer/connectLawyerActions";
import * as DashboardActions from "../../reduxAction/dashboard/dashboardActions";
import * as FindLawyerActions from "../../reduxAction/findLawyer/findLawyerActions";
import { RootState } from "../../reduxAction/rootReducer";
import * as signupUserActions from "../../reduxAction/signup/signupActions";
import * as SnackbarsActions from "../../reduxAction/snackbars/snackbarsActions";
import './CheckBoxList.scss';
import "./Dashboard.scss";
import PA_CheckboxList from "./PAdmin_CheckBoxList";
const styles:any = {
    large: {
        width: "150px",
        height: "150px",
    },
    root: {
        padding: '0'
    },
    listItem: {
        position: 'relative',
        padding: '0'
    },
    listItemIcon: {
        position: 'absolute',
        top: '15px',
        left: '35px',
    },
    backdrop: {
        // zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
};

const useStyles = makeStyles(styles);


interface Props extends RouteComponentProps<any> {
    userName: string | null;
    findLawyerActions: typeof FindLawyerActions;
    snackbarsActions: typeof SnackbarsActions;
    loginActions: typeof LoginActions;
    saveCaseInquiryAction: typeof SaveCaseInquiryAction;
    findLawyer: any;
    userRole: any | null;
    status: string | null;
    findLawyerLoaded: boolean;
    isLoading: boolean;
    searchData: any;
    lawCategory: any[];
    commonActions: typeof CommonActions;
    categoryLoading: boolean;
    subCategory: any[];
    classes: any;
    actions: typeof signupUserActions;
    signUp: any;
    error: any;
    DashboardActions: typeof DashboardActions;
    caseList: any;
    platformUsers: any;
    userInfo: any;
    CaseManagementActions: typeof CaseManagementActions;
    roleType: any;
}

export class PlatformAdminDashboard extends Component<Props> {
    constructor(props) {
        super(props);
    }
    state = {
        currentStatus: "",
        isAddSME: false,
        itemsToDisplay: [],

    };

    componentDidMount() {
        this.props.DashboardActions.getAllCasesAction({});
        this.props.DashboardActions.getAllUserAction({});
    }

    componentDidUpdate(prevProps) {

    }

    handleStatusFilter = (status) => {
        const { platformUsers } = this.props;
        if (status === "createSME") {
            this.setState({ currentStatus: status })
        } else if (status === "addmissingkeywords") {
            this.setState({ currentStatus: status })
        }
        else if (status === "client") {

            const itemsToDisplay = platformUsers?.client;
            this.setState({ itemsToDisplay, currentStatus: status });
        }
        else if (status === "lawyer") {
            const itemsToDisplay = platformUsers?.lawyer;
            this.setState({ itemsToDisplay, currentStatus: status });
        }
        else if (status === "clientfirm") {
            const itemsToDisplay = platformUsers?.clientFirm;
            this.setState({ itemsToDisplay, currentStatus: status });
        }
        else if (status === "lawfirm") {
            const itemsToDisplay = platformUsers?.lawfirm;
            this.setState({ itemsToDisplay, currentStatus: status });
        }
        else {
            const { caseList } = this.props;
            const itemsToDisplay = filter(caseList?.cases, { status }).sort(function (a, b) { return (new Date(b["created"]).getTime() - new Date(a["created"]).getTime()) });
            this.setState({ itemsToDisplay, currentStatus: status });
        }

    };
    handleSelelctLawyer = (selected) => {
        this.setState({ selectedProfile: selected });
    };
    handleManage = (id) => {
        // this.loadManageCase(id)
    }
    // loadManageCase = () => {
    //     const {
    //       userInfo,
    //       lawFirmDashboardActions,
    //       userRole: { id: roleId, roleName },
    //       CommonActions,
    //       status,
    //     } = this.props;
    //     if (userInfo?.status == "companylawyer") {
    //       const data = {
    //         id: userInfo.userjson.companyId,
    //         userId: userInfo.id,
    //         roleId,
    //         offset: 0,
    //         limit: 10,
    //       };
    //       lawFirmDashboardActions.getFirmCaseList(data);
    //       lawFirmDashboardActions.getFirmLawyers({ lawyerId: userInfo.userjson.companyId, roleId, userId: userInfo.id, });
    //     }
    //     else if (roleName == Roles.LawFirmAdmin) {
    //       const data = {
    //         id: userInfo.id,
    //         roleId,
    //         offset: 0,
    //         limit: 10,
    //       };
    //       lawFirmDashboardActions.getFirmCaseList(data);
    //       lawFirmDashboardActions.getFirmLawyers({ lawyerId: userInfo.id, roleId });
    //     }
    //   }
    handleProfileNavigation = (id) => {
        this.props.history.push(`/lawyer-profile/${id}`);
    };
    handleCaseNavigation = (getCaseNotesData, role) => {
        let roles = role.split("-");
        let roleName = roles[0].trim();
        this.props.DashboardActions.setRoleType(roleName);
        const {
            CaseManagementActions,
            history,
            status,
        } = this.props;
        CaseManagementActions.setCurrentState(this.state.currentStatus);
        CaseManagementActions.setSelectedCase(getCaseNotesData);
        if (
            (roleName == "Client") &&
            (getCaseNotesData.status == "requested" ||
                getCaseNotesData.status == "proposed")
        ) {
            history.push(`/customer-case-note`);
        }

        if (
            (roleName == "Client Firm") &&
            (getCaseNotesData.status == "requested" ||
                getCaseNotesData.status == "proposed")
        ) {
            history.push(`/customer-case-note`);
        }
        if (
            (roleName == "Client Firm") &&
            (getCaseNotesData.status == "accepted" ||
                getCaseNotesData.status == "archieved")
        ) {
            history.push(`/case-management`);
        }
        if (
            (roleName == "Client") &&
            (getCaseNotesData.status == "accepted" ||
                getCaseNotesData.status == "archieved")
        ) {

            history.push(`/case-management`);
        }
        if (
            (roleName == "Lawyer") &&
            (getCaseNotesData.status == "requested" ||
                getCaseNotesData.status == "proposed")
        ) {
            history.push(`/lawyer-case-inquiry-accept`);
        }
        if (
            (roleName == "Lawyer") &&
            (getCaseNotesData.status == "accepted" ||
                getCaseNotesData.status == "archieved")
        ) {
            history.push(`/case-management`);
        }
    };
    saveSME = () => {
        let fname :any = document.getElementById("firstname")
        let lname :any = document.getElementById("lastname")
        let email :any = document.getElementById("email")
        let mobile :any = document.getElementById("mobile")

        let output = {
            status: "sme",
            fName: fname.value,
            lName: lname.value,
            mobileNo: mobile.value,
            email: email.value,
            password: mobile.value
        }
        let data = {
            data: output
        };
        this.props.snackbarsActions.clearSnackbarAction();
        this.props.actions.signupUserAction(data);
    }
    render() {
        const { currentStatus, itemsToDisplay } = this.state;
        const {
            isLoading,
            classes,
            userName
        } = this.props;
        return (
            <div>
                <Header links={<HeaderLinks
                    {...this.props} />
                }
                    fixed
                    color="primary"
                />
                <div className="main-container">
                    <CssBaseline />
                    <Drawer
                        className="drawer"
                        variant="permanent"
                        classes={{
                            paper: "drawerPaper",
                        }}
                        anchor="left"
                    >
                        <Typography gutterBottom variant="h5" component="h2">
                            <span style={{ cursor: "pointer" }}>
                                Dashboard
                            </span>
                        </Typography>
                        <Divider className="dashboard-divider" />

                        <React.Fragment>
                            <Typography gutterBottom variant="h5" component="h3">
                                Admin Sections
                            </Typography>
                            <List>
                                <ListItem
                                    className={classNames({
                                        "list-btn": true,
                                        "active-btn": currentStatus === "createSME",
                                    })}
                                    button
                                    key="createSME"
                                    onClick={() => this.handleStatusFilter("createSME")}
                                >
                                    <ListItemText
                                        className="list-text"
                                        primary="Add SME"
                                    />
                                </ListItem>
                                <ListItem
                                    className={classNames({
                                        "list-btn": true,
                                        "active-btn": currentStatus === "addmissingkeywords",
                                    })}
                                    button
                                    key="addmissingkeywords"
                                    onClick={() => this.handleStatusFilter("addmissingkeywords")}
                                >
                                    <ListItemText
                                        className="list-text"
                                        primary="Add Keywords"
                                    />
                                </ListItem>
                            </List>
                            <Typography gutterBottom variant="h5" component="h3">
                                Cases
                            </Typography>
                            <List>
                                <ListItem
                                    className={classNames({
                                        "list-btn": true,
                                        "active-btn": currentStatus === CASE_STATUS[0],
                                    })}
                                    button
                                    key="Pending"
                                    onClick={() => this.handleStatusFilter(CASE_STATUS[0])}
                                >
                                    <ListItemText className="list-text" primary="Pending" />
                                </ListItem>
                                <ListItem
                                    className={classNames({
                                        "list-btn": true,
                                        "active-btn": currentStatus === CASE_STATUS[1],
                                    })}
                                    button
                                    key="Acknowledged"
                                    onClick={() => this.handleStatusFilter(CASE_STATUS[1])}
                                >
                                    <ListItemText
                                        className="list-text"
                                        primary="Acknowledged"
                                    />
                                </ListItem>


                                <ListItem
                                    className={classNames({
                                        "list-btn": true,
                                        "active-btn": currentStatus === CASE_STATUS[2],
                                    })}
                                    button
                                    key="Active"
                                    onClick={() => this.handleStatusFilter(CASE_STATUS[2])}
                                >
                                    <ListItemText className="list-text" primary="Active" />
                                </ListItem>
                                <ListItem
                                    className={classNames({
                                        "list-btn": true,
                                        "active-btn": currentStatus === CASE_STATUS[3],
                                    })}
                                    button
                                    key="Archieved"
                                    onClick={() => this.handleStatusFilter(CASE_STATUS[3])}
                                >
                                    <ListItemText className="list-text" primary="Archieved" />
                                </ListItem>
                            </List>
                            <Typography gutterBottom variant="h5" component="h3">
                                Users
                            </Typography>
                            <List>
                                <ListItem
                                    className={classNames({
                                        "list-btn": true,
                                        "active-btn": currentStatus === "client",
                                    })}
                                    button
                                    key="Clients"
                                    onClick={() => this.handleStatusFilter("client")}
                                >
                                    <ListItemText className="list-text" primary="Clients" />
                                </ListItem>
                                <ListItem
                                    className={classNames({
                                        "list-btn": true,
                                        "active-btn": currentStatus === "lawyer",
                                    })}
                                    button
                                    key="Lawyers"
                                    onClick={() => this.handleStatusFilter("lawyer")}
                                >
                                    <ListItemText
                                        className="list-text"
                                        primary="Lawyers"
                                    />
                                </ListItem>
                                <ListItem
                                    className={classNames({
                                        "list-btn": true,
                                        "active-btn": currentStatus === "clientfirm",
                                    })}
                                    button
                                    key="Client Firm"
                                    onClick={() => this.handleStatusFilter("clientfirm")}
                                >
                                    <ListItemText className="list-text" primary="Client Firm" />
                                </ListItem>
                                <ListItem
                                    className={classNames({
                                        "list-btn": true,
                                        "active-btn": currentStatus === "lawfirm",
                                    })}
                                    button
                                    key="Law Firm"
                                    onClick={() => this.handleStatusFilter("lawfirm")}
                                >
                                    <ListItemText className="list-text" primary="Law Firm" />
                                </ListItem>
                            </List>
                        </React.Fragment>

                    </Drawer>


                    {currentStatus === "createSME" &&
                        <div className="container-sm-6">
                            <FormControl variant="outlined" className="text-field">
                                <div className="col">
                                    <div className="row d-flex" >

                                        {/* <InputLabel>Password</InputLabel> */}
                                        <TextField
                                            size="small"
                                            id="firstname"
                                            label="First Name"
                                            placeholder="First Name"
                                            variant="outlined"
                                            className="textfield"
                                        />
                                        {/* <InputLabel>Password</InputLabel> */}
                                        <TextField
                                            size="small"
                                            id="lastname"
                                            label="Last Name"
                                            placeholder="Last Name"
                                            variant="outlined"
                                            className="textfield"
                                        />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="row d-flex"  >
                                        <TextField
                                            size="small"
                                            id="email"
                                            label="Email ID"
                                            placeholder="email"
                                            variant="outlined"
                                            className="textfield"
                                        />
                                        <TextField
                                            size="small"
                                            id="mobile"
                                            label="Mobile Number"
                                            placeholder="Mobile Number"
                                            variant="outlined"
                                            className="textfield"
                                        />
                                        <Button
                                            variant="contained"
                                            className="addnotes"
                                            style={{ backgroundColor: "#292734" }}
                                            onClick={this.saveSME}>
                                            Save SME
                                        </Button>
                                    </div>

                                </div>
                            </FormControl>
                        </div>
                    }
                    {currentStatus === 'lawyer' && itemsToDisplay &&

                        (
                            <main className="drawer-content">
                                {itemsToDisplay?.length > 0 &&
                                    <div
                                        className="dashboard-container"
                                        style={{ height: "500px", overflow: "auto" }}
                                    >
                                        <Grid container>
                                            <Grid item xs={10}>
                                                <CheckList
                                                    data={itemsToDisplay}
                                                    handleSelelctLawyer={this.handleSelelctLawyer}
                                                    handleProfileNavigation={this.handleProfileNavigation}
                                                />

                                            </Grid>
                                        </Grid>
                                    </div>
                                }
                            </main>
                        )
                    }
                    {currentStatus === 'client' && itemsToDisplay?.length > 0 &&
                        (
                            <main className="drawer-content">
                                {itemsToDisplay?.length > 0 &&
                                    <div
                                        className="dashboard-container"
                                        style={{ height: "500px", overflow: "auto" }}
                                    >
                                        <Grid container>
                                            <Grid item xs={10}>
                                                <ClientCheckList
                                                    data={itemsToDisplay}
                                                />

                                            </Grid>
                                        </Grid>
                                    </div>
                                }
                            </main>
                        )
                    }
                    {currentStatus === 'clientfirm' && itemsToDisplay?.length > 0 &&
                        (
                            <main className="drawer-content">
                                {itemsToDisplay?.length > 0 &&
                                    <div
                                        className="dashboard-container"
                                        style={{ height: "500px", overflow: "auto" }}
                                    >
                                        <Grid container>
                                            <Grid item xs={10}>
                                                <ClientCheckList
                                                    data={itemsToDisplay}
                                                />

                                            </Grid>
                                        </Grid>
                                    </div>
                                }
                            </main>
                        )
                    }
                    {currentStatus === 'lawfirm' && itemsToDisplay.length > 0 &&
                        (
                            <main className="drawer-content">
                                {itemsToDisplay?.length > 0 &&
                                    <div
                                        className="dashboard-container"
                                        style={{ height: "500px", overflow: "auto" }}
                                    >
                                        <Grid container>
                                            <Grid item xs={10}>
                                                <ClientCheckList
                                                    data={itemsToDisplay}
                                                    // handleManage={this.handleMange}
                                                />

                                            </Grid>
                                        </Grid>
                                    </div>
                                }
                            </main>
                        )
                    }
                    {
                        currentStatus != 'createSME' && currentStatus != 'addmissingkeywords' &&
                        currentStatus != 'lawyer' && currentStatus != 'client' && currentStatus != 'clientfirm' &&
                        currentStatus != 'lawfirm' &&
                        <main className="drawer-content">
                            {itemsToDisplay?.length > 0 &&
                                <div
                                    className="dashboard-container"
                                    style={{ height: "500px", overflow: "auto" }}
                                >
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <PA_CheckboxList DashboardActions={this.props.DashboardActions}
                                                data={itemsToDisplay} userInfo={this.props.userInfo}
                                                handleCaseNavigation={this.handleCaseNavigation} />

                                        </Grid>
                                    </Grid>
                                </div>
                            }
                            {itemsToDisplay?.length === 0 &&
                                <Box className="no-result-fount" alignItems="center" display="flex">
                                    <Box>
                                        <FindReplaceSharpIcon />
                                    </Box>
                                    <Box>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            No results found
                                        </Typography>
                                    </Box>
                                </Box>
                            }
                        </main>
                    }
                </div >
                <Footer />

                {/* <Backdrop className={classes.backdrop} open={isLoading}>
                    <CircularProgress className={classes.progressbar} size={100} />
                </Backdrop> */}
            </div >


        );
    }
}

const mapStateToProps = (state: RootState) => ({
    userName: state.loginForm.userName,
    userInfo: state.loginForm.userInfo,
    userRole: state.loginForm.role,
    status: state.loginForm.status,
    isLoading: state.findLawyer.loading,
    searchData: state.findLawyer.searchData,
    notifications: state.loginForm.notifications,
    remainders: state.loginForm.remainders,
    appointments: state.loginForm.appointments,
    signUp: state.signUpForm,
    caseList: state.dashboard.caseList,
    platformUsers: state.dashboard.platformUsers,
});

function mapDispatchToProps(dispatch: any) {
    return {
        snackbarsActions: bindActionCreators(SnackbarsActions as any, dispatch),
        loginActions: bindActionCreators(LoginActions as any, dispatch),
        commonActions: bindActionCreators(CommonActions as any, dispatch),
        actions: bindActionCreators(signupUserActions as any, dispatch),
        DashboardActions: bindActionCreators(DashboardActions as any, dispatch),
        CaseManagementActions: bindActionCreators(CaseManagementActions as any, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlatformAdminDashboard);

export function MediaCard(props) {
    const classes = useStyles();
    let skils;
    if(props.data.status === "lawyer"){ 
     skils = props.data.userjson.dataGrid.map(
        (item) => `${item.product.name}, ${item.subProduct.name}`
    );
    }
    const handleManage = (event) => {
        // props.handleManage(props.data.id);
    }
    return (
        
            <Card className="card-container">
                <CardActionArea>
                    {props.data.status === "lawyer" && 
                    <CardContent>
                    <Grid container>
                        <Grid container xs={2} alignItems="center" justify="center">
                            <Avatar alt="Remy Sharp" src={props.data.profileKey ? props.data.profileKey : face} className={classes.large} />
                        </Grid>
                        <Grid container xs={10} alignItems="center">
                            <Grid item>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Mr. {props.data.userName} {props.data.lname}
                                </Typography>
                                <Typography
                                    gutterBottom
                                    variant="h6"
                                    component="h2"
                                    className="location-text"
                                >
                                    {props.data.userjson.city.cityName}
                                </Typography>
                                <Typography component="p">
                                    Focus Skills: {skils.join()}
                                </Typography>
                                <Typography component="p">
                                    Languages Known: {props.data.userjson.languagesKnow.join(",")}
                                </Typography>
                                <Typography component="p">
                                    Practising Courts: {props.data.practisingCourt}
                                </Typography>

                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
                }
                    {props.data.status === "individual" &&
                        <CardContent>
                            <Grid container>
                                <Grid container xs={2} alignItems="center" justify="center">
                                    <Avatar alt="Remy Sharp" src={props.data.profileKey ? props.data.profileKey : face} className={classes.large} />
                                </Grid>
                                <Grid container xs={10} alignItems="center">
                                    <Grid item>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Mr. {props.data.userName} {props.data.lname}
                                        </Typography>
                                        <Typography
                                            gutterBottom
                                            variant="h6"
                                            component="h2"
                                            className="location-text"
                                        >
                                            {props.data.userjson.city.cityName}
                                        </Typography>


                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                    }
                    {props.data.status === "clientfirm" &&
                        <CardContent>
                            <Grid container>
                                <Grid container xs={2} alignItems="center" justify="center">
                                    <Avatar alt="Remy Sharp" src={props.data.profileKey ? props.data.profileKey : face} className={classes.large} />
                                </Grid>
                                <Grid container xs={10} alignItems="center">
                                    <Grid item>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {props.data.companyName}
                                        </Typography>
                                        <Typography
                                            gutterBottom
                                            variant="h6"
                                            component="h2"
                                            className="location-text"
                                        >
                                            Representative Name : {props.data.companyrepresentativename}
                                        </Typography>


                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                    }
                    {props.data.status === "lawfirm" &&
                        <CardContent>
                            <Grid container>
                                <Grid container xs={2} alignItems="center" justify="center">
                                    <Avatar alt="Remy Sharp" src={props.data.profileKey ? props.data.profileKey : face} className={classes.large} />
                                </Grid>
                                <Grid container xs={10} alignItems="center">
                                    <Grid item>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {props.data.companyName}
                                        </Typography>
                                        <Typography
                                            gutterBottom
                                            variant="h6"
                                            component="h2"
                                            className="location-text"
                                        >
                                            Representative Name : {props.data.companyrepresentativename}
                                        </Typography>


                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                    }
                    <Divider />
                </CardActionArea>
                <CardActions className="action-container">
                    <Grid container alignItems="center" justify="space-between">
                        <Grid item>
                            <Typography variant="h6">
                                Email ID : {props.data.email}
                            </Typography>
                            {props.data.status === "lawyer" &&
                            <Grid item>
                            <Typography variant="h6">
                                LAWE Engagements: {props.data.engagements}
                            </Typography>
                            <Typography variant="h6">
                                Years of Experience : {props.data.experience}
                            </Typography>
                        </Grid>
                            }
                            {props.data.status === "lawfirm" || props.data.status === "clientfirm" &&
                                <Typography variant="h6">
                                    Mobile Number: {props.data.companymobileno}
                                </Typography>
                            }
                             {props.data.status === "individual"&&
                                <Typography variant="h6">
                                    Mobile Number: {props.data.mobileno}
                                </Typography>
                            }
                        </Grid>
                        {props.data.status === "lawfirm" &&

                            <Grid item>
                                <Button
                                    variant="contained"
                                    className="detail-btn"
                                    onClick={handleManage}
                                >
                                    Manage
                                </Button>
                            </Grid>
                        }
                        {/* {props.data.status === "lawyer" && 
                         <Grid item>
                        <Button
                            variant="contained"
                            className="detail-btn"
                            onClick={handleProfileNavigation}
                        >
                            View Profile
                        </Button>
                    </Grid>
                        } */}
                    </Grid>
                </CardActions>
            </Card >
       
    );

}
export function CheckList(props) {
    const classes = useStyles();
    return (
        <List className={classes.root}>
            {props.data.map((item) => {
                return (
                    <ListItem className={classes.listItem} key={item.id} role={undefined}>
                        <MediaCard
                            data={item}
                            handleProfileNavigation={props.handleProfileNavigation}
                        />
                    </ListItem>
                );
            })}
        </List>
    );
}
export function ClientCheckList(props) {
    const classes = useStyles();
    return (
        <List className={classes.root}>
            {props.data.map((item) => {


                return (
                    <ListItem className={classes.listItem} key={item.id} role={undefined}>

                        <MediaCard
                            data={item}
                        />
                    </ListItem>
                );
            })}
        </List>
    );
}