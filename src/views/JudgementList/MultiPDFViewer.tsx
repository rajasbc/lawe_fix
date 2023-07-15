import React, { useEffect, useState } from 'react';
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { HeaderLinks } from "../../components/Header/HeaderLinks";
// import { Document, Page } from 'react-pdf/dist/esm/entry.vite';
import { Box, Card, CardContent, CircularProgress, List, ListItem, ListItemText, Typography, makeStyles } from '@material-ui/core';
import FindReplaceSharpIcon from "@material-ui/icons/FindReplaceSharp";
import { Grid } from '@mui/material';
import range from 'lodash/range';
import { Document, Page, pdfjs } from "react-pdf";
import { connect } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import { bindActionCreators } from "redux";
import styled from 'styled-components';
import * as LoginActions from "../../reduxAction/authentication/authenticationActions";
import * as CaseManagementActions from "../../reduxAction/caseManagement/caseManagementActions";
import * as CommonActions from "../../reduxAction/common/commonActions";
import * as DashboardActions from "../../reduxAction/dashboard/dashboardActions";
import * as FindJudgementActions from "../../reduxAction/findJudgement/findJudgementActions";
import * as FindLawyerActions from "../../reduxAction/findLawyer/findLawyerActions";
import { RootState } from "../../reduxAction/rootReducer";
import * as SnackbarsActions from "../../reduxAction/snackbars/snackbarsActions";

pdfjs.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@3.6.172/build/pdf.worker.js';
// import { handleDownloadPDF, handlePrintPDF } from '@common/utils/FormUtils';
// import { LoadingButton } from '../forms';
// import Loader from '../Loader';
// import { showFailureToast } from '../toaster/Toaster';
export const PDFContainer = styled.div`
.react-pdf__Page__canvas {
    max-width: 100%;
}
.pdf-pagination {
    position: fixed;
    background-color: #43536c;
    color: black;
    opacity: 0.5;
    bottom: 5%;
    left: 43%;
    border-radius: 10px;
    &:hover {
        opacity: 1;
    }
}
`;
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    backgroundColor: '#292734'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    textAlign: "center",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  progressbar: {
    color: '#FFC602'
  },
  disabledButton: {
    "& .MuiInputBase-root.Mui-disabled": {
      color: "gray"
    }
  },

}));
interface Props extends RouteComponentProps<any> {
  userName: string | null;
  notifications: any[];
  remainders: any[];
  appointments: any[];
  caseList: any;
  loginActions: typeof LoginActions;
  userInfo: any;
  CaseManagementActions: typeof CaseManagementActions;
  handleCaseNavigation: any;
  getAllNotifications: any[];
  notificationReadCount: number;
  judgmentUrl: any;
  caseManagement: any;
  judgmentAddNotes: "true";
  stage: any;
  finsJudgmentActions: typeof FindJudgementActions;
}

export function MultiPDFViewer(props: any) {
  const classes = useStyles();
  const [pageCount, setPageCount] = useState(null);
  const [referenceLinks, setReferenceLinks] = useState([]);
  const urls = props.judgmentUrl?.link;
  const [previewURL, setPreviewURL] = useState(urls || null);

  useEffect(() => {
    if (urls) {
      setPreviewURL(urls);
    }
  }, [urls]);

  useEffect(() => {
    if (props.referenceJudgements) {
      setReferenceLinks(props.referenceJudgements);
      console.log("now clear")
      props.finsJudgementActions.clearJudgmentUrl({});
    }
  }, [props.referenceJudgements]);



  const onDocumentLoadSuccess = ({ numPages }) => {
    setPageCount(numPages);
  };
  const onError = (error) => {
    console.log("Error", error)
  };
  const options = {
    cMapUrl: "cmaps/",
    cMapPacked: true
  };
  return (
    <div>
      <Header links={<HeaderLinks  {...props} />} fixed color="primary" />
      <Grid container className="pdfcss">
        <Grid item xs={9} style={{overflowY:'scroll',maxHeight:'1000px', marginTop: '10px', maxWidth:'95%'}} className='col-sm-12 col-md-12 col-lg-12'>
          <PDFContainer>
            <Document
              file={previewURL}
              externalLinkTarget="_blank"
              loading={<div className="button-loader">
                <CircularProgress disableShrink />
              </div>}
              options={options}
              onLoadError={onError}
              onSourceError={onError}
              renderMode="canvas"
              onLoadSuccess={onDocumentLoadSuccess}
            >

              {range(pageCount)?.map((index) => (
                <div id={`page_${index + 1}`}>
                  <Page className="text-center"
                    key={`page_${index + 1}`}
                    scale={1.5}
                    pageNumber={index + 1}
                  />
                </div>
              ))}

            </Document>
          </PDFContainer>
        </Grid>
        <Grid item xs={2} style={{paddingTop:'80px'}} className="cssjudge ml-3">
          <Card className="card">
            <CardContent className="card-content">
              <Typography gutterBottom variant="h6" component="h4">
                Recent Judgements
              </Typography>
              {referenceLinks && referenceLinks?.length > 0 && (
                <List className="item-container">
                  {referenceLinks.map((item) => {
                    return (
                      <ListItem className="item-box">
                        <ListItemText primary={item.courtName}
                          secondary={
                            <React.Fragment>
                              <Link href={item} to="#" target="blank">
                                {item}
                              </Link>
                            </React.Fragment>}
                        />
                      </ListItem>
                    )
                  })}
                </List>
              )}
              {referenceLinks && referenceLinks?.length == 0 && (
                <Box className="no-result-fount" display="flex">
                  <Box>
                    <FindReplaceSharpIcon />
                  </Box>
                  <Box>
                    <Typography gutterBottom variant="h5" component="h2">
                      No Reference Judgement Found
                    </Typography>
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Footer />
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  userName: state.loginForm.userName,
  status: state.loginForm.status,
  userInfo: state.loginForm.userInfo,
  isLoading: state.caseManagement.loading,
  caseManagement: state.caseManagement,
  stage: state.caseManagement.stage,
  common: state.commonReducer,
  findJudgementLoaded: state.findJudgement.loaded,
  findJudgement: state.findJudgement.judgementList,
  isJudgementLoading: state.findJudgement.loading,
  notifications: state.loginForm.notifications,
  remainders: state.loginForm.remainders,
  appointments: state.loginForm.appointments,
  success: state.loginForm.success,
  error: state.loginForm.error,
  judgmentUrl: state.findJudgement.judgementUrl,
  judgmentAddNotes: "true",
  caseList: state.dashboard.caseList,
  referenceJudgements: state.findJudgement.referenceJudgements,
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
)(MultiPDFViewer);
