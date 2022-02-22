import Router, {useRouter} from 'next/router';
import {styled} from '@mui/material/styles';
import CVTemplateKeys from '../../youth/myCv/CVTemplateKeys';
import {useIntl} from 'react-intl';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import ClassicTemplate from '../../youth/myCv/templates/ClassicTemplate';
import ModernTemplate from '../../youth/myCv/templates/ModernTemplate';
import {Button, Container, Grid, Typography} from '@mui/material';
import {useFetchYouthDetails} from '../../../services/youthManagement/hooks';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { jsPDF } from 'jspdf';
import 'svg2pdf.js'

const PREFIX = 'YouthCVPage';

const classes = {
  rootContent: `${PREFIX}-rootContent`,
  templateImage: `${PREFIX}-templateImage`,
  templateSelected: `${PREFIX}-templateSelected`,
};

const StyledContainer = styled(Container)(({theme}) => ({
  marginTop: 20,
  marginBottom: 20,

  [`& .${classes.rootContent}`]: {
    marginTop: 0,
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row-reverse',
    },
  },

  [`& .${classes.templateImage}`]: {
    cursor: 'pointer',
  },

  [`& .${classes.templateSelected}`]: {
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: theme.palette.primary.main,
  },
}));

const YouthCVPage = () => {
  const {messages} = useIntl();
  const router: any = useRouter();
  const {youthId} = router.query;
  const {data: youthData} = useFetchYouthDetails(youthId);

  const [selectedTemplateKey, setSelectedTemplateKey] = useState<string>(
    CVTemplateKeys.CLASSIC,
  );

  useEffect(() => {
    if (youthData) {
      setSelectedTemplateKey(
        youthData?.default_cv_template || CVTemplateKeys.CLASSIC,
      );
    }
  }, [youthData]);

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

  const downloadCB = useCallback(() => {


    const doc = new jsPDF('p',  'mm', [297, 210]);
    // const doc = new jsPDF({ filters: ["ASCIIHexEncode"] });
    const element = document.getElementById('svg');
    // doc.addFileToVFS('NotoSerifBengali-Regular.ttf', myFont);
    // doc.addFont("NotoSerifBengali-Regular.ttf", "NotoSerifBengali-Regular.ttf", "regular", undefined, "Identity-H");
    // doc.setFont("NotoSerifBengali-Regular.ttf", 'regular');
    // doc.setFontSize(10);
    // console.log('doc font ', doc.getFont());
    // console.log('doc font List', doc.getFontList());
    // console.log('svg elem ', element);

    doc
      .svg(element, {
        x:0,
        y:0,
        // width: 860,
        // height: 1216
      })
      .then(() => {
        // save the created pdf
        doc.save('myPDF.pdf')
      })
    // doc.svg(element, 0, 0, 500, 600);
    // doc.text('আমার সোনার বাংলা', 10, 10)
    // doc.save('save.pdf')
    // console.log('download');
  }, []);

  const getTemplate = () => {
    switch (selectedTemplateKey) {
      case CVTemplateKeys.CLASSIC:
        return <ClassicTemplate userData={youthData} />;
      case CVTemplateKeys.MODERN:
        return <ModernTemplate userData={youthData} />;
      default:
        return <ClassicTemplate userData={youthData} />;
    }
  };

  return (
    <StyledContainer maxWidth={'lg'}>
      <Grid container spacing={5}>
        <Grid item xs={6} sm={6} md={6}>
          <Typography variant={'h5'} fontWeight={'bold'}>
            {messages['common.youth_cv']}
          </Typography>
        </Grid>
        <Grid item xs={4} sm={2} md={2}>
          <Button
            startIcon={<ArrowBackIcon />}
            variant='outlined'
            onClick={() => Router.back()}
            style={{float: 'right'}}>
            {messages['common.back']}
          </Button>
        </Grid>
        <Grid item xs={4} sm={2} md={2}>
          <Button
            variant='contained'
            onClick={printCB}
            style={{float: 'right'}}>
            {messages['common.print']}
          </Button>
        </Grid>
        <Grid item xs={4} sm={2} md={2}>
          <Button
            variant='contained'
            onClick={downloadCB}
            style={{float: 'right'}}>
            {messages['common.download']}
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={5} className={classes.rootContent}>
        <Grid item xs={12} sm={12} md={12} ref={refer}>
          {youthData && getTemplate()}
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default YouthCVPage;
