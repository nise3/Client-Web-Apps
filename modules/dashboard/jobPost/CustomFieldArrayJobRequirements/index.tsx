import React from 'react';
import {Button, ButtonGroup, Grid, TextField} from '@mui/material';
import {useFieldArray} from 'react-hook-form';
import {useIntl} from 'react-intl';
import {AddCircleOutline, RemoveCircleOutline} from '@mui/icons-material';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import TextInputSkeleton from '../../../../@softbd/elements/display/skeleton/TextInputSkeleton/TextInputSkeleton';
import CustomFilterableField from './CustomFilterableField';

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

const CustomEducationalQualificationFieldArray = ({
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

  const {fields, append, remove} = useFieldArray({
    control,
    name: id,
  });
  return isLoading ? (
    <TextInputSkeleton />
  ) : (
    <>
      {fields.map((item: any, index: any) => {
        let educationLevelId = `${id}.${index}.education_level`;
        let examDegreeId = `${id}.${index}.education_exam_degree`;
        let majorId = `${id}.${index}.major_group_name`;
        return (
          <React.Fragment key={item.id}>
            <Grid container item spacing={4}>
              <Grid item xs={12} md={4} style={{paddingBottom: 20}}>
                <CustomFilterableField
                  label={labelLanguageId ? messages[labelLanguageId[0]] : ''}
                  id={educationLevelId}
                  fieldIndex={index}
                  control={control}
                  options={[]}
                  isLoading={false}
                  errors={errors}
                />
              </Grid>
              <Grid item xs={12} md={4} style={{paddingBottom: 20}}>
                <CustomFilterableField
                  label={labelLanguageId ? messages[labelLanguageId[1]] : ''}
                  id={examDegreeId}
                  fieldIndex={index}
                  control={control}
                  options={[]}
                  isLoading={false}
                  errors={errors}
                />
              </Grid>

              <Grid item xs={12} md={4} style={{paddingBottom: 20}}>
                <TextField
                  fullWidth
                  variant={variant ? variant : 'outlined'}
                  size={size ? size : 'small'}
                  id={majorId}
                  label={labelLanguageId ? messages[labelLanguageId[2]] : ''}
                  error={errors[id]?.[index] && Boolean(errors[id]?.[index])}
                  helperText={
                    errors[id]?.[index] &&
                    errors[id]?.[index]?.majorId?.message ? (
                      errors[id]?.[index].majorId.message.hasOwnProperty(
                        'key',
                      ) ? (
                        <IntlMessages
                          id={errors[id]?.[index].majorId.message.key}
                          values={
                            errors[id]?.[index].majorId.message?.values || {}
                          }
                        />
                      ) : (
                        errors[id]?.[index].majorId.message
                      )
                    ) : (
                      ''
                    )
                  }
                  {...register(majorId)}
                />
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

export default CustomEducationalQualificationFieldArray;
