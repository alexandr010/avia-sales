import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { addMinutes, intervalToDuration, format, subHours } from 'date-fns';


const useStyles = makeStyles({
  root: {
    minWidth: 600,
    margin: '20px 25px 0 0'
  },
  imgLogo: {
    margin: '-10px 0 0 0'
  },
  dateArrive: {
    padding: '10px 0 0 0'
  },
  price: {
    color: 'blue',
    fontWeight: 'bold',
  },
  sityArrive: {
    fontWeight: 'bold',
  }
});


export default function Ticket({ item }) {
  const classes = useStyles();

  const addMinutesDate = addMinutes(new Date(item.segments[0].date), item.segments[0].duration);
  const formatDate = (format(new Date(addMinutesDate.toISOString()), 'p'));
  const addTwoHours = format(subHours (Date.parse(item.segments[0].date), 2), 'p');

  const addMinutesDateReturn = addMinutes(new Date(item.segments[1].date), item.segments[1].duration);
  const formatDateReturn = (format(new Date(addMinutesDateReturn.toISOString()), 'p'));


  const getIntervalDate = intervalToDuration({
    start: new Date(Date.parse(item.segments[0].date)),
    end: new Date(addMinutesDate.toISOString())
  });

  const getIntervalDateReturn = intervalToDuration({
    start: new Date(Date.parse(item.segments[1].date)),
    end: new Date(addMinutesDateReturn.toISOString())
  });

  const { days, hours, minutes } = getIntervalDate;
 
  const formatPrice = new Intl.NumberFormat().format(item.price);

  const getStopsLength = (item) => {
    if (item === 0) {
      return
    } else if (item === 1) {
      return `${item} пересадка`
    } else {
      return `${item} пересадки`
    }
  };

  const arrStops = item.segments[0].stops;
  const arrStopsReturn = item.segments[1].stops;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container>
          <Grid item xs={12} container>
            <Grid item xs dirction='column'>
              <Typography variat='h3' className={classes.price} >
                {formatPrice} Р
              </Typography>
            </Grid>
            <Typography className={classes.imgLogoimgLogo}>
              <img src={`//pics.avs.io/99/36/${item.carrier}.png`} alt='logo' />
            </Typography>
          </Grid>
          <Grid container>
            <Grid item xs={4}>
              <Typography variant='subtitle2'  color="textSecondary">
                {item.segments[0].origin} - {item.segments[0].destination}
              </Typography>
              <Typography className={classes.sityArrive}>
                {addTwoHours} - {formatDate}
              </Typography>
               {/* Return */}
              <Typography className={classes.dateArrive} variant='subtitle2' color="textSecondary">
                {item.segments[1].origin} - {item.segments[1].destination}
              </Typography>
              <Typography className={classes.sityArrive}>
                {format(Date.parse(item.segments[1].date), 'p')} - {formatDateReturn}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant='subtitle2' color="textSecondary">
                В пути
              </Typography>
              <Typography className={classes.sityArrive}>
                {days}д {hours}ч {minutes}мин
              </Typography>
               {/* Return */}
              <Typography variant='subtitle2' className={classes.dateArrive} color="textSecondary">
                В пути
              </Typography>
              <Typography className={classes.sityArrive}>
                {getIntervalDateReturn.days}д {getIntervalDateReturn.hours}ч {getIntervalDateReturn.minutes}мин
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant='subtitle2' color="textSecondary">
                {getStopsLength(item.segments[0].stops.length)}
              </Typography>
              <Typography className={classes.sityArrive}>
                {arrStops.join(', ')}
              </Typography>
              {/* Return */}
              <Typography variant='subtitle2' className={classes.dateArrive} color="textSecondary">
                {getStopsLength(item.segments[1].stops.length)}
              </Typography>
              <Typography className={classes.sityArrive}>
                {arrStopsReturn.join(', ')}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}