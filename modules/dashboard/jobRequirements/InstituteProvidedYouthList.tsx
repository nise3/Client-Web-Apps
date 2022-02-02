import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useRouter} from 'next/router';
import {useFetchInstituteProvidedYouthList} from '../../../services/IndustryManagement/hooks';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import React, {useCallback, useMemo, useState} from 'react';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import {Button, Checkbox} from '@mui/material';
import {startCase as lodashStartCase} from 'lodash';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import {approveYouths} from '../../../services/IndustryManagement/JobRequirementService';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {ArrowBack} from '@mui/icons-material';

const youthListTemp = [
  {
    id: 1,
    name: 'John Doe',
    cv: 'https/dldlelx/cv.com',
  },
  {
    id: 2,
    name: 'Dan Brown',
    cv: 'https/dldlelx/cvv.com',
  },
  {
    id: 3,
    name: 'Louis Pastur',
    cv: 'https/passtur/cv.com',
  },
];

const InstituteProvidedYouthList = () => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const {updateSuccessMessage} = useSuccessMessage();
  const router = useRouter();
  const {hrDemandInstituteId} = router.query;

  const [checkedYouths, setCheckedYouths] = useState<any>(new Set([]));

  const {data: youthList, isLoading: isLoadingYouthList} =
    useFetchInstituteProvidedYouthList(Number(hrDemandInstituteId));

  /*  const rejectJobRequirementDemand = async (HRDemandId: number) => {
    let response = await rejectHRDemand(HRDemandId);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_rejected'
          values={{subject: <IntlMessages id='hr_demand.label' />}}
        />,
      );
      refreshDataTable();
    }
  };*/

  const handleYouthCheck = useCallback(
    (youthId: number) => {
      const newApprovedYouths = [...checkedYouths];

      const index = newApprovedYouths.indexOf(youthId);
      newApprovedYouths.includes(youthId)
        ? newApprovedYouths.splice(index, 1)
        : newApprovedYouths.push(youthId);

      setCheckedYouths(new Set(newApprovedYouths));
    },
    [checkedYouths],
  );

  // const canRejectApprove = useCallback((data: any) => {
  //   return (
  //     data?.vacancy_provided_by_institute > 0 &&
  //     !data?.rejected_by_institute &&
  //     data?.vacancy_approved_by_industry_association == 0 &&
  //     data?.rejected_by_industry_association == 0
  //   );
  // }, []);

  const submitYouthApproval = useCallback(async () => {
    try {
      await approveYouths(
        Number(hrDemandInstituteId),
        Array.from(checkedYouths),
      );
      updateSuccessMessage('permission.label');
    } catch (error: any) {
      processServerSideErrors({error, errorStack});
    }
  }, [youthList, checkedYouths]);

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
        accessor: 'name',
      },
      {
        Header: messages['common.cv'],
        accessor: 'cv',
      },
      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;

          return (
            // canRejectApprove(data) && (
            <DatatableButtonGroup>
              <label style={{display: 'block'}}>
                <Checkbox
                  value={data.id}
                  onChange={() => handleYouthCheck(data.id)}
                  checked={checkedYouths.has(data.id)}
                />
                {lodashStartCase(messages['common.accept'] as string)}
              </label>
              {/*<RejectButton*/}
              {/*  rejectAction={() => rejectJobRequirementDemand(data.id)}*/}
              {/*  rejectTitle={messages['common.delete_confirm'] as string}*/}
              {/*/>*/}
            </DatatableButtonGroup>
            // )
          );
        },
        sortable: false,
      },
    ],
    [messages, checkedYouths],
  );

  return (
    <PageBlock
      title={messages['button.youth_approve']}
      extra={[
        <React.Fragment key={1}>
          <Button
            key={1}
            startIcon={<ArrowBack />}
            sx={{marginRight: '10px'}}
            variant={'outlined'}
            onClick={() => router.back()}>
            {messages['common.back']}
          </Button>
          <SubmitButton
            key={2}
            onClick={submitYouthApproval}
            isLoading={isLoadingYouthList}
            label={messages['common.approve'] as string}
          />
        </React.Fragment>,
      ]}>
      <ReactTable
        columns={columns}
        data={youthListTemp || []}
        loading={isLoadingYouthList}
        skipDefaultFilter={true}
      />
    </PageBlock>
  );
};

export default InstituteProvidedYouthList;
