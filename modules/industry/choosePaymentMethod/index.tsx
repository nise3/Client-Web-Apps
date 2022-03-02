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
import {COOKIE_NASCIB_MEMBER_REGISTRATION_PAYMENT_ID} from '../../../shared/constants/AppConst';
import {industryDomain} from '../../../@softbd/common/constants';
import {nascibMemberRegistrationPaymentPay} from '../../../services/IndustryAssociationManagement/IndustryAssociationRegistrationService';

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

const ChoosePayment = () => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const router = useRouter();
  const {paymentId}: any = router.query;
  const [isDisableLayout, setIsDisableLayout] = useState<boolean>(false);

  const onPaymentMethodSelect = useCallback(
    (method: number) => {
      if (!isDisableLayout) {
        (async () => {
          try {
            setIsDisableLayout(true);
            if (paymentId) {
              const paymentRedirectTo =
                industryDomain() + '/nascib-member-registration-payment/';

              let data = {
                payment_gateway_type: method,
                member_identity_key: paymentId,
                feed_uri: {
                  success_url: paymentRedirectTo + 'success',
                  failed_url: paymentRedirectTo + 'failed',
                  cancel_url: paymentRedirectTo + 'cancelled',
                },
              };

              const response = await nascibMemberRegistrationPaymentPay(data);

              if (response?.redirect_url) {
                let expireDate = new Date();
                expireDate.setTime(new Date().getTime() + 1000 * 60 * 60);
                setBrowserCookie(
                  COOKIE_NASCIB_MEMBER_REGISTRATION_PAYMENT_ID,
                  paymentId,
                  {
                    expires: expireDate,
                  },
                );

                window.location.href = response?.redirect_url;
              }
            } else {
              errorStack(<IntlMessages id={'common.missing_enrollment_id'} />);
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
            alt='ssl'
            title='ssl'
            className={clsx(classes.img, classes.imgActive)}
            onClick={() => onPaymentMethodSelect(PaymentMethods.SSL)}
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

export default ChoosePayment;
