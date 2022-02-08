import React, {useEffect, useMemo, useState} from 'react';
import {useIntl} from 'react-intl';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import IconJobSector from '../../../@softbd/icons/IconJobSector';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {API_GET_JOB_CANDIDATES} from '../../../@softbd/common/apiRoutes';
import {useRouter} from 'next/router';
import {Fab, Grid} from '@mui/material';
import {useFetchJobPreview} from '../../../services/IndustryManagement/hooks';
import {Body1, H3, S1, S2} from '../../../@softbd/elements/common';
import AddIcon from '@mui/icons-material/Add';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import {RiEditBoxFill} from 'react-icons/ri';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import {SubmitHandler, useForm} from 'react-hook-form';
import {IOrganization} from '../../../shared/Interface/organization.interface';
import FormRadioButtons from '../../../@softbd/elements/input/CustomRadioButtonGroup/FormRadioButtons';
import {useFetchJobCandidatesAppliedList} from '../../../services/IndustryAssociationManagement/hooks';

const PREFIX = 'CandidatesPage';

const classes = {
  fab: `${PREFIX}-fab`,
  applicants: `${PREFIX}-applicants`,
  button: `${PREFIX}-button`,
  buttonChild: `${PREFIX}-buttonChild`,
  edit: `${PREFIX}-edit`,
  modal: `${PREFIX}-modal`,
};

