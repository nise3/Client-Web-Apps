import React, {ReactNode} from 'react';
import AppsHeader from '../../@crema/core/AppsContainer/AppsHeader';
import {Box, makeStyles, Theme, Typography} from '@material-ui/core';
import AppsContent from '../../@crema/core/AppsContainer/AppsContent';
import AppsContainer from '../../@crema/core/AppsContainer';

const useStyles = makeStyles((theme: Theme): any => ({
  pageTitle: {
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
  const classes: any = useStyles();

  return (
    <AppsContainer fullView>
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
    </AppsContainer>
  );
};

export default React.memo(PageBlock);
