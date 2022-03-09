import React from 'react';
import {Button, ButtonGroup, Grid} from '@mui/material';
import {useFieldArray} from 'react-hook-form';
import {useIntl} from 'react-intl';
import {AddCircleOutline, RemoveCircleOutline} from '@mui/icons-material';
import TextInputSkeleton from '../../../@softbd/elements/display/skeleton/TextInputSkeleton/TextInputSkeleton';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';

type Props = {
  id: string;
  isLoading?: boolean;
  register: any;
  errors: any;
  control: any;
};

const JobExperienceFieldArray = ({
  id,
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
        let country = `${id}.${index}.country`;
        let sector = `${id}.${index}.sector`;
        let occupation = `${id}.${index}.occupation`;
        let level = `${id}.${index}.level`;

        return (
          <React.Fragment key={item.id}>
            <Grid container item spacing={4}>
              <Grid item xs={12} md={3} style={{paddingBottom: 20}}>
                <CustomFormSelect
                  id={country}
                  label={messages['common.country']}
                  isLoading={false}
                  control={control}
                  options={[]}
                  optionValueProp={'id'}
                  optionTitleProp={['title']}
                />
              </Grid>

              <Grid item xs={12} md={3} style={{paddingBottom: 20}}>
                <CustomFormSelect
                  id={sector}
                  label={messages['common.sector']}
                  isLoading={false}
                  control={control}
                  options={[]}
                  optionValueProp={'id'}
                  optionTitleProp={['title']}
                />
              </Grid>

              <Grid item xs={12} md={3} style={{paddingBottom: 20}}>
                <CustomFormSelect
                  id={occupation}
                  label={messages['common.occupation']}
                  isLoading={false}
                  control={control}
                  options={[]}
                  optionValueProp={'id'}
                  optionTitleProp={['title']}
                />
              </Grid>

              <Grid item xs={12} md={3} style={{paddingBottom: 20}}>
                <CustomFormSelect
                  id={level}
                  label={messages['common.skill_level']}
                  isLoading={false}
                  control={control}
                  options={[]}
                  optionValueProp={'id'}
                  optionTitleProp={['title']}
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
              if (fields.length > 0) remove(fields.length - 1);
            }}
            disabled={fields.length < 1}>
            <RemoveCircleOutline />
          </Button>
        </ButtonGroup>
      </Grid>
    </>
  );
};

export default JobExperienceFieldArray;
