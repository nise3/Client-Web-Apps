import {Box, Button, Grid, IconButton} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import yup from '../../../@softbd/libs/yup';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import CustomFilterableFormSelect from '../../../@softbd/elements/input/CustomFilterableFormSelect';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {Add, Delete} from '@mui/icons-material';
import {objectFilter} from '../../../@softbd/utilities/helpers';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import {
  useFetchRPLSector,
  useFetchRTOCountries,
} from '../../../services/CertificateAuthorityManagement/hooks';
import {
  createRPLSector,
  updateRPLSector,
} from '../../../services/CertificateAuthorityManagement/RPLSectorService';
import IconInstitute from '../../../@softbd/icons/IconInstitute';

interface RPLSectorsAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  title: '',
  title_en: '',
  row_status: '1',
};

const RPLSectorsAddEditPopup: FC<RPLSectorsAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();

  const isEdit = itemId != null;
  const {
    data: itemData,
    isLoading,
    mutate: mutateRPLSector,
  } = useFetchRPLSector(itemId);

  const {data: countries, isLoading: isFetchingCountries} =
    useFetchRTOCountries();

  const [countryList, setCountryList] = useState<any>([]);

  const [allCountries, setAllCountries] = useState<any>([]);

  const [selectedCountryList, setSelectedCountryList] = useState<any>([]);
  const [selectedCountryId, setSelectedCountryId] = useState<string | null>(
    null,
  );

  const [selectedIds, setSelectedIds] = useState<Array<string>>([]);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      title: yup
        .string()
        .title('bn', true, messages['common.special_character_error'] as string)
        .label(messages['common.title'] as string),
      title_en: yup
        .string()
        .title(
          'en',
          false,
          messages['common.special_character_error'] as string,
        )
        .label(messages['common.title_en'] as string),

      country: yup.array().of(
        yup.object().shape({
          title: yup
            .string()
            .title(
              'bn',
              true,
              messages['common.special_character_error'] as string,
            )
            .label(messages['rpl_sector.name'] as string),
        }),
      ),
    });
  }, [messages]);

  const {
    register,
    control,
    reset,
    setError,
    getValues,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    setAllCountries(countries);
    setCountryList(countries);
  }, [countries]);

  useEffect(() => {
    if (itemData) {
      let data: any = {
        title: itemData?.title,
        title_en: itemData?.title_en,
        row_status: itemData?.row_status,
      };

      const otherCountryData = itemData?.translations;

      if (otherCountryData) {
        let ids: any = Object.keys(otherCountryData);

        ids.map((id: string, index: any) => {
          data['country[' + index + '][title]'] = otherCountryData[id].title;
          data['country[' + index + '][country_id]'] = id;
        });
        setSelectedIds(ids);

        setSelectedCountryList(
          allCountries?.filter((item: any) =>
            ids.includes(String(item.country_id)),
          ),
        );

        setCountryList(
          allCountries?.filter(
            (item: any) => !ids.includes(String(item.country_id)),
          ),
        );
      }

      reset(data);
    } else {
      reset(initialValues);
    }
  }, [itemData, allCountries]);

  const onAddOtherCountryClick = useCallback(() => {
    if (selectedCountryId) {
      let lists = [...selectedCountryList];
      const country = allCountries?.find(
        (item: any) => item.country_id == selectedCountryId,
      );

      if (country) {
        lists.push(country);
        setSelectedCountryList(lists);
        setSelectedIds((prev) => [...prev, country.country_id]);

        setCountryList((prevState: any) =>
          prevState.filter((item: any) => item.country_id != selectedCountryId),
        );
        setSelectedCountryId(null);
      }
    }
  }, [selectedCountryId, selectedCountryList]);

  const onCountryListChange = useCallback((selected: any) => {
    setSelectedCountryId(selected);
  }, []);

  const onDeleteCountry = useCallback(
    (country: any) => {
      if (country) {
        setSelectedCountryList((prevState: any) =>
          prevState.filter(
            (item: any) => item.country_id != country.country_id,
          ),
        );

        let countries = [...countryList];
        countries.push(country);
        setCountryList(countries);

        setSelectedIds((prev) =>
          prev.filter((id: any) => id != country.country_id),
        );

        let formCountries = getValues('country');
        formCountries = formCountries.filter(
          (country: any) => country.country_id != country.country_id,
        );

        reset({
          ...getValues(),
          country: formCountries,
        });
      }
    },
    [selectedCountryList, countryList, selectedIds],
  );

  const onSubmit: SubmitHandler<any> = async (formData: any) => {
    try {
      objectFilter(formData);

      let data = {...formData};

      let otherCountriesFields: any = {};
      delete data.country_list;

      data?.country?.map((cntr: any) => {
        otherCountriesFields[cntr.country_id] = {
          title: cntr.title,
        };
      });

      if (selectedCountryList.length > 0)
        data.translations = otherCountriesFields;

      delete data['country'];

      if (itemId) {
        await updateRPLSector(itemId, data);
        updateSuccessMessage('rpl_sector.label');
        mutateRPLSector();
      } else {
        await createRPLSector(data);
        createSuccessMessage('rpl_sector.label');
      }
      props.onClose();
      refreshDataTable();
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  return (
    <HookFormMuiModal
      {...props}
      open={true}
      maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
      title={
        <>
          <IconInstitute />
          {isEdit ? (
            <IntlMessages
              id='common.edit'
              values={{subject: <IntlMessages id='rpl_sector.label' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='rpl_sector.label' />}}
            />
          )}
        </>
      }
      handleSubmit={handleSubmit(onSubmit)}
      actions={
        <>
          <CancelButton onClick={props.onClose} isLoading={isLoading} />
          <SubmitButton isSubmitting={isSubmitting} isLoading={isLoading} />
        </>
      }>
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <CustomTextInput
            required
            id={'title'}
            label={messages['rpl_sector.name']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id={'title_en'}
            label={messages['rpl_sector.name_en']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomFilterableFormSelect
            id={'country_list'}
            label={messages['rpl_sector.country']}
            isLoading={isFetchingCountries}
            control={control}
            options={countryList}
            optionValueProp={'country_id'}
            optionTitleProp={['title']}
            errorInstance={errors}
            onChange={onCountryListChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Button
            variant={'outlined'}
            color={'primary'}
            onClick={onAddOtherCountryClick}
            disabled={!selectedCountryId}>
            <Add />
            {messages['rpl_sector.add_country']}
          </Button>
        </Grid>

        <Grid item xs={12}>
          {selectedCountryList?.map((country: any, index: any) => (
            <Box key={country.country_id} sx={{marginTop: '10px'}}>
              <fieldset style={{border: '1px solid #7e7e7e'}}>
                <legend style={{color: '#0a8fdc'}}>{country.title}</legend>
                <Grid container spacing={5}>
                  <Grid item xs={11}>
                    <CustomTextInput
                      required
                      id={'country[' + index + '][title]'}
                      label={messages['rpl_sector.name']}
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>
                  <Grid item xs={11} sx={{display: 'none'}}>
                    <CustomTextInput
                      required
                      id={'country[' + index + '][country_id]'}
                      label={messages['rpl_sector.name']}
                      register={register}
                      errorInstance={errors}
                      defaultValue={country.country_id}
                    />
                  </Grid>
                  <Grid item xs={1} md={1}>
                    <IconButton
                      aria-label='delete'
                      color={'error'}
                      onClick={(event) => {
                        onDeleteCountry(country);
                      }}>
                      <Delete color={'error'} />
                    </IconButton>
                  </Grid>
                </Grid>
              </fieldset>
            </Box>
          ))}
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};
export default RPLSectorsAddEditPopup;
