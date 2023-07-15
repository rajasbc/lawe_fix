import { Box } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import Close from "@material-ui/icons/Close";
import Menu from "@material-ui/icons/Menu";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import Mylogo from "../../assets/img/applogo.svg";
import styles from "../../assets/jss/Lawe-react/components/headerStyle";
import './HeaderLinks.scss';

const useStyles = makeStyles(styles);

export default function Header(props:any) {

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const classes = useStyles();
  React.useEffect(() => {
    if (props.changeColorOnScroll) {
      window.addEventListener("scroll", headerColorChange);
    }
    return function cleanup() {
      if (props.changeColorOnScroll) {
        window.removeEventListener("scroll", headerColorChange);
      }
    };
  });
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const headerColorChange = () => {
    const { color, changeColorOnScroll } = props;

    const windowsScrollTop = window.pageYOffset;
    if (windowsScrollTop > changeColorOnScroll.height) {
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[changeColorOnScroll.color]);
    } else {
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[changeColorOnScroll.color]);
    }
  };
  const { color, links, brand, fixed, absolute,logo ,link} = props;
  const appBarClasses = classNames({
    [classes.appBar]: true,
    [classes[color]]: color,
    [classes.absolute]: absolute,
    [classes.fixed]: fixed
  });
  return (
    <AppBar className={appBarClasses}>
      <Toolbar className={classes.container}>
        <Button className={classes.title}>
          <Link to={link ? link: "/"}>
              <img
                className={classes.logo}
                src={Mylogo}
                alt='logo'
              />
            </Link>
        </Button>
        <Box  display={{ xs: 'none', sm: 'block' }} >
          <div className={classes.collapse}>{links}</div>
        </Box>
        <Box display={{  md: 'block' }}>
          <IconButton
          // className="drawer_hidden"
          // className={classes.drawer_hidden}
            // color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Box>
      </Toolbar>
      <Box display={{ xs: 'none', md: 'block' }} >
        <Drawer
          variant="temporary"
          anchor={"right"}
          open={mobileOpen}
          classes={{
            paper: classes.drawerPaper
          }}
          onClose={handleDrawerToggle}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            className={classes.closeButtonDrawer}
          >
            <Close />
          </IconButton>
          <div className={classes.appResponsive}>{links}</div>
        </Drawer>
      </Box>
    </AppBar>
  );
}

Header.defaultProp = {
  color: "white"
};

Header.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "transparent",
    "white",
    "rose",
    "dark"
  ]),
  links: PropTypes.node,
  link: PropTypes.string,
  brand: PropTypes.string,
  logo:PropTypes.string,
  fixed: PropTypes.bool,
  absolute: PropTypes.bool,
  // this will cause the sidebar to change the color from
  // props.color (see above) to changeColorOnScroll.color
  // when the window.pageYOffset is heigher or equal to
  // changeColorOnScroll.height and then when it is smaller than
  // changeColorOnScroll.height change it back to
  // props.color (see above)
  changeColorOnScroll: PropTypes.shape({
    height: PropTypes.number.isRequired,
    color: PropTypes.oneOf([
      "primary",
      "info",
      "success",
      "warning",
      "danger",
      "transparent",
      "white",
      "rose",
      "dark"
    ]).isRequired
  })
};
