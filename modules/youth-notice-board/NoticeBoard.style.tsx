import {CremaTheme} from '../../types/AppContextPropsType';
import {makeStyles} from '@mui/styles';

const useStyles = makeStyles((theme: CremaTheme) => ({
  root: {},
  containerBox: {
    padding: 40,
  },
  PaperBox: {
    padding: 20,
  },
  buttongrp: {},
  avatar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBox: {
    position: 'absolute',
    bottom: '-14px',
    right: '14px',
  },
  noticeBoardText: {
    fontWeight: 'bold',
    marginLeft: '12px',
  },
  paperSearch: {
    p: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 250,
  },
  avatarImage: {
    height: '80px',
    width: '80px',
  },
  creativaItText: {
    marginTop: '5px',
    marginBottom: '15px',
    color: '#687882',
  },
}));

export default useStyles;
