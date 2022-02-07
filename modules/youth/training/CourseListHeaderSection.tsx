import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  InputAdornment,
  TextField,
} from '@mui/material';
import {Search} from '@mui/icons-material';
import {useIntl} from 'react-intl';
import {
  useFetchPublicInstitutes,
  useFetchPublicPrograms,
} from '../../../services/instituteManagement/hooks';
import RowStatus from '../../../@softbd/utilities/RowStatus';
import {
  getShowInTypeByDomain,
  objectFilter,
} from '../../../@softbd/utilities/helpers';
import {styled} from '@mui/material/styles';
import CustomFilterableSelect from './components/CustomFilterableSelect';
import ShowInTypes from '../../../@softbd/utilities/ShowInTypes';
import {H1} from '../../../@softbd/elements/common';

const PREFIX = 'CustomListHeaderSection';

export const classes = {
  thinSearchButton: `${PREFIX}-thinSearchButton`,
  searchInputBorderHide: `${PREFIX}-searchInputBorderHide`,
};

export const StyledBox = styled(Box)(({theme}) => ({
  background: theme.palette.primary.main,
  color: '#fff',
  paddingTop: 20,
  paddingBottom: 20,

  [`& .${classes.thinSearchButton}`]: {
    color: '#fff',
    padding: '10px 0',
    width: '100%',
    height: '100%',
  },

  [`& .${classes.searchInputBorderHide}`]: {
    padding: 0,
    '& fieldset': {
      border: 'none',
    },
    '& input': {
      display: 'flex',
      alignItems: 'center',
      // padding: '14px 0px',
    },
  },
}));

interface CourseListHeaderSection {
  addFilterKey: (filterKey: string, filterValue: any) => void;
}

