import React from "react";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import "./ClouserDialog.scss";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
      backgroundColor: "#292734",
      color: "#fff",
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: "#fff",
    },
    titleText: {
      textTransform: "unset",
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6" className={classes.titleText}>
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(4),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs(props:any) {
  return (
    <div>
      <Dialog
        maxWidth="sm"
        disableBackdropClick
        disableEscapeKeyDown
        onClose={props.handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.isOpen}
      >
        <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
          {props.title}
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>{props.content}</Typography>
          {props.formContent}
        </DialogContent>
        {props.okText && props.cancelText && (
          <DialogActions>
            <Button
              variant="contained"
              onClick={props.handleOk}
              className="dialog-ok-btn"
            >
              {props.okText}
            </Button>
            <Button
              variant="contained"
              onClick={props.handleCancel}
              className="dialog-cancel-btn"
            >
              {props.cancelText}
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
}
