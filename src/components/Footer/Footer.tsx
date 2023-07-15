
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import MailIcon from '@material-ui/icons/Mail';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import { Link } from "react-router-dom";
import Mylogo from "../../assets/img/footerApplogo.svg";
import SubscribeText from "../SubscribeText/SubscribeText";
import './Footer.scss';

export default function Footer() {

  return (
    <footer className="footer-container">
      <div className="link-container">
        <Grid container spacing={2}>

          {/*<Grid item xs={12} md={3}>*/}
          <Grid item xs={12} md={4}>
            <Button>
              <Link to="/">
                  <img
                    className="logo-img"
                    src={Mylogo}
                    alt='logo'
                  />
                </Link>
            </Button>
            <div>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <HomeIcon className="footer-icon" />
                  </ListItemIcon>
                  <ListItemText  className="list-item-text"
                    primary= {"33, Pantheon Apartments," }
                    secondary= {
                      <div>
                        <div className="list-item-text-color">Pantheon Lane, Egmore,</div>
                        <div className="list-item-text-color">Chennai 600008</div>
                      </div>
                    }
                  />
                </ListItem>

                {/*}
                <ListItem>
                  <ListItemText className="list-item-text only-text"
                    primary="Pantheon Lane Egmore, Chennai, TN, India 600008"
                  />
                </ListItem>
                */}

                <ListItem>
                  <ListItemIcon>
                    <MailIcon className="footer-icon" />
                  </ListItemIcon>
                  <ListItemText  className="list-item-text"
                    primary="support@lawe.co.in"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PhoneAndroidIcon className="footer-icon" />
                  </ListItemIcon>
                  <ListItemText  className="list-item-text"
                    primary="+91 93457 62392"
                  />
                </ListItem>
              </List>
            </div>
          </Grid>

          {/*<Grid item xs={12} md={3}>*/}
          <Grid item xs={12} md={4}>
            <Typography variant="button" className="title-text">
              Links
            </Typography>
            <div>
              <List>              
                <ListItem button component= "a" href="https://www.lawe.co.in/#explore" target="_blank">
                  <ListItemText className="list-item-text"
                    primary="About Us"
                  />
                </ListItem>

                {/*}
                <ListItem>
                  <ListItemText className="list-item-text"
                    primary="Services"
                  />
                </ListItem>
                */}

                <ListItem button component= "a" href="https://www.lawe.co.in/lawe-privacypolicy.html" target="_blank">
                  <ListItemText className="list-item-text"
                    primary="Privacy"
                  />
                </ListItem>

                <ListItem button component= "a" href="https://www.lawe.co.in/lawe-termsandconditions.html" target="_blank">
                  <ListItemText className="list-item-text"
                    primary="Terms of Use"
                  />
                </ListItem>
              </List>
            </div>
          </Grid>

          {/*}
          <Grid item xs={12} md={3}>
            <Typography variant="button" className="title-text">
              Navigate
            </Typography>
            <div>
            <List>              
                <ListItem>
                  <ListItemText className="list-item-text"
                    primary="Home"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText className="list-item-text"
                    primary="Blog"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText className="list-item-text"
                    primary="Contacts"
                  />
                </ListItem>
              </List>
            </div>
          </Grid>
          */}
          
          {/*<Grid item xs={12} md={3}>*/}
          <Grid item xs={12} md={4}>
            <Typography variant="button" className="title-text empty-left-padding">
              Subscribe
            </Typography>
            <div>
              <Typography variant="body1" gutterBottom className="subscribe-text">
              Enter your email subscribe to our news and updates by email.
              </Typography>
              <SubscribeText />
            </div>
          </Grid>
        </Grid>
      </div>
      <div className="terms-container">
        <Typography variant="body1" gutterBottom>
          LAWE @ 2023. All rights reserved.
        </Typography>
      </div>
    </footer>
  );
}

