import React, {useCallback, useState} from 'react';
import {styled} from '@mui/material/styles';
import {Box, CardMedia, Container, Paper, Typography} from '@mui/material';
import {useIntl} from 'react-intl';
import {useRouter} from 'next/router';
import clsx from 'clsx';
import {PaymentMethods} from '../../../@softbd/utilities/PaymentMethods';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {setBrowserCookie} from '../../../@softbd/libs/cookieInstance';
import {COOKIE_KEY_ASSESSMENT_ID} from '../../../shared/constants/AppConst';
import {youthDomain} from '../../../@softbd/common/constants';
import {assessmentPaymentPay} from '../../../services/youthManagement/YouthService';

const PREFIX = 'ChoosePayment';

const classes = {
  paperBox: `${PREFIX}-paperBox`,
  btn: `${PREFIX}-btn`,
  img: `${PREFIX}-img`,
  imgActive: `${PREFIX}-imgActive`,
  imageWrapper: `${PREFIX}-imageWrapper`,
};

const StyledContainer = styled(Container)(({theme}) => ({
  display: 'flex',

  [`& .${classes.paperBox}`]: {
    margin: 'auto',
  },

  [`& .${classes.btn}`]: {
    marginTop: '12px',
    width: '100px',
  },

  [`& .${classes.img}`]: {
    width: '120px',
    border: '1px solid #fff',
    objectFit: 'contain',
    borderRadius: '10px',
    padding: '0px 10px',
    '&:hover': {
      border: '1px solid #42b326',
      cursor: 'pointer',
    },
    '&:not(:first-of-type)': {
      marginLeft: '10px',
    },
  },
  [`& .${classes.imgActive}`]: {
    border: '1px solid #42b326',
    cursor: 'pointer',
  },
  [`& .${classes.imageWrapper}`]: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const AssessmentPaymentMethods = () => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const router = useRouter();
  const {assessmentId}: any = router.query;
  const [isDisableLayout, setIsDisableLayout] = useState<boolean>(false);

  const onPaymentMethodSelect = useCallback(
    (method: number) => {
      if (!isDisableLayout) {
        (async () => {
          try {
            setIsDisableLayout(true);
            if (assessmentId) {
              const paymentRedirectTo = youthDomain() + '/assessment-payment/';

              let data = {
                payment_gateway_type: method,
                assessment_id: assessmentId,
                feed_uri: {
                  success: paymentRedirectTo + 'success',
                  failed: paymentRedirectTo + 'failed',
                  cancel: paymentRedirectTo + 'cancelled',
                },
              };

              const response = await assessmentPaymentPay(data);

              if (response?.redirect_url) {
                let expireDate = new Date();
                expireDate.setTime(new Date().getTime() + 1000 * 60 * 60);
                setBrowserCookie(COOKIE_KEY_ASSESSMENT_ID, assessmentId, {
                  expires: expireDate,
                });

                window.location.href = response?.redirect_url;
              }
            } else {
              errorStack(<IntlMessages id={'common.missing_assessment_id'} />);
            }
          } catch (error: any) {
            setIsDisableLayout(false);
            errorStack(
              error.response?.data?._response_status?.message ||
                'Unknown Error',
            );
          }
        })();
      }
    },
    [isDisableLayout],
  );

  return (
    <StyledContainer maxWidth={'lg'}>
      <Paper style={{padding: '20px'}} className={classes.paperBox}>
        <Typography variant={'h6'} style={{fontWeight: 'bold'}} mb={5}>
          {messages['common.choose_payment_method']}
        </Typography>
        <Box className={classes.imageWrapper}>
          <CardMedia
            component='img'
            height='70'
            image='/images/payment/ekpay.png'
            alt='ekpay'
            title='ekpay'
            className={clsx(classes.img, classes.imgActive)}
            onClick={() => onPaymentMethodSelect(PaymentMethods.EK_PAY)}
          />
          {/*<CardMedia
            component='img'
            height='70'
            image='/images/payment/bkash.png'
            alt='bkash'
            title='bkash'
            className={classes.img}
          />
          <CardMedia
            component='img'
            height='70'
            image='/images/payment/nagad.png'
            alt='nagad'
            title='nagad'
            className={classes.img}
          />
          <CardMedia
            component='img'
            height='70'
            image='/images/payment/rocket.jpg'
            alt='rocket'
            title='rocket'
            className={classes.img}
          />
          <CardMedia
            component='img'
            height='70'
            image='/images/payment/mycash.jpg'
            alt='mycash'
            title='mycash'
            className={classes.img}
          />*/}
        </Box>
      </Paper>
    </StyledContainer>
  );
};

export default AssessmentPaymentMethods;
