import React, {Fragment} from 'react';
import {styled} from '@mui/material/styles';
import {Box, Grid} from '@mui/material';
import {H6} from '../../@softbd/elements/common';

const PREFIX = 'InfoCard';

const classes = {
  logo: `${PREFIX}-logo`,
  label: `${PREFIX}-label`,
};

const StyledBox = styled(Box)(({theme}) => ({
  marginTop: '-18px',
  backgroundColor: '#fff',
  padding: '30px 5px 5px 5px',
  boxShadow: '1px 1px 10px #dfdfdf',
  position: 'relative',

  [`& .${classes.logo}`]: {
    height: '20px',
    width: '20px',
  },

  [`& .${classes.label}`]: {
    width: 'auto',
    height: '20px',
    fontSize: '0.75rem',
    display: 'block',
    position: 'absolute',
    textAlign: 'left',
    color: theme.palette.grey[500],
    right: 10,
    left: 'calc(83.333333% - 5px)',
    top: 4,
  },
}));

type Props = {
  color?: string;
  infos?: Array<any>;
  label?: string;
};
const InfoCard = ({color, infos, label}: Props) => {
  return (
    <StyledBox>
      <H6 className={classes.label}>{label}</H6>
      <Grid container>
        {infos &&
          infos.map((infoItem, key: number) => {
            return (
              <Fragment key={infoItem.id.toString()}>
                <Grid item xs={10}>
                  <Grid item container>
                    <Grid item xs={2}>
                      <img
                        alt='logo'
                        className={classes.logo}
                        src='/images/logo1.png'
                      />
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
