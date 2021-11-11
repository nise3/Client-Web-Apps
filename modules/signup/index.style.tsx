import {styled} from '@mui/material/styles';
import {Container} from '@mui/material';

const PREFIX = 'YouthSignupPage';

export const classes = {
  paperBox: `${PREFIX}-paperBox`,
  iconBoxYouth: `${PREFIX}-iconBoxYouth`,
  iconBoxTc: `${PREFIX}-iconBoxTc`,
  iconBoxIndustry: `${PREFIX}-iconBoxIndustry`,
  icon: `${PREFIX}-icon`,
  text: `${PREFIX}-text`,
  signInStyle: `${PREFIX}-signInStyle`,
};

export const StyledContainer = styled(Container)(({theme}) => ({
  [`& .${classes.paperBox}`]: {
    margin: 'auto',
    padding: '20px',
  },

  [`& .${classes.iconBoxYouth}`]: {
    background: '#0069bc',
  },

  [`& .${classes.iconBoxTc}`]: {
    background: '#661686',
  },

  [`& .${classes.iconBoxIndustry}`]: {
    background: '#e67f22',
  },

  [`& .${classes.icon}`]: {
    display: 'flex',
    flexDirection: 'column',
    padding: '35px',
    alignItems: 'center',
    borderRadius: '10px',
    cursor: 'pointer',
    height: '140px',
    width: '140px',
    [theme.breakpoints.down('sm')]: {
      padding: '20px',
      margin: 'auto',
      height: '100px',
      width: '100px',
    },
  },

  [`& .${classes.text}`]: {
    color: theme.palette.grey['300'],
    whiteSpace: 'nowrap',
    marginTop: '10px',
  },

  [`& .${classes.signInStyle}`]: {
    color: theme.palette.primary.main + ' !important',
    textDecoration: 'underline !important',
  },
}));
