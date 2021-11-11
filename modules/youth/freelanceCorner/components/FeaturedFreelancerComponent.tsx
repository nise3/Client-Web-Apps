import React, {FC} from 'react';
import { styled } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import {useIntl} from 'react-intl';
import {Avatar, Box, Card, Chip, Grid} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {CremaTheme} from '../../../../redux/types/AppContextPropsType';
import {Fonts} from '../../../../shared/constants/AppEnums';

const PREFIX = 'FeaturedFreelancerComponent';

const classes = {
  `& .${classes.featureFreelancerRoot}`: `${PREFIX}-undefined`,
  `& .${classes.freelanceUserImage}`: `${PREFIX}-undefined`,
  `& .${classes.tagStyle}`: `${PREFIX}-undefined`,
  `& .${classes.freelancerNameStyle}`: `${PREFIX}-undefined`,
  `& .${classes.designationStyle}`: `${PREFIX}-undefined`
};

const StyledRoot = styled(Root)((
  {
    theme: {
      theme: CremaTheme
    }
  }
) => ({
  [`& .${classes.undefined}`]: {
    background: '#fff',
    borderRadius: 4,
    position: 'relative',
    padding: '10px 5px',
  },

  [`& .${classes.undefined}`]: {
    // marginLeft: 10,
    border: '1px solid ' + theme.palette.grey['300'],
  },

  [`& .${classes.undefined}`]: {
    color: '#fca67e',
    position: 'absolute',
    top: 10,
    right: 10,
    borderRadius: 4,
    height: 25,
    background: '#fff2ed',
    borderColor: '#fdab85',
    '& .MuiChip-label': {
      padding: '0px 5px',
    },
  },

  [`& .${classes.undefined}`]: {
    color: theme.palette.primary.main,
    fontWeight: Fonts.BOLD,
  },

  [`& .${classes.undefined}`]: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: theme.palette.primary.main,
    fontWeight: Fonts.BOLD,
  }
}));

const PREFIX = 'FeaturedFreelancerComponent';

const classes = {
  featureFreelancerRoot: `${PREFIX}-featureFreelancerRoot`,
  freelanceUserImage: `${PREFIX}-freelanceUserImage`,
  tagStyle: `${PREFIX}-tagStyle`,
  freelancerNameStyle: `${PREFIX}-freelancerNameStyle`,
  designationStyle: `${PREFIX}-designationStyle`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
  {
    theme: CremaTheme
  }
) => ({
  [`& .${classes.featureFreelancerRoot}`]: {
    background: '#fff',
    borderRadius: 4,
    position: 'relative',
    padding: '10px 5px',
  },

  [`& .${classes.freelanceUserImage}`]: {
    // marginLeft: 10,
    border: '1px solid ' + theme.palette.grey['300'],
  },

  [`& .${classes.tagStyle}`]: {
    color: '#fca67e',
    position: 'absolute',
    top: 10,
    right: 10,
    borderRadius: 4,
    height: 25,
    background: '#fff2ed',
    borderColor: '#fdab85',
    '& .MuiChip-label': {
      padding: '0px 5px',
    },
  },

  [`& .${classes.freelancerNameStyle}`]: {
    color: theme.palette.primary.main,
    fontWeight: Fonts.BOLD,
  },

  [`& .${classes.designationStyle}`]: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: theme.palette.primary.main,
    fontWeight: Fonts.BOLD,
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
    background: '#fff',
    borderRadius: 4,
    position: 'relative',
    padding: '10px 5px',
  },

  [`& .${classes.undefined}`]: {
    // marginLeft: 10,
    border: '1px solid ' + theme.palette.grey['300'],
  },

  [`& .${classes.undefined}`]: {
    color: '#fca67e',
    position: 'absolute',
    top: 10,
    right: 10,
    borderRadius: 4,
    height: 25,
    background: '#fff2ed',
    borderColor: '#fdab85',
    '& .MuiChip-label': {
      padding: '0px 5px',
    },
  },

  [`& .${classes.undefined}`]: {
    color: theme.palette.primary.main,
    fontWeight: Fonts.BOLD,
  },

  [`& .${classes.undefined}`]: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: theme.palette.primary.main,
    fontWeight: Fonts.BOLD,
  }
}));

interface FeaturedFreelancerComponentProps {
  freelanceUser: {
    image: string;
    name: string;
    designation: string;
  };
}

const FeaturedFreelancerComponent: FC<FeaturedFreelancerComponentProps> = ({
  freelanceUser,
}) => {
  const classes = useStyle();
  const {messages} = useIntl();

  return (
    <StyledRoot>
        <Card className={classes.featureFreelancerRoot}>
          <Grid container spacing={2} alignItems={'center'}>
            <Grid item xs={2}>
              <Avatar
                className={classes.freelanceUserImage}
                alt='user image'
                src={freelanceUser.image}
              />
            </Grid>
            <Grid item xs={7}>
              <Box className={classes.freelancerNameStyle}>
                {freelanceUser.name}
              </Box>
              <Box className={classes.designationStyle}>
                {freelanceUser.designation}
              </Box>
            </Grid>
            <Chip
              variant='outlined'
              label={messages['common.featured']}
              className={classes.tagStyle}
            />
          </Grid>
        </Card>
      </StyledRoot>
  );
};

export default FeaturedFreelancerComponent;
