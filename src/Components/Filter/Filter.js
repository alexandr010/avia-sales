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

export default function Filter({setTransfer}) {
  const classes = useStyles();
  const [state, setState] = useState([]);

  const handleChange = (event) => {
  
    let newState = [];
      if(event.target.checked){
      newState = [ ...state, parseInt(event.target.value)]
    } else {
      newState = state.filter((item) => item !== parseInt(event.target.value))
    }
    setState(newState);
    setTransfer(newState);
  };

  return (
    <List className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Количество пересадок</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox value={0} checked={state.includes(0)} onChange={handleChange} name="noneTransfer" />}
            label="Без пересадки"
          />
          <FormControlLabel
            control={<Checkbox value={1} checked={state.includes(1)} onChange={handleChange} name="oneTransfer" />}
            label="1 пересадка"
          />
          <FormControlLabel
            control={<Checkbox value={2} checked={state.includes(2)} onChange={handleChange} name="twoTransfer" />}
            label="2 пересадки"
          />
          <FormControlLabel
            control={<Checkbox value={3} checked={state.includes(3)} onChange={handleChange} name="threeTransfer" />}
            label="3 пересадки"
          />
        </FormGroup>
        </FormControl>
    </List>
  );
}