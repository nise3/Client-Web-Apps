import React, {FC} from 'react';
import { styled } from '@mui/material/styles';
import {Avatar, Box, Button, Card, CardContent} from '@mui/material';
import {useIntl} from 'react-intl';
import TagChip from '../../../../@softbd/elements/display/TagChip';
import {makeStyles} from '@mui/styles';
import {CremaTheme} from '../../../../redux/types/AppContextPropsType';

const PREFIX = 'FreelancerCardComponent';

const classes = {
  titleStyle: `${PREFIX}-titleStyle`,
  colorGray: `${PREFIX}-colorGray`
};

const StyledCard = styled(Card)((
  {
    theme: CremaTheme
  }
) => ({
  [`& .${classes.titleStyle}`]: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },

  [`& .${classes.colorGray}`]: {
    color: theme.palette.grey['600'],
  }
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
          <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Box sx={{display: 'flex'}}>
              <Avatar
                src={freelancer?.photo}
                sx={{width: '60px', height: '60px'}}
              />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  marginLeft: 2,
                }}>
                <Box className={classes.titleStyle}>
                  {freelancer?.first_name + freelancer?.last_name}
                </Box>
              </Box>
            </Box>
            <Box>
              <Button variant={'contained'} color={'primary'}>
                {messages['common.contact']}
              </Button>
            </Box>
          </Box>
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
