import React, {FC} from 'react';
import {styled} from '@mui/material/styles';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import {useIntl} from 'react-intl';
import TagChip from '../../../../@softbd/elements/display/TagChip';

const PREFIX = 'FreelancerCardComponent';

const classes = {
  titleStyle: `${PREFIX}-titleStyle`,
  colorGray: `${PREFIX}-colorGray`,
};

const StyledCard = styled(Card)(({theme}) => ({
  [`& .${classes.titleStyle}`]: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },

  [`& .${classes.colorGray}`]: {
    color: theme.palette.grey['600'],
  },
}));

interface FreelancerCardComponentProps {
  freelancer: any;
}

const FreelancerCardComponent: FC<FreelancerCardComponentProps> = ({
  freelancer,
}) => {
  const {messages} = useIntl();

  return (
    <StyledCard>
      {freelancer && (
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={7} md={7}>
              <Box sx={{display: 'flex'}}>
                <Avatar
                  src={freelancer?.photo}
                  sx={{width: '60px', height: '60px'}}
                />
                <Box sx={{marginLeft: 2}}>
                  <Typography className={classes.titleStyle}>
                    {freelancer?.first_name + ' ' + freelancer?.last_name}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={5} md={5}>
              <Button
                variant={'outlined'}
                color={'primary'}
                sx={{marginRight: '5px'}}>
                {messages['common.contact']}
              </Button>
              <Button variant={'contained'} color={'primary'}>
                {messages['common.profile']}
              </Button>
            </Grid>
          </Grid>
          <Box sx={{margin: '15px 0px'}}>
            {freelancer?.bio || 'No bio added'}
          </Box>
          <Box>
            {(freelancer?.skills || []).map((skill: any, index: any) => {
              return <TagChip label={skill.title} key={index} />;
            })}
          </Box>
        </CardContent>
      )}
    </StyledCard>
  );
};

export default FreelancerCardComponent;
