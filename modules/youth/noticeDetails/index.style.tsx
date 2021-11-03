import {makeStyles} from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  date: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    color: '#ffff',
    padding: '2px',
    borderRadius: '3px',
    '&:not(:last-child)': {marginRight: '10px'},
  },

  container: {
    marginTop: '50px',
  },
}));

export default useStyles;
