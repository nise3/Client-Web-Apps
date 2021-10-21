import React, {FC} from 'react';
import {YouthCertificate} from '../../../../services/youthManagement/typing';
import {Avatar, Box, Grid, Typography} from '@mui/material';
import {AccessTime, BorderColor, Verified} from '@mui/icons-material';
import TextPrimary from '../component/TextPrimary';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CustomParabolaButton from '../component/CustomParabolaButton';
import CircularDeleteButton from '../component/CircularDeleteButton';
import {useIntl} from 'react-intl';
import {getMomentDateFormat} from '../../../../@softbd/utilities/helpers';
import HorizontalLine from '../component/HorizontalLine';
import VerticalLine from '../component/VerticalLine';

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
  const {messages} = useIntl();

  return (
    <React.Fragment>
      {(certificates || []).map((certificate: YouthCertificate) => {
        return (
          <React.Fragment key={certificate.id}>
            <HorizontalLine />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={8} md={9}>
                <Box sx={{display: 'flex'}}>
                  {certificate.certificate_file_path ? (
                    <Avatar src={certificate.certificate_file_path} />
                  ) : (
                    <Avatar>
                      <Verified />
                    </Avatar>
                  )}

                  <Box sx={{marginLeft: '15px'}}>
                    <Typography variant={'subtitle2'}>
                      {certificate.certification_name}
                    </Typography>
                    <Typography variant={'caption'}>
                      {certificate.institute_name}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Grid container sx={{marginTop: '10px'}}>
                    <Grid item sx={{display: 'flex'}}>
                      <AccessTime color={'primary'} sx={{marginRight: '5px'}} />
                      <TextPrimary
                        text={
                          getMomentDateFormat(
                            certificate.start_date,
                            'DD MMM, YYYY',
                          ) +
                          ' to ' +
                          getMomentDateFormat(
                            certificate.end_date,
                            'DD MMM, YYYY',
                          )
                        }
                      />
                    </Grid>
                    <VerticalLine />
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
              <Grid item xs={12} sm={4} md={3}>
                <Box sx={{display: 'flex'}}>
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
            </Grid>
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
};

export default Certifications;