const CourseListHeaderSection = ({addFilterKey}: CourseListHeaderSection) => {
  const {messages} = useIntl();
  const showInType = getShowInTypeByDomain();
  const [instituteFilters] = useState({});
  const {data: institutes} = useFetchPublicInstitutes(instituteFilters);
  const [selectedInstituteId, setSelectedInstituteId] = useState<any>('');
  const [selectedCourseTypeId, setSelectedCourseTypeId] = useState<any>('');
  const searchTextField = useRef<any>();

  const [selectedProgrammeId, setSelectedProgrammeId] = useState<any>('');
  const [selectedLanguageId, setSelectedLanguageId] = useState<any>('');
  const [selectedAvailability, setSelectedAvailability] = useState<any>('');
  const [selectedSkillLevel, setSelectedSkillLevel] = useState<any>('');

  const [programmeFilters, setProgrammeFilters] = useState<any>({
    row_status: RowStatus.ACTIVE,
  });

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

  const {data: programmes} = useFetchPublicPrograms(programmeFilters);

  const handleInstituteFilterChange = useCallback(
    (instituteId: number | null) => {
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
    (programId: number | null) => {
      setSelectedProgrammeId(programId);
      addFilterKey('program_id', programId);
    },
    [selectedProgrammeId],
  );

  const handleAvailabilityChange = useCallback(
    (availability: number | null) => {
      setSelectedAvailability(availability);
      addFilterKey('availability', availability);
    },
    [selectedAvailability],
  );

  const handleCourseTypeChange = useCallback((courseType: number | null) => {
    setSelectedCourseTypeId(courseType);
    addFilterKey('course_type', courseType);
  }, []);

  const handleLanguageChange = useCallback(
    (languageId: number | null) => {
      setSelectedLanguageId(languageId);
      addFilterKey('language_medium', languageId);
    },
    [selectedLanguageId],
  );

  const handleSkillLevelChange = useCallback((skillLevel: number | null) => {
    setSelectedSkillLevel(skillLevel);
    addFilterKey('level', skillLevel);
  }, []);

  const onClickResetButton = useCallback(() => {
    if (showInType !== ShowInTypes.TSP) {
      setSelectedInstituteId('');
      addFilterKey('institute_id', 0);
    }

    searchTextField.current.value = '';
    addFilterKey('search_text', '');

    setSelectedProgrammeId('');
    addFilterKey('program_id', 0);
    setSelectedCourseTypeId('');
    addFilterKey('course_type', 0);
    setSelectedSkillLevel('');
    addFilterKey('level', 0);
    setSelectedLanguageId('');
    addFilterKey('language_medium', 0);
    setSelectedAvailability('');
    addFilterKey('availability', 0);
  }, []);

  return (
    <StyledBox>
      <Container maxWidth={'lg'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <H1 style={{fontSize: '1rem'}}>
              {messages['training.search_header']}
            </H1>
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
                <Grid item xs={4} sm={3} sx={{paddingRight: '4px'}}>
                  <Button
                    variant='contained'
                    color={'primary'}
                    className={classes.thinSearchButton}
                    onClick={useCallback(() => {
                      addFilterKey(
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
          <Grid item xs={12} md={2} display={'flex'} alignItems={'flex-end'}>
            <Button
              fullWidth
              variant={'contained'}
              color={'secondary'}
              size={'small'}
              sx={{
                height: '48px',
                marginBottom: '6px',
              }}
              onClick={onClickResetButton}>
              {messages['common.reset']}
            </Button>
          </Grid>

          <Grid item xs={12} md={12}>
            <Grid container spacing={3}>
              {showInType != ShowInTypes.TSP && (
                <Grid item xs={6} sm={4} md={2}>
                  <CustomFilterableSelect
                    id={'institute_id'}
                    defaultValue={selectedInstituteId}
                    label={messages['common.institute'] as string}
                    onChange={handleInstituteFilterChange}
                    options={institutes}
                    isLoading={false}
                    optionValueProp={'id'}
                    optionTitleProp={['title']}
                  />
                </Grid>
              )}

              <Grid item xs={6} sm={4} md={2}>
                <CustomFilterableSelect
                  id={'program_id'}
                  defaultValue={selectedProgrammeId}
                  label={messages['common.program'] as string}
                  onChange={handleProgrammeFilterChange}
                  options={programmes}
                  isLoading={false}
                  optionValueProp={'id'}
                  optionTitleProp={['title', 'title_en']}
                />
              </Grid>
              <Grid item xs={6} sm={4} md={2}>
                <CustomFilterableSelect
                  id={'level'}
                  defaultValue={selectedSkillLevel}
                  label={messages['common.skill_level'] as string}
                  onChange={handleSkillLevelChange}
                  options={SKILL_LEVELS}
                  isLoading={false}
                  optionValueProp={'id'}
                  optionTitleProp={['title']}
                />
              </Grid>
              <Grid item xs={6} sm={4} md={2}>
                <CustomFilterableSelect
                  id={'course_type'}
                  defaultValue={selectedCourseTypeId}
                  label={messages['common.course_type'] as string}
                  onChange={handleCourseTypeChange}
                  options={COURSE_TYPES}
                  isLoading={false}
                  optionValueProp={'id'}
                  optionTitleProp={['title']}
                />
              </Grid>
              <Grid item xs={6} sm={4} md={2}>
                <CustomFilterableSelect
                  id={'availability'}
                  defaultValue={selectedAvailability}
                  label={messages['common.availability'] as string}
                  onChange={handleAvailabilityChange}
                  options={AVAILABILITIES}
                  isLoading={false}
                  optionValueProp={'id'}
                  optionTitleProp={['title']}
                />
              </Grid>
              <Grid item xs={6} sm={4} md={2}>
                <CustomFilterableSelect
                  id={'language'}
                  defaultValue={selectedLanguageId}
                  label={messages['language.label'] as string}
                  onChange={handleLanguageChange}
                  options={LANGUAGES}
                  isLoading={false}
                  optionValueProp={'id'}
                  optionTitleProp={['title']}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </StyledBox>
  );
};

export default CourseListHeaderSection;
