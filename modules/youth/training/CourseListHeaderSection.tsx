import React, {useCallback, useState} from 'react';
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

const CourseListHeaderSection = () => {
  const classes: any = useStyles();
  const {messages} = useIntl();
  const [instituteFilters] = useState({});
  const {data: institutes} = useFetchInstitutes(instituteFilters);
  const [selectedInstituteId, setSelectedInstituteId] = useState<number | null>(
    null,
  );

  // @ts-ignore
  const [selectedProgrammeId, setSelectedProgrammeId] = useState<number | null>(
    null,
  );

  const [filters, setFilters] = useState<any>({});

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
    },
    [selectedInstituteId],
  );

  const handleProgrammeFilterChange = useCallback(
    (event: SelectChangeEvent<any>) => {
      setSelectedProgrammeId(event.target.value);
    },
    [],
  );

  const filterCourseTraining = useCallback(
    (filterField: string, filterValue: number | null) => {
      let currentFilters = filters;
      currentFilters[filterField] = filterValue;
      setFilters(currentFilters);
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
                    className={classes.searchButton}>
                    {messages['common.search']}
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} md={7}>
            <Grid container spacing={3}>
              <Grid item xs={6} sm={4} md={2}>
                <Select
                  id='select1'
                  fullWidth
                  value={1}
                  variant='outlined'
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
                  id='select1'
                  fullWidth
                  value={1}
                  variant='outlined'
                  className={classes.selectStyle}
                  onChange={handleProgrammeFilterChange}>
                  <MenuItem value={1}>Program</MenuItem>
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
                  id='select1'
                  fullWidth
                  value={1}
                  variant='outlined'
                  className={classes.selectStyle}>
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
                  id='select1'
                  fullWidth
                  value={1}
                  variant='outlined'
                  className={classes.selectStyle}>
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
                  id='select1'
                  fullWidth
                  value={1}
                  variant='outlined'
                  className={classes.selectStyle}>
                  {LANGUAGES &&
                    LANGUAGES.map((language: any) => {
                      return (
                        <MenuItem value={language.id}>
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
