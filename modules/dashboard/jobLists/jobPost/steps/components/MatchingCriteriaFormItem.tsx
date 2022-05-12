import React from 'react';
import CustomFormSwitch from '../../../../../../@softbd/elements/input/CustomFormSwitch';
import {Box, Tooltip} from '@mui/material';
import {Help} from '@mui/icons-material';
import {useIntl} from 'react-intl';
import {Body2, Link} from '../../../../../../@softbd/elements/common';

interface Props {
  id: string;
  label: string;
  tooltipText?: string;
  register: any;
  additionalValue?: string | null;
  linkAdd?: string;
  linkEdit?: string;
  defaultChecked?: boolean;
  isLoading?: boolean;
  checkBoxComponent?: React.ReactNode;
  onChange?: (e: any) => any;
}

const MatchingCriteriaFormItem = ({
  id,
  label,
  register,
  tooltipText,
  additionalValue,
  linkAdd = '',
  linkEdit = '',
  defaultChecked = false,
  isLoading = false,
  checkBoxComponent,
  onChange: onChangeCallback,
}: Props) => {
  const {messages} = useIntl();

  return (
    <Box
      sx={{
        border: '1px solid #d1d1d1',
        padding: '8px',
        borderRadius: '5px',
      }}>
      <CustomFormSwitch
        id={id}
        label={label}
        additionalInfo={
          tooltipText && (
            <Tooltip
              arrow
              title={
                additionalValue ? label + ': ' + additionalValue : tooltipText
              }>
              <Help
                sx={{
                  marginLeft: '8px',
                }}
              />
            </Tooltip>
          )
        }
        yesLabel={messages['common.yes'] as string}
        noLabel={messages['common.no'] as string}
        register={register}
        defaultChecked={defaultChecked}
        isLoading={isLoading}
        onChange={(value: boolean) => {
          if (onChangeCallback && typeof onChangeCallback === 'function') {
            onChangeCallback(value);
          }
        }}
      />
      <Box ml={3} display={'inline-block'}>
        {checkBoxComponent ? checkBoxComponent : <>&nbsp;</>}
      </Box>
      <Body2
        sx={{
          display: checkBoxComponent ? 'block' : 'inline-block',
        }}
        mt={'3px'}>
        <span
          style={{
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            display: 'inline-block',
            maxWidth: '90%',
            verticalAlign: 'bottom',
            fontWeight: 'bold',
          }}
          title={additionalValue ? additionalValue : ''}>
          {additionalValue
            ? additionalValue
            : messages['matching_criteria.value_not_provided']}{' '}
        </span>
        <Link
          href={additionalValue ? linkEdit : linkAdd}
          style={{
            color: 'blue',
            textDecoration: 'underline',
            marginLeft: '5px',
          }}>
          {additionalValue ? 'Edit' : 'Add'}
        </Link>
      </Body2>
    </Box>
  );
};

export default MatchingCriteriaFormItem;
