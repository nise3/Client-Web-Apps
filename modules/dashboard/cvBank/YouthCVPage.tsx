import {useRouter} from 'next/router';
import {styled} from '@mui/material/styles';
import CVTemplateKeys from '../../youth/myCv/CVTemplateKeys';
import {useIntl} from 'react-intl';
import React, {useCallback, useRef, useState} from 'react';
import ClassicTemplate from '../../youth/myCv/templates/ClassicTemplate';
import ModernTemplate from '../../youth/myCv/templates/ModernTemplate';
import {Button, CardMedia, Container, Grid, Typography} from '@mui/material';
import clsx from 'clsx';
import {useFetchYouthDetails} from '../../../services/youthManagement/hooks';
import Router from 'next/router';

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

const resumeTemplates = [
  {
    key: CVTemplateKeys.CLASSIC,
    name: 'Classic',
    demoImage: '/images/youth/youth-cv.jpg',
  },
  {
    key: CVTemplateKeys.MODERN,
    name: 'Modern',
    demoImage: '/images/youth/youth-cv-modern.png',
  },
  /*{
      key: CVTemplateKeys.COLORFUL,
      name: 'Colorful',
      demoImage: '/images/youth/youth-cv.jpg',
    },*/
];

const YouthCVPage = () => {
  const {messages} = useIntl();
  const router: any = useRouter();
  const {youthId} = router.query;
  const {data: youthData} = useFetchYouthDetails(youthId);

  const [selectedTemplateKey, setSelectedTemplateKey] = useState<string>(
    CVTemplateKeys.CLASSIC,
  );
  const onTemplateSelect = useCallback((key: string) => {
    setSelectedTemplateKey(key);
  }, []);

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
        <Grid item xs={8} sm={8} md={4}>
          <Typography variant={'h5'} fontWeight={'bold'}>
            {messages['common.youth_cv']}
          </Typography>
        </Grid>
        <Grid item xs={6} sm={2} md={2}>
          <Button
            variant='outlined'
            onClick={() => Router.back()}
            style={{float: 'right'}}>
            Back
          </Button>
        </Grid>
        <Grid item xs={6} sm={2} md={2}>
          <Button
            variant='contained'
            onClick={printCB}
            style={{float: 'right'}}>
            {messages['common.print']}
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={5} className={classes.rootContent}>
        <Grid item xs={12} sm={12} md={4}>
          <Typography variant={'h6'} fontWeight={'bold'}>
            {messages['cv_view.template_title']}
          </Typography>
          <Grid container spacing={5}>
            {resumeTemplates.map((template: any, index) => {
              return (
                <Grid item xs={4} key={index} sx={{textAlign: 'center'}}>
                  <CardMedia
                    component={'img'}
                    image={template.demoImage}
                    className={clsx(
                      classes.templateImage,
                      selectedTemplateKey == template.key
                        ? classes.templateSelected
                        : '',
                    )}
                    onClick={() => {
                      onTemplateSelect(template.key);
                    }}
                    style={{maxHeight: '92.44px'}}
                  />
                  <Typography>{template.name}</Typography>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={8} ref={refer}>
          {youthData && getTemplate()}
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default YouthCVPage;