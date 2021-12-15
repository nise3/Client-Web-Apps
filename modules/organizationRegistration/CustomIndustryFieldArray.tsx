import React from 'react';
import {
  Autocomplete,
  Button,
  ButtonGroup,
  FormControl,
  Grid,
  TextField,
} from '@mui/material';
import {Controller, useFieldArray} from 'react-hook-form';
import {useIntl} from 'react-intl';
import {AddCircleOutline, RemoveCircleOutline} from '@mui/icons-material';
import IntlMessages from '../../@crema/utility/IntlMessages';
import TextInputSkeleton from '../../@softbd/elements/display/skeleton/TextInputSkeleton/TextInputSkeleton';

type Props = {
  id: string;
  variant?: 'outlined' | 'standard' | 'filled';
  size?: 'small' | 'medium';
  labelLanguageId?: Array<any>;
  isLoading?: boolean;
  options?: Array<any>;
  register?: any;
  errors?: any;
  control?: any;
};

const CustomIndustryFieldArray = ({
  id,
  variant,
  size,
  labelLanguageId,
  options = [],
  isLoading,
  register,
  errors,
  control,
}: Props) => {
  const {messages} = useIntl();

  const getTitle = (
    option: any,
    optionTitleProp: Array<string> | undefined,
  ) => {
    let title = '';
    if (option && optionTitleProp) {
      let arr = [];
      for (let i = 0; i < optionTitleProp.length; i++) {
        if (option[optionTitleProp[i]]) arr.push(option[optionTitleProp[i]]);
      }
      title = arr.join(' - ');
    }

    return title;
  };

  const {fields, append, remove} = useFieldArray({
    control,
    name: id,
  });
  return isLoading ? (
    <TextInputSkeleton />
  ) : (
    <>
      {fields.map((item: any, index: any) => {
        let associationId = `${id}.${index}.association_id`;
        let memberId = `${id}.${index}.member_id`;
        return (
          <React.Fragment key={item.id}>
            <Grid container item spacing={4}>
              <Grid item xs={12} md={6} style={{paddingBottom: 20}}>
                <TextField
                  fullWidth
                  variant={variant ? variant : 'outlined'}
                  size={size ? size : 'small'}
                  id={memberId}
                  label={
                    (labelLanguageId ? messages[labelLanguageId[0]] : '') +
                    ' #' +
                    (index + 1)
                  }
                  error={errors[id]?.[index] && Boolean(errors[id]?.[index])}
                  helperText={
                    errors[id]?.[index] &&
                    errors[id]?.[index]?.memberId?.message ? (
                      errors[id]?.[index].memberId.message.hasOwnProperty(
                        'key',
                      ) ? (
                        <IntlMessages
                          id={errors[id]?.[index].memberId.message.key}
                          values={
                            errors[id]?.[index].memberId.message?.values || {}
                          }
                        />
                      ) : (
                        errors[id]?.[index].memberId.message
                      )
                    ) : (
                      ''
                    )
                  }
                  {...register(memberId)}
                />
              </Grid>
              <Grid item xs={12} md={6} style={{paddingBottom: 20}}>
                <FormControl fullWidth={true}>
                  <Controller
                    render={({field: {onChange, value = ''}}) => (
                      <Autocomplete
                        value={value ? value : ''}
                        noOptionsText={messages['common.no_data_found']}
                        autoSelect={false}
                        selectOnFocus={false}
                        options={options || []}
                        disabled={false}
                        onChange={(event, selected) => {
                          const value = selected ? selected['id'] : '';
                          onChange(value);
                        }}
                        getOptionLabel={(item) => {
                          if (typeof item !== 'object' && options)
                            item = options.find(
                              (it: any) => String(it['id']) === String(item),
                            );

                          return getTitle(item, ['title']);
                        }}
                        isOptionEqualToValue={(option: any, value: any) => {
                          return String(option['id']) === String(value);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={
                              (labelLanguageId
                                ? messages[labelLanguageId[1]]
                                : '') +
                              ' #' +
                              (index + 1)
                            }
                            variant={'outlined'}
                            size={size ? size : 'small'}
                            error={
                              errors[id]?.[index] &&
                              Boolean(errors[id]?.[index])
                            }
                            helperText={
                              errors[id]?.[index] &&
                              errors[id]?.[index]?.associationId?.message ? (
                                errors[id]?.[
                                  index
                                ].associationId.message.hasOwnProperty(
                                  'key',
                                ) ? (
                                  <IntlMessages
                                    id={
                                      errors[id]?.[index].associationId.message
                                        .key
                                    }
                                    values={
                                      errors[id]?.[index].associationId.message
                                        ?.values || {}
                                    }
                                  />
                                ) : (
                                  errors[id]?.[index].associationId.message
                                )
                              ) : (
                                ''
                              )
                            }
                          />
                        )}
                      />
                    )}
                    name={associationId}
                    control={control}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </React.Fragment>
        );
      })}
      <Grid container justifyContent='flex-end'>
        <ButtonGroup color='primary' aria-label='outlined primary button group'>
          <Button
            onClick={() => {
              append({});
            }}>
            <AddCircleOutline />
          </Button>
          <Button
            onClick={() => {
              if (fields.length > 1) remove(fields.length - 1);
            }}
            disabled={fields.length < 2}>
            <RemoveCircleOutline />
          </Button>
        </ButtonGroup>
      </Grid>
    </>
  );
};

export default CustomIndustryFieldArray;
