import React, {useCallback, useEffect, useState} from 'react';
import {Container} from '@mui/material';
import VerifyCodeComponent from './VerifyCodeComponent';
import VerificationMethodComponent from './VerificationMethodComponent';
import {useRouter} from 'next/router';

const RegistrationVerification = () => {
  const router = useRouter();
  const params = router.query;
  const [isShowVerifyCodeBox, setIsShowVerifyCodeBox] = useState<boolean>(true);
  const [userEmailAndMobile, setUserEmailAndMobile] = useState<any>({});

  const onSendCodeSuccess = useCallback((data: any) => {
    setUserEmailAndMobile(data);
    setIsShowVerifyCodeBox(true);
  }, []);

  useEffect(() => {
    if (params.mobile) {
      setUserEmailAndMobile({
        mobile: params.mobile,
        redirected_from:params.redirected_from
      });
    } else if (params.email) {
      setUserEmailAndMobile({
        email: params.email,
        redirected_from:params.redirected_from
      });
    }
  }, [params]);

  return (
    <Container sx={{display: 'flex'}}>
      {isShowVerifyCodeBox ? (
        <VerifyCodeComponent userEmailAndMobile={userEmailAndMobile} />
      ) : (
        <VerificationMethodComponent onSendSuccess={onSendCodeSuccess} />
      )}
    </Container>
  );
};
export default RegistrationVerification;
