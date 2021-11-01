import React, {useCallback, useMemo, useRef, useState} from 'react';
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

interface CourseListHeaderSection {
  addFilterKey: (filterKey: string, filterValue: number | null) => void;
}

const CourseListHeaderSection = ({addFilterKey}: CourseListHeaderSection) => {
  const classes: any = useStyles();
  const {messages} = useIntl();

  const SKILL_LEVELS = useMemo(
    () => [
      {id: 1, title: messages['common.beginner']},
      {id: 2, title: messages['common.intermediate']},
      {id: 3, title: messages['common.expert']},
    ],
    [messages],
  );

  const AVAILABILITIES = useMemo(
    () => [
      {id: 1, title: messages['common.running']},
      {id: 2, title: messages['common.upcoming']},
      {id: 3, title: messages['common.completed']},
    ],
    [messages],
  );

  const LANGUAGES = useMemo(
    () => [
      {id: 1, title: messages['common.bangla']},
      {id: 2, title: messages['common.english']},
    ],
    [messages],
  );

  const COURSE_TYPES = useMemo(
    () => [
      {id: 1, title: messages['course.paid']},
      {id: 2, title: messages['common.free']},
    ],
    [messages],
  );

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

  const handleLanguageChange = useCallback(
    (event: SelectChangeEvent<any>) => {
      setSelectedLanguageId(event.target.value);
      addFilterKey('language_medium', event.target.value);
    },
    [selectedLanguageId],
  );

  const handleSkillLevelChange = useCallback(
    (event: SelectChangeEvent<any>) => {
      setSelectedSkillLevel(event.target.value);
      addFilterKey('level', event.target.value);
    },
    [],
  );

  const onClickResetButton = useCallback(() => {
    setSelectedInstituteId('');
    addFilterKey('institute_id', 0);
    setSelectedProgrammeId('');
    addFilterKey('program_id', 0);
    setSelectedcourseTypeId('');
    addFilterKey('course_type', 0);
    setSelectedSkillLevel('');
    addFilterKey('level', 0);
    setSelectedLanguageId('');
    addFilterKey('language_medium', 0);
    setSelectedAvailability('');
    addFilterKey('availability', 0);
  }, []);

  return (
    <Box className={classes.pageRootHeader}>
      <Container maxWidth={'lg'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Box fontSize={'16px'}>{messages['training.search_header']}</Box>
            <Card sx={{alignItems: 'center'}}>
              <Grid container spacing={3} sx={{alignItems: 'center'}}>
                <Grid item xs={8} sm={9}>
                  <TextField
                    inputRef={searchTextField}
                    variant='outlined'
                    name='searchBox'
                    placeholder={messages['common.search'] as string}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment
                          position='start'
                          sx={{marginLeft: '20px'}}>
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
                    className={classes.thinSearchButton}
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
                  defaultLabel={messages['common.institute'] as string}
                  onChangeCallback={handleInstituteFilterChange}
                  options={institutes}
                />
              </Grid>

              <Grid item xs={6} sm={4} md={2}>
                <CustomSelectForFilter
                  id={'program_id'}
                  labelId={'select-program'}
                  selectedOptionId={selectedProgrammeId}
                  defaultLabel={messages['common.program'] as string}
                  onChangeCallback={handleProgrammeFilterChange}
                  options={programmes}
                />
              </Grid>
              <Grid item xs={6} sm={4} md={2}>
                <CustomSelectForFilter
                  id={'level'}
                  labelId={'select-skill-level'}
                  selectedOptionId={selectedSkillLevel}
                  defaultLabel={messages['common.skill_level'] as string}
                  onChangeCallback={handleSkillLevelChange}
                  options={SKILL_LEVELS}
                />
              </Grid>
              <Grid item xs={6} sm={4} md={2}>
                <CustomSelectForFilter
                  id={'course_type'}
                  labelId={'select-course-type'}
                  selectedOptionId={selectedcourseTypeId}
                  defaultLabel={messages['common.course_type'] as string}
                  onChangeCallback={handleCourseTypeChange}
                  options={COURSE_TYPES}
                />
              </Grid>
              <Grid item xs={6} sm={4} md={2}>
                <CustomSelectForFilter
                  id={'availability'}
                  labelId={'select-availability'}
                  selectedOptionId={selectedAvailability}
                  defaultLabel={messages['common.availability'] as string}
                  onChangeCallback={handleAvailabilityChange}
                  options={AVAILABILITIES}
                />
              </Grid>
              <Grid item xs={6} sm={4} md={2}>
                <CustomSelectForFilter
                  id={'language'}
                  labelId={'select-language-medium'}
                  selectedOptionId={selectedLanguageId}
                  defaultLabel={messages['language.label'] as string}
                  onChangeCallback={handleLanguageChange}
                  options={LANGUAGES}
                />
              </Grid>
              <Grid item xs={6} sm={4} md={2}>
                <Button
                  sx={{height: '100%'}}
                  variant={'contained'}
                  color={'primary'}
                  onClick={onClickResetButton}>
                  {messages['common.reset']}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CourseListHeaderSection;
