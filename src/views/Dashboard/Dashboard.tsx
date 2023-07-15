import DateFnsUtils from "@date-io/date-fns";
import {
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  CssBaseline,
  Divider,
  Drawer,
  FormControl,
  Grid,
  InputLabel,
  Link,
  List,
  ListItem,
  ListItemText,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Theme,
  Typography,
  createStyles,
  withStyles,
} from "@material-ui/core";
import FindReplaceSharpIcon from "@material-ui/icons/FindReplaceSharp";
import RefreshIcon from '@material-ui/icons/Refresh';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import classNames from "classnames";
import { filter, isEqual } from "lodash";
import moment from "moment";
import React, { Component } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { bindActionCreators } from "redux";
import { CASE_STATUS } from "../../assets/constant/stage";
import ResponsiveDialog from "../../components/ClouserDialog/ClouserDialog";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { HeaderLinks } from "../../components/Header/HeaderLinks";
import * as LoginActions from "../../reduxAction/authentication/authenticationActions";
import * as CaseManagementActions from "../../reduxAction/caseManagement/caseManagementActions";
import * as CommonActions from "../../reduxAction/common/commonActions";
import * as DashboardActions from "../../reduxAction/dashboard/dashboardActions";
import * as LawFirmDashboardActions from "../../reduxAction/lawFirmDashboard/lawFirmDashboardActions";
import { RootState } from "../../reduxAction/rootReducer";
import * as SnackbarsActions from "../../reduxAction/snackbars/snackbarsActions";
import { CheckboxList } from "./CheckBoxList";
import "./Dashboard.scss";
import { ManageCase } from "./ManageCases/ManageCase";
import { ManageUser } from "./ManageUsers/ManageUser";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const styles = (theme: Theme) => createStyles({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  progressbar: {
    color: '#FFC602'
  },
  link: {
    fontSize: "11px",
    color: "#0645AD",
  },
  refreshIcon: {
    paddingLeft: "10px",
    color: '#FFC602',
  },
  refreshIconButton: {
    fontSize: "1.4rem",
    marginBottom:"2px",
  }
});

export enum Roles {
  LawFirmAdmin = "lawfirmadmin",
  ClientFirmAdmin = "clientfirmadmin",
  SeniorMostLawyer = "sr.mostlawyer",
  SeniorLawyer = "sr.lawyer",
  Lawyer = "lawyer",
  JuniorLawyer = "juniorlawyer",
  Client = "individual",
  CompanyLawyer = "companylawyer"
}
interface Props extends RouteComponentProps<any> {
  userName: string | null;
  userRole: any | null;
  status: string | null;
  loginActions: typeof LoginActions;
  isLoading: boolean;
  userInfo: any;
  caseList: any;
  juniorList: any;
  favoriteList: any;
  CaseManagementActions: typeof CaseManagementActions;
  caseManagement: any;
  reAssignStatus: any;
  refreshCaseList: any;
  DashboardActions: typeof DashboardActions;
  caseHearings: any;
  dashboardDetails: any;
  roles: any;
  CommonActions: typeof CommonActions;
  lawFirmDashboardActions: typeof LawFirmDashboardActions;
  manageCaseList: any;
  manageLawyers: any;
  classes: any;
  success: any;
  error: any;
  snackbarsActions: typeof SnackbarsActions;
  lawFirmError: any;
  lawFirmSuccess: any;
  moreListEnded: any;
  notifications:any;
  remainders:any;
  appointments:any;
  caseLawyers:any;
  reassignSuccess:boolean;
  saveCaseInquiry: any;
  updateRoleRes:any
}
export class Dashboard extends Component<Props> {
  
  state = {
    itemsToDisplay: [],
    currentStatus: "dashboard",
    currentCount: 10,
    selectedDate: new Date().toISOString(),
    addHearingCloseConfirm: false,
    isValidPurpose: true,
    isValidCase: true,
    hearingParam: {
      purpose: "",
      caseId: 0,
      date: new Date(),
      description: "",
    },
  };

