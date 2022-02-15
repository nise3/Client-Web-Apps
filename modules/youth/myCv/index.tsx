import React, {useCallback, useEffect, useRef, useState} from 'react';
import {styled} from '@mui/material/styles';
import {
  Button,
  CardMedia,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import {useIntl} from 'react-intl';
import clsx from 'clsx';
import ClassicTemplate from './templates/ClassicTemplate';
import ModernTemplate from './templates/ModernTemplate';
import ColorfulTemplate from './templates/ColorfulTemplate';
import CVTemplateKeys from './CVTemplateKeys';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {YouthAuthUser} from '../../../redux/types/models/CommonAuthUser';
import {useFetchYouthDetails} from '../../../services/youthManagement/hooks';
import {updateYouthDefaultCVTemplate} from '../../../services/youthManagement/YouthService';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';

const PREFIX = 'MyCVPage';

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

const userDatax = {
  name: 'MD. Jubaer Sayed',
  cellNo: '01929257784',
  email: 'rrridoy18@gmail.com',
  address: 'House no: 25/1 Garish Ullah Road, Mill-para, Kushtia.',
  image: '/images/userPageImages/profileImage.jpeg',
  objective:
    'Clothing designer with industry experience in womens, mens and childrenswear. Highly self motivated and results driven. Take a keen interest in current trends and have a passion for all things fashion and clothing related. \n' +
    "Fast and effective. I want to be a part of your success by offering high motivation, responsibility, quality work and keeping deadlines. I'm working with following software: Wilcom es 1.5, Melco design shop v9, Corel Draw X6, Adobe Photoshop CS5.1, Adobe Illustrator CS5. I'm using high quality fonts for modern design.",
  educations: [
    {
      exam: 'B. Sc. in Textile Engineering',
      session: '2011-2012',
      institute: "The People's University of Bangladesh, Dhaka.",
      status: 'Fashion & Design',
    },
    {
      exam: 'National Skill Standard Basic (Graphics Design)',
      session: '2011',
      institute: 'Bangladesh Technical Education Board, Dhaka',
      result: 'A+',
    },
    {
      exam: 'Diploma in Textile Engineering',
      board: 'Dhaka',
      session: '2008-2009',
      institute: 'Pabna Textile Engineering College',
      result: 'A',
    },
    {
      exam: 'SSC',
      board: 'Dhaka',
      session: '2006',
      institute: 'Textile Vocational Institutes, Kushtia',
      result: 'A',
    },
  ],
  skills: [
    'Design Application (Wilcom es 1.5, Melco design shop v9, Corel Draw X6, Adobe Photoshop CS5, Adobe Illustrator CS5, AutoCAD)',
    'Experienced in Windows 98, Windows XP, Windows 7, Windows 8 OS environment.',
    'Office Applications (MS Word, MS Excel, MS Access, MS Power Point, MS Outlook).',
    'Internet: Blogging, Website Making, SEO, SMM, Browsing & E mail literacy.',
    'Hardware & Software Troubleshooting.\n - Trained by Path Finder Computer Training Institutes, Pabna.',
  ],
  languages: ['Good command over English ', 'Excellent command over Bengali'],
  jobExperiences: [
    {
      id: 1,
      companyName: 'SoftBd Ltd.',
      designation: 'Software Engineer',
      companyAddress:
        '8th & 13th Floor, 52/1 Hasan Holdings Limited, New Eskaton Road, Dhaka - 1000',
      companyPhone: '+8801823434453',
      companyEmail: 'info@soft-bd.com',
      companyWebsite: 'https://softbdltd.com/',
      joiningDate: '10-12-2016',
      leavingDate: '05-08-2018',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce porta rutrum ligula, at auctor arcu. Praesent viverra lacus id porta porttitor. Maecenas turpis sapien, varius eu porta a, pellentesque vitae lacus. Nulla a nisi sed purus ultrices dapibus. Curabitur feugiat, odio eget sagittis auctor, velit sapien mattis magna, sed consectetur sem dolor facilisis risus. Vestibulum ultricies consequat justo non ultrices. Quisque et velit quis dolor pretium viverra. Nullam pulvinar efficitur orci, eget eleifend ipsum efficitur in.',
    },
    {
      id: 2,
      companyName: 'SouthTech BD',
      designation: 'Software Engineer',
      companyAddress:
        '8th & 13th Floor, 52/1 Hasan Holdings Limited, New Eskaton Road, Dhaka - 1000',
      companyPhone: '+8801823434453',
      companyEmail: 'info@soft-bd.com',
      companyWebsite: 'https://softbdltd.com/',
      joiningDate: '20-09-2018',
      leavingDate: '',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce porta rutrum ligula, at auctor arcu. Praesent viverra lacus id porta porttitor. Maecenas turpis sapien, varius eu porta a, pellentesque vitae lacus. Nulla a nisi sed purus ultrices dapibus. Curabitur feugiat, odio eget sagittis auctor, velit sapien mattis magna, sed consectetur sem dolor facilisis risus. Vestibulum ultricies consequat justo non ultrices. Quisque et velit quis dolor pretium viverra. Nullam pulvinar efficitur orci, eget eleifend ipsum efficitur in.',
    },
  ],
};

const MyCVPage = () => {
  const userData = useAuthUser<YouthAuthUser>();
  const youthId = userData?.youthId;
  const {data: youthData} = useFetchYouthDetails(String(youthId));
  const [defaultTemplate, setDefaultTemplate] = useState('');
  const {updateSuccessMessage} = useSuccessMessage();

  const {messages} = useIntl();
  const [selectedTemplateKey, setSelectedTemplateKey] = useState<string>(
    CVTemplateKeys.CLASSIC,
  );

  const onTemplateSelect = useCallback((key: string) => {
    setSelectedTemplateKey(key);
  }, []);

  useEffect(() => {
    if (youthData) {
      setDefaultTemplate(youthData?.default_cv_template);
      setSelectedTemplateKey(youthData?.default_cv_template);
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

  const getTemplate = () => {
    switch (selectedTemplateKey) {
      case CVTemplateKeys.CLASSIC:
        return <ClassicTemplate userData={youthData} />;
      case CVTemplateKeys.MODERN:
        return <ModernTemplate userData={youthData} />;
      case CVTemplateKeys.COLORFUL:
        return <ColorfulTemplate userData={userDatax} />;
      default:
        return <ClassicTemplate userData={youthData} />;
    }
  };

  const handleChange = async (event: any) => {
    setDefaultTemplate(event.target.value);
    const data = {default_cv_template: event.target.value};
    setSelectedTemplateKey(event.target.value);
    try {
      await updateYouthDefaultCVTemplate(data);
      updateSuccessMessage('cv_view.default_cv_template');
    } catch (error: any) {
      console.log('updateYouthDefaultCVTemplate error: ', error);
    }
  };

  return (
    <StyledContainer maxWidth={'lg'}>
      <Grid container spacing={5}>
        <Grid item xs={10} sm={10} md={6}>
          <Typography variant={'h5'} fontWeight={'bold'}>
            {messages['common.my_cv']}
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
                  />
                  <Typography>{template.name}</Typography>
                </Grid>
              );
            })}
          </Grid>
          <FormControl sx={{marginTop: 5}}>
            <FormLabel id='demo-controlled-radio-buttons-group'>
              {messages['cv_view.set_default_cv_template']}
            </FormLabel>
            <RadioGroup
              aria-labelledby='set_default_cv_template'
              name='set_default_cv_template'
              value={defaultTemplate}
              onChange={handleChange}>
              <FormControlLabel
                value='CLASSIC'
                control={<Radio />}
                label='Classic'
              />
              <FormControlLabel
                value='MODERN'
                control={<Radio />}
                label='Modern'
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={8} ref={refer}>
          {youthData && getTemplate()}
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default MyCVPage;
