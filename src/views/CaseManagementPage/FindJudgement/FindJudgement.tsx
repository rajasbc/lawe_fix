import { Backdrop, Box, Button, CircularProgress, Grid, makeStyles, Paper, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import SearchIcon from '@material-ui/icons/Search';
import * as FindJudgementActions from "../../../reduxAction/findJudgement/findJudgementActions";
import { MediaCard } from "../../JudgementList/JudgementList";
import FindInPageIcon from '@material-ui/icons/FindInPage';
import Pagination from "@mui/material/Pagination";
import MultiPDFViewer from "../../JudgementList/MultiPDFViewer";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: "1rem auto",
    padding: "0 1rem",
    width: "100%",
    display: "flex",
    boxShadow: "none !important",
  },
  fieldContainer: {
    width: "50%",
  },
  textField: {
    width: "100%",
  },
  btnContainer: {
    marginLeft: "10px",
    alignItems: "center",
    marginTop: "0.5rem",
    display: "flex",
  },
  btn: {
    height: "40px",
    fontSize: "0.975rem",
    textTransform: "none",
    color: "#FFC602",
    backgroundColor: "#292734",
    "&:hover": {
      color: "#FFC602",
      backgroundColor: "#000",
    },
    "span": {
      color: "#FFC602",
    },
  }
}));

interface Props {
  findJudgementLoaded: any,
  finsJudgementActions: typeof FindJudgementActions,
  findJudgement: any,
  isJudgementLoading: any,
  judgementTextLoaded: any,
  findJudgementData: any,
  findJudgementId: any;
  judgmentUrl: any;
  downloadJudgementUrl: any;
}

export const FindJudgement = (props: Props) => {
  const classes = useStyles();
  const [page, setPage] = useState(1)
  const [paginationCount, setPaginationCount] = useState(0)
  const [isValidJudgementDescription, setIsValidJudgementDescription] = useState(true);
  const [judgementDescription, setJudgementDescription] = useState('');
  const [itemsToDisplay, setItemsToDisplay] = useState(null);
  const [urls, setUrls] = useState([])
  const [isViewClick, setIsViewClick] = useState(false);
  const { judgmentUrl } = props;
  const history = useHistory();
  useEffect(() => {
    if (props.findJudgementLoaded) {
      let judgmentId = []
      let judgmentLength = props?.findJudgement?.id?.length;
      setPaginationCount(Math.ceil(judgmentLength / 10))
      if (judgmentLength < 10)
        judgmentLength = judgmentLength
      else
        judgmentLength = 10
      for (let i = 0; i < judgmentLength; i++) {
        judgmentId.push(props.findJudgement.id[i])
      }
      props.finsJudgementActions.getJudgementTextAction({ ids: judgmentId })
    }
  }, [props.findJudgementLoaded]);

  useEffect(() => {
    if (props.judgementTextLoaded) {
      props.finsJudgementActions.updateFindJudgementLoadedAction();
      props.finsJudgementActions.updateJudgementTextLoadedAction();
      reRenderList(props.findJudgementData)
    }
  }, [props.judgementTextLoaded]);

  useEffect(() => {
    setUrls(props.judgmentUrl)
  }, [props.judgmentUrl?.link]);

  useEffect(() => {
    if (props.downloadJudgementUrl?.link) {
      window.open(props.downloadJudgementUrl?.link, '_blank')
    }
    props.finsJudgementActions.clearDownloadJudgmentUrl();
    
  }, [props.downloadJudgementUrl?.link]);

  useEffect(() => {
    if (judgmentUrl) {
      history.push(`/judgment/pdf`);
    }

  }, [judgmentUrl])

  const reRenderList = (data) => {
    var itemsToDisplay = [];
    for (var i = 0; i < data.length; i++) {
      itemsToDisplay.push(data[i]);
    }
    setItemsToDisplay(itemsToDisplay);
  }

  const handleJudgementDescriptionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setIsValidJudgementDescription(true);
    setJudgementDescription(event.target.value as string);
  };
  const handlePaginationChange = async (event, value) => {
    let judgmentId = []
    setPage(value);
    let end = value * 10
    let start = end - 10;
    for (let i = start; i < end; i++) {
      judgmentId.push(props.findJudgement.id[i])
    }
    await props.finsJudgementActions.getJudgementTextAction({ ids: judgmentId })
  };
  const handleFindJudgement = () => {
    setIsViewClick(true)
    props.finsJudgementActions.clearJudgmentUrl();
    props.finsJudgementActions.clearDownloadJudgmentUrl();
    if (judgementDescription === '') {
      setIsValidJudgementDescription(false);
    } else {
      const data = {
        description: judgementDescription,
      }
      props.finsJudgementActions.findJudgementAction(data);
    }
  }
  const handleDownLoadFile = async (s3key:any) => {
    
    await props.finsJudgementActions.getJudgementUrlAction({ s3key });
  }

  const handleDownLoadPDF = async (s3key) => {
    await props.finsJudgementActions.getJudgementUrlDownloadAction({ s3key });
  }

  return (
    <div >
      <Paper elevation={3} className={classes.paper}>
        <div className={classes.fieldContainer}>
          <TextField error={!isValidJudgementDescription} size="small" onChange={handleJudgementDescriptionChange} className={classes.textField} multiline rows={3} label="Description of issue*" variant="outlined" />
        </div>
        <div className={classes.btnContainer}>
          <Button variant="contained" startIcon={<SearchIcon />} onClick={handleFindJudgement} className={classes.btn}>Find Judgement</Button>
        </div>
      </Paper>
      <div>
        {itemsToDisplay?.length > 0 && !urls && isViewClick &&
          <div className="judgement-title-container">
            <Typography gutterBottom variant="h6">
              Judgement List
            </Typography>
          </div>
        }
        {itemsToDisplay?.length > 0 && !urls && isViewClick &&
          <div className="judgement-container">
            {itemsToDisplay.map(data => {
              return (
                // <MediaCard data={data} handleDownLoadFile={handleDownLoadFile} />
                <MediaCard data={data} handleDownLoadFile={handleDownLoadFile} handleDownLoadPDF = {handleDownLoadPDF}/>
                );
            })}
          </div>
        }
        {itemsToDisplay?.length > 0 && !urls && isViewClick &&
          <div className="judgement-container" style={{ alignContent: "center" }}>
            <Pagination size="large" page={page} onChange={handlePaginationChange} count={paginationCount} color="primary" />
          </div>
        }
        {
          urls && isViewClick && (
            //Commenting since react-pdf has some issue with vite need to check 
             <MultiPDFViewer urls={urls}></MultiPDFViewer>
          )
        }
        {itemsToDisplay && itemsToDisplay?.length === 0 &&isViewClick &&
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
        <Backdrop className="backdrop" open={props?.isJudgementLoading}>
          <CircularProgress className="progressbar" size={100} />
        </Backdrop>
      </div>
    </div>
  )
}