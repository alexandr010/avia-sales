import { Container} from '@material-ui/core';
import Tickets from './Components/Tickets/Tickets'
import './App.css';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'rgb(243, 247, 250)',
    padding: '10px',
  },
  imgLogo: {
    width: '150px',
    margin: '20px',

  },
  imgBlock: {
    display: 'flex',
    justifyContent: 'center',
  }
}));

function App() {
  const classes = useStyles();

  return (
    <Container maxWidth='md' className={classes.root}>
      <div className={classes.imgBlock}>
        <img src='https://upload.wikimedia.org/wikipedia/commons/c/cd/Aviasales_logo.png' alt='logo' className={classes.imgLogo}></img>
      </div>
     <Tickets/>
    </Container>
  );
}

export default App;
