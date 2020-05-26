import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import SearchBar from './components/SearchBar';
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: '25ch',
  },
  searchBar: {
   paddingTop: 'calc(50vh - 150px)',
  },
  footer: {
    position:'absolute',
    left:0,
    bottom:0,
    right:0,
    paddingBottom: '20px'
  },
}));

function Copyright() {

  const classes = useStyles();

  return (
      <Typography className='footer' variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Allister Grange
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
  );
}

export default function App() {
  const classes = useStyles();

  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [url, setUrl] = React.useState('');

  const handleChange = (prop: any) => (event: any) => {
    setUrl(event.target.value);
  };

  //will be used for css transition
  const onSearchClick = () => {
    console.log(isSearching)
    setHasSearched(!hasSearched);
    setIsSearching(!isSearching);
  }

  return (
    <Container  maxWidth="xl">
      <Box my={4}>
        <Typography align="center" variant="h4" component="h1" gutterBottom>
          calculate reddit awards total estimated cost
        </Typography>
        <div className={classes.searchBar}>
          <SearchBar 
            value={url} 
            onSearchClick={onSearchClick} 
            handleChange={handleChange}
            isSearching={isSearching}/>
        </div>
        <div className={classes.footer}>
          <Copyright />
        </div>
      </Box>
    </Container>
  );
}
