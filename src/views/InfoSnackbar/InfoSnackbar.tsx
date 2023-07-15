import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import withStyles from "@material-ui/core/styles/withStyles";
import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles';
// redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { RootState } from "../../reduxAction/rootReducer";
import * as SnackbarsActions from "../../reduxAction/snackbars/snackbarsActions";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const styles = (theme: Theme) => createStyles({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
});

interface Props extends RouteComponentProps<any> {
  classes: any;
  infoSnackbarMessage: string;
  actions: typeof SnackbarsActions;
  infoSnackbarOpen: boolean;
}

function InfoSnackbar(props: any) {

  const { classes, infoSnackbarMessage, infoSnackbarOpen } = props;

  function handleClose() {
    props.actions.clearSnackbarAction();
  }

  return (
    <div className={classes.root}>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right'}} open={infoSnackbarOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info">
          {infoSnackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
    infoSnackbarMessage: state.snackbars.infoSnackbarMessage,
    infoSnackbarOpen: state.snackbars.infoSnackbarOpen,
  });
  
  function mapDispatchToProps(dispatch: any) {
    return {
      actions: bindActionCreators(SnackbarsActions as any, dispatch)
    };
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(InfoSnackbar));