import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import ChipInput from 'material-ui-chip-input';
import React from 'react';
import Autosuggest from 'react-autosuggest';
import suggestions from '../../assets/constant/courts.json';

/* const suggestions = [
  { name: 'Afghanistan' },
  { name: 'Aland Islands' },
  { name: 'Albania' },
  { name: 'Algeria' },
  { name: 'American Samoa' },
  { name: 'Andorra' },
  { name: 'Angola' },
  { name: 'Anguilla' },
  { name: 'Antarctica' },
  { name: 'Antigua and Barbuda' },
  { name: 'Argentina' },
  { name: 'Armenia' },
  { name: 'Aruba' },
  { name: 'Australia' },
  { name: 'Austria' },
  { name: 'Azerbaijan' },
  { name: 'Bahamas' },
  { name: 'Bahrain' },
  { name: 'Bangladesh' },
  { name: 'Barbados' },
  { name: 'Belarus' },
  { name: 'Belgium' },
  { name: 'Belize' },
  { name: 'Benin' },
  { name: 'Bermuda' },
  { name: 'Bhutan' },
  { name: 'Bolivia, Plurinational State of' },
  { name: 'Bonaire, Sint Eustatius and Saba' },
  { name: 'Bosnia and Herzegovina' },
  { name: 'Botswana' },
  { name: 'Bouvet Island' },
  { name: 'Brazil' },
  { name: 'British Indian Ocean Territory' },
  { name: 'Brunei Darussalam' }
] */

function renderInput (inputProps) {
  const { value, onChange, chips, ref, ...other } = inputProps;
  return (
    <ChipInput
      clearInputValueOnChange
      onUpdateInput={onChange}
      value={chips}
      inputRef={ref}
      {...other}
    />
  )
}

function renderSuggestion (suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.name, query)
  const parts = parse(suggestion.name, matches)

  return (
    <MenuItem
      selected={isHighlighted}
      component='div'
      onMouseDown={(e) => e.preventDefault()}
    >
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
          ) : (
            <span key={String(index)}>
              {part.text}
            </span>
          )
        })}
      </div>
    </MenuItem>
  )
}

function renderSuggestionsContainer (options) {
  const { containerProps, children } = options

  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  )
}

function getSuggestionValue (suggestion) {
  return suggestion.name
}

function getSuggestions (value) {
  const inputValue = value.trim().toLowerCase()
  const inputLength = inputValue.length
  let count = 0

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
      const keep =
          count < 5 && suggestion.name.toLowerCase().includes(inputValue)

      if (keep) {
        count += 1
      }

      return keep
    })
}

const styles = (theme: Theme) => createStyles({
  container: {
    flexGrow: 1,
    position: 'relative'
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    left: 0,
    right: 0,
    zIndex: 10
  },
  suggestion: {
    display: 'block'
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none'
  },
  textField: {
    width: '100%'
  }
})

interface Props {
  classes: any;
  allowDuplicates: boolean;
  handleInputChange: (data: any) => void;
  label: string;
  placeholder: string;
  variant: string;
  fullWidth: boolean;
  error?: boolean;
}

class PracticingCourt extends React.Component<Props> {
  state = {
    // value: '',
    suggestions: [],
    value: [],
    textFieldInput: ''
  };

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    })
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    })
  };

  handletextFieldInputChange = (event, { newValue }) => {
    this.setState({
      textFieldInput: newValue
    })
  };

  handleAddChip (chip) {
    const { allowDuplicates, handleInputChange } = this.props;
    const { value } = this.state;
    if (allowDuplicates || value.indexOf(chip) < 0) {
      if (handleInputChange) handleInputChange([...value, chip]);
      this.setState(({ value }: any) => ({
        value: [...value, chip],
        textFieldInput: ''
      }));
    }
  }

  handleDeleteChip (chip, index) {
    this.setState(({ value }: any) => {
      const temp = value.slice()
      temp.splice(index, 1)
      return {
        value: temp
      }
    })
  };

  render () {
    const { classes, ...other } = this.props

    return (
      <Autosuggest
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion
        }}
        renderInputComponent={renderInput}
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        renderSuggestionsContainer={renderSuggestionsContainer}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}        
        onSuggestionSelected={(e, { suggestionValue }) => { this.handleAddChip(suggestionValue); e.preventDefault() }}
        focusInputOnSuggestionClick
        inputProps={{
          chips: this.state.value,
          value: this.state.textFieldInput,
          onChange: this.handletextFieldInputChange,
          onAdd: (chip) => this.handleAddChip(chip),
          onDelete: (chip, index) => this.handleDeleteChip(chip, index),
          ...other
        }}
      />
    )
  }
}

export const PracticingCourtAutoSuggest = withStyles(styles)(PracticingCourt)

/* class ReactAutosuggestRemote extends React.Component {
  state = {
    // value: '',
    suggestions: [],
    value: [],
    textFieldInput: ''
  };

  handleSuggestionsFetchRequested = ({ value }) => {
    var oReq = new XMLHttpRequest()
    var that = this
    oReq.addEventListener('load', function () {
      that.setState({
        suggestions: oReq.status === 200 ? JSON.parse(this.responseText) : []
      })
    })
    oReq.open('GET', 'https://restcountries.eu/rest/v2/name/' + value)
    oReq.send()
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    })
  };

  handletextFieldInputChange = (event, { newValue }) => {
    this.setState({
      textFieldInput: newValue
    })
  };

  handleAddChip (chip) {
    this.setState({ value: this.state.value.concat([chip]) })
  }

  handleDeleteChip (chip, index) {
    const temp = this.state.value
    temp.splice(index, 1)
    this.setState({ value: temp })
  }

  render () {
    const { classes, ...rest } = this.props

    return (
      <Autosuggest
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion
        }}
        renderInputComponent={renderInput}
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        renderSuggestionsContainer={renderSuggestionsContainer}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        onSuggestionSelected={(e, { suggestionValue }) => { this.handleAddChip(suggestionValue); e.preventDefault() }}
        focusInputOnSuggestionClick
        inputProps={{
          classes,
          chips: this.state.value,
          onChange: this.handletextFieldInputChange,
          value: this.state.textFieldInput,
          onAdd: (chip) => this.handleAddChip(chip),
          onDelete: (chip, index) => this.handleDeleteChip(chip, index),
          ...rest
        }}
      />
    )
  }
}

ReactAutosuggestRemote.propTypes = {
  classes: PropTypes.object.isRequired
}
export const ReactAutosuggestRemoteExample = withStyles(styles)(ReactAutosuggestRemote) */