  componentDidMount() {
    const { currentState } = this.props.caseManagement;
    this.loadDashboard();
    if (currentState) {
      this.setState({ currentStatus: currentState });
      this.props.CaseManagementActions.clearCurrentState({});
      if (currentState == "managecase") {
        this.handleStateFilter("managecase");
      } else {
        this.handleStatusFilter(currentState);
      }
    }
  }
  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.caseList, this.props.caseList)) {
      const {
        caseList: { cases },
      } = this.props;
      this.reRenderList(cases);
    }

    if (!isEqual(prevProps.juniorList, this.props.juniorList)) {
      this.renderList();
    }

    if (!isEqual(prevProps.favoriteList, this.props.favoriteList)) {


      this.renderList();
    }
    if (
      !isEqual(
        prevProps.caseManagement.caesFile,
        this.props.caseManagement.caesFile
      )
    ) {
      const {
        caseManagement: { caesFile: { link } = { link: undefined } },
      } = this.props;
      if (link) window.open(link, "_blank");
    }
    if (prevProps.reAssignStatus == null && this.props.reAssignStatus) {
      this.loadManageCase();
    }
    if (prevProps.reassignSuccess == null && this.props.reassignSuccess) {
      this.props.history.push('/dashboard');
    }
    
    if (this.props.error) {
      this.props.snackbarsActions.showErrorSnackbarAction(this.props.error);
      this.props.DashboardActions.clearError({});
    }
    if (this.props.success) {
      this.props.snackbarsActions.showSuccessSnackbarAction(this.props.success);
      this.props.DashboardActions.clearSuccess({});
    }
    if (this.props.lawFirmSuccess) {
      this.props.snackbarsActions.showSuccessSnackbarAction(this.props.lawFirmSuccess);
      this.props.lawFirmDashboardActions.clearSuccess({});
    }
    if (this.props.lawFirmError) {
      this.props.snackbarsActions.showErrorSnackbarAction(this.props.lawFirmError);
      this.props.lawFirmDashboardActions.clearError({});
    }

  }
  // this.loadCaseList();
  reRenderList = (data) => {
    if (data) {
      const { currentStatus } = this.state;
      const itemsToDisplay = filter(data, { status: currentStatus }).sort(function (a, b) { return (new Date(b["created"]).getTime() - new Date(a["created"]).getTime()) });
      this.setState({ itemsToDisplay });
    }
  };
  renderList = () => {
    const { favoriteList } = this.props;
    const itemsToDisplay = favoriteList;
    // this.setState({ itemsToDisplay, currentStatus: "favourites" });
    this.setState({ itemsToDisplay});

  };
  //manage
  handleManageCaseNavigation = (data) => {

    const caseFiles = JSON.parse(data?.caseLawyers_case_files);
    const caseNotesData = {
      caseFiles: caseFiles,
      caseId: data?.caseLawyers_case_id,
      clientGender: data?.caseLawyers_client_gender,
      clientId: data?.caseLawyers_client_id,
      clientName: data?.caseLawyers_client_name,
      description: data?.caseLawyers_description,
      dueDate: data?.caseLawyers_due_date,
      feesPerStage: data?.caseLawyers_fees_per_stage,
      id: data?.caseLawyers_id,
      initialAdvance: data?.caseLawyers_initial_advance,
      lawyerEmail: data?.caseLawyers_lawyer_email,
      lawyerGender: data?.caseLawyers_lawyer_gender,
      lawyerId: data?.caseLawyers_lawyer_id,
      lawyerName: data?.caseLawyers_lawyer_name,
      notesOfEnquirer: data?.caseLawyers_notes_of_enquirer,
      product: data?.caseLawyers_product,
      proposedStages: data?.caseLawyers_proposed_stages,
      status: data?.caseLawyers_status,
      subproduct: data?.caseLawyers_subproduct,
      title: data?.caseLawyers_title,
      role: data?.user_status,
      roleId: data?.user_role_id,
    };
    const { CaseManagementActions } = this.props;
    CaseManagementActions.setCurrentState(this.state.currentStatus);
    CaseManagementActions.setSelectedCase(caseNotesData);
    this.props.history.push(`/case-management`);
  };
 
  loadManageCase = () => {
    const {
      userInfo,
      lawFirmDashboardActions,
      userRole: { id: roleId, roleName },
      CommonActions,
      status,
    } = this.props;
    if (userInfo?.status == "companylawyer") {
      const data = {
        id: userInfo.userjson.companyId,
        userId: userInfo.id,
        roleId,
        offset: 0,
        limit: 10,
      };
      lawFirmDashboardActions.getFirmCaseList(data);
      lawFirmDashboardActions.getFirmLawyers({ lawyerId: userInfo.userjson.companyId });
    }
    else if (roleName == Roles.LawFirmAdmin) {
      const { currentCount } = this.state;
      this.setState({
        currentCount: 10,
      });
      
      const data = {
        id: userInfo.id,
        roleId,
        offset: 0,
        limit: 10,
      };
      lawFirmDashboardActions.getFirmCaseList(data);
      lawFirmDashboardActions.getFirmLawyers({ lawyerId: userInfo.id });
    }
  }

  refreshFirmLawyers = () => {

      const {
        userInfo,
        lawFirmDashboardActions,
        userRole: { id: roleId, roleName },
      } = this.props;
      
      if (roleName == Roles.LawFirmAdmin) {
        const id:number =userInfo.id
          lawFirmDashboardActions.getFirmLawyers({ lawyerId:id });
      }
      
  }

  // refreshCaseList = () => {
  //   const data = {
  //     id: this.props.userInfo.id,
  //     type: this.props.status,
  //     roleId: this.props.userRole.id,
  //   };
  //   this.props.DashboardActions.getCaseListAction(data);
  // }

  handleStateFilter = (state) => {
    
    const {
      userInfo,
      lawFirmDashboardActions,
      userRole: { id: roleId, roleName },
      CommonActions,
      status,
    } = this.props;
    const { itemsToDisplay } = this.state;
    this.setState({ itemsToDisplay, currentStatus: state });

    if (state == "managecase") {
      this.loadManageCase();
    }
    if (state == "manageuser") {
      CommonActions.getRoles({ roleId: userInfo?.role?.id });
      if (userInfo?.userjson?.status == "companylawyer") {
        lawFirmDashboardActions.getFirmLawyers({ lawyerId: userInfo.userjson.companyId });
      }
      else if (roleName == Roles.LawFirmAdmin) {
        lawFirmDashboardActions.getFirmLawyers({ lawyerId: userInfo.id });
      }
    }
  
  };
  viewCaseFile = (data) => {
    const { filePath, caseId } = data;
    this.props.CaseManagementActions.getCaseFile({
      caseId,
      fileName: filePath,
    });
  };

  reAssignLawyer = (data) => {
    this.props.lawFirmDashboardActions.reAssignLawyer(data);
  };

  updateRole = (data) => {
    this.props.lawFirmDashboardActions.updateRole(data);
  };
  addCompanyLawyer = (data) => {
    const { userInfo } = this.props;
    data["companyId"] = userInfo.id;
    data["companyName"] = userInfo.companyName;
    data["status"] = "companylawyer";
    this.props.lawFirmDashboardActions.addCompanyLawyer(data);
  };

  handleScroll = (event) => {
    if (this.state.currentStatus == "managecase" && !this.props.moreListEnded && !this.props.isLoading) {
      const { currentCount } = this.state;
      const { lawFirmDashboardActions, userInfo } = this.props;
      let data 
      if(userInfo?.status == "companylawyer"){
        
         data = {
          id: userInfo.userjson.companyId,
          userId: userInfo.id,
          roleId: userInfo.role.id,
          offset: currentCount,
          limit: 10,
        }

      }
      else{
       data = {
        id: userInfo.id,
        roleId: userInfo.role.id,
        offset: currentCount,
        limit: 10,
      };
    }
      const element = event.target;
      const height = element.scrollHeight;
      const top = element.scrollTop;
      if (Math.floor(height - top) == element.clientHeight) {
        lawFirmDashboardActions.getMoreFirmCaseList(data);
        this.setState({
          currentCount: currentCount + 10,
        });
      }
    }
  };

  //Manage

  handleCaseNavigation = (getCaseNotesData) => {

    const {
      CaseManagementActions,
      history,
      userRole: { roleName, id: roleId },
      status,
    } = this.props;

    const caseListParam = {
      id: this.props.userInfo.id,
      type: this.props.status,
      roleId: this.props.userInfo?.role.id,
    };
    this.props.DashboardActions.getCaseListAction(caseListParam);
    CaseManagementActions.setCurrentState(this.state.currentStatus);
    CaseManagementActions.setSelectedCase(getCaseNotesData);
    if (
      (roleName == Roles.Client ||
        status == "individual") &&
      (getCaseNotesData.status == "requested" ||
        getCaseNotesData.status == "proposed")
    ) {
      history.push(`/customer-case-note`);
    }
  
    if (
      (roleName == Roles.ClientFirmAdmin ||
        status == "clientfirm") &&
      (getCaseNotesData.status == "requested" ||
        getCaseNotesData.status == "proposed")
    ) {
      history.push(`/customer-case-note`);
    }
    if (
      (roleName == Roles.ClientFirmAdmin ||
        status == "clientfirm") &&
      (getCaseNotesData.status == "accepted" ||
        getCaseNotesData.status == "archieved")
    ) {
      history.push(`/case-management`);
    }
    if (
      (roleName == Roles.Client ||
        status == "individual") &&
      (getCaseNotesData.status == "accepted" ||
        getCaseNotesData.status == "archieved")
    ) {

      history.push(`/case-management`);
    }
    if (
      (status == "companylawyer" ||
        status == "lawyer") &&
      (getCaseNotesData.status == "requested" ||
        getCaseNotesData.status == "proposed")
    ) {
      history.push(`/lawyer-case-inquiry-accept`);
    }
    if (
      (status == "companylawyer" ||
        status == "lawyer") &&
      (getCaseNotesData.status == "accepted" ||
        getCaseNotesData.status == "archieved")
    ) {
      history.push(`/case-management`);
    }
    if (
      (status == "lawfirm") &&
      (getCaseNotesData.status == "accepted" ||
        getCaseNotesData.status == "archieved")
    ) {
      history.push(`/case-management`);
    }
    if (getCaseNotesData.status == "reassign_pending") {
      history.push(`/case-management`);
    }
  };
  handleStatusFilter = (caseStatus) => {

    const { caseList, status, juniorList } = this.props;

    // Below is moved to onload
    // const juniorData = {
          
    //   id: this.props.userInfo.id,
    //   companyId: this.props.userInfo.userjson.companyId
    // };
    if (caseStatus === "accepted") {

      // if (this.props.userRole?.roleName !== Roles.Lawyer) {

      // Below is moved to onload
        // const {
        //   status,
        //   userRole: { id: roleId, roleName }
        // } = this.props;
  
        // const data = {
        //   id: this.props.userInfo.id,
        //   type: status,
        //   roleId: roleId,
        // };

        // //  this.props.DashboardActions.getCaseListAction(data);
        // this.props.DashboardActions.getJuniorListAction(juniorData);

      // }

      
      let activeItems = [];
      let activeJuniorItems = [];
      let transferItems = [];
      if (this.props.userRole?.roleName == Roles.Client) { 
        activeItems = filter(caseList?.cases, { status:"accepted", clientId: this.props.userInfo?.id });
        transferItems = filter(caseList?.cases, { status:"reassign_pending", clientId: this.props.userInfo?.id });
       
      } else if (this.props.userRole?.roleName == Roles.ClientFirmAdmin) {

        activeItems = filter(caseList?.cases, { status:"accepted", companyId: this.props.userInfo?.id });
        transferItems = filter(caseList?.cases, { status:"reassign_pending", companyId: this.props.userInfo?.id });
      } else if (status == Roles.CompanyLawyer) {
         activeItems = filter(this.props.caseList?.cases, { status:"accepted", lawyerId: this.props.userInfo?.id });
        let activeJuniorItems = filter(juniorList.length>0?juniorList[0].juniorLawyerCases:[],{status:"accepted" });
        // activeJuniorItems = filter(juniorLists.length>0?juniorLists[0]:[],{status:"accepted" });
        activeItems = [...activeItems,...activeJuniorItems]
        transferItems = filter(this.props.caseList?.cases, { status:"reassign_pending", lawyerId: this.props.userInfo?.id });
      } else {

        activeItems = filter(caseList?.cases, { status:"accepted"})
        transferItems = filter(caseList?.cases, { status:"reassign_pending"})
      }
      
      const result = [...activeItems,...transferItems];
      const itemsToDisplay = result.sort(function (a, b) { return (new Date(b["created"]).getTime() - new Date(a["created"]).getTime()) });
        this.setState({ itemsToDisplay, currentStatus: caseStatus });


    } else {

      let itemsToDisplay= [];
      if (this.props.userRole?.roleName == Roles.Client) {
        itemsToDisplay = filter(caseList?.cases, { status: caseStatus, clientId: this.props.userInfo?.id}).sort(function (a, b) { return (new Date(b["created"]).getTime() - new Date(a["created"]).getTime()) });
      } else if (this.props.userRole?.roleName == Roles.ClientFirmAdmin) {
        itemsToDisplay = filter(caseList?.cases, { status: caseStatus, companyId: this.props.userInfo?.id}).sort(function (a, b) { return (new Date(b["created"]).getTime() - new Date(a["created"]).getTime()) });
      } 
      else if (status == Roles.CompanyLawyer) {
        if(caseStatus == CASE_STATUS[0]){
        // this.props.DashboardActions.getJuniorListAction(juniorData);
        let activeJuniorItems = filter(juniorList.length>0?juniorList[0].juniorLawyerCases:[],{status:"requested" });
        itemsToDisplay = filter(caseList?.cases, { status: caseStatus, lawyerId: this.props.userInfo?.id}).sort(function (a, b) { return (new Date(b["created"]).getTime() - new Date(a["created"]).getTime()) });
        itemsToDisplay = [...itemsToDisplay,...activeJuniorItems]
        }
        else if(caseStatus == CASE_STATUS[1]){
        // this.props.DashboardActions.getJuniorListAction(juniorData);
        let activeJuniorItems = filter(juniorList.length>0?juniorList[0].juniorLawyerCases:[],{status:"proposed" });
        itemsToDisplay = filter(caseList?.cases, { status: caseStatus, lawyerId: this.props.userInfo?.id}).sort(function (a, b) { return (new Date(b["created"]).getTime() - new Date(a["created"]).getTime()) });
        itemsToDisplay = [...itemsToDisplay,...activeJuniorItems]
        }
        else {
          itemsToDisplay = filter(caseList?.cases, { status: caseStatus, lawyerId: this.props.userInfo?.id}).sort(function (a, b) { return (new Date(b["created"]).getTime() - new Date(a["created"]).getTime()) }); 
        }

        
        
        //itemsToDisplay = filter(caseList?.cases, { status: caseStatus, lawyerId: this.props.userInfo?.id}).sort(function (a, b) { return (new Date(b["created"]).getTime() - new Date(a["created"]).getTime()) });
      } else {
        itemsToDisplay = filter(caseList?.cases, {  status: caseStatus, lawyerId: this.props.userInfo?.id }).sort(function (a, b) { return (new Date(b["created"]).getTime() - new Date(a["created"]).getTime()) });
      }
      this.setState({ itemsToDisplay, currentStatus: caseStatus });
    }   
    
  };
  handleFavorites = (status) => {
   
    const info:any = {
      lawyerId: this.props.userInfo.id
    };

    this.props.DashboardActions.getFavoriteCases(info)
    const { favoriteList } = this.props;
    const itemsToDisplay = favoriteList;
    this.setState({ itemsToDisplay, currentStatus: status });
  }
  handleDateChange = (date) => {
    const d = new Date(date).toISOString();
    this.setState({ selectedDate: d });
    this.loadCaseHearings(date);
  };

  loadCaseHearings = (date?: Date) => {
    const {
      userInfo,
      DashboardActions,
      userRole: { roleName },
      status,
    } = this.props;
    const selectedDate = date ?? this.state.selectedDate;
    if (roleName == Roles.LawFirmAdmin) {
      DashboardActions.getCaseHearingsByDate({
        date: new Date(selectedDate).toISOString(),
        type: "lawfirm",
        id: userInfo.id,
      });
    }
    if (
      status == "companylawyer" &&
      (roleName == Roles.SeniorMostLawyer ||
        roleName == Roles.SeniorLawyer ||
        roleName == Roles.Lawyer ||
        roleName == Roles.JuniorLawyer)
    ) {
      DashboardActions.getCaseHearingsByDate({
        date: new Date(selectedDate).toISOString(),
        type: "lawyer",
        id: userInfo.id,
      });
    }
    if (status == "lawyer" || roleName == Roles.Lawyer) {
      DashboardActions.getCaseHearingsByDate({
        date: new Date(selectedDate).toISOString(),
        type: "lawyer",
        id: userInfo.id,
      });
    }
    if (status == "individual" || roleName == Roles.Client) {
      DashboardActions.getCaseHearingsByDate({
        date: new Date(selectedDate).toISOString(),
        type: "individual",
        id: userInfo.id,
      });

    }
    if (status == "clientfirm" || roleName == Roles.ClientFirmAdmin) {
      DashboardActions.getCaseHearingsByDate({
        date: new Date(selectedDate).toISOString(),
        type: "clientfirm",
        id: userInfo.id,
      });

    }
  };  
  loadCaseList = () => {
    const {
      caseList,
      juniorList,
      favoriteList,
      userInfo,
      DashboardActions,
      userRole: { roleName, id: roleId },
      status,
    } = this.props;
    if (roleName == Roles.LawFirmAdmin) {
      DashboardActions.getDashboardDetails({
        type: "lawfirm",
        id: userInfo.id,
        roleId: roleId,
      });
      const data = {
        id: userInfo.id,
        type: "lawfirm",
        roleId: roleId,
      };
      DashboardActions.getCaseListAction(data);
    }
    if (
      status == "companylawyer" &&
      (roleName == Roles.SeniorMostLawyer ||
        roleName == Roles.SeniorLawyer ||
        roleName == Roles.Lawyer ||
        roleName == Roles.JuniorLawyer)
    ) {
      const data = {
        id: userInfo.userjson.companyId,
        type: "companyLawyer",
        roleId: this.props?.userRole?.id,
        userId: userInfo.id
      };
      DashboardActions.getCaseListAction(data);
      const {
        status,
        userRole: { id: roleId, roleName }
      } = this.props;

     const juniorData = {
      id: this.props.userInfo.id,
      companyId: this.props.userInfo.userjson.companyId
    };

      //  this.props.DashboardActions.getCaseListAction(data);
      this.props.DashboardActions.getJuniorListAction(juniorData);
    }
    if (status == "lawyer" || roleName == Roles.Lawyer) {
      const data = {
        id: userInfo.id,
        type: "lawyer",
        roleId: roleId,
      };
      DashboardActions.getCaseListAction(data);
      const info:any = {
        lawyerId: userInfo.id
      }
      DashboardActions.getFavoriteCases(info)
    }
    if (status == "individual" || roleName == Roles.Client) {
      const data = {
        id: userInfo.id,
        type: "individual",
        roleId: roleId,
      };
      DashboardActions.getCaseListAction(data);
    }
    if (status == "clientfirm" || roleName == Roles.ClientFirmAdmin) {
      const data = {
        id: userInfo.id,
        type: "clientfirm",
        roleId: roleId,
      };
      DashboardActions.getCaseListAction(data);
    }
    this.reRenderList(caseList?.cases);
    this.reRenderList(favoriteList?.cases);
  };

  handleAddHearing = () => {
    this.setState({ addHearingCloseConfirm: true });
  };

  loadDashboard = () => {
    const {
      userInfo,
      loginActions,
      status,
    } = this.props;
    this.loadCaseHearings();
    this.loadCaseList();
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    this.setState({ currentStatus: "dashboard" });
    // this.handleStatusFilter(status);
  };

  //caseHearing
  handleSuccessStageClose = () => {
    const { caseList, juniorList, DashboardActions, userInfo,favoriteList,CaseManagementActions } = this.props;
    if (!this.state.hearingParam.purpose) {
      this.setState({ isValidPurpose: false });
    }
    if (!this.state.hearingParam.caseId) {
      this.setState({ isValidCase: false });
    }
    const selectedDate = new Date(this.state.hearingParam.date).toISOString();
    const selectedCase = filter(caseList?.cases, {
      status: CASE_STATUS[2],
    })?.filter((c) => c.id == this.state.hearingParam.caseId);
    let m = moment(new Date());
    let date1 = m.utc().format();
    const params:any = {
      ...this.state.hearingParam,
      purpose: this.state.hearingParam.purpose,
      caseId: selectedCase[0].caseId,
      date: selectedDate,
      lawyerId: selectedCase[0].lawyerId,
      clientId: selectedCase[0].clientId,
      companyId: selectedCase[0].companyId,
      created: date1,
      modified: date1,
    };
    DashboardActions.saveHearing(params);
    let s = new Date(selectedDate)
    let day = s.getUTCDate()
    let month = s.getUTCMonth()+1
    let year = s.getFullYear()
    let data1:any = {
      notification: `Hearing for Case ${selectedCase[0].title} is scheduled on ${day + '-' + month + '-' + year}`,
      created: date1,
      caseId: selectedCase[0].caseId,
      fromId: selectedCase[0].lawyerId,
      fromName: selectedCase[0].lawyerName,
      toId: selectedCase[0].clientId,
      toName: selectedCase[0].clientName,
      type: selectedCase[0].clientId!=0?"individual":"clientfirm",
      status: "message",
      notificationStatus:0,
      readByUser:"No"
    }
    CaseManagementActions.sendNotification(data1)
    this.setState({ addHearingCloseConfirm: false });
    this.setState({
      hearingParam: {
        purpose: "",
        caseId: 0,
        date: new Date(),
        description: "",
      },
    });
    this.loadCaseHearings();

  };

  handleCancelStageClose = () => {
    this.setState({ addHearingCloseConfirm: false });
    this.setState({
      hearingParam: {
        purpose: "",
        caseId: 0,
        date: new Date(),
        description: "",
      },
    });
  };

  handleCloseDialog = () => {
    this.setState({
      hearingParam: {
        purpose: "",
        caseId: 0,
        date: new Date(),
        description: "",
      },
    });
    this.setState({ addHearingCloseConfirm: false });
  };

  handlePurposeChange = (event) => {
    this.setState({
      hearingParam: { ...this.state.hearingParam, purpose: event.target.value },
    });
    this.setState({ isValidPurpose: true });
  };
  handleCaseChange = (event) => {
    this.setState({
      hearingParam: { ...this.state.hearingParam, caseId: event.target.value },
    });
    this.setState({ isValidCase: true });
  };
  handleSaveDateChange = (date) => {
    this.setState({ hearingParam: { ...this.state.hearingParam, date: date } });
  };
  handleDescriptionChange = (event) => {
    this.setState({
      hearingParam: {
        ...this.state.hearingParam,
        description: event.target.value,
      },
    });
  };
  handleViewMore = (eve, item) => {
    this.handleCaseNavigation(item);
  }

  getActiveCase = ()=>{
    return filter(this.props?.caseList?.cases, { status: CASE_STATUS[2] });
  }
  getPendingActions=()=>{
    return filter(this.props?.notifications, { status: "pending" });
  }
  getActiveLawyers=()=>{
    return filter(this.props?.dashboardDetails?.lawyerDetail,function (lawyer) {return lawyer.activeCaseDetails != 0});
  }
  getSuccessRatio=()=>{
    return filter(this.props?.dashboardDetails?.lawyerDetail,function (lawyer) {return lawyer.totalCaseHandled != 0});
  }

  //casehearing

  render() {
    const { itemsToDisplay, currentStatus, selectedDate } = this.state;
    const {
      isLoading,
      caseList,
      juniorList,
      favoriteList,
      classes,
      caseHearings,
      userRole: { roleName },
      notifications,
      remainders,
      appointments,
      status,
  
    } = this.props;
    return (
      <div>
        <Header
          links={
            <HeaderLinks  handleCaseNavigation={undefined} getAllNotifications={[]} notificationReadCount={0} judgmentAddNotes={undefined} stage={undefined} updateIsOpen={undefined} {...this.props}/>
          }
          fixed
          color="primary"
        />
        <div className="main-container">
          <CssBaseline />
          <Typography className = "temp_dashboard" variant="h5" gutterBottom align="left" onClick={this.loadDashboard}>
                      <ArrowBackIcon></ArrowBackIcon>
                  </Typography>
          <Drawer
            className="drawer"
            variant="permanent"
            classes={{
              paper: "drawerPaper",
            }}
            anchor="left"
          >

          
            <Divider className="dashboard-divider" />
            <Typography gutterBottom variant="h5" component="h2">
              <span style={{ cursor: "pointer" }} onClick={this.loadDashboard}>                
                Dashboard
                <span className={classes.refreshIcon}>
                  <RefreshIcon className={classes.refreshIconButton}></RefreshIcon>
                </span>
              </span>
            </Typography>
            <Divider className="dashboard-divider" />
            {(roleName == Roles.LawFirmAdmin || roleName == Roles.SeniorMostLawyer || roleName == Roles.SeniorLawyer) && (
              <React.Fragment>
                <Typography gutterBottom variant="h5" component="h3">
                  Admin Sections
                </Typography>
                <List>
                  <ListItem
                    className={classNames({
                      "list-btn": true,
                      "active-btn": currentStatus === "managecase",
                    })}
                    button
                    key="Manage Cases"
                    onClick={() => this.handleStateFilter("managecase")}
                  >
                    <ListItemText
                      className="list-text"
                      primary="Manage Cases"
                    />
                  </ListItem>
                  {roleName == Roles.LawFirmAdmin && <ListItem
                    className={classNames({
                      "list-btn": true,
                      "active-btn": currentStatus === "manageuser",
                    })}
                    button
                    key="Manage Users"
                    onClick={() => this.handleStateFilter("manageuser")}
                  >
                    <ListItemText
                      className="list-text"
                      primary="Manage Users"
                    />
                  </ListItem>}
                </List>
              </React.Fragment>
            )}
            


            {roleName !== Roles.LawFirmAdmin && roleName !== Roles.Lawyer && (
              <React.Fragment>
                <Typography gutterBottom variant="h5" component="h3">
                  Inquiries
                  {/* {roleName} */}
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
                </List>
                <Typography gutterBottom variant="h5" component="h3">
                  Cases
                </Typography>
                <List>
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
                  {/* <ListItem
                    className={classNames({
                      "list-btn": true,
                      "active-btn": currentStatus === CASE_STATUS[3],
                    })}
                    button
                    key="Lawyer Change"
                    onClick={() => this.handleStatusFilter("reassign_pending")}
                  >
                    <ListItemText className="list-text" primary="Lawyer Change" />
                  </ListItem> */}
                </List>
                <Typography gutterBottom variant="h5" component="h3">
                  Action Required
                </Typography>
                <List>
                  {/* <ListItem className="list-btn" button key="Accept Offer">
                    <ListItemText
                      className="list-text"
                      primary="Accept Offer"
                    />
                  </ListItem> */}
                  <ListItem className="list-btn" button key="Payments Due">
                    <ListItemText
                      className="list-text"
                      primary="Payments Due"
                    />
                  </ListItem>
                </List>
              </React.Fragment>
            )}

            {roleName === Roles.Lawyer && (
              <React.Fragment>
                <Typography gutterBottom variant="h5" component="h3">
                  Inquiries
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
                </List>
                <Typography gutterBottom variant="h5" component="h3">
                  Cases
                </Typography>
                <List>
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

                  <ListItem
                    className={classNames({
                      "list-btn": true,
                      // "active-btn": currentStatus === "Fav"
                    })}
                    button
                    key="Favourites"
                    onClick={() => this.handleFavorites(CASE_STATUS[4])}
                  >
                    <ListItemText className="list-text" primary="Favourites" />
                  </ListItem>

                  {/* <ListItem
                    className={classNames({
                      "list-btn": true,
                      "active-btn": currentStatus === CASE_STATUS[3],
                    })}
                    button
                    key="Lawyer Change"
                    onClick={() => this.handleStatusFilter("reassign_pending")}
                  >
                    <ListItemText className="list-text" primary="Lawyer Change" />
                  </ListItem> */}
                </List>
                <Typography gutterBottom variant="h5" component="h3">
                  Action Required
                </Typography>
                <List>
                  {/* <ListItem className="list-btn" button key="Accept Offer">
                    <ListItemText
                      className="list-text"
                      primary="Accept Offer"
                    />
                  </ListItem> */}
                  <ListItem className="list-btn" button key="Payments Due">
                    <ListItemText
                      className="list-text"
                      primary="Payments Due"
                    />
                  </ListItem>
                </List>
              </React.Fragment>
            )}




          </Drawer>
          {currentStatus === "dashboard" && (
            <div className="dashboard-container">
              <Grid container spacing={2}>
                <Grid item xs={12} >
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Card className="card">
                        <CardContent className="card-content">
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                              disableToolbar
                              variant="inline"
                              format="MM/dd/yyyy"
                              margin="normal"
                              id="date-picker-inline"
                              label=""
                              value={selectedDate}
                              onChange={this.handleDateChange}
                              KeyboardButtonProps={{
                                "aria-label": "change date",
                              }}
                              autoOk={true}
                            />
                          </MuiPickersUtilsProvider>
                          {(status == "lawyer" || status == "companylawyer" || status == "lawfirm") && (<Button
                            variant="contained"
                            className="detail-btn"
                            onClick={this.handleAddHearing}
                            disabled={this.getActiveCase.length==0}
                          >
                            Add Hearing
                          </Button>)}
                          {caseHearings && caseHearings.length > 0 && (
                            <List className="item-container">
                              {caseHearings?.map((item) => {
                                if(item["hearing_purpose"]){
                                  return (<ListItem key={item.id} role={undefined} className="item-box">
                                  <Grid container alignItems="center" justify="space-between">
                                    <Grid item xs={12}>
                                      <Typography gutterBottom variant="h6" component="h1" className="item-title">
                                        {item["hearing_purpose"]}
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                      <Typography gutterBottom variant="h6" component="h1" className="item-text">
                                        {item["caseLawyers_title"]}
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                      <Typography gutterBottom variant="h6" component="h1" className="item-subtext">
                                        {(item["caseLawyers_company_name"] && item["caseLawyers_client_id"] == 0) ? item["caseLawyers_company_name"] : item["caseLawyers_client_name"]}
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                      <Typography gutterBottom variant="h6" component="h1" className="item-subtext">
                                        {item["caseLawyers_court"]}
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                </ListItem>
                                );
                                }
                                
                              })}
                            </List>
                          )}
                          {caseHearings && caseHearings.length == 0 && (
                            <Box className="no-result-fount" display="flex">
                              <Box>
                                <FindReplaceSharpIcon />
                              </Box>
                              <Box>
                                <Typography gutterBottom variant="h5" component="h2">
                                  No Hearings Found
                                </Typography>
                              </Box>
                            </Box>
                          )}
                        </CardContent>
                      </Card>
                    </Grid>

                    {status != "lawfirm" && (
                      <Grid item xs={4}>
                        <Card className="card">
                          <CardContent className="card-content">
                            <Typography gutterBottom variant="h6" component="h4">
                              Pending Actions
                            </Typography> 
                            
                            {
                              filter(notifications?.getAllNotifications, {status: "pending"}).length? (
                                <List className="item-container">
                                {filter(notifications?.getAllNotifications, {status: "pending"})?.map((item) => {
                                  return (
                                    <ListItem button className="item-box">
                                      <ListItemText primary={item.fromName}
                                        secondary={
                                          <React.Fragment>
                                            <Typography>{item.notification}</Typography>
                                          </React.Fragment>}
                                      />
                                    </ListItem>

                                  )
                                })}
                              </List>
                              )
                              :
                              (
                                <Box className="no-result-fount" display="flex">
                                  <Box>
                                    <FindReplaceSharpIcon />
                                  </Box>
                                  <Box>
                                    <Typography gutterBottom variant="h5" component="h2">
                                      No Pending Actions Found
                                    </Typography>
                                  </Box>
                                </Box>
                              )
                            }
                          </CardContent>
                        </Card>
                      </Grid>)}
                    {roleName == Roles.LawFirmAdmin && (
                      <Grid item xs={4}>
                        <Card className="card">
                          <CardContent className="card-content">
                            <Typography gutterBottom variant="h6" component="h4">
                              Active Lawyers Details
                            </Typography>
                            {this.getActiveLawyers?.length>0 &&
                              <List className="item-container">
                                {this.getActiveLawyers()?.map((item) => {
                                  return (
                                    <React.Fragment>
                                      <ListItem key={item.id} role={undefined} >
                                        <ListItemText primary={item["lawyerName"]} />
                                        <ListItemText primary={item["totalActiveCase"]} />
                                      </ListItem>
                                      <ListItem key={item.id} role={undefined} className="list-item">
                                        {item["activeCaseDetails"]?.map((item) => {
                                          return (
                                            <Card className="card-item">
                                              <ListItemText primary={item.clientName}
                                                secondary={
                                                  <React.Fragment>
                                                    <Typography>{item.title}</Typography>
                                                  </React.Fragment>}
                                              />
                                              <Link onClick={(eve) => { this.handleViewMore(eve, item) }} variant="h6" className="link" >
                                                view more
                                              </Link>
                                            </Card>
                                          )
                                        })}
                                      </ListItem>
                                    </React.Fragment>
                                  )
                                  }
                                )}
                              </List>
                            }
                            {this.getActiveLawyers?.length == 0 &&
                              <Box className="no-result-fount" display="flex">
                                <Box>
                                  <FindReplaceSharpIcon />
                                </Box>
                                <Box>
                                  <Typography gutterBottom variant="h5" component="h2">
                                    No Actives Cases Found
                                  </Typography>
                                </Box>
                              </Box>
                            }
                          </CardContent>
                        </Card>
                      </Grid>)}
                    <Grid item xs={4}>
                      <Card className="card">
                        <CardContent className="card-content">
                          <Typography gutterBottom variant="h6" component="h4">
                            Recent Judgements
                          </Typography>
                          {caseList?.judgementLink && caseList.judgementLink?.length > 0 && (
                            <List className="item-container">
                              {caseList.judgementLink.map((item) => {
                                return (
                                  <ListItem className="item-box">
                                    <ListItemText primary={item.courtName}
                                      secondary={
                                        <React.Fragment>
                                          <Link href={item.orderURL} variant="h6" className={classes.link} target="blank">
                                            {item.orderURL}
                                          </Link>
                                        </React.Fragment>}
                                    />
                                  </ListItem>

                                )
                              })}
                            </List>

                          )}
                          {caseList?.judgementLink && caseList.judgementLink?.length == 0 && (
                            <Box className="no-result-fount" display="flex">
                              <Box>
                                <FindReplaceSharpIcon />
                              </Box>
                              <Box>
                                <Typography gutterBottom variant="h5" component="h2">
                                  No Recent Judgement Found
                                </Typography>
                              </Box>
                            </Box>
                          )}
                        </CardContent>
                      </Card>

                    </Grid>
                  </Grid>
                </Grid>
                {/* {roleName != Roles.LawFirmAdmin  && (
                  <Grid item xs={12}>
                    <Card className="card">
                      <CardContent className="card-content">
                        <Typography gutterBottom variant="h6" component="h4">
                          Recent News
                        </Typography>
                        <List className="item-container">
                          <ListItem key="id" role={undefined} className="item-box">
                            <Grid container alignItems="center" justify="space-between" >
                              <Grid item xs={3}>
                                <i className="fas fa-newspaper fa-3x"></i>
                                <Link href="https://nclt.gov.in/sites/default/files/Jan-final-orders-pdf/2.pdf" variant="h6">
                                  Jul-final-orders-pdf
                                </Link>
                              </Grid>
                            </Grid>
                          </ListItem>
                          <ListItem key="id" role={undefined} className="item-box">
                            <Grid container alignItems="center" justify="space-between">
                              <Grid item xs={3}>
                                <i className="fas fa-newspaper fa-3x"></i>
                                <Link href="https://nclt.gov.in/sites/default/files/Jan-final-orders-pdf/2.pdf" variant="h6">
                                  Jul-final-orders-pdf
                                </Link>
                              </Grid>
                            </Grid>
                          </ListItem>

                        </List>
                      </CardContent>
                    </Card>

                  </Grid>

                )} */}
                {roleName == Roles.LawFirmAdmin && this.getSuccessRatio()?.length>0 && (
                  <React.Fragment>
                    <Grid item xs={6}>
                      <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Lawyer</TableCell>
                              <TableCell align="right">Total cases handled</TableCell>
                              <TableCell align="right">Judgements in Favour</TableCell>
                              <TableCell align="right">Success%</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {this.getSuccessRatio()?.map((row) => {
                                  return (
                                    <TableRow key={row.lawyerName}>
                                      <TableCell component="th" scope="row">
                                        {row.lawyerName}
                                      </TableCell>
                                      <TableCell align="right">{row.totalCaseHandled}</TableCell>
                                      <TableCell align="right">{row.judgementFavour}</TableCell>
                                      <TableCell align="right">{row.successPercentage}%</TableCell>
                                    </TableRow>
                                  )
                              })
                            }
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                  </React.Fragment>
                )}
              </Grid>
            </div>
          )}
          {currentStatus != 'dashboard' && currentStatus != 'manageuser' && currentStatus != 'managecase' &&
            <main className="drawer-content">
              {itemsToDisplay?.length > 0 &&
                <div
                  className="dashboard-container"
                  style={{ height: "500px", overflow: "auto" }}
                >
                  <Grid container>
                    <Grid item xs={12}>
                      <CheckboxList refreshCaseList = {this.props.refreshCaseList} DashboardActions={this.props.DashboardActions} data={itemsToDisplay} userInfo={this.props.userInfo} handleCaseNavigation={this.handleCaseNavigation} caseLawyers={this.props.caseLawyers} />

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
            </main>}
          {currentStatus == "managecase" &&
            <ManageCase
              caseList={this.props.manageCaseList}
              lawyers={this.props.manageLawyers}
              isLoading={isLoading}
              handleCaseNavigation={this.handleManageCaseNavigation}
              viewCaseFile={this.viewCaseFile}
              reAssignLawyer={this.reAssignLawyer}
              handleScroll={this.handleScroll}
            ></ManageCase>
          }
          {currentStatus == "manageuser" &&
            <ManageUser
              lawyers={this.props.manageLawyers}
              updateRoleRes={this.props.updateRoleRes}
              roles={this.props.roles}
              isLoading={isLoading}
              handleScroll={this.handleScroll}
              updateRole={this.updateRole}
              addCompanyLawyer={this.addCompanyLawyer}
              snackbarsActions={this.props.snackbarsActions}
              refreshLawyers = {this.refreshFirmLawyers}
            ></ManageUser>
          }
        </div>
        <Footer />
        <ResponsiveDialog
          title="Add Hearing"
          content={''}
          okText="Save"
          cancelText="Cancel"
          isOpen={this.state.addHearingCloseConfirm}
          handleClose={this.handleCloseDialog}
          handleOk={this.handleSuccessStageClose}
          handleCancel={this.handleCancelStageClose}
          formContent={<div>
            <div className="form-field-container margin-top-empty margin-right-empty">
              <TextField error={!this.state.isValidPurpose} size="small" className="purpose-text-field" onChange={this.handlePurposeChange} label="Purpose of Hearing*" placeholder="Purpose of Hearing*" variant="outlined" />
            </div>
            <div className="form-field-container">
              <FormControl variant="outlined" className="text-field">
                <InputLabel error={!this.state.isValidCase} id="case-select-label" className="select-lable">Link a Case*</InputLabel>
                <Select
                  native
                  className="select-input"
                  labelId="case-select-label"
                  id="case-select-outlined"
                  value={this.state.hearingParam.caseId}
                  onChange={this.handleCaseChange}
                  label="Link a Case*"
                  error={!this.state.isValidCase}
                  placeholder="Link a Case*"
                >
                  <option aria-label="None" value="" />
                  {

                    filter(this.props?.caseList?.cases, { status: CASE_STATUS[2] })?.map(eachCase => {
                      return <option value={eachCase.id} key={eachCase.id}>{eachCase.title}</option>
                    })
                  }
                </Select>
              </FormControl>
              <div className="date-picker">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label=""
                    value={this.state.hearingParam.date}
                    onChange={this.handleSaveDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                    minDate={new Date()}
                    autoOk={true}
                  />
                </MuiPickersUtilsProvider>
              </div>
            </div>
            <div className="form-field-container">
              <TextField onChange={this.handleDescriptionChange} size="small" className="text-field" multiline rows={3} label="Description of issue" variant="outlined" />
            </div>
          </div>
          }
        />
        <Backdrop className={classes.backdrop} open={isLoading}>
          <CircularProgress className={classes.progressbar} size={100} />
        </Backdrop>
      </div >
    );
  }
}
const mapStateToProps = (state: RootState) => ({
  userName: state.loginForm.userName,
  userInfo: state.loginForm.userInfo,
  userRole: state.loginForm.role,
  status: state.loginForm.status,
  notifications: state.loginForm.notifications,
  remainders: state.loginForm.remainders,
  appointments: state.loginForm.appointments,
  caseHearings: state.dashboard.caseHearings,
  dashboardDetails: state.dashboard.dashboardDetails,
  manageCaseList: state.lawFirmDashboard.caseList,
  manageLawyers: state.lawFirmDashboard.lawyers,
  reAssignStatus: state.lawFirmDashboard.reAssignStatus,
  caseManagement: state.caseManagement,
  roles: state.commonReducer.roles,
  caseList: state.dashboard.caseList,
  juniorList: state.dashboard.juniorList,
  favoriteList: state.dashboard.favoriteList,
  success: state.dashboard.success,
  error: state.dashboard.error,
  lawFirmError: state.lawFirmDashboard.error,
  lawFirmSuccess: state.lawFirmDashboard.success,
  moreListEnded: state.lawFirmDashboard.moreListEnded,
  isLoading: state.dashboard.loading || state.loginForm.loading || state.commonReducer.loading || state.lawFirmDashboard.loading || state.caseManagement.loading || state.saveCaseInquiry.loading,
  caseLawyers: state.dashboard.caseLawyers,
  reassignSuccess: state.dashboard.reassignSuccess,
  saveCaseInquiry: state.saveCaseInquiry,
  updateRoleRes: state.lawFirmDashboard.updateRoleRes,
});

function mapDispatchToProps(dispatch: any) {
  return {
    loginActions: bindActionCreators(LoginActions as any, dispatch),
    lawFirmDashboardActions: bindActionCreators(LawFirmDashboardActions as any, dispatch),
    CaseManagementActions: bindActionCreators(CaseManagementActions as any,dispatch),
    DashboardActions: bindActionCreators(DashboardActions as any, dispatch),
    CommonActions: bindActionCreators(CommonActions as any, dispatch),
    snackbarsActions: bindActionCreators(SnackbarsActions as any, dispatch),
  };
}

export default connect(
  mapStateToProps, mapDispatchToProps)
  (withStyles(styles)(Dashboard));
