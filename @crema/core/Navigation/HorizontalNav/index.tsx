import React from 'react';
import HorizontalGroup from './HorizontalGroup';
import HorizontalCollapse from './HorizontalCollapse';
import HorizontalItem from './HorizontalItem';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';

import routesConfig from '../../../../modules/routesConfig';
import Box from '@mui/material/Box';

interface HorizontalNavProps {}

const HorizontalNav: React.FC<HorizontalNavProps> = () => {
  return (
    <List className='navbarNav'>
      {routesConfig.map((item: any) => (
        <React.Fragment key={item.id}>
          {item.type === 'group' && (
            <HorizontalGroup item={item} nestedLevel={0} />
          )}

          {item.type === 'collapse' && (
            <HorizontalCollapse item={item} nestedLevel={0} />
          )}

          {item.type === 'item' && <HorizontalItem item={item} />}

          {item.type === 'divider' && (
            <Box my={5} clone>
              <Divider />
            </Box>
          )}
        </React.Fragment>
      ))}
    </List>
  );
};

export default HorizontalNav;
