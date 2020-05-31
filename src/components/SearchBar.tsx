import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Box from '@material-ui/core/Box';

import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Search from '@material-ui/icons/Search'
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center'
  },
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: '25ch',
  },
}));

export default function SearchBar(props: any) {
  const classes = useStyles();


  return (
    <div className={classes.root}>
            <FormControl style={{width:'calc(100% - 150px)'}} className={clsx(classes.margin, classes.textField)} variant="outlined">
            <InputLabel htmlFor="outlined-adornment">post url</InputLabel>
            <OutlinedInput
                fullWidth={true}
                id="outlined-adornment"
                value={props.value}
                onChange={props.handleChange()}
                endAdornment={
                <InputAdornment position="end">
                    <IconButton aria-label="search" onClick={props.onSearchClick}>
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