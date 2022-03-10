import React, {useCallback, useEffect, useState} from 'react';
import {styled} from '@mui/material/styles';
import {Box, Container, Grid} from '@mui/material';
import SectionTitle from './SectionTitle';
import Districts from '../../shared/json/Districts.json';
import Map from '../../shared/json/Map.json';
import Demand from '../../shared/json/Demand.json';
import Supply from '../../shared/json/Supply.json';
import Youths from '../../shared/json/Youths.json';
import Chartist from 'chartist';

const DemandColor = 'rgb(36,141,36)';
const SupplyColor = 'rgb(104, 41, 136)';

const PREFIX = 'BdMap';

export const classes = {
  mapButtonGroup: `${PREFIX}-mapButtonGroup`,
  skillButton: `${PREFIX}-skillButton`,
  map: `${PREFIX}-map`,
  mapSidePoints: `${PREFIX}-mapSidePoints`,
  mapIndicator: `${PREFIX}-mapIndicator`,
  tabListBox: `${PREFIX}-tabListBox`,
  TabPanelBox: `${PREFIX}-TabPanelBox`,
};

export const StyledGrid = styled(Grid)(({theme}) => ({
  marginTop: '40px',

  [`& .${classes.mapButtonGroup}`]: {
    border: '1px solid #eee',
    borderRadius: '5px',
    boxShadow: theme.shadows[3],
    marginBottom: '29px',
    width: '100%',
    maxWidth: '610px',
    marginTop: '0px',
  },

  [`& .${classes.skillButton}`]: {
    /*background: '#682988',
    color: '#fff',
    justifyContent: 'center',
    marginRight: '2px',
    minWidth: '98px',*/
  },

  [`& .${classes.map}`]: {
    position: 'relative',
    border: '1px solid #eee',
    borderRadius: '2px',
    backgroundColor: theme.palette.grey[50],
  },

  [`& .${classes.mapSidePoints}`]: {
    borderRadius: '50%',
    height: '5px',
    width: '5px',
    marginTop: '5px',
    marginLeft: '5px',
  },
  [`& .${classes.mapIndicator}`]: {
    position: 'absolute',
    backgroundColor: theme.palette.common.white,
    right: '3px',
    bottom: '3px',
    width: '130px',
    border: '1px solid #eee',
    borderRadius: '5px',
    boxShadow: theme.shadows[3],
    padding: '5px',
  },

  [`& .${classes.tabListBox}`]: {
    // maxWidth: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  [`& .${classes.TabPanelBox}`]: {
    maxWidth: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    border: '1px solid #eee',
    borderRadius: '2px',
    backgroundColor: theme.palette.grey[50],
    minHeight: '450px',
    width: '100%',
  },

  [`& .${classes.TabPanelBox}>div:not([hidden])`]: {
    width: '100%',
    height: '100%',
    minHeight: '480px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  [`& .${classes.TabPanelBox}>div>div`]: {
    width: '100%',
    maxWidth: '640px',
  },
}));

