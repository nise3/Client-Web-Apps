import {makeStyles} from '@material-ui/core';

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
    padding: '10px 5px 5px',
    alignItems: 'center',
    marginTop: 10,
  },
  searchButton: {
    color: '#fff',
    padding: '8px 14px',
    width: '95%',
  },
  searchInputBorderHide: {
    '& fieldset': {
      border: 'none',
    },
    '& input': {
      padding: '14px 0px',
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
    '& .tag': {
      borderRadius: 4,
      margin: '0px 10px 10px 0px',
      color: theme.palette.grey['600'],
    },
  },

  addressTextStyle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 10,
  },
}));

export default useStyles;
