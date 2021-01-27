import {useState} from 'react';
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const useStyles = makeStyles((theme) => ({
  button: {
    width: '300px',
  },
  active: {
    background: 'rgb(7, 87, 254)',
  }
}));

export default function Main({onClick, value}) {
  const classes = useStyles();

  const handleChange = (event) => {
    console.log(event.target)
  }



  return (
    <Grid container spasing={1}>
      <Grid item xs={12}>
        <Button variant='contained' onClick={() => onClick('fast')} className={classNames(classes.button, { [classes.active]: value === 'fast' })}>Самый быстрый</Button>
        <Button variant='outlined' onClick={() => onClick('cheap')} className={classNames(classes.button, { [classes.active]: value === 'cheap' })}>Самый дешевый</Button>
      </Grid>
    </Grid>
  )
}