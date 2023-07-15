import React from "react";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import './NotesText.scss';

export default function NotesText(props:any) {
    let titleText = '';
    if (props.isLawyer) {
      titleText = (props.notes.type === 'lawyer') ? 'You' : 'Client';
    } else {
      titleText = (props.notes.type === 'lawyer') ? 'Lawyer' : 'You';
    }
    return (
      <Box className="case-info-sub-container">
        <Box className="label">
          <Typography variant="subtitle1" gutterBottom align="center">
            { titleText }
          </Typography>
          <Typography variant="body2" gutterBottom align="center">
            { props.notes.dateTime }
          </Typography>
        </Box>
        { props.notes.type === 'lawyer' &&
          (<Box className="description-container">
            <Typography className="description-input-field" variant="subtitle1" gutterBottom align="center">
              { props.notes.value }
            </Typography>
          </Box>)
        }
        { props.notes.type === 'individual' &&
          (<Box className="input-field notes-container">
            <Paper className="client-notes" variant="outlined" square >{props.notes.value}</Paper>
            { /* <TextField
              className="notes-field"
              size="small"
              multiline
              variant="outlined"
              value={props.notes.value}
              disabled={true}
            /> */ }
          </Box>)
        }
      </Box>
    );
  }