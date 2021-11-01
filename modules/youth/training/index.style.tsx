import {makeStyles} from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  trainingViewRoot: {
    margin: '0px auto 20px',
  },
  mainContent: {
    marginTop: 20,
  },
  pageRootHeader: {
    background: theme.palette.primary.main,
    color: '#fff',
    paddingTop: 20,
    paddingBottom: 20,
  },
  searchBox: {
    padding: '10px',
    alignItems: 'center',
    marginTop: 10,
  },
  searchButton: {
    color: '#fff',
    padding: '16px 14px',
    width: '100%',
    height: '100%',
  },

  thinSearchButton: {
    color: '#fff',
    padding: '11px 0',
    width: '97%',
    height: '100%',
  },

  searchInputBorderHide: {
    padding: 0,
    '& fieldset': {
      border: 'none',
    },
    '& input': {
      display: 'flex',
      alignItems: 'center',
      // padding: '14px 0px',
    },
  },
  selectStyle: {
    background: '#fff',
    '& .MuiSelect-select': {
      padding: '10px 30px 10px 15px',
    },
  },
  sectionTitle: {
    fontWeight: 'bold',
  },
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
  tagBox: {
    marginTop: 15,
  },

  addressTextStyle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 10,
  },
}));

export default useStyles;
