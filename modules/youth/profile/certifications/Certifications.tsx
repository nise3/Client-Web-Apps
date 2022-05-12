import React, {FC} from 'react';
import {YouthCertificate} from '../../../../services/youthManagement/typing';
import {Avatar, Box, Grid, IconButton, Typography} from '@mui/material';
import {AccessTime, BorderColor} from '@mui/icons-material';
import TextPrimary from '../component/TextPrimary';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CustomParabolaButton from '../component/CustomParabolaButton';
import CircularDeleteButton from '../component/CircularDeleteButton';
import {useIntl} from 'react-intl';
import {getIntlDateFromString} from '../../../../@softbd/utilities/helpers';
import HorizontalLine from '../component/HorizontalLine';
import VerticalLine from '../component/VerticalLine';
import {styled} from '@mui/material/styles';
import {Fonts, ThemeMode} from '../../../../shared/constants/AppEnums';
import {Link, S1} from '../../../../@softbd/elements/common';
import {useCustomStyle} from '../../../../@softbd/hooks/useCustomStyle';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {FILE_SERVER_FILE_VIEW_ENDPOINT} from '../../../../@softbd/common/apiRoutes';

const PREFIX = 'Certifications';
const classes = {
  textStyle: `${PREFIX}-textStyle`,
  buttonStyle: `${PREFIX}-buttonStyle`,
};

const StyledGrid = styled(Grid)(({theme}) => ({
  [`& .${classes.textStyle}`]: {
    color:
      theme.palette.mode === ThemeMode.DARK
        ? theme.palette.common.white
        : theme.palette.common.black,
    fontWeight: Fonts.BOLD,
  },
  [`& .${classes.buttonStyle}`]: {
    borderRadius: 40,
  },
}));

interface CertificationsProps {
  certificates: Array<YouthCertificate>;
  onEditClick: (id: number) => void;
  onDeleteClick: (id: number) => void;
}

const Certifications: FC<CertificationsProps> = ({
  certificates,
  onEditClick,
  onDeleteClick,
}) => {
  const {messages, formatDate} = useIntl();
  const result = useCustomStyle();

  return (
    <React.Fragment>
      {(certificates || []).map((certificate: YouthCertificate) => {
        return (
          <React.Fragment key={certificate.id}>
            <HorizontalLine />
            <StyledGrid container spacing={2}>
              <Grid item xs={12} sm={8} md={8}>
                <Box sx={{display: 'flex'}}>
                  <Avatar>
                    <CardMembershipIcon />
                  </Avatar>

                  <Box sx={{marginLeft: '15px'}}>
                    <S1
                      sx={{...result.subtitle2}}
                      className={classes.textStyle}>
                      {certificate.certification_name}
                    </S1>
                    <Typography variant={'caption'}>
                      {certificate.institute_name}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Grid container sx={{marginTop: '10px'}}>
                    {certificate?.start_date && (
                      <React.Fragment>
                        <Grid item sx={{display: 'flex'}}>
                          <AccessTime
                            color={'primary'}
                            sx={{marginRight: '5px'}}
                          />
                          <TextPrimary
                            text={
                              getIntlDateFromString(
                                formatDate,
                                certificate?.start_date,
                              ) +
                              messages['certificate.to'] +
                              getIntlDateFromString(
                                formatDate,
                                certificate?.end_date,
                              )
                            }
                          />
                        </Grid>
                        <VerticalLine />
                      </React.Fragment>
                    )}
                    <Grid item sx={{display: 'flex'}}>
                      <LocationOnIcon
                        color={'primary'}
                        sx={{marginRight: '5px'}}
                      />
                      <TextPrimary text={certificate.location} />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                  {certificate?.certificate_file_path && (
                    <Link
                      href={
                        FILE_SERVER_FILE_VIEW_ENDPOINT +
                        certificate.certificate_file_path
                      }
                      target={'_blank'}
                      style={{marginRight: '10px'}}>
                      <IconButton
                        color='primary'
                        aria-label='view certificate'
                        component='span'>
                        <VisibilityIcon />
                      </IconButton>
                    </Link>
                  )}
                  <CustomParabolaButton
                    buttonVariant={'outlined'}
                    title={messages['common.edit_btn'] as string}
                    icon={<BorderColor />}
                    onClick={() => {
                      onEditClick(certificate.id);
                    }}
                  />
                  <CircularDeleteButton
                    deleteAction={() => {
                      onDeleteClick(certificate.id);
                    }}
                    deleteTitle={'delete'}
                  />
                </Box>
              </Grid>
            </StyledGrid>
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
};

export default Certifications;
