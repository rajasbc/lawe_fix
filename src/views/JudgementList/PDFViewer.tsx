import { AppBar, Dialog, IconButton, Slide, Toolbar, Typography, makeStyles } from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import React, { useEffect, useState } from "react";
import * as CaseManagementActions from "../../reduxAction/caseManagement/caseManagementActions";
import AddNotes from "./AddNotes";
import "./PDFViewer.scss";


interface PDFViewerProps {
  url: string;
  title: string;
  caseManagement: any;
  CaseManagementActions: typeof CaseManagementActions;
  userInfo: any;
  updateIsOpen: any;
}
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

const PDFViewer: React.FC<PDFViewerProps> = (props) => {
  const [open, setOpen] = useState(true);
  const [openAddNote, setOpenAddNote] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    // if (window && document) {
    //   const script = document.createElement('script')
    //   const body = document.getElementsByTagName('body')[0]
    //   script.src = '/x-frame-bypass.js'
    //   script.type="module"
    //   body.appendChild(script)
    // }
  }, [])

  const handleClose = () => {
    setOpen(false);
    props.updateIsOpen();
  }

  const handleAddNotes =  () => {
    setOpenAddNote(true);
  }

  const updateState =  () => {
    setOpenAddNote(false);
  }

  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  return (
    <React.Fragment>
      {open &&
        <Dialog className="full-screen-dialog" fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                {props.title ?? "Lawyer List"}
              </Typography>
              <IconButton edge="start" color="inherit" onClick={handleAddNotes} aria-label="close">
                <AddIcon />Notes
              </IconButton>
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <iframe src={`${props.url}#toolbar=1&navpanes=0&scrollbar=0&embedded=true`} width="100%" height="100%" />
        </Dialog>
      }
      {openAddNote && <AddNotes caseManagement={props.caseManagement}
            CaseManagementActions={props.CaseManagementActions} updateState={updateState} userInfo={props.userInfo}
            ></AddNotes>}
    </React.Fragment>
  );
};

export default PDFViewer;
