import React from 'react';
import {CheckCircleOutline} from '@mui/icons-material';
import CancelIcon from '@mui/icons-material/Cancel';
import FormLabel from '@mui/material/FormLabel';
import {MessageFormatElement} from '@formatjs/icu-messageformat-parser';
import TextInputSkeleton from '../../../@softbd/elements/display/skeleton/TextInputSkeleton/TextInputSkeleton';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CustomChip from '../../../@softbd/elements/display/CustomChip/CustomChip';
import {Fonts} from '../../../shared/constants/AppEnums';
import CertificationStatus from '../../../@softbd/utilities/CertificationStatus';

type Props = {
  value: number;
  isLoading?: boolean;
  label?: string | MessageFormatElement[];
};

const CustomChipPaymentStatusStatus = ({value, isLoading, label}: Props) => {
  return isLoading ? (
    <TextInputSkeleton />
  ) : (
    <>
      {label && (
        <FormLabel
          style={{
            fontWeight: Fonts.BOLD,
            fontSize: 14,
            marginBottom: '12px',
            display: 'block',
          }}>
          {label}
        </FormLabel>
      )}
      <CustomChip
        icon={
          value == 2 || value == 3 ? (
            <CheckCircleOutline />
          ) : value == 1 || value == 4 ? (
            <CancelIcon />
          ) : (
            <></>
          )
        }
        color={value == 2 || value == 3 ? 'primary' : 'secondary'}
        label={
          value == CertificationStatus.NOTSUBMITTED ? (
            <IntlMessages id='common.not_submitted' />
          ) : value == CertificationStatus.SUBMITTED ? (
            <IntlMessages id='common.submitted' />
          ) : value == CertificationStatus.CERTIFIED ? (
            <IntlMessages id='common.certified' />
          ) : value == CertificationStatus.NOTCERTIFIED ? (
            <IntlMessages id='common.not_certified' />
          ) : (
            <></>
          )
        }
      />
    </>
  );
};

export default React.memo(CustomChipPaymentStatusStatus);
