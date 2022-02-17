import React from 'react';
import {CheckCircleOutline} from '@mui/icons-material';
import CancelIcon from '@mui/icons-material/Cancel';
import FormLabel from '@mui/material/FormLabel';
import {MessageFormatElement} from '@formatjs/icu-messageformat-parser';
import TextInputSkeleton from '../../../@softbd/elements/display/skeleton/TextInputSkeleton/TextInputSkeleton';
import {Fonts} from '../../../shared/constants/AppEnums';
import CustomChip from '../../../@softbd/elements/display/CustomChip/CustomChip';
import IntlMessages from '../../../@crema/utility/IntlMessages';

type Props = {
  value: number;
  isLoading?: boolean;
  label?: string | MessageFormatElement[];
};

const CustomChipInviteType = ({value, isLoading, label}: Props) => {
  return isLoading ? (
    <TextInputSkeleton />
  ) : (
    <>
      {label && (
        <FormLabel
          sx={{
            fontWeight: Fonts.BOLD,
            fontSize: '14px',
            marginBottom: '12px',
            display: 'block',
          }}>
          {label}
        </FormLabel>
      )}
      <CustomChip
        icon={
          value == 4 ? (
            <CancelIcon fontSize={'small'} />
          ) : (
            <CheckCircleOutline fontSize={'small'} />
          )
        }
        color={value == 1 ? 'primary' : 'secondary'}
        label={
          value == 1 ? (
            <IntlMessages id='common.email' />
          ) : value == 2 ? (
            <IntlMessages id='common.sms' />
          ) : value == 3 ? (
            <IntlMessages id='common.email_sms' />
          ) : (
            <IntlMessages id='common.dont_send' />
          )
        }
      />
    </>
  );
};

export default React.memo(CustomChipInviteType);
