import React, {useCallback, useState} from 'react';
import { styled } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import {Button, Card, Divider, Grid, MenuItem, Select} from '@mui/material';
import {makeStyles} from '@mui/styles';
import RecentJobComponent from './components/RecentJobComponet';
import {CremaTheme} from '../../../redux/types/AppContextPropsType';
import {ChevronRight} from '@mui/icons-material';
import clsx from 'clsx';
import {useIntl} from 'react-intl';

const PREFIX = 'RecentJobSection';

const classes = {
  `& .${classes.recentSectionRoot}`: `${PREFIX}-undefined`,
  `& .${classes.featureSectionTitle}`: `${PREFIX}-undefined`,
  `& .${classes.jobItem}`: `${PREFIX}-undefined`,
  `& .${classes.divider}`: `${PREFIX}-undefined`,
  `& .${classes.selectStyle}`: `${PREFIX}-undefined`,
  `& .${classes.seeMoreButton}`: `${PREFIX}-undefined`,
  `& .${classes.selectControl}`: `${PREFIX}-undefined`
};

const StyledStyledCard = styled(StyledCard)((
  {
    theme: {
      theme: CremaTheme
    }
  }
) => ({
  [`& .${classes.undefined}`]: {
    marginTop: 0,
    paddingBottom: 10,
    paddingTop: 20,
  },

  [`& .${classes.undefined}`]: {
    fontSize: 17,
    fontWeight: 'bold',
  },

  [`& .${classes.undefined}`]: {
    marginBottom: 10,
  },

  [`& .${classes.undefined}`]: {
    width: '100%',
    height: 1,
    marginBottom: 5,
  },

  [`& .${classes.undefined}`]: {
    '& .MuiSelect-select': {
      padding: '10px 30px 10px 15px',
    },
  },

  [`& .${classes.undefined}`]: {
    boxShadow: 'none',
    marginTop: 10,
  },

  [`& .${classes.undefined}`]: {
    marginLeft: 20,
    marginBottom: 10,
  }
}));

const PREFIX = 'RecentJobSection';

const classes = {
  recentSectionRoot: `${PREFIX}-recentSectionRoot`,
  featureSectionTitle: `${PREFIX}-featureSectionTitle`,
  jobItem: `${PREFIX}-jobItem`,
  divider: `${PREFIX}-divider`,
  selectStyle: `${PREFIX}-selectStyle`,
  seeMoreButton: `${PREFIX}-seeMoreButton`,
  selectControl: `${PREFIX}-selectControl`
};

const StyledCard = styled(Card)((
  {
    theme: CremaTheme
  }
) => ({
  [`& .${classes.recentSectionRoot}`]: {
    marginTop: 0,
    paddingBottom: 10,
    paddingTop: 20,
  },

  [`& .${classes.featureSectionTitle}`]: {
    fontSize: 17,
    fontWeight: 'bold',
  },

  [`& .${classes.jobItem}`]: {
    marginBottom: 10,
  },

  [`& .${classes.divider}`]: {
    width: '100%',
    height: 1,
    marginBottom: 5,
  },

  [`& .${classes.selectStyle}`]: {
    '& .MuiSelect-select': {
      padding: '10px 30px 10px 15px',
    },
  },

  [`& .${classes.seeMoreButton}`]: {
    boxShadow: 'none',
    marginTop: 10,
  },

  [`& .${classes.selectControl}`]: {
    marginLeft: 20,
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
    marginTop: 0,
    paddingBottom: 10,
    paddingTop: 20,
  },

  [`& .${classes.undefined}`]: {
    fontSize: 17,
    fontWeight: 'bold',
  },

  [`& .${classes.undefined}`]: {
    marginBottom: 10,
  },

  [`& .${classes.undefined}`]: {
    width: '100%',
    height: 1,
    marginBottom: 5,
  },

  [`& .${classes.undefined}`]: {
    '& .MuiSelect-select': {
      padding: '10px 30px 10px 15px',
    },
  },

  [`& .${classes.undefined}`]: {
    boxShadow: 'none',
    marginTop: 10,
  },

  [`& .${classes.undefined}`]: {
    marginLeft: 20,
    marginBottom: 10,
  }
}));

const RecentJobSection = () => {
  const classes = useStyle();
  const {messages} = useIntl();
  const [selectedValue, setSelectedValue] = useState(1);

  const items = [
    {
      imageUrl: '/images/skill-matching-job1.jpg',
      jobTitle: 'Sales Executive',
      jobProviderName: 'Ajker Deal',
      location: 'Dhaka, Bangladesh',
    },
    {
      imageUrl: '/images/skill-matching-job1.jpg',
      jobTitle: 'Senior UX Designer',
      jobProviderName: 'Pathao',
      location: 'Dhaka, Bangladesh',
    },
    {
      imageUrl: '/images/skill-matching-job1.jpg',
      jobTitle: 'Data Engineer',
      jobProviderName: 'Evaly',
      location: 'Dhaka, Bangladesh',
    },
  ];

  const onSelectChange = useCallback((value: any) => {
    setSelectedValue(value);
  }, []);

  return (
    <StyledStyledCard>
      <Grid container className={classes.recentSectionRoot}>
        <Grid item xs={12} sm={12} md={12}>
          <Select
            id='recentJobs'
            autoWidth
            defaultValue={selectedValue}
            variant='outlined'
            className={clsx(classes.selectStyle, classes.selectControl)}
            onChange={onSelectChange}>
            <MenuItem value={1}>{messages['common.recent_jobs']}</MenuItem>
            <MenuItem value={2}>{messages['common.popular_jobs']}</MenuItem>
            <MenuItem value={3}>{messages['common.nearby_jobs']}</MenuItem>
            <MenuItem value={4}>
              {messages['common.skill_matching_jobs']}
            </MenuItem>
          </Select>
        </Grid>
        {items.map((job: any, index: number) => {
          return (
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              key={index}
              className={classes.jobItem}>
              {index != 0 && <Divider className={classes.divider} />}
              <RecentJobComponent data={job} />
            </Grid>
          );
        })}
        <Grid item xs={12} sm={12} md={12} style={{paddingLeft: 15}}>
          <Button
            variant={'text'}
            color={'primary'}
            size={'medium'}
            className={classes.seeMoreButton}>
            {messages['youth_feed.see_more_jobs']}
            <ChevronRight color={'primary'} />
          </Button>
        </Grid>
      </Grid>
    </StyledStyledCard>
  );
};

export default RecentJobSection;
