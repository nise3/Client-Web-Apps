import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  pageRootHeader: {
    background: '#776bff',
    color: '#fff',
    paddingTop: 20,
    paddingBottom: 20,
  },
  searchBox: {
    padding: '10px 5px 5px',
    alignItems: 'center',
    marginTop: 15,
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
    '& .MuiSelect-select': {
      padding: '10px 30px 10px 15px',
    },
  },
}));

export default useStyles;
