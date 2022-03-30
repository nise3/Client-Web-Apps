import React, {useState} from 'react';
import {Box, Tab} from '@mui/material';
import {TabContext, TabList, TabPanel} from '@mui/lab';
import IndustryListView from './IndustryListView';
import {IndustryDashboardTabs} from './IndustryDashboardTabs';
import {styled} from '@mui/material/styles';
import {useIntl} from 'react-intl';

const PREFIX = 'DashboardTabs';

const classes = {
  tabBox: `${PREFIX}-tabBox`,
  tabList: `${PREFIX}-tabList`,
  monthSelect: `${PREFIX}-monthSelect`,
  tabPanel: `${PREFIX}-tabPanel`,
};

const StyledBox = styled(Box)(({theme}) => ({
  [`& .${classes.tabBox}`]: {
    borderBottom: '1px solid',
    borderBottomColor: theme.palette.divider,
    display: 'flex',
    justifyContent: 'space-between',
  },
  [`& .${classes.tabList}`]: {
    width: 'fit-content',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '10px 10px 0px 0px',
  },
  [`& .${classes.monthSelect}`]: {
    width: '170px',
    alignSelf: 'flex-end',
  },
  [`& .${classes.tabPanel}`]: {
    padding: 0,
    background: theme.palette.common.white,
  },
}));

const DashboardTabView = () => {
  const {messages} = useIntl();
  const [value, setValue] = useState<string>(IndustryDashboardTabs.INDUSTRY);
  // const [months, setMonths] = useState<any>([]);
  // const [selectedMonth, setSelectedMonth] = useState<
  //   string | number | undefined
  // >();

  /*  useEffect(() => {
    const momentMonths = getMomentMonths();
    const months1: any = [];
    momentMonths.map((month: string, index) => {
      months1.push({
        id: index + 1,
        name: month,
      });
    });
    setMonths(months1);
  }, []);*/

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <StyledBox>
      <TabContext value={value}>
        <Box className={classes.tabBox}>
          <TabList
            onChange={handleChange}
            aria-label='Dashboard Tabs'
            className={classes.tabList}>
            <Tab
              label={messages['common.member_list']}
              value={IndustryDashboardTabs.INDUSTRY}
            />
            {/*<Tab*/}
            {/*  label={messages['dashboard.tab_unemployed_people']}*/}
            {/*  value={IndustryDashboardTabs.UNEMPLOYED_PEOPLE}*/}
            {/*/>*/}
            {/*<Tab*/}
            {/*  label={messages['dashboard.tab_job_vacancy']}*/}
            {/*  value={IndustryDashboardTabs.JOB_VACANCY}*/}
            {/*/>*/}
            {/*<Tab*/}
            {/*  label={messages['dashboard.tab_employed_people']}*/}
            {/*  value={IndustryDashboardTabs.EMPLOYED_PEOPLE}*/}
            {/*/>*/}
            {/*<Tab*/}
            {/*  label={messages['dashboard.tab_skilled_people']}*/}
            {/*  value={IndustryDashboardTabs.SKILLED_PEOPLE}*/}
            {/*/>*/}
          </TabList>
          {/*<CustomFilterableSelect*/}
          {/*  id='month'*/}
          {/*  label={messages['common.month']}*/}
          {/*  className={classes.monthSelect}*/}
          {/*  defaultValue={selectedMonth}*/}
          {/*  isLoading={false}*/}
          {/*  options={months}*/}
          {/*  optionValueProp={'id'}*/}
          {/*  optionTitleProp={['name']}*/}
          {/*  onChange={(value: number) => {*/}
          {/*    setSelectedMonth(value);*/}
          {/*  }}*/}
          {/*/>*/}
        </Box>

        <TabPanel
          className={classes.tabPanel}
          value={IndustryDashboardTabs.INDUSTRY}>
          <IndustryListView />
        </TabPanel>
        <TabPanel
          className={classes.tabPanel}
          value={IndustryDashboardTabs.UNEMPLOYED_PEOPLE}>
          Item Two
        </TabPanel>
        <TabPanel
          className={classes.tabPanel}
          value={IndustryDashboardTabs.JOB_VACANCY}>
          Item Three
        </TabPanel>
        <TabPanel
          className={classes.tabPanel}
          value={IndustryDashboardTabs.EMPLOYED_PEOPLE}>
          Item Four
        </TabPanel>
        <TabPanel
          className={classes.tabPanel}
          value={IndustryDashboardTabs.SKILLED_PEOPLE}>
          Item Five
        </TabPanel>
      </TabContext>
    </StyledBox>
  );
};

export default DashboardTabView;
