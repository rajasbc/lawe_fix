import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import NotesText from '../NotesText/NotesText';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
     margin: '1rem 0',
    },
    cardActionRoot: {
      padding: 0,
      backgroundColor: '#8B8686'
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
      color: '#fff'
    },
    expandOpen: {
      transform: 'rotate(180deg)',
      color: '#fff'
    },
    avatar: {
      backgroundColor: red[500],
    },
    title: {
      textTransform: 'unset',
      padding: '8px',
      color: '#FCF9F9',
      width: '100%',
      backgroundColor: '#8B8686',
      fontSize: '1.1rem'
    }
  }),
);

export default function RecipeReviewCard(props) {
  const { caseNotes, title, status, isLawyer, handleSendMessage } = props;
  const classes = useStyles();
  const isInProgress = (status === 1 || status === 2);
  const [expanded, setExpanded] = React.useState(isInProgress);
  const [isValidNotes, setIsValidNotes] = React.useState(true);
  const [notesToClient, setNotesToClient] = React.useState('');

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleNotesChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setNotesToClient(event.target.value as string);
  };
  const handleSaveNodes = () => {
    if (notesToClient === '') {
      setIsValidNotes(false);
    } else {
      handleSendMessage(notesToClient, title);
      setIsValidNotes(true);
      setNotesToClient('');
    }
  }
  let statusText = (status === 3) ? '- Completed' : '- In  progress';
  return (
    <React.Fragment>
      { (status === 1 || status === 2 || status === 3) &&
        (<Card className={classes.root}>
          <CardActions className={classes.cardActionRoot} disableSpacing>
            <Typography className={classes.title} variant="h6" gutterBottom>
              { title } {statusText}
            </Typography>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <React.Fragment>
                {caseNotes.map((notes) => (
                  <NotesText notes={notes} isLawyer={isLawyer} />
                ))}
                { isInProgress &&
                  (<React.Fragment>
                    <Box className="case-info-sub-container">
                      <Typography className="label" variant="subtitle1" gutterBottom align="center">
                        Your Comment
                      </Typography>
                      <Box className="input-field notes-container">
                        <TextField
                          error={!isValidNotes}
                          className="notes-field"
                          size="small"
                          multiline
                          rows={8}
                          onChange={handleNotesChange}
                          variant="outlined"
                          value={notesToClient}
                        />
                      </Box>              
                    </Box>
                    <Box className="case-info-sub-container send-message-container">
                      <Button variant="contained" onClick={handleSaveNodes}>
                        <span>Send Message</span>
                      </Button>
                    </Box>
                  </React.Fragment>)
                }
              </React.Fragment>
            </CardContent>
          </Collapse>
        </Card>)
      }
    </React.Fragment>
  );
}