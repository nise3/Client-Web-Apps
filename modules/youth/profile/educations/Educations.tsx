import React, {FC} from 'react';
import {Avatar, Box, Grid, Typography} from '@mui/material';
import {
  AccessTime,
  BorderColor,
  CheckCircle,
  Grade,
  Verified,
} from '@mui/icons-material';
import ResultType from '../utilities/ResultType';
import TextPrimary from '../component/TextPrimary';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CustomParabolaButton from '../component/CustomParabolaButton';
import CircularDeleteButton from '../component/CircularDeleteButton';
import {YouthEducation} from '../../../../services/youthManagement/typing';
import {useIntl} from 'react-intl';
import HorizontalLine from '../component/HorizontalLine';
import VerticalLine from '../component/VerticalLine';

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
                  <Typography variant={'subtitle2'}>
                    {education.examination_title}
                  </Typography>
                  <Typography variant={'caption'}>
                    {education.institute_name}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Grid container sx={{marginTop: '10px'}}>
                  <Grid item sx={{display: 'flex'}}>
                    <Grade color={'primary'} sx={{marginRight: '5px'}} />
                    {education.result_type == ResultType.GRADE_POINT ? (
                      <TextPrimary
                        text={
                          education.received_cgpa_gpa +
                          ' out of ' +
                          education.cgpa_gpa_max_value
                        }
                      />
                    ) : (
                      <TextPrimary
                        text={
                          education.division_type_result +
                          ' ' +
                          messages['common.result_type_division']
                        }
                      />
                    )}
                  </Grid>
                  <VerticalLine />
                  <Grid item sx={{display: 'flex'}}>
                    <CheckCircle color={'primary'} sx={{marginRight: '5px'}} />
                    <TextPrimary text={education.edu_group_title} />
                  </Grid>
                  <VerticalLine />
                  <Grid item sx={{display: 'flex'}}>
                    <LocationOnIcon
                      color={'primary'}
                      sx={{marginRight: '5px'}}
                    />
                    <TextPrimary text={education.board_title} />
                  </Grid>
                  <VerticalLine />
                  <Grid item sx={{display: 'flex'}}>
                    <AccessTime color={'primary'} sx={{marginRight: '5px'}} />
                    <TextPrimary text={education.passing_year} />
                  </Grid>
                </Grid>
              </Box>
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
