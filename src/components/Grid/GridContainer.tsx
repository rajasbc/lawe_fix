import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const styles = {
  grid: {
    marginRight: "-15px",
    marginLeft: "-15px",
    width: "auto"
  }
};

const useStyles = makeStyles(styles);
interface itemprops{
  children?: any,
  className? :any,
  justify?:any
  
}
export default function GridContainer(props:itemprops) {
  const { children, className, justify } = props;
  const classes = useStyles();
  return (
    <Grid container justify={justify} className={classes.grid + " " + className}>
      {children}
    </Grid>
  );
}

GridContainer.defaultProps = {
  className: ""
};


