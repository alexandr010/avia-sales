import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    width: '300px',
  },
}));

export default function Main() {
  const classes = useStyles();

  return (
    <Grid container spasing={1}>
      <Grid item xs='12'>
        <Button variant='contained' color='primary' className={classes.button}>Самый быстрый</Button>
        <Button variant='outlined' className={classes.button}>Самый дешевый</Button>
      </Grid>
    </Grid>
  )
}