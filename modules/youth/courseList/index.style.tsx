import {makeStyles} from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  trainingCardRoot: {
    maxWidth: 345,
    minWidth: '100%',
    position: 'relative',
  },
  trainingCardImage: {
    height: 140,
  },
  providerLogo: {
    height: 55,
    width: 55,
    border: '1px solid ' + theme.palette.grey['300'],
    position: 'absolute',
    top: 110,
    left: 10,
  },
  courseFee: {
    textTransform: 'uppercase',
    marginTop: 20,
    display: 'flex',
    marginBottom: 5,
  },
  courseFeeStyle: {
    marginLeft: 10,
    color: theme.palette.primary.main,
  },
  tagBox: {
    marginTop: 15,
  },
  courseTitle: {
    fontWeight: 'bold',
    color: '#424242',
    textDecoration: 'none',
  },
}));

export default useStyles;
