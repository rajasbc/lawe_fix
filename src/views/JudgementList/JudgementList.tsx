import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import isEqual from 'lodash/isEqual';
import { Component } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { HeaderLinks } from "../../components/Header/HeaderLinks";
// redux
import Pagination from "@mui/material/Pagination";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as LoginActions from "../../reduxAction/authentication/authenticationActions";
import * as FindJudgementActions from "../../reduxAction/findJudgement/findJudgementActions";
import * as FindLawyerActions from "../../reduxAction/findLawyer/findLawyerActions";
import { RootState } from "../../reduxAction/rootReducer";
import './JudgementList.scss';
import MultiPDFViewer from "./MultiPDFViewer";

function jsonEscape(str: string) {
  return str?.replace(/\n/g, "<br \>").replace(/\r/g, "\\\\r").replace(/\t/g, "\\\\t");
}

export function MediaCard(props: any) {
  const { summary_summary: judgement, file_s3key: s3key, file_id: id } = props.data;
  const dataObj = jsonEscape(judgement);
  return <Paper className="judgement-box" elevation={3}>
    <div className="judgement-content" dangerouslySetInnerHTML={{ __html: dataObj }}></div>
    <div className="search-button-container view-more">
      <Button className="button-padding" variant="contained" onClick={() => props.handleDownLoadFile(s3key, id)}>
        <span>View more</span>
      </Button>
      <span className="button-padding"></span>
      <Button variant="contained" startIcon={<CloudDownloadIcon />} onClick={() => props.handleDownLoadPDF(s3key, id)}>
        <span>Download</span>
      </Button>
    </div>
  </Paper>;
  // return <div className="judgement-content">{parse(judgement)}</div>
}

interface Props extends RouteComponentProps<any> {
  userName: string | null;
  findLawyerActions: typeof FindLawyerActions;
  finsJudgementActions: typeof FindJudgementActions;
  loginActions: typeof LoginActions;
  findLawyer: any;
  findJudgement: any;
  findLawyerLoaded: boolean;
  judgementUrl: any;
  downloadJudgementUrl: any;
  isLoading: boolean;
  caseManagement: any;
  userInfo: any;
  caseList: any,
  notifications: any;
  remainders: any;
  appointments: any;
  status: any;
  findJudgementId: any;
}

export class JudgementList extends Component<Props> {
  state = {
    itemsToDisplay: [],
    itemsToUse: [],
    cuisines: [],
    urls: [],
    paginationCount: 0,
    page: 1,
  };

