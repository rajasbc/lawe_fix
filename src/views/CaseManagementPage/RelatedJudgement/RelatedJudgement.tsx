import { Box, Grid, Typography, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import FindReplaceSharpIcon from "@material-ui/icons/FindReplaceSharp";
import { MediaCard } from "../../JudgementList/JudgementList";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MultiPDFViewer from "../../JudgementList/MultiPDFViewer";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },
  card: {
    margin: ".5rem 3rem",
    boxShadow: "0 2px 4px 0 rgb(0 0 0 / 50%)",
    minHeight: "50px",
    padding: "5px",
    marginTop: "30px",
  },
  noContent: {
    margin: "2rem",
    padding: "1rem",
    minHeight: "80px",
    justifyContent: "center",
    "& h2": {
      fontSize: "1rem",
    },
    svg: {
      fontSize: "2rem",
    },
  },
  mainContent: {
    display: "flex",
  },
  title: {
    fontSize: "1rem",
    fontWeight: 300,
    marginLeft:"1rem",
  },
  subText: {
    fontSize: "1rem",
    fontWeight: 300,
    marginLeft:"1rem",
  },
  link:{
    marginLeft: "1rem",
    fontSize: "1.2rem",
    color: "#2196f3",
    fontWeight: 500,
  },
  clickButton: {
    cursor: "pointer",
    padding: "10px",
  }
}));

export const RelatedJudgement = (props) => {
  const [urls, setUrls] = useState("");
  const [ isViewClick, setIsViewClick] = useState(false);
  const classes = useStyles();
  useEffect(() => {
    const {product,subproduct} = props.caseManagement.selectedCaseInfo;
    refreshList(product,subproduct);
  }, []);

  useEffect(() => {
    setUrls(props.judgmentUrl);
  }, [props.judgmentUrl?.link]);

  useEffect(() => {
    if (props.downloadJudgementUrl?.link) {
      window.open(props.downloadJudgementUrl?.link, '_blank')
    }
    props.finsJudgementActions.clearDownloadJudgmentUrl();
    
  }, [props.downloadJudgementUrl?.link]);
  

  const refreshList = (product:string,subproduct:string) => {
    props.CaseManagementActions.getRelatedJudgements({
      product: product,
      subproduct:subproduct
    });    
  };

  const handleDownLoadFile = (s3key,id) => {
    props.finsJudgementActions.getJudgementUrlAction({ s3key });
    setIsViewClick(true);
    // props.finsJudgementActions.getReferenceJudgementAction({ id });
  }

  const handleDownLoadPDF = async (s3key) => {
    await props.finsJudgementActions.getJudgementUrlDownloadAction({ s3key });
  }

  const handleBack = (event) => {
    const {product,subproduct} = props.caseManagement.selectedCaseInfo;
    refreshList(product, subproduct);
    setIsViewClick(false);
  }

  return (
      <div>
          {
            !isViewClick? (
                <Box className={classes.root}>
                  <Grid container alignItems="center" justify="flex-start">
                      {props.caseManagement &&
                          props.caseManagement?.relatedJudgements?.length > 0 &&
                              (
                                  <div className="judgement-container">
                                      {
                                          props.caseManagement.relatedJudgements.map ((item) => {
                                            return (
                                              // <MediaCard data={item} handleDownLoadFile={handleDownLoadFile} />
                                              <MediaCard data={item} handleDownLoadFile={handleDownLoadFile} handleDownLoadPDF = {handleDownLoadPDF}/>
                                            );
                                          })
                                      }
                                  </div>
                              )
                        
                        }
                      
                      {props.caseManagement?.relatedJudgements?.length == 0 && (
                          <Grid item xs={12}>
                              <Box display="flex" className={classes.noContent}>
                                  <Box>
                                      <FindReplaceSharpIcon />
                                  </Box>
                                  <Box>
                                      <Typography gutterBottom variant="h5" component="h2">
                                        No Judgements Found
                                      </Typography>
                                  </Box>
                              </Box>
                          </Grid>
                      )}
                  </Grid>
              </Box>
            )
            :
            (         
              
              urls? (
                <Box className={classes.card} >
                  <Typography className = {classes.clickButton} variant="h5" gutterBottom align="left" onClick={handleBack}>
                      <ArrowBackIcon></ArrowBackIcon> Back
                  </Typography>
                  <Grid container alignItems="center" justify="flex-start">                  
                      <div className="judgement-container">
                        {/* //Commenting since react-pdf has some issue with vite need to check */}
                        <MultiPDFViewer urls={urls}></MultiPDFViewer>
                      </div>
                  </Grid>
                </Box>              
              )
              : 
              (
                <Grid item xs={12}>
                  <Box display="flex" className={classes.noContent}>
                    <Box>
                      <FindReplaceSharpIcon />
                    </Box>
                    <Box>
                      <Typography gutterBottom variant="h5" component="h2">
                        No Pdf Found
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              )                      
            )
          }
      </div>    
  );
};
