import {styled} from '@mui/material/styles';
import {Container} from '@mui/material';

const PREFIX = 'OrganizationRegistration';

export const classes = {
  PaperBox: `${PREFIX}-PaperBox`,
  signInStyle: `${PREFIX}-signInStyle`,
};

export const StyledContainer = styled(Container)(({theme}) => ({
  display: 'flex',
  marginTop: '50px',
  marginBottom: '50px',
  [theme.breakpoints.only('xs')]: {
    height: 'calc(100vh - 56px)',
  },
  [theme.breakpoints.only('sm')]: {
    height: 'calc(100vh - 75px)',
  },

  [`& .${classes.PaperBox}`]: {
    padding: 40,
    margin: '70px auto',
  },

  [`& .${classes.signInStyle}`]: {
    color: theme.palette.primary.main + ' !important',
  },
}));
