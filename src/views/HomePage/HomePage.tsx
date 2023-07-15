import React, { useEffect } from "react";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import withStyles from "@material-ui/core/styles/withStyles";
import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles';
// redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { RootState } from "../../reduxAction/rootReducer";
import * as FindLawyerActions from "../../reduxAction/findLawyer/findLawyerActions";
import * as FindJudgementActions from "../../reduxAction/findJudgement/findJudgementActions";
import * as LoginActions from "../../reduxAction/authentication/authenticationActions";
import * as CommonActions from "../../reduxAction/common/commonActions";
import * as CaseManagementActions from "../../reduxAction/caseManagement/caseManagementActions";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Container from "../../components/Search/Search";
import { HeaderLinks } from "../../components/Header/HeaderLinks";
import * as SnackbarsActions from "../../reduxAction/snackbars/snackbarsActions";

interface Props extends RouteComponentProps<any> {
  classes: any;
  userName: string | null;
  findLawyerActions: typeof FindLawyerActions;
  finsJudgementActions: typeof FindJudgementActions;
  loginActions: typeof LoginActions;
  CaseManagementActions: typeof CaseManagementActions;
  findLawyer: any;
  findJudgement: any;
  findLawyerLoaded: boolean;
  findJudgementLoaded: boolean;
  isLoading: boolean;
  isJudgementLoading: boolean;
  lawCategory: any[];
  commonActions: typeof CommonActions;
  categoryLoading: boolean;
  subCategory: any[];
  judgementDataList: any[];
  judgementTextLoaded: boolean;
  caseList: any;
  handleCaseNavigation: any;
  notifications: any;
  remainders: any;
  appointments: any;
  userRole: any | null;
  snackbarsActions: typeof SnackbarsActions;
}

const styles = (theme: Theme) => createStyles({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  progressbar: {
    color: '#FFC602'
  },
});

export const HomePage = (props: Props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }, []);

  useEffect(() => {
    if (props.findLawyerLoaded) {
      props.history.push('/lawyer');
    }
  }, [props.findLawyerLoaded]);

  useEffect(() => {
    if (props.findJudgementLoaded) {
      let judgmentId=[]
      let judgmentLength = props?.findJudgement?.id?.length;
      if (judgmentLength < 10)
        judgmentLength = judgmentLength
      else
        judgmentLength = 10
      for (let i = 0; i < judgmentLength;i++ ) {
        judgmentId.push(props.findJudgement.id[i])
      }
      props.finsJudgementActions.getJudgementTextAction({ ids: judgmentId })
      // props.history.push('/judgement');
    }
  }, [props.findJudgementLoaded]);

  useEffect(() => {
    if (props.judgementTextLoaded) {
      props.history.push('/judgement');
    }
  }, [props.judgementTextLoaded]);

  const { classes, isLoading, isJudgementLoading, categoryLoading } = props;
  const loading = (isLoading || isJudgementLoading || categoryLoading);
  return (
    <div>
      <Header links={<HeaderLinks  {...props} />} fixed color="primary" />
      <Container {...props} />
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress className={classes.progressbar} size={100} />
      </Backdrop>
      <Footer />
    </div>
  );
}


const mapStateToProps = (state: RootState) => ({
  userName: state.loginForm.userName,
  findLawyer: state.findLawyer.lawyerList,
  findLawyerLoaded: state.findLawyer.loaded,
  findJudgementLoaded: state.findJudgement.loaded,
  judgementTextLoaded: state.findJudgement.textLoaded,
  findJudgement: state.findJudgement.judgementList,
  isLoading: state.findLawyer.loading,
  isJudgementLoading: state.findJudgement.loading,
  userInfo: state.loginForm.userInfo,
  lawCategory: state.commonReducer.lawCategory,
  categoryLoading: state.commonReducer.loading,
  subCategory: state.commonReducer.subCategory,
  notifications: state.loginForm.notifications,
  remainders: state.loginForm.remainders,
  appointments: state.loginForm.appointments,
  judgementDataList: state.findJudgement.judgementDataList,
  caseList: state.dashboard.caseList,
  userRole: state.loginForm.role,
});

function mapDispatchToProps(dispatch: any) {
  return {
    findLawyerActions: bindActionCreators(FindLawyerActions as any, dispatch),
    finsJudgementActions: bindActionCreators(FindJudgementActions as any, dispatch),
    loginActions: bindActionCreators(LoginActions as any, dispatch),
    commonActions: bindActionCreators(CommonActions as any, dispatch),
    CaseManagementActions: bindActionCreators(CaseManagementActions as any, dispatch),
    snackbarsActions: bindActionCreators(SnackbarsActions as any, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(HomePage));