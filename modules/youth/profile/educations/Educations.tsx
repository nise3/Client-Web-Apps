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
import {ResultCodeGrade} from '../utilities/EducationEnums';

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
  const {messages} = useIntl();

  const getResult = (education: YouthEducation) => {
    if (education.result?.code == ResultCodeGrade) {
      return education.cgpa + ' out of ' + education.cgpa_scale;
    } else {
      return (
        education.result?.title +
        ' ' +
        (education.marks_in_percentage
          ? messages['education.marks'] + ': ' + education.marks_in_percentage
          : '')
      );
    }
  };

  return (
    <React.Fragment>
      {educations.map((education: YouthEducation) => (
        <React.Fragment key={education.id}>
          <HorizontalLine />
          <Grid container spacing={{xs: 2, md: 3}}>
            <Grid item xs={12} sm={8} md={9}>
              <Box sx={{display: 'flex'}}>
                <Avatar>
                  <Verified />
                </Avatar>
                <Box sx={{marginLeft: '15px'}}>
                  <Typography variant={'subtitle2'} fontWeight={'bold'}>
                    {education?.education_level_title}
                    {' ('}
                    {education?.exam_degree_id
                      ? education?.exam_degree_title
                      : education?.exam_degree_name}
                    {')'}
                  </Typography>
                  {education?.major_or_concentration && (
                    <Typography variant={'subtitle2'}>
                      {education.major_or_concentration}
                    </Typography>
                  )}
                  <Typography variant={'caption'}>
                    {education?.institute_name}
                  </Typography>
                  <Typography variant={'subtitle2'}>
                    {messages['education.result']}:{' '}
                    <b>{getResult(education)}</b>
                  </Typography>
                  {education.duration && (
                    <Typography variant={'subtitle2'}>
                      {messages['education.duration']}: {education.duration}
                    </Typography>
                  )}
                </Box>
              </Box>
              <Box>
                <Grid container sx={{marginTop: '10px'}}>
                  {education?.edu_group_id && (
                    <React.Fragment>
                      <Grid item sx={{display: 'flex'}}>
                        <CheckCircle
                          color={'primary'}
                          sx={{marginRight: '5px'}}
                        />
                        <TextPrimary text={education?.edu_group_title} />
                      </Grid>
                    </React.Fragment>
                  )}
                  {education?.edu_board_id && (
                    <React.Fragment>
                      {education?.edu_group_id && <VerticalLine />}

                      <Grid item sx={{display: 'flex'}}>
                        <LocationOnIcon
                          color={'primary'}
                          sx={{marginRight: '5px'}}
                        />
                        <TextPrimary text={education.board_title} />
                      </Grid>
                    </React.Fragment>
                  )}
                  {(education?.edu_board_id || education?.edu_group_id) && (
                    <VerticalLine />
                  )}
                  <Grid item sx={{display: 'flex'}}>
                    <AccessTime color={'primary'} sx={{marginRight: '5px'}} />
                    <TextPrimary
                      text={
                        education.year_of_passing
                          ? education?.year_of_passing
                          : education.expected_year_of_passing
                      }
                    />
                  </Grid>
                </Grid>
              </Box>

              {education.achievements && (
                <Box>
                  <Typography>{messages['common.achievements']}</Typography>
                  <Typography>{education.achievements}</Typography>
                </Box>
              )}
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Box sx={{display: 'flex'}}>
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
          </Grid>
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

export default Educations;
