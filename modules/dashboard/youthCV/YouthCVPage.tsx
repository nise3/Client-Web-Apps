import {useRouter} from 'next/router';
import CVTemplateKeys from '../../youth/myCv/CVTemplateKeys';
import useStyles from '../../youth/myCv/index.style';
import {useIntl} from 'react-intl';
import React, {useCallback, useRef, useState} from 'react';
import ClassicTemplate from '../../youth/myCv/templates/ClassicTemplate';
import ModernTemplate from '../../youth/myCv/templates/ModernTemplate';
import {Button, CardMedia, Container, Grid, Typography} from '@mui/material';
import clsx from 'clsx';
import {useFetchYouthDetails} from '../../../services/youthManagement/hooks';

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
  const classes: any = useStyles();
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
    <Container maxWidth={'lg'} className={classes.root}>
      <Grid container spacing={5}>
        <Grid item xs={10} sm={10} md={6}>
          <Typography variant={'h5'} fontWeight={'bold'}>
            {messages['common.trainee_cv']}
          </Typography>
        </Grid>
        <Grid item xs={2} sm={2} md={2}>
          <Button
            variant='contained'
            onClick={printCB}
            style={{float: 'right'}}>
            Print
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
    </Container>
  );
};

export default YouthCVPage;