export const StyledBox = styled(Box)(({theme}) => ({
  border: '2px solid #d3d4d4',
  background: '#fff',
  padding: 20,
  perspective: '1000px',
  overflow: 'hidden',
  maxWidth: '640px',
  width: '100%',

  [`& .map-svgs`]: {
    borderRadius: '5px',
    // boxShadow: theme.shadows[3],
    // marginBottom: '29px',
    width: '100%',
    height: '640px',
    marginTop: '0px',
    position: 'relative',
    transition: 'transform 1s ease-out',
  },

  [`& .map-svgs svg`]: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    transition: 'transform 1s ease-out',
  },

  [`& .hidden`]: {
    pointerEvents: 'none !important',
    opacity: 0,
  },

  [`& .map-svgs svg.map-names`]: {
    pointerEvents: 'none',
  },

  [`& .map-svgs svg.demand-map polygon`]: {
    fill: DemandColor,
  },

  [`& .map-svgs svg.supply-map polygon`]: {
    fill: SupplyColor,
  },

  [`& .map-svgs svg>g>g`]: {
    cursor: 'pointer',
  },

  [`& .map-svgs svg>g>g:hover`]: {
    filter: 'drop-shadow(0px 0px 5px blue)',
    stroke: 'blue',
  },

  [`& .map-svgs svg text`]: {
    fontSize: '0.5rem',
    pointerEvents: 'none',
  },

  [`& .map-ui`]: {
    display: 'block',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'auto',
    pointerEvents: 'none',
  },

  [`& .map-ui > div`]: {
    display: 'block',
    position: 'relative',
    pointerEvents: 'all',
  },

  [`& .map-ui .toggle-ds`]: {
    display: 'block',
    position: 'absolute',
    top: 16,
    right: 16,
    borderRadius: 4,
    height: 'auto',
    overflow: 'auto',
    padding: '6px 12px',
    background: '#ddd',
    transform: 'translateZ(0px)',
  },

  [`& .map-ui .level-wrap`]: {
    display: 'flex',
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100%',
    height: '100%',
    overflow: 'auto',
    padding: '0px',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none',
  },

  [`& .map-ui .level-1`]: {
    display: 'none',
    position: 'relative',
    backgroundColor: '#eee',
    borderRadius: 8,
    padding: '16px',
    margin: '16px',
    pointerEvents: 'all',
    filter: 'drop-shadow(0px 0px 5px #0008)',
    transform: 'translateZ(0px)',
  },

  [`& .map-ui .level-1.first-level`]: {
    [`.ct-grids`]: {display: 'none'},
    [`.ct-labels`]: {display: 'none'},
  },

  [`& .map-ui .level-1:last-child:not(.hidden)`]: {
    display: 'block',
  },

  [`& .map-ui .level-1:last-child:first-child`]: {
    display: 'block !important',
  },

  [`& .map-ui .level-1 h3`]: {
    margin: '0 0 16px 40px',
  },

  [`& .map-ui .level-1 .back-btn`]: {
    position: 'absolute',
    top: 5,
    left: 7,
    width: '40px',
    height: '40px',
    cursor: 'pointer',
    [`&::before`]: {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 15,
      left: 15,
      width: '10px',
      height: '10px',
      border: '1px solid black',
      borderTopColor: 'transparent',
      borderRightColor: 'transparent',
      transform: 'rotate(45deg)',
    },
  },
}));

const svgNS = 'http://www.w3.org/2000/svg';
const svgScale = 100;

const svgViewBox = `${svgScale * 87.9} ${-svgScale * 26.7} ${svgScale * 4.9} ${
  svgScale * 6.1
}`;

export const SVG = (tag = 'g', id = '') => {
  const el = document.createElementNS(svgNS, tag);
  if (id) {
    el.setAttributeNS(svgNS, 'id', id);
    el.setAttribute('id', id);
  }
  return el;
};

export const DIV = (className = '', id = '') => {
  const el = document.createElement('div');
  el.className = className;
  if (id) {
    el.setAttribute('id', id);
  }
  return el;
};

export const centerPoint = ({x, y, width, height}: SVGRect) => ({
  x: x + width / 2,
  y: y + height / 2,
});

