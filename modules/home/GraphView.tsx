import React, {useCallback, useEffect, useState} from 'react';
import {Box, Container} from '@mui/material';
import SectionTitle from './SectionTitle';
import Chartist from 'chartist';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';

import {classes, DIV, StyledBox, StyledGrid} from './GraphMapView';

const GraphMapView = () => {
  // const {messages} = useIntl();
  const [value, setValue] = useState('1');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  // console.log('AccessibilityToolbar');
  // const [isOpened, setIsOpened] = useState(false);
  // const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    document.head.innerHTML +=
      // @ts-ignore
      '<link rel="stylesheet" href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css">';
    return () => {
      // elem.remove();
      // document.documentElement.removeEventListener('mousemove', mousemoveCB);
    };
  }, []);

  const graph2RefCB = useCallback((node) => {
    if (!node || node.children.length > 0) return;

    const div = DIV();
    div.className = '';
    node.appendChild(div);
    const labels = [
      `Actual & \nTrend Analysis`,
      `Estimated (with \n10% Growth Rate)`,
      `Estimated (with \n20% Growth Rate)`,
      `Estimated (with \n30% Growth Rate)`,
    ];

    new Chartist.Line(
      div,
      {
        labels: [2022, 2023, 2024, 2025, 2026, 2027],
        series: [
          [1088415, 1046900, 1046904, 1087006, 1100330, 1106273],
          [1175664, 1137768, 1154724, 1181977, 1195971, 1201904],
          [1282542, 1241202, 1241202, 1289429, 1304695, 1304695],
          [1389421, 1344635, 1364674, 1396882, 1413420, 1420432],
        ],
      },
      {
        fullWidth: true,
        chartPadding: {
          right: 110,
          left: 80,
        },
        height: '360px',
        // low: 100000,
        // showArea: true,
      },
    ).on('draw', (data: any) => {
      if (data.type === 'line') {
        console.log(data);
        data.element.attr({
          // style: `stroke-width: 15px; cursor:pointer;`,
        });
        data.element._node.onclick = () => {};
        const txt = new Chartist.Svg(
          'text',
          {
            x: `${data.path.pathElements[5].x + 10}`,
            y: `${data.path.pathElements[5].y - 10}`,
            'dominant-baseline': `middle`,
            // 'text-anchor': `middle`,
            // fill: data.element._node.getAttribute('stroke'),
            fill: 'rgba(0,0,0,.4)',
            'font-size': 12,
          },
          '',
        );
        txt._node.innerHTML = labels[data.seriesIndex].split('\n')[0];
        data.group.append(txt);
        const txt2 = new Chartist.Svg(
          'text',
          {
            x: `${data.path.pathElements[5].x + 10}`,
            y: `${data.path.pathElements[5].y + 10}`,
            'dominant-baseline': `middle`,
            fill: 'rgba(0,0,0,.4)',
            'font-size': 12,
          },
          '',
        );
        txt2._node.innerHTML = labels[data.seriesIndex].split('\n')[1];
        data.group.append(txt2);
      }
    });
  }, []);

  const graph3RefCB = useCallback((node) => {
    if (!node || node.children.length > 0) return;

    const div = DIV();
    div.className = '';
    node.appendChild(div);
  }, []);

  const graph4RefCB = useCallback((node) => {
    if (!node || node.children.length > 0) return;

    const div = DIV();
    div.className = '';
    node.appendChild(div);
  }, []);

  const graph5RefCB = useCallback((node) => {
    if (!node || node.children.length > 0) return;

    const div = DIV();
    div.className = '';
    node.appendChild(div);
  }, []);

  return (
    <StyledGrid container xl={12}>
      <Container maxWidth='lg' disableGutters>
        <SectionTitle title={`Survey Data` as string} center={true} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          {/** navigation bar */}
          <TabContext value={value}>
            <Box className={classes.tabListBox}>
              <TabList
                onChange={handleChange}
                variant='scrollable'
                scrollButtons='auto'
                aria-label='lab API tabs example'>
                <Tab label={'Job & Skill Opportunities'} value='1' />
                <Tab label={'International Job Survey'} value='2' />
                <Tab label={'4IR Based Future Skills'} value='3' />
                {/*<Tab label={'Emerging Occupation During Covid-19'} value='4' />*/}
                {/*<Tab label={'4IR Demand Survey'} value='5' />*/}
              </TabList>
            </Box>
            <Box className={classes.TabPanelBox}>
              <TabPanel value='1'>
                <StyledBox ref={graph2RefCB} />
              </TabPanel>
              <TabPanel value='2'>
                <StyledBox ref={graph3RefCB} />
                <StyledBox ref={graph4RefCB} />
              </TabPanel>
              <TabPanel value='3'>
                <StyledBox ref={graph5RefCB} />
              </TabPanel>
            </Box>
          </TabContext>
        </Box>
      </Container>
    </StyledGrid>
  );
};
export default GraphMapView;
