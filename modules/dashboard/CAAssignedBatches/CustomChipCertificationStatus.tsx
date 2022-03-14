import React from 'react';
import {CheckCircleOutline} from '@mui/icons-material';
import CancelIcon from '@mui/icons-material/Cancel';
import FormLabel from '@mui/material/FormLabel';
import {MessageFormatElement} from '@formatjs/icu-messageformat-parser';
import TextInputSkeleton from '../../../@softbd/elements/display/skeleton/TextInputSkeleton/TextInputSkeleton';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CustomChip from '../../../@softbd/elements/display/CustomChip/CustomChip';
import {Fonts} from '../../../shared/constants/AppEnums';

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
          value == 1 || value == 3 ? (
            <CheckCircleOutline />
          ) : value == 2 || value == 4 ? (
            <CancelIcon />
          ) : (
            <></>
          )
        }
        color={value == 2 || value == 3 ? 'primary' : 'secondary'}
        label={
          value == 1 ? (
            <IntlMessages id='common.not_submitted' />
          ) : value == 2 ? (
            <IntlMessages id='common.submitted' />
          ) : value == 3 ? (
            <IntlMessages id='common.certified' />
          ) : value == 4 ? (
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
