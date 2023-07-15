import Snackbar from '@material-ui/core/Snackbar';
import { Theme } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from "@material-ui/core/styles/withStyles";
import MuiAlert from '@material-ui/lab/Alert';
// redux
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { bindActionCreators } from "redux";
import { RootState } from "../../reduxAction/rootReducer";
import * as SnackbarsActions from "../../reduxAction/snackbars/snackbarsActions";

function Alert(props:any) {
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
  errorSnackbarMessage: string;
  actions: typeof SnackbarsActions;
  errorSnackbarOpen: boolean;
}

function ErrosSnackbar(props: any) {

  const { classes, errorSnackbarMessage, errorSnackbarOpen } = props;

  function handleClose() {
    props.actions.clearSnackbarAction();
  }

  return (
    <div className={classes.root}>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right'}} open={errorSnackbarOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {errorSnackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
    errorSnackbarMessage: state.snackbars.errorSnackbarMessage,
    errorSnackbarOpen: state.snackbars.errorSnackbarOpen,
  });
  
  function mapDispatchToProps(dispatch: any) {
    return {
      actions: bindActionCreators(SnackbarsActions as any, dispatch)
    };
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(ErrosSnackbar));