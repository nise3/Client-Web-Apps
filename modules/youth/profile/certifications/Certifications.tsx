import React, {FC} from 'react';
import {YouthCertificate} from '../../../../services/youthManagement/typing';
import {Avatar, Box, Grid, Typography} from '@mui/material';
import {AccessTime, BorderColor, Verified} from '@mui/icons-material';
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

const PREFIX = 'Certifications';
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

  return (
    <React.Fragment>
      {(certificates || []).map((certificate: YouthCertificate) => {
        return (
          <React.Fragment key={certificate.id}>
            <HorizontalLine />
            <StyledGrid container spacing={2}>
              <Grid item xs={12} sm={8} md={8}>
                <Box sx={{display: 'flex'}}>
                  {certificate.certificate_file_path ? (
                    <Avatar
                      src={
                        certificate.certificate_file_path +
                        '?id=' +
                        certificate.id
                      }
                    />
                  ) : (
                    <Avatar>
                      <Verified />
                    </Avatar>
                  )}

                  <Box sx={{marginLeft: '15px'}}>
                    <Typography
                      variant={'subtitle2'}
                      className={classes.textStyle}>
                      {certificate.certification_name}
                    </Typography>
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
