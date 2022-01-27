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
  vacancy?: number;
  isLoading?: boolean;
  label?: string | MessageFormatElement[];
};

const CustomChipPaymentStatusStatus = ({
  value,
  vacancy,
  isLoading,
  label,
}: Props) => {
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
        icon={value == 1 ? <CheckCircleOutline /> : <CancelIcon />}
        color={value == 1 ? 'primary' : 'secondary'}
        label={
          value == 1 ? (
            <IntlMessages id='common.approved' />
          ) : value == 0 ? (
            <IntlMessages id='common.rejected' />
          ) : (
            <IntlMessages id='common.pending' />
          )
        }
      />
    </>
  );
};

export default React.memo(CustomChipPaymentStatusStatus);
