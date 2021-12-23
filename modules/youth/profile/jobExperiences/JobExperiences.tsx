import {useIntl} from 'react-intl';
import CustomParabolaButton from '../component/CustomParabolaButton';
import React, {useContext} from 'react';
import {AccessTime, BorderColor, Verified} from '@mui/icons-material';
import {Avatar, Box, Grid, Typography, useTheme} from '@mui/material';
import CircularDeleteButton from '../component/CircularDeleteButton';
import {YouthJobExperience} from '../../../../services/youthManagement/typing';
import TextPrimary from '../component/TextPrimary';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HorizontalLine from '../component/HorizontalLine';
import VerticalLine from '../component/VerticalLine';
import {getIntlDateFromString} from '../../../../@softbd/utilities/helpers';
import {styled} from '@mui/material/styles';
import {Fonts, ThemeMode} from '../../../../shared/constants/AppEnums';
import {H3} from '../../../../@softbd/elements/common';
import AppContextPropsType from '../../../../redux/types/AppContextPropsType';
import AppContext from '../../../../@crema/utility/AppContext';
import AppLocale from '../../../../shared/localization';
import typography from '../../../../@softbd/layouts/themes/default/typography';

const PREFIX = 'JobExperience';
const classes = {
  textStyle: `${PREFIX}-textStyle`,
};

const StyledGrid = styled(Grid)(({theme}) => ({
  [`& .${classes.textStyle}`]: {
    color:
      theme.palette.mode === ThemeMode.DARK
        ? theme.palette.common.white
        : theme.palette.common.black,
    fontWeight: Fonts.BOLD,
  },
}));

type JobExperienceProp = {
  jobExperiences: Array<YouthJobExperience>;
  onOpenAddEditForm: (itemId: number) => void;
  onDeleteJobExperience: (itemId: number) => void;
};

const JobExperiences = ({
  jobExperiences,
  onOpenAddEditForm,
  onDeleteJobExperience,
}: JobExperienceProp) => {
  const {messages, formatDate} = useIntl();
  const theme = useTheme();
  const {locale} = useContext<AppContextPropsType>(AppContext);
  const currentAppLocale = AppLocale[locale.locale];
  const result = typography(theme, currentAppLocale.locale);

  return (
    <React.Fragment>
      {jobExperiences.map((jobExperience: YouthJobExperience) => (
        <React.Fragment key={jobExperience.id}>
          <HorizontalLine />
          <StyledGrid container spacing={2}>
            <Grid item xs={12} sm={8} md={8}>
              <Box sx={{display: 'flex'}}>
                <Avatar>
                  <Verified />
                </Avatar>
                <Box sx={{marginLeft: '15px'}}>
                  <H3 sx={{...result.subtitle2}} className={classes.textStyle}>
                    {jobExperience?.company_name}
                  </H3>
                  <Typography variant={'caption'}>
                    {jobExperience?.position}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Grid container sx={{marginTop: '10px'}}>
                  <Grid item sx={{display: 'flex'}}>
                    <AccessTime color={'primary'} sx={{marginRight: '5px'}} />
                    <TextPrimary
                      text={
                        getIntlDateFromString(
                          formatDate,
                          jobExperience?.start_date,
                        ) +
                        ' - ' +
                        (jobExperience.is_currently_working == 1
                          ? messages['common.present']
                          : jobExperience?.end_date
                          ? getIntlDateFromString(
                              formatDate,
                              jobExperience?.end_date,
                            )
                          : '')
                      }
                    />
                  </Grid>
                  <VerticalLine />
                  <Grid item sx={{display: 'flex'}}>
                    <LocationOnIcon
                      color={'primary'}
                      sx={{marginRight: '5px'}}
                    />
                    <TextPrimary text={jobExperience?.location} />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <CustomParabolaButton
                  buttonVariant={'outlined'}
                  title={messages['common.edit_btn'] as string}
                  icon={<BorderColor />}
                  onClick={() => {
                    onOpenAddEditForm(jobExperience.id);
                  }}
                />
                <CircularDeleteButton
                  deleteAction={() => {
                    onDeleteJobExperience(jobExperience.id);
                  }}
                  deleteTitle={'delete'}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography>{jobExperience?.job_responsibilities}</Typography>
            </Grid>
          </StyledGrid>
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

export default JobExperiences;
