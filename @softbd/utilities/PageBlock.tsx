import React, {ReactNode} from 'react';
import {styled} from '@mui/material/styles';
import AppsHeader from '../../@crema/core/AppsContainer/AppsHeader';
import {Box, Typography} from '@mui/material';
import AppsContent from '../../@crema/core/AppsContainer/AppsContent';
import AppsContainer from '../../@crema/core/AppsContainer';

const PREFIX = 'PageBlock';

const classes = {
  pageTitle: `${PREFIX}-pageTitle`,
};

const StyledAppsContainer = styled(AppsContainer)(({theme}): any => ({
  [`& .${classes.pageTitle}`]: {
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      marginRight: '12px',
    },
  },
}));

interface PageBlockProps {
  title?: string | ReactNode;
  sidebarContent?: ReactNode;
  fullView?: boolean;
  cardStyle?: any;
  children: ReactNode;
  extra?: ReactNode;
}

const PageBlock: React.FC<PageBlockProps> = ({children, title, extra}) => {
  return (
    <StyledAppsContainer fullView>
      <AppsHeader>
        <Box display='flex' flexDirection='row' alignItems='center' width={1}>
          {title && (
            <Box style={{display: 'flex', alignItems: 'center'}}>
              <Typography variant={'h6'} className={classes.pageTitle}>
                {title}
              </Typography>
            </Box>
          )}
          {extra && (
            <Box
              display='flex'
              flexDirection='row'
              alignItems='center'
              ml='auto'>
              {extra}
            </Box>
          )}
        </Box>
      </AppsHeader>
      <AppsContent>
        <div style={{margin: '10px'}}>{children}</div>
      </AppsContent>
    </StyledAppsContainer>
  );
};

export default React.memo(PageBlock);
