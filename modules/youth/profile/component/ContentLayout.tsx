import React, {FC, useContext} from 'react';
import {Card, CardContent, Grid, useTheme} from '@mui/material';
import ContentWithImageSkeleton from './ContentWithImageSkeleton';
import {H2} from '../../../../@softbd/elements/common';
import {styled} from '@mui/material/styles';
import {Fonts, ThemeMode} from '../../../../shared/constants/AppEnums';
import AppContextPropsType from '../../../../redux/types/AppContextPropsType';
import AppContext from '../../../../@crema/utility/AppContext';
import AppLocale from '../../../../shared/localization';
import typography from '../../../../@softbd/layouts/themes/default/typography';

const PREFIX = 'ContentLayout';

const classes = {
  textStyle: `${PREFIX}-textStyle`,
};

const StyledCard = styled(Card)(({theme}) => ({
  [`& .${classes.textStyle}`]: {
    color:
      theme.palette.mode === ThemeMode.DARK
        ? theme.palette.common.white
        : theme.palette.common.black,
    fontWeight: Fonts.BOLD,
  },
}));

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
  const theme = useTheme();
  const {locale} = useContext<AppContextPropsType>(AppContext);
  const currentAppLocale = AppLocale[locale.locale];
  const result = typography(theme, currentAppLocale.locale);

  return (
    <StyledCard>
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <H2
              sx={{
                ...result.h6,
              }}
              className={classes.textStyle}>
              {title}
            </H2>
          </Grid>
          {actions && (
            <Grid item xs={6} sx={{textAlign: 'right'}}>
              {actions}
            </Grid>
          )}
        </Grid>

        {props.isLoading ? contentSkeleton : children}
      </CardContent>
    </StyledCard>
  );
};

export default ContentLayout;
