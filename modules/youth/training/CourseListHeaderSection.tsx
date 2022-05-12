import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
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
import {useRouter} from 'next/router';
import {useFetchUpazilas} from '../../../services/locationManagement/hooks';
import {FilterItem} from '../../../shared/Interface/common.interface';

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
  borderTop: `1px solid ${theme.palette.primary.dark}`,

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
  routeParamsFilters?: (filters: Array<FilterItem>) => void;
}

const CourseListHeaderSection = ({
  addFilterKey,
  routeParamsFilters,
}: CourseListHeaderSection) => {
  const {messages} = useIntl();
  const router = useRouter();
  const showInType = getShowInTypeByDomain();
  const [instituteFilters] = useState({});
  const {data: institutes} = useFetchPublicInstitutes(instituteFilters);
  const [selectedInstituteId, setSelectedInstituteId] = useState<any>('');
  const [selectedCourseTypeId, setSelectedCourseTypeId] = useState<any>('');
  const searchTextField = useRef<any>();

  const [selectedProgrammeId, setSelectedProgrammeId] = useState<any>('');
  const [selectedLanguageId, setSelectedLanguageId] = useState<any>('');
  const [selectedLocUpazilaId, setSelectedLocUpazilaId] = useState<any>('');
  const [selectedAvailability, setSelectedAvailability] = useState<any>('');
  const [selectedSkillLevel, setSelectedSkillLevel] = useState<any>('');
  const {search_text} = router.query;

  const [programmeFilters, setProgrammeFilters] = useState<any>({
    row_status: RowStatus.ACTIVE,
  });
  const [upazilasFilter] = useState({row_status: RowStatus.ACTIVE});

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
  const {data: upazilas} = useFetchUpazilas(upazilasFilter);

  useEffect(() => {
    let params: any = {...router.query};
    let filters: Array<FilterItem> = [];

    if (params.search_text) {
      filters.push({
        filterKey: 'search_text',
        filterValue: params.search_text,
      });
    }

    if (!Number(params.institute_id)) {
      delete params.institute_id;
    } else {
      filters.push({
        filterKey: 'institute_id',
        filterValue: params.institute_id,
      });
      setSelectedInstituteId(params.institute_id);
    }

    if (!Number(params.program_id)) {
      delete params.program_id;
    } else {
      filters.push({
        filterKey: 'program_id',
        filterValue: params.program_id,
      });
      setSelectedProgrammeId(params.program_id);
    }

    if (!Number(params.course_type)) {
      delete params.course_type;
    } else {
      filters.push({
        filterKey: 'course_type',
        filterValue: params.course_type,
      });
      setSelectedCourseTypeId(params.course_type);
    }

    if (!Number(params.level)) {
      delete params.level;
    } else {
      filters.push({
        filterKey: 'level',
        filterValue: params.level,
      });
      setSelectedSkillLevel(params.level);
    }

    if (!Number(params.availability)) {
      delete params.availability;
    } else {
      filters.push({
        filterKey: 'availability',
        filterValue: params.availability,
      });
      setSelectedAvailability(params.availability);
    }

    if (!Number(params.upazila)) {
      delete params.upazila;
    } else {
      filters.push({
        filterKey: 'loc_upazila_id',
        filterValue: params.upazila,
      });
      setSelectedLocUpazilaId(params.upazila);
    }

    if (!Number(params.language_medium)) {
      delete params.language_medium;
    } else {
      filters.push({
        filterKey: 'language_medium',
        filterValue: params.language_medium,
      });
      setSelectedLanguageId(params.language_medium);
    }

    if (routeParamsFilters && filters.length > 0) {
      routeParamsFilters(filters);
    }
  }, [router.query]);

  const urlParamsUpdate = (params: any) => {
    router.push(
      {
        pathname: router.pathname,
        query: objectFilter({...router.query, ...params}),
      },
      undefined,
      {shallow: true},
    );
  };

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

      urlParamsUpdate({
        institute_id: instituteId,
        program_id: '',
      });
    },
    [selectedInstituteId, router.query],
  );

  const handleProgrammeFilterChange = useCallback(
    (programId: number | null) => {
      setSelectedProgrammeId(programId);
      addFilterKey('program_id', programId);
      urlParamsUpdate({program_id: programId});
    },
    [selectedProgrammeId, router.query],
  );

  const handleAvailabilityChange = useCallback(
    (availability: number | null) => {
      setSelectedAvailability(availability);
      addFilterKey('availability', availability);
      urlParamsUpdate({availability: availability});
    },
    [selectedAvailability, router.query],
  );

  const handleCourseTypeChange = useCallback(
    (courseType: number | null) => {
      setSelectedCourseTypeId(courseType);
      addFilterKey('course_type', courseType);
      urlParamsUpdate({course_type: courseType});
    },
    [router.query],
  );

  const handleLanguageChange = useCallback(
    (languageId: number | null) => {
      setSelectedLanguageId(languageId);
      addFilterKey('language_medium', languageId);
      urlParamsUpdate({language_medium: languageId});
    },
    [selectedLanguageId, router.query],
  );

  const handleUpazilaChange = useCallback(
    (upazilaId: number | null) => {
      setSelectedLocUpazilaId(upazilaId);
      addFilterKey('loc_upazila_id', upazilaId);
      urlParamsUpdate({upazila: upazilaId});
    },
    [selectedLocUpazilaId, router.query],
  );

  const handleSkillLevelChange = useCallback(
    (skillLevel: number | null) => {
      setSelectedSkillLevel(skillLevel);
      addFilterKey('level', skillLevel);
      urlParamsUpdate({level: skillLevel});
    },
    [router.query],
  );

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
    setSelectedLocUpazilaId('');
    addFilterKey('loc_upazila_id', 0);
    urlParamsUpdate({
      institute_id: '',
      search_text: '',
      program_id: '',
      course_type: '',
      level: '',
      language_medium: '',
      availability: '',
      upazila: '',
    });
  }, []);

  const onSearchClick = useCallback(() => {
    addFilterKey('search_text', searchTextField.current.value);
    urlParamsUpdate({search_text: searchTextField.current.value});
  }, [router.query]);

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
                    defaultValue={search_text ? search_text : ''}
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
                    onClick={onSearchClick}>
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
                <Grid item xs={6} sm={4} md={3}>
                  <CustomFilterableSelect
                    id={'institute_id'}
                    defaultValue={selectedInstituteId}
                    label={messages['common.institute'] as string}
                    onChange={handleInstituteFilterChange}
                    options={institutes}
                    isLoading={false}
                    optionValueProp={'id'}
                    optionTitleProp={['title', 'title_en']}
                  />
                </Grid>
              )}

              <Grid item xs={6} sm={4} md={3}>
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
              <Grid item xs={6} sm={4} md={3}>
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
              <Grid item xs={6} sm={4} md={3}>
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
            </Grid>
            <Grid container spacing={3} mt={1}>
              <Grid item xs={6} sm={4} md={3}>
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
              <Grid item xs={6} sm={4} md={3}>
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
              <Grid item xs={6} sm={4} md={3}>
                <CustomFilterableSelect
                  id={'loc_upazila_id'}
                  defaultValue={selectedLocUpazilaId}
                  label={messages['menu.upazila'] as string}
                  onChange={handleUpazilaChange}
                  options={upazilas}
                  isLoading={false}
                  optionValueProp={'id'}
                  optionTitleProp={['title', 'title_en']}
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
