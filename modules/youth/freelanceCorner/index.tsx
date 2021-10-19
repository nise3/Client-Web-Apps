import React, {useCallback, useRef, useState} from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  Grid,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {CremaTheme} from '../../../redux/types/AppContextPropsType';
import {Search} from '@mui/icons-material';
import {useIntl} from 'react-intl';
import FeaturedFreelanceSection from './FeaturedFreelanceSection';
import NearbySkilledYouthSection from './NearbySkilledYouthSection';
import AllFreelancerListSection from './AllFreelancerListSection';
import {useFetchYouthSkills} from '../../../services/youthManagement/hooks';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import {
  useFetchUpazila,
  useFetchUpazilas,
} from '../../../services/locationManagement/hooks';

const useStyles = makeStyles((theme: CremaTheme) => ({
  container: {
    marginTop: 20,
    marginBottom: 20,
  },
  root: {
    [theme.breakpoints.down('md')]: {
      alignItems: 'center',
      flexDirection: 'column',
    },
  },
  searchButton: {
    color: '#fff',
    padding: '8px 14px',
    width: '100%',
    height: '100%',
  },
  searchInputBorderHide: {
    '& fieldset': {
      border: 'none',
    },
    '& input': {
      padding: '14px 0px',
    },
  },
}));

const FreelanceCorner = () => {
  const classes = useStyles();
  const {messages} = useIntl();

  const [selectedSkills, setSelectedSkills] = useState<Array<number>>([]);
  const [freelancerFilters, setFreelancerFilters] = useState<Array<number>>([]);
  const [searchInputText, setSearchInputText] = useState<string>('');
  const [skillFilters] = useState<any>({});
  const searchTextField = useRef<any>();

  const {data: skills} = useFetchYouthSkills(skillFilters);
  const {
    data: upazilas,
    isLoading: isLoadingUpazilas,
    error,
  } = useFetchUpazilas();

  const handleSearchAction = useCallback(() => {
    setSearchInputText(searchTextField.current?.value);
  }, []);

  const handleToggle = useCallback(
    (value: number) => () => {
      const currentIndex = selectedSkills.indexOf(value);
      const newChecked = [...selectedSkills];

      console.log('checked array: ', selectedSkills);
      console.log('checked index: ', currentIndex);
      console.log('new arr: ', newChecked);
      console.log('new val: ', value);

      if (currentIndex < 0) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      setSelectedSkills(newChecked);
      setFreelancerFilters(newChecked);
    },
    [selectedSkills],
  );

  return (
    <Container maxWidth={'xl'} className={classes.container}>
      <Grid container spacing={5} className={classes.root}>
        <Grid item xs={12} md={3}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Box sx={{fontWeight: 'bold'}}>
                    {messages['freelance_corner.filter_title']}
                  </Box>
                  <List
                    sx={{
                      width: '100%',
                      padding: '0px',
                    }}>
                    {skills &&
                      skills.map((item: any) => {
                        const labelId = `checkbox-list-label-${item.id}`;

                        return (
                          <ListItem key={item.id} disablePadding>
                            <ListItemButton
                              onClick={handleToggle(item.id)}
                              dense>
                              <ListItemIcon sx={{minWidth: '20px'}}>
                                <Checkbox
                                  edge='start'
                                  checked={selectedSkills.includes(item.id)}
                                  tabIndex={-1}
                                  disableRipple
                                  inputProps={{'aria-labelledby': labelId}}
                                  sx={{paddingTop: 0, paddingBottom: 0}}
                                />
                              </ListItemIcon>
                              <ListItemText id={labelId} primary={item.title} />
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                  </List>
                  <Box sx={{fontWeight: 'bold', marginTop: 4, marginBottom: 2}}>
                    {messages['freelance_corner.specific_location']}
                  </Box>
                  <CustomFormSelect
                    id='location'
                    control={true}
                    label={messages['upazilas.label']}
                    isLoading={isLoadingUpazilas}
                    options={upazilas}
                    optionValueProp={'id'}
                    optionTitleProp={['title_en', 'title']}
                    errorInstance={error}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Card sx={{padding: '10px', alignItems: 'center'}}>
                <Grid container spacing={1} sx={{alignItems: 'center'}}>
                  <Grid item xs={9} sm={10}>
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
                  <Grid item xs={3} sm={2}>
                    <Button
                      variant='contained'
                      color={'primary'}
                      onClick={handleSearchAction}
                      className={classes.searchButton}>
                      {messages['common.search']}
                    </Button>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <FeaturedFreelanceSection />
            </Grid>
            <Grid item xs={12}>
              <AllFreelancerListSection
                skillIds={freelancerFilters}
                searchText={searchInputText}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant={'h6'}>
                    {messages['common.freelance_profile']}
                  </Typography>
                  <Typography variant={'body2'}>
                    {messages['youth_profile.freelance_profile_turing_on_hint']}
                  </Typography>
                  <Switch color={'primary'} defaultChecked />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <NearbySkilledYouthSection />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FreelanceCorner;
