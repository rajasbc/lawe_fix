import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import withStyles from "@material-ui/core/styles/withStyles";
import createStyles from '@material-ui/core/styles/createStyles';
//import { Theme } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles';

// redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
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
  successSnackbarMessage: string;
  actions: typeof SnackbarsActions;
  successSnackbarOpen: boolean;
}

function SuccessSnackbar(props: any) {

  const { classes, successSnackbarMessage, successSnackbarOpen } = props;

  function handleClose() {
    props.actions.clearSnackbarAction();
  }

  return (
    <div className={classes.root}>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right'}} open={successSnackbarOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {successSnackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
    successSnackbarMessage: state.snackbars.successSnackbarMessage,
    successSnackbarOpen: state.snackbars.successSnackbarOpen,
  });
  
  function mapDispatchToProps(dispatch: any) {
    return {
      actions: bindActionCreators(SnackbarsActions as any, dispatch)
    };
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(SuccessSnackbar));