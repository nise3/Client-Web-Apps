import React from 'react';
import {styled} from '@mui/material/styles';
import {Button, Container, Grid} from '@mui/material';
import {Zoom} from 'react-awesome-reveal';
import Image from 'next/image';
import selfAssessmentImage from '../../public/images/self-assessment.png';
import {H3, Link, Text} from '../../@softbd/elements/common';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {useIntl} from 'react-intl';

const PREFIX = 'SelfAssessment';

const classes = {
  detailsButton: `${PREFIX}-detailsButton`,
};

const StyledContainer = styled(Container)(({theme}) => ({
  [`& .${classes.detailsButton}`]: {
    '& svg': {
      paddingLeft: '5px',
    },
  },
}));

const SelfAssessment = () => {
  const {messages} = useIntl();
  return (
    <StyledContainer maxWidth={'lg'}>
      <Grid
        container
        spacing={4}
        sx={{marginTop: '114px'}}
        alignItems={'center'}>
        <Grid item xs={12} md={8}>
          <H3 style={{fontSize: '44px', fontWeight: 'bold'}}>
            {messages['nise.assess_yourself']}
          </H3>
          <Text
            style={{fontSize: '22px', marginTop: '30px', marginBottom: '30px'}}>
            {messages['nise.assess_yourself_text']}
          </Text>
          <Link href={'/sc/self_assessment'}>
            <Button variant='contained' className={classes.detailsButton}>
              {messages['nise.lets_start']} <ArrowForwardIcon />
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12} md={4}>
          <Zoom>
            <Image src={selfAssessmentImage} alt={'self assessment image'} />
          </Zoom>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default SelfAssessment;