const StyledBox = styled(Box)(({theme}) => ({
  [`& .${classes.button}`]: {
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
  [`& .${classes.buttonChild}`]: {
    display: 'flex',
    backgroundColor: '#4806487d',
    borderRadius: 5,
    padding: 8,
    fontSize: '1rem',
  },
  [`& .${classes.fab}`]: {
    backgroundColor: '#fff',
    marginTop: '10px',
  },
  [`& .${classes.applicants}`]: {
    backgroundColor: 'purple',
    padding: '10px',
    borderBottom: '1px solid #301f30',
    borderRadius: '5px 5px 0 0 ',
  },
  [`& .${classes.edit}`]: {
    cursor: 'pointer',
  },
  [`& .${classes.modal}`]: {
    color: 'red',
  },
}));

const CandidatesPage = () => {
  const {messages} = useIntl();

  const router = useRouter();
  const {jobIdCandidates} = router.query;

  const {data: jobDetails} = useFetchJobPreview(String(jobIdCandidates));
  const {data: appliedCandidateLists} = useFetchJobCandidatesAppliedList(
    String(jobIdCandidates),
  );
  console.log('appllied->', appliedCandidateLists);

  const [isToggleTable] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [stepList, setStepList] = useState<any>([]);

  const {
    onFetchData,
    data: candidates,
    loading,
    pageCount,
    totalCount,
  } = useReactTableFetchData({
    urlPath: API_GET_JOB_CANDIDATES + `/${jobIdCandidates}`,
  });

  const columns = useMemo(
    () => [
      {
        Header: '#',
        disableFilters: true,
        disableSortBy: true,
        Cell: (props: any) => {
          return props.row.index + 1;
        },
      },
      {
        Header: messages['common.name'],
        accessor: 'youth_profile.first_name',
      },
      {
        Header: messages['youth.mobile'],
        accessor: 'youth_profile.mobile',
      },
      {
        Header: messages['youth.email'],
        accessor: 'youth_profile.email',
      },
      {
        Header: messages['common.expected_salary'],
        accessor: 'expected_salary',
      },
      // {
      //   Header: messages['common.actions'],
      //   Cell: (props: any) => {
      //     let data = props.row.original;
      //     return <DatatableButtonGroup></DatatableButtonGroup>;
      //   },
      //   sortable: false,
      // },
    ],
    [messages],
  );

  const {
    control,
    register,
    // reset,
    // getValues,
    handleSubmit,
    // setError,
    // setValue,
    formState: {errors, isSubmitting},
  } = useForm<IOrganization>();

  const handleModalOpenClose = () => {
    setOpenModal((prev: boolean) => !prev);
  };

  let isEdit = false;
  let isLoading = false;

  const shortLists = useMemo(
    () => [
      {
        key: '1',
        label: messages['common.only_short_list'],
      },
      {
        key: '2',
        label: messages['common.short_list_live_interview'],
      },
      {
        key: '3',
        label: messages['common.short_list_written'],
      },
      {
        key: '4',
        label: messages['common.short_list_face_to_face'],
      },
      {
        key: '5',
        label: messages['common.short_list_other'],
      },
    ],
    [messages],
  );

  const applicantCanReschedule = useMemo(
    () => [
      {
        key: '1',
        label: messages['common.yes'],
      },
      {
        key: '2',
        label: messages['common.no'],
      },
    ],
    [messages],
  );

  const onSubmit: SubmitHandler<any> = async (formData: any) => {
    try {
      // console.log('formData->', formData);

      let arr: any = [];
      arr = [...stepList, formData];
      setStepList(arr);

      handleModalOpenClose();
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log('setpLisets->', stepList);
  }, [stepList]);

  return (
    <StyledBox>
      <Grid container sx={{color: '#fff'}}>
        <Grid item xs={12}>
          <H3 sx={{color: '#130f0f'}}>
            {jobDetails?.primary_job_information?.job_title}
          </H3>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={2} className={classes.applicants}>
              <S1>Applicants ({candidates.length})</S1>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            backgroundColor: 'purple',
            padding: '10px',
            borderRadius: '0 5px 5px 5px ',
          }}>
          <Grid container spacing={3} sx={{marginTop: 0, marginBottom: '10px'}}>
            <Grid item xs={2} sx={{textAlign: 'center'}}>
              <Body1>All Applicants</Body1>
              <Fab className={classes.fab}>{candidates.length}</Fab>
            </Grid>
            {stepList.map((step: any, index: any) => (
              <Grid key={index} item xs={2} sx={{textAlign: 'center'}}>
                <Body1>
                  1st Step{' '}
                  <RiEditBoxFill
                    onClick={handleModalOpenClose}
                    className={classes.edit}
                  />
                </Body1>
                <Fab className={classes.fab}>{candidates.length}</Fab>
              </Grid>
            ))}

            <Grid item xs={3} className={classes.button}>
              <S2
                className={classes.buttonChild}
                onClick={handleModalOpenClose}>
                <AddIcon /> Add Requirement Step
              </S2>
            </Grid>
            <Grid item xs={2} sx={{textAlign: 'center'}}>
              <Body1>Final Hiring List</Body1>
              <Fab className={classes.fab}>{candidates.length}</Fab>
            </Grid>
          </Grid>
        </Grid>
        {openModal && (
          <Grid item>
            <HookFormMuiModal
              open={true}
              title={
                <>
                  {isEdit ? (
                    <IntlMessages
                      id='common.edit'
                      values={{
                        subject: <IntlMessages id='common.recruitment_step' />,
                      }}
                    />
                  ) : (
                    <IntlMessages
                      id='common.add_new'
                      values={{
                        subject: <IntlMessages id='common.recruitment_step' />,
                      }}
                    />
                  )}
                </>
              }
              handleSubmit={handleSubmit(onSubmit)}
              actions={
                <>
                  <CancelButton
                    onClick={handleModalOpenClose}
                    isLoading={false}
                  />
                  <SubmitButton
                    isSubmitting={isSubmitting}
                    isLoading={isLoading}
                  />
                </>
              }
              onClose={handleModalOpenClose}>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <FormRadioButtons
                    id='step_list'
                    radios={shortLists}
                    control={control}
                    isLoading={isLoading}
                    styles={{
                      border: '1px solid gray',
                      padding: '10px',
                      margin: '5px',
                      borderRadius: '5px',
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <CustomTextInput
                    id='step_name'
                    label={messages['common.step_name']}
                    register={register}
                    errorInstance={errors}
                    isLoading={isLoading}
                    placeholder='Type a test name'
                  />
                </Grid>
                <Grid item xs={6}>
                  <CustomTextInput
                    id='contact_no'
                    label={messages['common.phone']}
                    register={register}
                    errorInstance={errors}
                    isLoading={isLoading}
                    placeholder='Write a Contact Number'
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormRadioButtons
                    id='reschedule'
                    label={'common.applicants_cat_reschedule'}
                    required={true}
                    radios={applicantCanReschedule}
                    control={control}
                    isLoading={isLoading}
                  />
                </Grid>
              </Grid>
            </HookFormMuiModal>
          </Grid>
        )}
      </Grid>
      <PageBlock
        title={
          <>
            <IconJobSector /> <IntlMessages id='common.candidates_list' />
          </>
        }
        // extra={[
        //   <AddButton
        //       key={1}
        //       onClick={() => console.log('dd')}
        //       isLoading={loading}
        //       tooltip={
        //         <IntlMessages
        //             id={'common.add_new'}
        //             values={{
        //               subject: messages['job_lists.label'],
        //             }}
        //         />
        //       }
        //   />,
        // ]}
      >
        <ReactTable
          columns={columns}
          data={candidates}
          fetchData={onFetchData}
          loading={loading}
          pageCount={pageCount}
          totalCount={totalCount}
          toggleResetTable={isToggleTable}
        />
      </PageBlock>
    </StyledBox>
  );
};

export default CandidatesPage;
