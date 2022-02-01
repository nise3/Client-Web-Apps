import HorizontalLine from '../component/HorizontalLine';
import React from 'react';
import {Avatar, Box, Grid, Typography} from '@mui/material';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import CustomParabolaButton from '../component/CustomParabolaButton';
import {BorderColor, Email, LocationOn} from '@mui/icons-material';
import {useIntl} from 'react-intl';
import CircularDeleteButton from '../component/CircularDeleteButton';
import {YouthReference} from '../../../../services/youthManagement/typing';
import TextPrimary from '../component/TextPrimary';
import VerticalLine from '../component/VerticalLine';
import {styled} from '@mui/material/styles';
import {Fonts, ThemeMode} from '../../../../shared/constants/AppEnums';
import {H3} from '../../../../@softbd/elements/common';
import {useCustomStyle} from '../../../../@softbd/hooks/useCustomStyle';

const PREFIX = 'References';
const classes = {
  textStyle: `${PREFIX}-textStyle`,
};

const StyledGrid = styled(Grid)(({theme}) => ({
  [`& .${classes.textStyle}`]: {
    color:
      theme.palette.mode === ThemeMode.DARK
        ? theme.palette.common.white
        : theme.palette.common.black,
    fontWeight: Fonts.BOLD,
  },
}));

type ReferencesProp = {
  references: Array<YouthReference> | undefined;
  openReferenceAddEditForm: (referenceId: number) => void;
  onDeleteReference: (referenceId: number) => void;
};

const References = ({
  references,
  openReferenceAddEditForm,
  onDeleteReference,
}: ReferencesProp) => {
  const {messages} = useIntl();
  const result = useCustomStyle();

  return (
    <React.Fragment>
      {(references || []).map((reference: any) => (
        <React.Fragment key={reference?.id}>
          <HorizontalLine />

          <Grid container justifyContent={'space-between'}>
            <Grid item xs={12} md={8}>
              <Grid container>
                <Grid item xs={4} md={2}>
                  <Avatar
                    alt='Reference logo'
                    src={'/images/placeholder.jpg'}
                    sx={{height: 80, width: 80}}
                  />
                </Grid>
                <StyledGrid item xs={8} md={10}>
                  <Box>
                    <H3
                      sx={{...result.subtitle2}}
                      className={classes.textStyle}>
                      {reference?.referrer_first_name}{' '}
                      {reference?.referrer_last_name}
                    </H3>
                    <Typography variant={'caption'}>
                      {reference?.referrer_designation},
                    </Typography>
                    <Typography variant={'caption'}>
                      {reference?.referrer_organization_name}
                    </Typography>
                    <Box>
                      <Grid container sx={{marginTop: '10px'}}>
                        <Grid item sx={{display: 'flex'}}>
                          <Email color={'primary'} sx={{marginRight: '5px'}} />
                          <TextPrimary text={reference?.referrer_email} />
                        </Grid>
                        <VerticalLine />
                        <Grid item sx={{display: 'flex'}}>
                          <LocalPhoneIcon
                            color={'primary'}
                            sx={{marginRight: '5px'}}
                          />
                          <TextPrimary text={reference?.referrer_mobile} />
                        </Grid>
                        <VerticalLine />
                        <Grid item sx={{display: 'flex'}}>
                          <LocationOn
                            color={'primary'}
                            sx={{marginRight: '5px'}}
                          />
                          <TextPrimary text={reference?.referrer_address} />
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </StyledGrid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <Grid container justifyContent={'center'}>
                <Box mt={2}>
                  <CustomParabolaButton
                    buttonVariant={'outlined'}
                    title={messages['common.edit_btn'] as string}
                    icon={<BorderColor />}
                    onClick={() => {
                      openReferenceAddEditForm(reference.id);
                    }}
                  />
                  <CircularDeleteButton
                    deleteAction={() => {
                      onDeleteReference(reference.id);
                    }}
                    deleteTitle={'Delete'}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};
export default References;
