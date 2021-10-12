import React, {FC} from 'react';
import {Card, CardContent, Grid} from '@mui/material';
import ContentWithImageSkeleton from './ContentWithImageSkeleton';
import {H6} from '../../../../@softbd/elements/common';

interface ContentLayoutProps {
  title: React.ReactNode | string;
  actions?: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  contentSkeleton?: React.ReactNode;
}

const ContentLayout: FC<ContentLayoutProps> = ({
  title,
  actions,
  contentSkeleton = <ContentWithImageSkeleton />,
  children,
  ...props
}) => {
  return (
    <Card>
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <H6 sx={{fontWeight: 'bold'}}>{title}</H6>
          </Grid>
          {actions && (
            <Grid item container xs={6} justifyContent={'flex-end'}>
              {actions}
            </Grid>
          )}
        </Grid>

        {props.isLoading ? contentSkeleton : children}
      </CardContent>
    </Card>
  );
};

export default ContentLayout;
