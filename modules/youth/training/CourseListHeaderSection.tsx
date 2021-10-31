import React, {useCallback, useRef, useState} from 'react';
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  InputAdornment,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import useStyles from './index.style';
import {Search} from '@mui/icons-material';
import {useIntl} from 'react-intl';
import {
  useFetchInstitutes,
  useFetchProgrammes,
} from '../../../services/instituteManagement/hooks';
import RowStatus from '../../../@softbd/utilities/RowStatus';
import {objectFilter} from '../../../@softbd/utilities/helpers';
import CustomSelectForFilter from './conponents/CustomSelectForFilter';

const SKILL_LEVELS = [
  {id: 1, title: 'Beginner'},
  {id: 2, title: 'Intermediate'},
  {id: 3, title: 'Expert'},
];

const AVAILABILITIES = [
  {id: 1, title: 'Running'},
  {id: 2, title: 'Upcoming'},
  {id: 3, title: 'Completed'},
];

const LANGUAGES = [
  {id: 1, title: 'Bn'},
  {id: 2, title: 'En'},
];

const COURSE_TYPES = [
  {id: 1, title: 'Paid'},
  {id: 2, title: 'Free'},
];

interface CourseListHeaderSection {
  addFilterKey: (filterKey: string, filterValue: number | null) => void;
}

const CourseListHeaderSection = ({addFilterKey}: CourseListHeaderSection) => {
  const classes: any = useStyles();
  const {messages} = useIntl();
  const [instituteFilters] = useState({});
  const {data: institutes} = useFetchInstitutes(instituteFilters);
  const [selectedInstituteId, setSelectedInstituteId] = useState<any>('');
  const [selectedcourseTypeId, setSelectedcourseTypeId] = useState<any>('');
  const searchTextField = useRef<any>();

  const [selectedProgrammeId, setSelectedProgrammeId] = useState<any>('');
  const [selectedLanguageId, setSelectedLanguageId] = useState<any>('');
  const [selectedAvailability, setSelectedAvailability] = useState<any>('');
  const [selectedSkillLevel, setSelectedSkillLevel] = useState<any>('');

  const [programmeFilters, setProgrammeFilters] = useState<any>({
    row_status: RowStatus.ACTIVE,
  });
  const {data: programmes} = useFetchProgrammes(programmeFilters);

  const handleInstituteFilterChange = useCallback(
    (event: SelectChangeEvent<any>) => {
      const instituteId = event.target.value;
      setSelectedInstituteId(instituteId);
      setProgrammeFilters(
        objectFilter({
          row_status: RowStatus.ACTIVE,
          institute_id: instituteId,
        }),
      );
      addFilterKey('institute_id', instituteId);
      if (!instituteId) {
        addFilterKey('program_id', 0);
      }
    },
    [selectedInstituteId],
  );

  const handleProgrammeFilterChange = useCallback(
    (event: SelectChangeEvent<any>) => {
      setSelectedProgrammeId(event.target.value);
      addFilterKey('program_id', event.target.value);
    },
    [selectedProgrammeId],
  );

  const handleLanguageChange = useCallback(
    (event: SelectChangeEvent<any>) => {
      setSelectedLanguageId(event.target.value);
      addFilterKey('language_medium', event.target.value);
    },
    [selectedLanguageId],
  );

  const handleAvailabilityChange = useCallback(
    (event: SelectChangeEvent<any>) => {
      setSelectedAvailability(event.target.value);
      addFilterKey('availability', event.target.value);
    },
    [selectedAvailability],
  );

  const handleCourseTypeChange = useCallback(
    (event: SelectChangeEvent<any>) => {
      setSelectedcourseTypeId(event.target.value);
      addFilterKey('course_type', event.target.value);
    },
    [],
  );

  const handleSkillLevelChange = useCallback(
    (event: SelectChangeEvent<any>) => {
      setSelectedSkillLevel(event.target.value);
      addFilterKey('level', event.target.value);
    },
    [],
  );

  return (
    <Box className={classes.pageRootHeader}>
      <Container maxWidth={'lg'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Box fontSize={'16px'}>{messages['training.search_header']}</Box>
            <Card sx={{padding: '10px', alignItems: 'center'}}>
              <Grid container spacing={3} sx={{alignItems: 'center'}}>
                <Grid item xs={8} sm={9}>
                  <TextField
                    inputRef={searchTextField}
                    variant='outlined'
                    name='searchBox'
                    placeholder={messages['common.searchHere'] as string}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <Search />
                        </InputAdornment>
                      ),
                      className: classes.searchInputBorderHide,
                    }}
                  />
                </Grid>
                <Grid item xs={4} sm={3}>
                  <Button
                    variant='contained'
                    color={'primary'}
                    className={classes.searchButton}
                    onClick={useCallback(() => {
                      addFilterKey(
                        'course_name',
                        searchTextField.current.value,
                      );
                    }, [])}>
                    {messages['common.search']}
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} md={12}>
            <Grid container spacing={3}>
              <Grid item xs={6} sm={4} md={2}>
                <CustomSelectForFilter
                  id={'institute_id'}
                  labelId={'select-institute'}
                  selectedOptionId={selectedInstituteId}
                  defaultLabel={'Select Institute'}
                  onChangeCallback={handleInstituteFilterChange}
                  options={institutes}
                />
              </Grid>

              <Grid item xs={6} sm={4} md={2}>
                <CustomSelectForFilter
                  id={'program_id'}
                  labelId={'select-program'}
                  selectedOptionId={selectedProgrammeId}
                  defaultLabel={'Select Program'}
                  onChangeCallback={handleProgrammeFilterChange}
                  options={selectedInstituteId ? programmes : []}
                />
              </Grid>
              <Grid item xs={6} sm={4} md={2}>
                <CustomSelectForFilter
                  id={'level'}
                  labelId={'select-skill-level'}
                  selectedOptionId={selectedSkillLevel}
                  defaultLabel={'Select Skill Level'}
                  onChangeCallback={handleSkillLevelChange}
                  options={SKILL_LEVELS}
                />
              </Grid>
              <Grid item xs={6} sm={4} md={2}>
                <CustomSelectForFilter
                  id={'course_type'}
                  labelId={'select-course-type'}
                  selectedOptionId={selectedcourseTypeId}
                  defaultLabel={'Select Course Type'}
                  onChangeCallback={handleCourseTypeChange}
                  options={COURSE_TYPES}
                />
              </Grid>
              <Grid item xs={6} sm={4} md={2}>
                <CustomSelectForFilter
                  id={'availability'}
                  labelId={'select-availability'}
                  selectedOptionId={selectedAvailability}
                  defaultLabel={'Select Availability'}
                  onChangeCallback={handleAvailabilityChange}
                  options={AVAILABILITIES}
                />
              </Grid>
              <Grid item xs={6} sm={4} md={2}>
                <CustomSelectForFilter
                  id={'language'}
                  labelId={'select-language-medium'}
                  selectedOptionId={selectedLanguageId}
                  defaultLabel={'Language Medium'}
                  onChangeCallback={handleLanguageChange}
                  options={LANGUAGES}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CourseListHeaderSection;
