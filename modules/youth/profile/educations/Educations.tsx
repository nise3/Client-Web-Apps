import React, {FC} from 'react';
import {Avatar, Box, Grid, Typography} from '@mui/material';
import {
  AccessTime,
  BorderColor,
  CheckCircle,
  Verified,
} from '@mui/icons-material';
import TextPrimary from '../component/TextPrimary';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CustomParabolaButton from '../component/CustomParabolaButton';
import CircularDeleteButton from '../component/CircularDeleteButton';
import {YouthEducation} from '../../../../services/youthManagement/typing';
import {useIntl} from 'react-intl';
import HorizontalLine from '../component/HorizontalLine';
import VerticalLine from '../component/VerticalLine';
import {ResultCodeAppeared, ResultCodeGrade} from '../utilities/EducationEnums';
import {getIntlNumber} from '../../../../@softbd/utilities/helpers';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import {styled} from '@mui/material/styles';
import {Fonts, ThemeMode} from '../../../../shared/constants/AppEnums';
import {Body2, S1} from '../../../../@softbd/elements/common';
import {useCustomStyle} from '../../../../@softbd/hooks/useCustomStyle';

const PREFIX = 'Educations';
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

interface EducationsProps {
  educations: Array<YouthEducation> | any[];
  onEditClick: (id: number) => void;
  onDeleteClick: (id: number) => void;
}

const Educations: FC<EducationsProps> = ({
  educations,
  onEditClick,
  onDeleteClick,
}) => {
  const {messages, formatNumber} = useIntl();
  const result = useCustomStyle();

  const getResult = (education: YouthEducation) => {
    if (education.result?.code == ResultCodeGrade) {
      return (
        <IntlMessages
          id='education.cgpa_out_of_scale'
          values={{
            scale: getIntlNumber(formatNumber, education.cgpa_scale),
            cgpa: getIntlNumber(formatNumber, education.cgpa),
          }}
        />
      );
    } else {
      return (
        education.result?.title +
        ', ' +
        (education.marks_in_percentage
          ? messages['education.marks'] +
            ': ' +
            getIntlNumber(formatNumber, education.marks_in_percentage)
          : '')
      );
    }
  };

  return (
    <React.Fragment>
      {educations.map((education: YouthEducation) => (
        <React.Fragment key={education.id}>
          <HorizontalLine />
          <StyledGrid container spacing={{xs: 2, md: 3}}>
            <Grid item xs={12} sm={8} md={8}>
              <Box sx={{display: 'flex'}}>
                <Avatar>
                  <Verified />
                </Avatar>
                <Box sx={{marginLeft: '15px'}}>
                  <S1 sx={{...result.subtitle2}} className={classes.textStyle}>
                    {education?.education_level_title}
                    {' ('}
                    {education?.exam_degree_id
                      ? education?.exam_degree_title
                      : education?.exam_degree_name}
                    {')'}
                  </S1>
                  {education?.major_or_concentration && (
                    <Typography variant={'subtitle2'}>
                      {education.major_or_concentration}
                    </Typography>
                  )}
                  <Body2>{education?.institute_name}</Body2>
                  <Typography variant={'subtitle2'}>
                    {messages['education.result']}: {getResult(education)}
                  </Typography>
                  {!education?.edu_board_id &&
                    !education?.edu_group_id &&
                    education?.year_of_passing && (
                      <Typography variant={'subtitle2'}>
                        {messages['education.passing_year']}:{' '}
                        <b>
                          {getIntlNumber(
                            formatNumber,
                            education.year_of_passing,
                          )}
                        </b>
                      </Typography>
                    )}
                  {education.result?.code == ResultCodeAppeared && (
                    <Typography variant={'subtitle2'}>
                      {messages['education.expected_passing_year']}:{' '}
                      <b>
                        {getIntlNumber(
                          formatNumber,
                          education.expected_year_of_passing,
                        )}
                      </b>
                    </Typography>
                  )}
                  {education.duration && (
                    <Typography variant={'subtitle2'}>
                      {messages['education.duration']}:{' '}
                      <b>{getIntlNumber(formatNumber, education.duration)}</b>
                    </Typography>
                  )}
                </Box>
              </Box>
              <Box>
                <Grid container sx={{marginTop: '10px'}}>
                  {(education?.edu_board_id || education?.edu_group_id) &&
                    education?.year_of_passing && (
                      <React.Fragment>
                        <Grid item sx={{display: 'flex'}}>
                          <AccessTime
                            color={'primary'}
                            sx={{marginRight: '5px'}}
                          />
                          <TextPrimary
                            text={getIntlNumber(
                              formatNumber,
                              education.year_of_passing,
                            )}
                          />
                        </Grid>
                      </React.Fragment>
                    )}
                  {education?.edu_board_id && (
                    <React.Fragment>
                      {education?.year_of_passing && <VerticalLine />}
                      <Grid item sx={{display: 'flex'}}>
                        <LocationOnIcon
                          color={'primary'}
                          sx={{marginRight: '5px'}}
                        />
                        <TextPrimary text={education.board_title} />
                      </Grid>
                    </React.Fragment>
                  )}
                  {education?.edu_group_id && (
                    <React.Fragment>
                      {!!(
                        education?.year_of_passing || education?.edu_board_id
                      ) && <VerticalLine />}
                      <Grid item sx={{display: 'flex'}}>
                        <CheckCircle
                          color={'primary'}
                          sx={{marginRight: '5px'}}
                        />
                        <TextPrimary text={education?.edu_group_title} />
                      </Grid>
                    </React.Fragment>
                  )}
                </Grid>
              </Box>

              {education.achievements && (
                <Box>
                  <Typography>{messages['common.achievements']}</Typography>
                  <Typography>{education.achievements}</Typography>
                </Box>
              )}
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <CustomParabolaButton
                  buttonVariant={'outlined'}
                  title={messages['common.edit_btn'] as string}
                  icon={<BorderColor />}
                  onClick={() => {
                    onEditClick(education.id);
                  }}
                />
                <CircularDeleteButton
                  deleteAction={() => {
                    onDeleteClick(education.id);
                  }}
                  deleteTitle={'delete'}
                />
              </Box>
            </Grid>
          </StyledGrid>
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

export default Educations;
