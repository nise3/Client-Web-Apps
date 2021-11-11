import React, {FC} from 'react';
import { styled } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import {useIntl} from 'react-intl';
import {Avatar, Box, Button} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {CremaTheme} from '../../../../redux/types/AppContextPropsType';

const PREFIX = 'NearbyFreelancerComponent';

const classes = {
  `& .${classes.userImage}`: `${PREFIX}-undefined`,
  `& .${classes.designation}`: `${PREFIX}-undefined`
};

const StyledStyledBox = styled(StyledBox)((
  {
    theme: {
      theme: CremaTheme
    }
  }
) => ({
  [`& .${classes.undefined}`]: {
    height: 45,
    width: 45,
    border: '1px solid ' + theme.palette.grey['300'],
  },

  [`& .${classes.undefined}`]: {
    color: theme.palette.grey['600'],
    marginBottom: 10,
  }
}));

const PREFIX = 'NearbyFreelancerComponent';

const classes = {
  userImage: `${PREFIX}-userImage`,
  designation: `${PREFIX}-designation`
};

const StyledBox = styled(Box)((
  {
    theme: CremaTheme
  }
) => ({
  [`& .${classes.userImage}`]: {
    height: 45,
    width: 45,
    border: '1px solid ' + theme.palette.grey['300'],
  },

  [`& .${classes.designation}`]: {
    color: theme.palette.grey['600'],
    marginBottom: 10,
  }
}));

const useStyle = makeStyles((
  {
    theme: {
      theme: CremaTheme
    }
  }
) => ({
  [`& .${classes.undefined}`]: {
    height: 45,
    width: 45,
    border: '1px solid ' + theme.palette.grey['300'],
  },

  [`& .${classes.undefined}`]: {
    color: theme.palette.grey['600'],
    marginBottom: 10,
  }
}));

interface NearbyFreelancerComponentProps {
  freelanceUser: any;
}

const NearbyFreelancerComponent: FC<NearbyFreelancerComponentProps> = ({
  freelanceUser,
}) => {
  const classes = useStyle();
  const {messages} = useIntl();

  return (
    <StyledStyledBox display={'flex'}>
      <Box>
        <Avatar
          alt='youth image'
          src={freelanceUser?.photo}
          className={classes.userImage}
        />
      </Box>
      <Box marginLeft={'10px'}>
        <Box fontWeight={'bold'}>
          {freelanceUser?.first_name + ' ' + freelanceUser?.last_name}
        </Box>
        <Box className={classes.designation}>{freelanceUser?.youth_bio}</Box>
        <Box>
          <Button variant='contained' color='primary' size={'small'}>
            {messages['common.contact']}
          </Button>
          <Button variant='contained' size={'small'} style={{marginLeft: 10}}>
            {messages['common.details']}
          </Button>
        </Box>
      </Box>
    </StyledStyledBox>
  );
};

export default NearbyFreelancerComponent;
