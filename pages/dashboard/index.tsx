import PageMeta from '../../@crema/core/PageMeta';
import DashboardPage from '../../@softbd/layouts/hoc/DashboardPage';
import React from 'react';
import {useIntl} from 'react-intl';
import {H1} from '../../@softbd/elements/common';
import StyledTileSection from '../../modules/dashboard/StyledTileSection';

// const PREFIX = 'Dashboard';

// const classes = {
//   searchBox: `${PREFIX}-searchBox`,
//   searchInputBorderHide: `${PREFIX}-searchInputBorderHide`,
//   searchButton: `${PREFIX}-searchButton`,
//   list: `${PREFIX}-list`,
//   notificationBox: `${PREFIX}-notificationBox`,
//   card: `${PREFIX}-card`,
// };

// const StyledContainer = styled(Container)(({theme}) => ({
//   marginTop: 20,
//   marginBottom: 20,
//
//   [`& .${classes.searchBox}`]: {
//     padding: '10px 5px 5px',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//
//   [`& .${classes.searchInputBorderHide}`]: {
//     '& fieldset': {
//       border: 'none',
//     },
//     '& input': {
//       padding: '14px 0px',
//     },
//   },
//
//   [`& .${classes.searchButton}`]: {
//     color: '#fff',
//     padding: '8px 14px',
//     width: '95%',
//   },
//
//   [`& .${classes.list}`]: {
//     paddingTop: 0,
//     paddingBottom: 0,
//   },
//
//   [`& .${classes.notificationBox}`]: {
//     marginTop: 20,
//   },
//
//   [`& .${classes.card}`]: {
//     marginTop: 0,
//   },
// }));

export default DashboardPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['menu.dashboard'] as string} />
      {/*<H1>Dashboard</H1>*/}

      <StyledTileSection></StyledTileSection>
    </>
  );
});