const GraphMapView = () => {
  // const {messages} = useIntl();

  // const [isOpened, setIsOpened] = useState(false);
  // const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    document.head.innerHTML +=
      '<link rel="stylesheet" href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css">';
    return () => {
      // elem.remove();
      // document.documentElement.removeEventListener('mousemove', mousemoveCB);
    };
  }, []);

  const graph1RefCB = useCallback((node) => {
    if (!node || node.children.length > 0) return;
    // console.clear();
    const labels = ['Jobs', 'Skills'];
    let currentDistrict = '';

    const defocusDistrict = (e: MouseEvent) => {
      div.style.transform = 'none';
      div.style.pointerEvents = 'all';
      L1Div.classList.add('hidden');
    };

    const focusDistrict = (e: MouseEvent) => {
      console.log(e);
      // @ts-ignore
      const g = e.target.parentElement;
      const forDemand = g.getAttribute('demand-district-name');
      const forSupply = g.getAttribute('supply-district-name');
      let district: any = '';
      if (forDemand) {
        district = forDemand;
      } else {
        district = forSupply;
      }
      currentDistrict = district;
      // const box = g.getBBox();
      // const cen = centerPoint(box);
      const rc1 = div.getBoundingClientRect();
      const rc2 = g.getBoundingClientRect();
      const cnX = rc2.width / 2;
      const cnY = rc2.height / 2;
      const toX = rc2.left - rc1.left + cnX;
      const toY = rc2.top - rc1.top + cnY;
      const mvX = -toX + rc1.width / 2;
      const mvY = -toY + rc1.height / 2;

      div.style.transformOrigin = `${toX}px ${toY}px`;
      div.style.transform = `translate(${mvX}px,${mvY}px) rotateX(45deg) scale(${
        0.8 * Math.sqrt((rc1.width * rc1.height) / (rc2.width * rc2.height))
      })`;
      div.style.pointerEvents = 'none';
      // svg1.style.transformOrigin = `${toX}px ${toY}px`;
      // svg1.style.transform = `rotate(30deg)`;
      // svg2.style.transformOrigin = `${toX}px ${toY}px`;
      // svg2.style.transform = `rotate(30deg)`;
      // svg3.style.transformOrigin = `${toX}px ${toY}px`;
      // svg3.style.transform = `rotate(30deg)`;

      L1DivTitle.innerHTML = `<h3>${district.trim()} <br><span style="font-size:16px;">Total youth: ${
        // @ts-ignore
        Youths[district]
      }</span></h3>`;
      L1DivChart.innerHTML = ``;
      // console.log(Chartist, [DemandTotals[currentDistrict], SupplyTotals[currentDistrict]]);
      const chart = new Chartist.Bar(
        L1DivChart,
        {
          labels,
          series: [
            DemandTotals[currentDistrict],
            SupplyTotals[currentDistrict],
          ],
        },
        {
          distributeSeries: true,
        },
      ).on('draw', (data: any) => {
        if (data.type === 'bar') {
          console.log(data);
          const isDemand = data.axisX.ticks[data.seriesIndex] == labels[0];
          data.element.attr({
            style: `stroke-width: 0px; cursor:pointer; stroke:${
              isDemand ? DemandColor : SupplyColor
            };`,
          });
          // data.element._node.onclick = (e: any) => {
          //   showLevelTwo(isDemand);
          // };
          const cir = new Chartist.Svg(
            'circle',
            {
              style: 'cursor:pointer;',
              cx: `${data.x1 - 15}`,
              cy: `${data.y1 - 50}`,
              r: 50,
              fill: `${isDemand ? DemandColor : SupplyColor}`,
            },
            '',
          );
          data.group.append(cir);
          cir._node.onclick = (e: any) => {
            showLevelTwo(isDemand);
          };
          const txt = new Chartist.Svg(
            'text',
            {
              x: `${data.x1 - 15}`,
              y: `${data.y1 - 50}`,
              style: 'pointer-events:none;',
              'dominant-baseline': `middle`,
              'text-anchor': `middle`,
              fill: `#fff`,
              'font-size': 18,
            },
            '',
          );
          txt._node.innerHTML = data.value.y;
          data.group.append(txt);
          const txt2 = new Chartist.Svg(
            'text',
            {
              x: `${data.x1 - 15}`,
              y: `${data.y1 + 15}`,
              style: 'pointer-events:none;',
              'dominant-baseline': `middle`,
              'text-anchor': `middle`,
              fill: `${isDemand ? DemandColor : SupplyColor}`,
              'font-size': 18,
            },
            '',
          );
          txt2._node.innerHTML = labels[data.seriesIndex];
          data.group.append(txt2);
        }
      });

      setTimeout(() => {
        L1Div.classList.remove('hidden');
      }, 1000);
    };

    const showLevelTwo = (isDemand = false) => {
      L2DivTitle.innerHTML = `<h3>${currentDistrict.trim()}: ${
        isDemand ? 'Jobs' : 'Skills'
      }</h3>`;
      L2DivChart.innerHTML = ``;
      // console.log(Chartist, [DemandTotals[currentDistrict], SupplyTotals[currentDistrict]]);
      const dataSet: any = isDemand ? Demand : Supply;
      // @ts-ignore
      new Chartist.Bar(
        L2DivChart,
        {
          labels: Object.keys(dataSet[currentDistrict]),
          // @ts-ignore
          series: Object.keys(dataSet[currentDistrict]).map((ind) =>
            Object.values(dataSet[currentDistrict][ind]).reduce(
              (p: any, c: any, i) => p + c,
              0,
            ),
          ),
        },
        {
          distributeSeries: true,
        },
      ).on('draw', (data: any) => {
        if (data.type === 'bar') {
          console.log(data);
          data.element.attr({
            style: `stroke-width: 15px; cursor:pointer; stroke:${
              isDemand ? DemandColor : SupplyColor
            };`,
          });
          data.element._node.onclick = (e: any) => {
            showLevelThree(isDemand, data.axisX.ticks[data.seriesIndex]);
          };
          const txt = new Chartist.Svg(
            'text',
            {
              x: `${data.x2}`,
              y: `${data.y2 - 7}`,
              'dominant-baseline': `middle`,
              'text-anchor': `middle`,
              fill: `${isDemand ? DemandColor : SupplyColor}`,
              'font-size': 12,
            },
            '',
          );
          txt._node.innerHTML = data.value.y;
          data.group.append(txt);
        }
      });
      Levels.appendChild(L2Div);
    };

    const showLevelThree = (isDemand = false, industry = '') => {
      L3DivTitle.innerHTML = `<h3>${currentDistrict.trim()}: ${
        isDemand ? 'Jobs' : 'Skills'
      } (${industry.trim()})</h3>`;
      L3DivChart.innerHTML = ``;
      const dataSet: any = isDemand ? Demand : Supply;
      console.log(Object.keys(dataSet[currentDistrict][industry]));
      console.log(
        Object.keys(dataSet[currentDistrict][industry]).map(
          (name) => dataSet[currentDistrict][industry][name],
        ),
      );
      new Chartist.Bar(
        L3DivChart,
        {
          labels: Object.keys(dataSet[currentDistrict][industry]),
          series: Object.keys(dataSet[currentDistrict][industry]).map(
            (name) => dataSet[currentDistrict][industry][name],
          ),
        },
        {
          distributeSeries: true,
        },
      ).on('draw', (data: any) => {
        if (data.type === 'bar') {
          console.log(data);
          data.element.attr({
            style: `stroke-width: 10px; cursor:pointer; stroke:${
              isDemand ? DemandColor : SupplyColor
            };`,
          });
          const txt = new Chartist.Svg(
            'text',
            {
              x: `${data.x2}`,
              y: `${data.y2 - 7}`,
              'dominant-baseline': `middle`,
              'text-anchor': `middle`,
              fill: `${isDemand ? DemandColor : SupplyColor}`,
              'font-size': 12,
            },
            '',
          );
          txt._node.innerHTML = data.value.y;
          data.group.append(txt);
        }
      });
      Levels.appendChild(L3Div);
    };

    console.log('PAGE >> ', Map);
    console.log('PAGE >> ', Districts);
    console.log('PAGE >> ', Demand); //23400
    console.log('PAGE >> ', Supply); //51200

    const DemandTotals: any = {};
    const SupplyTotals: any = {};
    // const DemandMax = 23400;
    // const SupplyMax = 51200;

    for (let k in Districts) {
      DemandTotals[k] = 0;
      SupplyTotals[k] = 0;
      // @ts-ignore
      Object.keys(Demand[k]).forEach((ind: any) => {
        // @ts-ignore
        for (let occ in Demand[k][ind]) DemandTotals[k] += Demand[k][ind][occ];
      });
      // @ts-ignore
      Object.keys(Supply[k]).forEach((tss: any) => {
        // @ts-ignore
        for (let occ in Supply[k][tss]) SupplyTotals[k] += Supply[k][tss][occ];
      });
    }
    console.log('PAGE >> ', DemandTotals);
    console.log('PAGE >> ', SupplyTotals);

    const div = DIV();
    div.className = 'map-svgs';
    node.appendChild(div);

    const UI = DIV();
    UI.className = 'map-ui';
    node.appendChild(UI);

    const svg1 = SVG('svg', 'demand-map');
    svg1.setAttribute('viewBox', svgViewBox);
    svg1.setAttribute('class', 'demand-map hidden');
    div.appendChild(svg1);
    const G1 = SVG('g', 'top-group-1');
    svg1.appendChild(G1);

    const svg2 = SVG('svg', 'supply-map');
    svg2.setAttribute('viewBox', svgViewBox);
    svg2.setAttribute('class', 'supply-map');
    div.appendChild(svg2);
    const G2 = SVG('g', 'top-group-2');
    svg2.appendChild(G2);

    const svg3 = SVG('svg', 'map-names');
    svg3.setAttribute('viewBox', svgViewBox);
    svg3.setAttribute('class', 'map-names');
    div.appendChild(svg3);
    const G3 = SVG('g', 'top-group-3');
    svg3.appendChild(G3);

    const MapIndexed: any = {};
    Map.features.forEach((v, i) => {
      MapIndexed[v.properties.ADM2_EN] = v;
      if (v.geometry.type == 'MultiPolygon' && null) console.log('');

      const g1 = SVG('g');
      g1.setAttribute('demand-district-name', v.properties.ADM2_EN);
      G1.appendChild(g1);

      const g2 = SVG('g');
      g2.setAttribute('supply-district-name', v.properties.ADM2_EN);
      G2.appendChild(g2);

      v.geometry.coordinates.forEach((c, j) => {
        // draw
        const poly = `<polygon xfill="#FILL#" points="${c
          .map((d: any) =>
            v.geometry.type != 'MultiPolygon'
              ? [d[0] * svgScale, -d[1] * svgScale]
              : d.map((p: Array<number>) => [
                  p[0] * svgScale,
                  -p[1] * svgScale,
                ]),
          )
          .join(' ')}" />`;
        g1.innerHTML += poly;
        g2.innerHTML += poly;
      });
      g1.onclick = focusDistrict;
      g2.onclick = focusDistrict;
      // g1.innerHTML = g1.innerHTML.replace(/#FILL#/g, DemandColor);
      // g2.innerHTML = g2.innerHTML.replace(/#FILL#/g, SupplyColor);
      g1.setAttribute('title', v.properties.ADM2_EN);
      g2.setAttribute('title', v.properties.ADM2_EN);
      g1.setAttribute(
        'opacity',
        `${
          0.2 +
          0.8 * (Math.min(5000, DemandTotals[v.properties.ADM2_EN]) / 5000)
        }`,
      );
      g2.setAttribute(
        'opacity',
        `${
          0.2 +
          0.8 * (Math.min(20000, SupplyTotals[v.properties.ADM2_EN]) / 20000)
        }`,
      );
      // @ts-ignore
      const center = centerPoint(g1.getBBox());
      G3.innerHTML += `<text
          x="${center.x}"
          y="${center.y}"
          dominant-baseline="middle"
          text-anchor="middle"
      >${v.properties.ADM2_EN}</text>`;
    });

    //////////////////

    const toggleDS = DIV('toggle-ds');
    UI.appendChild(toggleDS);
    toggleDS.innerHTML = 'Show Supply';
    toggleDS.onclick = () => {
      if (toggleDS.innerHTML == 'Show Demand') {
        toggleDS.innerHTML = 'Show Supply';
        // toggleDS.style.backgroundColor = SupplyColor;
      } else {
        toggleDS.innerHTML = 'Show Demand';
        // toggleDS.style.backgroundColor = DemandColor;
      }
      svg1.classList.toggle('hidden');
      svg2.classList.toggle('hidden');
    };

    const Levels = DIV('level-wrap');
    UI.appendChild(Levels);

    const L1Div = DIV('level-1 first-level hidden');
    Levels.appendChild(L1Div);
    const L1DivTitle = DIV('level-title');
    L1Div.appendChild(L1DivTitle);
    L1DivTitle.innerHTML = `<h3>${''}</h3>`;
    const L1DivBtn = DIV('back-btn');
    L1Div.appendChild(L1DivBtn);
    L1DivBtn.onclick = defocusDistrict;
    const L1DivChart = DIV('level-chart');
    L1Div.appendChild(L1DivChart);

    const L2Div = DIV('level-1');
    // Levels.appendChild(L2Div);
    const L2DivTitle = DIV('level-title');
    L2Div.appendChild(L2DivTitle);
    L2DivTitle.innerHTML = `<h3>${''}</h3>`;
    const L2DivBtn = DIV('back-btn');
    L2Div.appendChild(L2DivBtn);
    L2DivBtn.onclick = () => L2Div.remove();
    const L2DivChart = DIV('level-chart');
    L2Div.appendChild(L2DivChart);

    const L3Div = DIV('level-1');
    // Levels.appendChild(L3Div);
    const L3DivTitle = DIV('level-title');
    L3Div.appendChild(L3DivTitle);
    L3DivTitle.innerHTML = `<h3>${''}</h3>`;
    const L3DivBtn = DIV('back-btn');
    L3Div.appendChild(L3DivBtn);
    L3DivBtn.onclick = () => L3Div.remove();
    const L3DivChart = DIV('level-chart');
    L3Div.appendChild(L3DivChart);

    // setIsReady(true);
  }, []);

  return (
    <StyledGrid container xl={12}>
      <Container maxWidth='lg' disableGutters>
        <SectionTitle
          title={`District wise skills and job` as string}
          center={true}
        />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <StyledBox ref={graph1RefCB} />
        </Box>
      </Container>
    </StyledGrid>
  );
};
export default GraphMapView;
