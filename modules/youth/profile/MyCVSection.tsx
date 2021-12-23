import {Button, Card, CardContent, Grid, useTheme} from '@mui/material';
import Image from 'next/image';
import youthCV from '../../../public/images/youth/youth-cv.jpg';
import React, {useContext} from 'react';
import {useIntl} from 'react-intl';
import {H2, Link} from '../../../@softbd/elements/common';
import {LINK_FRONTEND_YOUTH_MY_CV} from '../../../@softbd/common/appLinks';
import AppLocale from '../../../shared/localization';
import AppContextPropsType from '../../../redux/types/AppContextPropsType';
import typography from '../../../@softbd/layouts/themes/default/typography';
import AppContext from '../../../@crema/utility/AppContext';

const MyCVSection = () => {
  const {messages} = useIntl();
  const theme = useTheme();
  const {locale} = useContext<AppContextPropsType>(AppContext);
  const currentAppLocale = AppLocale[locale.locale];
  const result = typography(theme, currentAppLocale.locale);

  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <H2 sx={{...result.h6}}>{messages['youth_profile.my_cv']}</H2>
          </Grid>
          <Grid item xs={12}>
            <Image src={youthCV} />
          </Grid>
          <Grid item xs={12} sx={{textAlign: 'center'}}>
            <Link href={LINK_FRONTEND_YOUTH_MY_CV}>
              <Button variant={'contained'} color={'primary'} fullWidth={true}>
                {messages['common.view']}
              </Button>
            </Link>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MyCVSection;
