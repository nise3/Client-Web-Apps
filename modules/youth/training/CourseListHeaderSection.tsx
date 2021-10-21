import React, {useCallback, useRef, useState} from 'react';
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import useStyles from './index.style';
import {Search} from '@mui/icons-material';
import {useIntl} from 'react-intl';
import {
  useFetchInstitutes,
  useFetchProgrammes,
} from '../../../services/instituteManagement/hooks';
import RowStatus from '../../../@softbd/utilities/RowStatus';

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
  {id: 1, title: 'Free'},
  {id: 2, title: 'Paid'},
];

interface CourseListHeaderSection {
  filterAction: (filterKey: string, filterValue: number | null) => void;
}

const CourseListHeaderSection = ({filterAction}: CourseListHeaderSection) => {
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
      setSelectedInstituteId(event.target.value);
      setProgrammeFilters({
        row_status: RowStatus.ACTIVE,
        institute_id: selectedInstituteId,
      });
      filterAction('institute_id', event.target.value);
    },
    [selectedInstituteId],
  );

  const handleProgrammeFilterChange = useCallback(
    (event: SelectChangeEvent<any>) => {
      setSelectedProgrammeId(event.target.value);
      filterAction('program_id', event.target.value);
    },
    [selectedProgrammeId],
  );

  const handleLanguageChange = useCallback(
    (event: SelectChangeEvent<any>) => {
      setSelectedLanguageId(event.target.value);
      filterAction('language_medium', event.target.value);
    },
    [selectedLanguageId],
  );

  const handleAvailabilityChange = useCallback(
    (event: SelectChangeEvent<any>) => {
      setSelectedAvailability(event.target.value);
      filterAction('availability', event.target.value);
    },
    [selectedAvailability],
  );

  const handleCourseTypeChange = useCallback(
    (event: SelectChangeEvent<any>) => {
      setSelectedcourseTypeId(event.target.value);
      filterAction('course_type', event.target.value);
    },
    [],
  );

  const handleSkillLevelChange = useCallback(
    (event: SelectChangeEvent<any>) => {
      setSelectedSkillLevel(event.target.value);
      filterAction('level', event.target.value);
    },
    [],
  );

  return (
    <Box className={classes.pageRootHeader}>
      <Container maxWidth={'xl'}>
        <Grid container spacing={5}>
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
                      filterAction(
                        'search_text',
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
                <Select
                  id='institute_id'
                  fullWidth
                  value={selectedInstituteId}
                  variant='outlined'
                  label={<Typography>choose institute...</Typography>}
                  className={classes.selectStyle}
                  onChange={handleInstituteFilterChange}>
                  <MenuItem value={''}>
                    <em>None</em>
                  </MenuItem>
                  {institutes &&
                    institutes.map((institute: any) => {
                      return (
                        <MenuItem key={institute.id} value={institute.id}>
                          {institute.title}
                        </MenuItem>
                      );
                    })}
                </Select>
              </Grid>
              <Grid item xs={6} sm={4} md={2}>
                <Select
                  id='programme_id'
                  fullWidth
                  value={selectedProgrammeId}
                  variant='outlined'
                  className={classes.selectStyle}
                  onChange={handleProgrammeFilterChange}>
                  <MenuItem value={''}>None</MenuItem>
                  {selectedInstituteId &&
                    programmes &&
                    programmes.map((programme: any) => {
                      return (
                        <MenuItem key={programme.id} value={programme.id}>
                          {programme.title}
                        </MenuItem>
                      );
                    })}
                </Select>
              </Grid>
              <Grid item xs={6} sm={4} md={2}>
                <Select
                  id='level'
                  fullWidth
                  value={selectedSkillLevel}
                  variant='outlined'
                  className={classes.selectStyle}
                  onChange={handleSkillLevelChange}>
                  <MenuItem value={''}>None</MenuItem>
                  {SKILL_LEVELS &&
                    SKILL_LEVELS.map((level: any) => {
                      return (
                        <MenuItem value={level.id} key={level.id}>
                          {level.title}
                        </MenuItem>
                      );
                    })}
                </Select>
              </Grid>
              <Grid item xs={6} sm={4} md={2}>
                <Select
                  id='course_type'
                  fullWidth
                  value={selectedcourseTypeId}
                  variant='outlined'
                  label={'course type'}
                  className={classes.selectStyle}
                  onChange={handleCourseTypeChange}>
                  <MenuItem value={''}>None</MenuItem>
                  {COURSE_TYPES &&
                    COURSE_TYPES.map((courseType: any) => {
                      return (
                        <MenuItem value={courseType.id} key={courseType.id}>
                          {courseType.title}
                        </MenuItem>
                      );
                    })}
                </Select>
              </Grid>
              <Grid item xs={6} sm={4} md={2}>
                <Select
                  id='availability'
                  fullWidth
                  value={selectedAvailability}
                  variant='outlined'
                  className={classes.selectStyle}
                  onChange={handleAvailabilityChange}>
                  <MenuItem value={''}>None</MenuItem>
                  {AVAILABILITIES &&
                    AVAILABILITIES.map((availability: any) => {
                      return (
                        <MenuItem value={availability.id} key={availability.id}>
                          {availability.title}
                        </MenuItem>
                      );
                    })}
                </Select>
              </Grid>
              <Grid item xs={6} sm={4} md={2}>
                <Select
                  id='language_id'
                  fullWidth
                  variant='outlined'
                  value={selectedLanguageId}
                  onChange={handleLanguageChange}
                  className={classes.selectStyle}>
                  <MenuItem value={''}>None</MenuItem>
                  {LANGUAGES &&
                    LANGUAGES.map((language: any) => {
                      return (
                        <MenuItem key={language.id} value={language.id}>
                          {language.title}
                        </MenuItem>
                      );
                    })}
                </Select>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CourseListHeaderSection;
