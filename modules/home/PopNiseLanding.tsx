import {
  getBrowserCookie,
  setBrowserCookie,
} from '../../@softbd/libs/cookieInstance';
import {useEffect, useState} from 'react';
import CustomMuiModal from '../../@softbd/modals/CustomMuiModal/CustomMuiModal';
import {Box, Typography} from '@mui/material';
import {useIntl} from 'react-intl';
import Button from '@mui/material/Button';
import {POPUP_NISE_LANDING} from '../../shared/constants/AppConst';
import {Link} from '../../@softbd/elements/common';

const PopNiseLanding = () => {
  const {messages} = useIntl();
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);

  useEffect(() => {
    const popup_cookie = getBrowserCookie(POPUP_NISE_LANDING);
    if (popup_cookie == undefined || popup_cookie == 'undefined') {
      setIsOpenPopup(true);
    }
  }, []);

  const handleOnClose = () => {
    setBrowserCookie(POPUP_NISE_LANDING, '0');
    setIsOpenPopup(false);
  };

  return (
    <CustomMuiModal open={isOpenPopup} onClose={() => null}>
      <Box sx={{padding: '2rem'}}>
        <Typography>
          প্রশিক্ষিত যুবদের কর্মসংস্থানের লক্ষ্যে চাকুরি মেলায় ২০২২, খুলনা
        </Typography>
        <br />
        <Typography>
          যারা ৩০ মে ২০২২ তারিখে খুলনা জেলায় অনুষ্ঠিতব্য চাকুরি মেলায় অংশগ্রহণের
          জন্য NISE (
          <Link
            href={'https://nise.gov.bd/'}
            passHref={true}
            target={'_blank'}
            style={{color: 'blue', textDecoration: 'underline'}}>
            https://nise.gov.bd/
          </Link>
          ) প্ল্যাটফর্মে নিবন্ধন করেছেন, তাদেরকে সকল কাগজপত্রসহ
          (সার্টিফিকেটসমূহ, সিভি, জন্ম সনদ/এনআইডি) সশরীরে সকাল ১০ টার মধ্যে
          সুন্দরবন ইন্সটিটিউট অব টেকনোলজি, বয়রায় উপস্থিত হওয়ার জন্য অনুরোধ করা
          হলো।
        </Typography>
        <br />
        <Typography>
          তারিখঃ ৩০মে ২০২২ সময়ঃ সকাল ১০:০০ - বিকাল ৪:00
          <br /> স্থানঃ সুন্দরবন ইন্সটিটিউট অব টেকনোলজি, বয়রা, খুলনা
        </Typography>
        <Button
          onClick={handleOnClose}
          sx={{margin: '1rem 0px', display: 'block', marginLeft: 'auto'}}
          variant={'outlined'}>
          {messages['common.close']}
        </Button>
      </Box>
    </CustomMuiModal>
  );
};

export default PopNiseLanding;
