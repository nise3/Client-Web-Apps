import React from 'react';
import {Theme} from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import {Button, Container, Grid, Typography} from '@mui/material';
import {Zoom} from 'react-awesome-reveal';
import Image from 'next/image';
import selfAssessmentImage from '../../public/images/self-assessment.png';
import {H4} from '../../@softbd/elements/common';
import {ArrowRight} from '@mui/icons-material';
import {useIntl} from 'react-intl';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    detailsButton: {
      background: '#682988',
      color: '#fff',
      justifyContent: 'center',
    },
    assessmentImage: {
      height: '340px',
    },
  }),
);

const SelfAssessment = () => {
  const classes = useStyles();
  const {messages} = useIntl();
  return (
    <Container maxWidth={'lg'}>
      <Grid container spacing={4} mt={{xs: 2, md: 5}} alignItems={'center'}>
        <Grid item xs={12} md={8}>
          <H4>{messages['nise.assess_yourself']}</H4>
          <Typography variant='subtitle1' my={{xs: 4}}>
            {messages['nise.assess_yourself_text']}
          </Typography>
          <Button variant='contained' className={classes.detailsButton}>
            {messages['nise.lets_start']}
            <ArrowRight />
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <Zoom>
            <Image src={selfAssessmentImage} alt={'self assessment image'} />
          </Zoom>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SelfAssessment;
