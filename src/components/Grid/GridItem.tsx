import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";


const styles:any = {
  grid: {
    position: "relative",
    width: "100%",
    minHeight: "1px",
    paddingRight: "15px",
    paddingLeft: "15px"
    /* flexBasis: "auto" */
  }
};

const useStyles = makeStyles(styles);
interface itemprops{
  children?: any,
  className? :any,
  xs?:any,
  sm?:any,
  md?:any,
  lg?:any,
  cs?:any
  component?:any,
  xl?:any
}
export default function GridItem(props:itemprops) {
  const { children, className, xs , sm, md, lg, cs, xl ,component} = props;
  const classes = useStyles();
  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg} cs={cs} xl={xl}component={component} className={classes.grid + " " + className}>
      {children}
    </Grid>
  );
}

GridItem.defaultProps = {
  className: ""
};

GridItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  rest:PropTypes.any
};
