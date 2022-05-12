import React, {useCallback, useEffect, useRef, useState} from 'react';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import {Button, Grid} from '@mui/material';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import CVTemplateKeys from '../../youth/myCv/CVTemplateKeys';
import ClassicTemplate from '../../youth/myCv/templates/ClassicTemplate';
import ModernTemplate from '../../youth/myCv/templates/ModernTemplate';
import {useIntl} from 'react-intl';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import {useFetchCandidate} from '../../../services/IndustryManagement/hooks';

type Props = {
  onClose: () => void;
  youthData?: any;
};

const DivisionDetailsPopup = ({youthData, ...props}: Props) => {
  const {messages} = useIntl();
  const [selectedTemplateKey, setSelectedTemplateKey] = useState<string>(
    CVTemplateKeys.CLASSIC,
  );
  const {data} = useFetchCandidate(youthData?.id);
  console.log('data: ', data);

  useEffect(() => {
    if (youthData) {
      setSelectedTemplateKey(
        youthData?.youth_profile?.default_cv_template || CVTemplateKeys.CLASSIC,
      );
    }
  }, [youthData]);
  const getTemplate = () => {
    switch (selectedTemplateKey) {
      case CVTemplateKeys.CLASSIC:
        return <ClassicTemplate userData={youthData?.youth_profile} />;
      case CVTemplateKeys.MODERN:
        return <ModernTemplate userData={youthData?.youth_profile} />;
      default:
        return <ClassicTemplate userData={youthData?.youth_profile} />;
    }
  };
  const refer = useRef(null);
  const printCB = useCallback(() => {
    if (refer && refer.current) {
    } else return;
    // @ts-ignore
    const svg = refer.current.querySelector('svg');
    if (svg && svg.outerHTML) {
      const html = svg.outerHTML;
      const frameName = 'printIframe';
      // @ts-ignore
      let doc: any = window.frames[frameName];
      if (!doc) {
        const iframe = document.createElement('iframe');
        iframe.setAttribute('name', frameName);
        iframe.setAttribute('frameborder', '0');
        iframe.style.opacity = '0';
        iframe.style.width = '0';
        iframe.style.height = '0';
        iframe.style.bottom = '0';
        iframe.style.position = 'fixed';
        iframe.style.pointerEvents = 'none';
        document.body.appendChild(iframe);
        // @ts-ignore
        doc = window.frames[frameName];
      }
      doc.document.body.innerHTML = html;
      doc.window.print();
    }
  }, []);
  return (
    <>
      <CustomDetailsViewMuiModal
        maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
        open={true}
        {...props}
        title={
          <>
            <PersonPinIcon />
            <IntlMessages id='common.youth_cv' />
          </>
        }
        actions={
          <>
            <Button
              variant='contained'
              onClick={printCB}
              style={{float: 'right'}}>
              {messages['common.print']}
            </Button>
            <CancelButton onClick={props.onClose} isLoading={false} />
          </>
        }>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={12} md={12} ref={refer}>
            {youthData?.youth_profile && getTemplate()}
          </Grid>
        </Grid>
      </CustomDetailsViewMuiModal>
    </>
  );
};

export default DivisionDetailsPopup;
