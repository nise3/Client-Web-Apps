import {styled} from '@mui/material/styles';
import {Grid} from '@mui/material';

const PREFIX = 'ExpatriateWorkerMonitoring';

const classes = {
  buttons: `${PREFIX}-buttons`,
};

const StyledGrid = styled(Grid)(({theme}) => {
  return {
    [`& .${classes.buttons}`]: {
      width: '100%',
    },
  };
});

const ExpatriateWorkerMonitoring = () => {
  return (
    <StyledGrid sx={{maxWidth: '100%'}}>
      <h2 style={{textAlign: 'center'}}>Requirements pending</h2>
    </StyledGrid>
  );
};

export default ExpatriateWorkerMonitoring;
