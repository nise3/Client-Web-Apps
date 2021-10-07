import React, {useCallback, useMemo, useState} from 'react';
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
import {CremaTheme} from '../../../types/AppContextPropsType';
import {Search} from '@mui/icons-material';
import {useIntl} from 'react-intl';
import FeaturedFreelanceSection from './FeaturedFreelanceSection';
import NearbySkilledYouthSection from './NearbySkilledYouthSection';
import AllFreelancerListSection from './AllFreelancerListSection';

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

  const [checked, setChecked] = useState([0]);

  const handleToggle = useCallback(
    (value: number) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      setChecked(newChecked);
    },
    [],
  );

  const checkItems = useMemo(
    () => [
      {
        id: 1,
        label: messages['freelance_corner.web_design'],
      },
      {
        id: 2,
        label: messages['freelance_corner.graphic_design'],
      },
      {
        id: 3,
        label: messages['freelance_corner.ux_design'],
      },
      {
        id: 4,
        label: messages['freelance_corner.ui_design'],
      },
      {
        id: 5,
        label: messages['freelance_corner.java_developer'],
      },
    ],
    [messages],
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
                    {checkItems.map((item: any) => {
                      const labelId = `checkbox-list-label-${item.id}`;

                      return (
                        <ListItem key={item.id} disablePadding>
                          <ListItemButton onClick={handleToggle(item.id)} dense>
                            <ListItemIcon sx={{minWidth: '20px'}}>
                              <Checkbox
                                edge='start'
                                checked={checked.indexOf(item.id) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{'aria-labelledby': labelId}}
                                sx={{paddingTop: 0, paddingBottom: 0}}
                              />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={item.label} />
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </List>
                  <Box sx={{fontWeight: 'bold', marginTop: 4, marginBottom: 2}}>
                    {messages['freelance_corner.specific_location']}
                  </Box>
                  <TextField
                    variant='outlined'
                    name='location'
                    placeholder={
                      messages['freelance_corner.add_location'] as string
                    }
                    fullWidth
                    size={'small'}
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
                  <Grid item xs={9} sm={10} md={10}>
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
                  <Grid item xs={3} sm={2} md={2}>
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
            <Grid item xs={12}>
              <FeaturedFreelanceSection />
            </Grid>
            <Grid item xs={12}>
              <AllFreelancerListSection />
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
