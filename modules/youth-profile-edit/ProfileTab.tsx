import React from 'react';
import {Box, Divider, Paper, Tab, Tabs} from '@material-ui/core';

function ProfileTab() {
  return (
    <>
      <Paper>
        <Box sx={{width: '100%'}}>
          <Tabs
            textColor='secondary'
            indicatorColor='secondary'
            aria-label='secondary tabs example'
            orientation='vertical'
          >
            <Tab value='one' label='Personal Information' />
            <Divider/>
            <Tab value='one' label='Education' />
            <Divider/>
            <Tab value='two' label='Skills' />
            <Divider/>
            <Tab value='three' label='Portfolio' />
            <Divider/>
            <Tab value='three' label='Job Experience' />
            <Divider/>
            <Tab value='three' label='Language Profeciency' />
            <Divider/>
            <Tab value='three' label='Reference' />

          </Tabs>
        </Box>
      </Paper>
    </>
  );
}

export default ProfileTab;
