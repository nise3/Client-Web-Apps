import {styled} from '@mui/material/styles';
import {Container} from '@mui/material';

export const StyledContainer = styled(Container)(({theme}) => ({
  height: '100vh',
  display: 'flex',
  [theme.breakpoints.only('xs')]: {
    height: 'calc(100vh - 56px)',
  },
  [theme.breakpoints.only('sm')]: {
    height: 'calc(100vh - 75px)',
  },
}));
