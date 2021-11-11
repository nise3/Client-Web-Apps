import React, {Fragment} from 'react';
import {styled} from '@mui/material/styles';
import {Box, Grid} from '@mui/material';

const PREFIX = 'InfoCard';

const classes = {
  logo: `${PREFIX}-logo`,
};

const StyledBox = styled(Box)(({theme}) => ({
  marginTop: '-18px',
  backgroundColor: '#fff',
  padding: '30px 5px 5px 5px',
  boxShadow: '1px 1px 10px #dfdfdf',

  [`& .${classes.logo}`]: {
    height: '20px',
    width: '20px',
  },
}));

type Props = {
  color?: string;
  infos?: Array<any>;
};
const InfoCard = ({color, infos}: Props) => {
  return (
    <StyledBox>
      <Grid container>
        {infos &&
          infos.map((infoItem, key: number) => {
            return (
              <Fragment key={infoItem.id.toString()}>
                <Grid item xs={10}>
                  <Grid item container>
                    <Grid item xs={2}>
                      <img className={classes.logo} src='/images/logo1.png' />
                    </Grid>
                    <Grid item xs={10}>
                      <Box style={{fontSize: '18px'}}> {infoItem.name}</Box>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item md={2} xs={2}>
                  <Box
                    sx={{color: color, fontSize: '25px', fontWeight: 'bold'}}>
                    {infoItem.count}
                  </Box>
                </Grid>
              </Fragment>
            );
          })}
      </Grid>
    </StyledBox>
  );
};
export default InfoCard;
