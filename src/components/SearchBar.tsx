import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';

import FormControl from '@material-ui/core/FormControl';
import Search from '@material-ui/icons/Search'
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  },
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: '25ch',
  },
}));

const useOutlinedInputStyles = makeStyles(theme => ({
  root: {
    "& $notchedOutline": {
      borderColor: "grey"
    },
    "&:hover $notchedOutline": {
      borderColor: "coral",
    },
    "&$focused $notchedOutline": {
      borderColor: "coral"
    }
  },
  focused: {},
  notchedOutline: {}
}));

export default function SearchBar(props: any) {
  const classes = useStyles();
  const outlinedInputClasses = useOutlinedInputStyles();

  return (
    <div className={classes.root}>
            <FormControl style={{width:'93%'}} className={clsx(classes.margin, classes.textField)} variant="outlined">
            <InputLabel htmlFor="outlined-adornment">post url</InputLabel>
            <OutlinedInput
                fullWidth={true}
                id="outlined-adornment"
                classes={outlinedInputClasses}
                value={props.value}
                onChange={props.handleChange()}
                onKeyPress={(ev) => {
                  if (ev.key === 'Enter') {
                      props.onSearchClick()
                  }
                }}          
                endAdornment={
                <InputAdornment position="end">
                    <IconButton type="submit" aria-label="search" onClick={props.onSearchClick}>
                        {props.isSearching ? <CircularProgress style={{color: 'coral'}} size={28}/> :  <Search style={{color: 'coral'}}/>}
                    </IconButton>
                </InputAdornment>
                }
                labelWidth={55}
            />
            </FormControl>
        </div>
  );
}