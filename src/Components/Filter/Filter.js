import {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 250,
    padding: '10px',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Filter() {
  const classes = useStyles();
  const [state, setState] = useState({
    all: false,
    noneTransfer: false,
    oneTransfer: false,
    twoTransfer: false,
    threeTransfer: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const {all, noneTransfer, oneTransfer, twoTransfer, threeTransfer } = state;

  return (
    <List className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Количество пересадок</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={all} onChange={handleChange} name="all" color='primary'/>}
            label="Все"
          />
          <FormControlLabel
            control={<Checkbox checked={noneTransfer} onChange={handleChange} name="noneTransfer" />}
            label="Без пересадки"
          />
          <FormControlLabel
            control={<Checkbox checked={oneTransfer} onChange={handleChange} name="oneTransfer" />}
            label="1 пересадка"
          />
          <FormControlLabel
            control={<Checkbox checked={twoTransfer} onChange={handleChange} name="twoTransfer" />}
            label="2 пересадки"
          />
          <FormControlLabel
            control={<Checkbox checked={threeTransfer} onChange={handleChange} name="threeTransfer" />}
            label="3 пересадки"
          />
        </FormGroup>
        </FormControl>
    </List>
  );
}