  componentDidMount() {
    this.props.finsJudgementActions.updateFindJudgementLoadedAction();
    this.props.finsJudgementActions.updateJudgementTextLoadedAction();
    this.reRenderList(this.props.findJudgement);
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    let judgmentLength = this.props?.findJudgementId?.id?.length;
    this.setState({ paginationCount: Math.ceil(judgmentLength / 10) })
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.judgementUrl, this.props.judgementUrl)) {
      const { judgementUrl } = this.props;
      if (judgementUrl) {
        this.props.history.push(`/judgment/pdf`);
      }
    }
    if (!isEqual(prevProps.findJudgement, this.props.findJudgement)) {
      const { findJudgement } = this.props;
      if (findJudgement) {
        this.reRenderList(this.props.findJudgement);
      }
    }

    // if (!isEqual(prevProps.downloadJudgementUrl, this.props.downloadJudgementUrl)) {
    //   const { downloadJudgementUrl } = this.props;
    //   console.log(downloadJudgementUrl)
    //   if (downloadJudgementUrl) {
    //     window.open(downloadJudgementUrl?.link, '_blank')
    //   }
    // }

    if (this.props.downloadJudgementUrl) {
      const { downloadJudgementUrl } = this.props;
      console.log(downloadJudgementUrl)
      if (downloadJudgementUrl) {
        window.open(downloadJudgementUrl?.link, '_blank');
        this.props.finsJudgementActions.clearDownloadJudgmentUrl();
      }
    }
  }

  reRenderList(data) {
    var itemsToDisplay = [];
    for (var i = 0; i < data.length; i++) {
      itemsToDisplay.push(data[i]);
    }
    this.setState({ itemsToDisplay }, () => {
      this.setState({ itemsToUse: [...this.state.itemsToDisplay] });
    });
  }

  handleDownLoadFile = async (s3key, id) => {
    console.log(s3key, id)
    this.props.finsJudgementActions.getJudgementUrlAction({ s3key });
    // this.props.finsJudgementActions.getReferenceJudgementAction({ id });

  }

  handleDownLoadPDF = async (s3key, id) => {
    console.log("jugdment list call")
    this.props.finsJudgementActions.getJudgementUrlDownloadAction({ s3key });
  }


  handlePaginationChange = async (event, value) => {
    let judgmentId = []
    this.setState({ page: value });
    let end = value * 10
    let start = end - 10;
    for (let i = start; i < end; i++) {
      judgmentId.push(this.props.findJudgementId.id[i])
    }
    await this.props.finsJudgementActions.getJudgementTextAction({ ids: judgmentId })
  };

  render() {
    const { page, paginationCount, itemsToDisplay, urls } = this.state;

    return (
      <div>
        <Header links={<HeaderLinks {...this.props} />} fixed color="primary" />
        {itemsToDisplay.length > 0 && !urls[0]?.link &&
          <div className="judgement-title-container">
            <Typography gutterBottom variant="h6">
              Judgement List 1
            </Typography>
          </div>
        }
        {itemsToDisplay.length > 0 && !urls[0]?.link &&
          <div className="judgement-container">
            {itemsToDisplay.map(data => {
              return (
                // <MediaCard data={data} handleDownLoadFile={this.handleDownLoadFile} />
                <MediaCard data={data} handleDownLoadFile={this.handleDownLoadFile} handleDownLoadPDF={this.handleDownLoadPDF} />
              );
            })}
          </div>
        }
        {itemsToDisplay.length > 0 && !urls[0]?.link &&
          <div className="judgement-container" style={{ alignContent: "center" }}>
            <Pagination size="large" page={page} onChange={this.handlePaginationChange} count={paginationCount} color="primary" />
          </div>
        }
        {itemsToDisplay.length === 0 &&
          <Box className="no-result-fount" alignItems="center" display="flex">
            <Box>
              <FindInPageIcon />
            </Box>
            <Box>
              <Typography gutterBottom variant="h5" component="h2">
                No results found
              </Typography>
            </Box>
          </Box>
        }
        {
          urls.length > 0 && (
            //commenting since react-pdf has issue in vite need to check
            <MultiPDFViewer urls={urls}></MultiPDFViewer>
          )
        }
        <Backdrop className="backdrop" open={this.props.isLoading}>
          <CircularProgress className="progressbar" size={100} />
        </Backdrop>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  userName: state.loginForm.userName,
  status: state.loginForm.status,
  findLawyer: state.findLawyer.lawyerList,
  findLawyerLoaded: state.findLawyer.loaded,
  findJudgement: state.findJudgement.judgementDataList,
  findJudgementId: state.findJudgement.judgementList,
  judgementUrl: state.findJudgement.judgementUrl,
  downloadJudgementUrl: state.findJudgement.downloadJudgementUrl,
  isLoading: state.findJudgement.loading,
  userInfo: state.loginForm.userInfo,
  caseManagement: state.caseManagement,
  caseList: state.dashboard.caseList,
  notifications: state.loginForm.notifications,
  remainders: state.loginForm.remainders,
  appointments: state.loginForm.appointments,
});

function mapDispatchToProps(dispatch: any) {
  return {
    findLawyerActions: bindActionCreators(FindLawyerActions as any, dispatch),
    finsJudgementActions: bindActionCreators(FindJudgementActions as any, dispatch),
    loginActions: bindActionCreators(LoginActions as any, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JudgementList);

