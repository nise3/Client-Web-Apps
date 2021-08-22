import React, {ReactNode} from 'react';
import AppsHeader from '../@crema/core/AppsContainer/AppsHeader';
import {Box} from '@material-ui/core';
import AppsContent from '../@crema/core/AppsContainer/AppsContent';
import AppsContainer from '../@crema/core/AppsContainer';

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
    <AppsContainer fullView>
      <AppsHeader>
        <Box display='flex' flexDirection='row' alignItems='center' width={1}>
          {title && <h2>{title}</h2>}
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

export default PageBlock;