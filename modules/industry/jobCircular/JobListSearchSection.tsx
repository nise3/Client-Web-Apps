import {styled} from '@mui/material/styles';
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
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import CustomFilterableSelect from '../../youth/training/components/CustomFilterableSelect';
import {useIntl} from 'react-intl';
import {useFetchPublicSkills} from '../../../services/youthManagement/hooks';
import RowStatus from '../../../@softbd/utilities/RowStatus';
import {useFetchPublicJobSectors} from '../../../services/organaizationManagement/hooks';
import {IOccupation} from '../../../shared/Interface/occupation.interface';
import {getAllPublicOccupations} from '../../../services/organaizationManagement/OccupationService';
import {useRouter} from 'next/router';
import {useFetchUpazilas} from '../../../services/locationManagement/hooks';

const PREFIX = 'JobListSearchSection';

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

interface IProps {
  addFilterKey: (filterKey: string, filterValue: any) => void;
}

const JobListSearchSection = ({addFilterKey}: IProps) => {
  const {messages} = useIntl();

  const searchTextField = useRef<any>();
  const router = useRouter();

  const [selectedSkillIds, setSelectedSkillIds] = useState<any>('');
  const [selectJobSectorsId, setSelectJobSectorsId] = useState<any>('');
  const [selectOccupationId, setSelectOccupationId] = useState<any>('');
  const [selectedJobLevel, setSelectedJobLevel] = useState<any>('');
  const [selectedLocUpazilaId, setSelectedLocUpazilaId] = useState<any>('');
  const {search_text, upazila} = router.query;

  const [occupations, setOccupations] = useState<Array<IOccupation>>([]);

  const [skillFilter] = useState({});
  const {data: skills, isLoading: isLoadingSkills} =
    useFetchPublicSkills(skillFilter);

  const [upazilasFilter] = useState({row_status: RowStatus.ACTIVE});
  const {data: upazilas} = useFetchUpazilas(upazilasFilter);

  const onSearch = useCallback(() => {
    addFilterKey('search_text', searchTextField.current.value);
  }, []);

  const onClickResetButton = useCallback(() => {
    searchTextField.current.value = '';
    addFilterKey('search_text', '');

    addFilterKey('skill_ids', []);
    addFilterKey('job_sector_ids', []);
    addFilterKey('occupation_ids', []);
    addFilterKey('job_level', 0);
    addFilterKey('occupation_ids', '');
    setSelectedLocUpazilaId('');
    addFilterKey('loc_upazila_id', 0);

    setSelectJobSectorsId('');
    setSelectOccupationId('');
    setSelectedJobLevel('');
    setSelectJobSectorsId('');
  }, []);

  const handleSkillsFilterChange = useCallback((skillsId: number | null) => {
    setSelectedSkillIds(skillsId);
    addFilterKey('skill_ids', skillsId ? [skillsId] : []);
  }, []);

  const [jobSectorFilters] = useState({row_status: RowStatus.ACTIVE});
  const {data: jobSectors, isLoading: isLoadingJobSector}: any =
    useFetchPublicJobSectors(jobSectorFilters);

  const handleJobSectorsFilterChange = useCallback((jobSectorId: any) => {
    setSelectJobSectorsId(jobSectorId);
    addFilterKey('job_sector_ids', jobSectorId ? [jobSectorId] : []);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await getAllPublicOccupations({
          row_status: RowStatus.ACTIVE,
          job_sector_ids: selectJobSectorsId,
        });
        setOccupations(response.data);
      } catch (e) {
        setOccupations([]);
      }
    })();
  }, [selectJobSectorsId]);

  useEffect(() => {
    if (search_text) {
      addFilterKey('search_text', String(search_text));
    }
    if (upazila) {
      addFilterKey('loc_upazila_id', String(upazila));
      setSelectedLocUpazilaId(upazila);
    }
  }, [search_text, upazila]);

  const onOccupationChange = useCallback((occupationId: any) => {
    setSelectOccupationId(occupationId);
    addFilterKey('occupation_ids', occupationId ? [occupationId] : []);
  }, []);

  const JOB_LEVELS = useMemo(
    () => [
      {id: 1, title: messages['label.job_level_entry']},
      {id: 2, title: messages['label.job_level_mid']},
      {id: 3, title: messages['label.job_level_top']},
    ],
    [messages],
  );

  const handleJobLevelChange = useCallback((jobLevel: number | null) => {
    setSelectedJobLevel(jobLevel);
    addFilterKey('job_level', jobLevel);
  }, []);

  const handleUpazilaChange = useCallback(
    (upazilaId: number | null) => {
      setSelectedLocUpazilaId(upazilaId);
      addFilterKey('loc_upazila_id', upazilaId);
    },
    [selectedLocUpazilaId],
  );

  return (
    <StyledBox>
      <Container maxWidth={'lg'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Card sx={{alignItems: 'center'}}>
              <Grid container spacing={3} sx={{alignItems: 'center'}}>
                <Grid item xs={8} sm={9}>
                  <TextField
                    inputRef={searchTextField}
                    variant='outlined'
                    name='searchBox'
                    placeholder={messages['common.search'] as string}
                    fullWidth
                    defaultValue={search_text ?? ''}
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
                    onKeyDown={(event) => {
                      if (event.code == 'Enter') onSearch();
                    }}
                  />
                </Grid>
                <Grid item xs={4} sm={3} sx={{paddingRight: '4px'}}>
                  <Button
                    variant='contained'
                    color={'primary'}
                    className={classes.thinSearchButton}
                    onClick={onSearch}>
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
              <Grid item xs={6} sm={4} md={2}>
                <CustomFilterableSelect
                  id={'skill_ids'}
                  defaultValue={selectedSkillIds}
                  label={messages['skill.label'] as string}
                  onChange={handleSkillsFilterChange}
                  options={skills}
                  isLoading={isLoadingSkills}
                  optionValueProp={'id'}
                  optionTitleProp={['title']}
                />
              </Grid>

              <Grid item xs={6} sm={4} md={2}>
                <CustomFilterableSelect
                  id={'job_sector_ids'}
                  defaultValue={selectJobSectorsId}
                  label={messages['job_sectors.label'] as string}
                  onChange={handleJobSectorsFilterChange}
                  options={jobSectors}
                  isLoading={isLoadingJobSector}
                  optionValueProp={'id'}
                  optionTitleProp={['title']}
                />
              </Grid>
              <Grid item xs={6} sm={4} md={2}>
                <CustomFilterableSelect
                  id={'occupation_ids'}
                  defaultValue={selectOccupationId}
                  label={messages['occupations.label'] as string}
                  onChange={onOccupationChange}
                  options={occupations}
                  isLoading={false}
                  optionValueProp={'id'}
                  optionTitleProp={['title']}
                />
              </Grid>
              <Grid item xs={6} sm={4} md={2}>
                <CustomFilterableSelect
                  id={'job_level'}
                  defaultValue={selectedJobLevel}
                  label={messages['label.job_level'] as string}
                  onChange={handleJobLevelChange}
                  options={JOB_LEVELS}
                  isLoading={false}
                  optionValueProp={'id'}
                  optionTitleProp={['title']}
                />
              </Grid>
              <Grid item xs={6} sm={4} md={2}>
                <CustomFilterableSelect
                  id={'loc_upazila_id'}
                  defaultValue={selectedLocUpazilaId}
                  label={messages['menu.upazila'] as string}
                  onChange={handleUpazilaChange}
                  options={upazilas}
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
export default JobListSearchSection;
