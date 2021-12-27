import {Button, Card, CardContent, Grid} from '@mui/material';
import Image from 'next/image';
import youthCV from '../../../public/images/youth/youth-cv.jpg';
import React from 'react';
import {useIntl} from 'react-intl';
import {H2, Link} from '../../../@softbd/elements/common';
import {LINK_FRONTEND_YOUTH_MY_CV} from '../../../@softbd/common/appLinks';
import {useCustomStyle} from '../../../@softbd/hooks/useCustomStyle';

const MyCVSection = () => {
  const {messages} = useIntl();
  const result = useCustomStyle();

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
