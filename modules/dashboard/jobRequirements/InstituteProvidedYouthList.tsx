import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useRouter} from 'next/router';
import {useFetchInstituteProvidedYouthList} from '../../../services/IndustryManagement/hooks';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import {Button, Checkbox} from '@mui/material';
import {startCase as lodashStartCase} from 'lodash';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import {
  approveYouths,
  rejectHRDemandYouth,
} from '../../../services/IndustryManagement/JobRequirementService';
import {ArrowBack} from '@mui/icons-material';
import {Link} from '../../../@softbd/elements/common';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import IndustryAssociationYouthApproval from '../../../@softbd/utilities/IndustryAssociationYouthApproval';
import RowStatus from '../../../@softbd/utilities/RowStatus';
import {LINK_CV_BANK} from '../../../@softbd/common/appLinks';
import RejectButton from '../../../@softbd/elements/button/RejectButton/RejectButton';
import {isResponseSuccess} from '../../../@softbd/utilities/helpers';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CustomChip from '../../../@softbd/elements/display/CustomChip/CustomChip';
import {ApprovalStatus} from './Constants/ApprovalStatusEnums';
import {FILE_SERVER_FILE_VIEW_ENDPOINT} from '../../../@softbd/common/apiRoutes';

const InstituteProvidedYouthList = () => {
  const {messages} = useIntl();
  const {successStack, errorStack} = useNotiStack();
  const router = useRouter();
  const {hrDemandInstituteId} = router.query;

  const [checkedYouths, setCheckedYouths] = useState<any>(new Set());
  const [youthListFilters] = useState<any>({
    row_status: RowStatus.ACTIVE,
  });

  const {
    data: youthList,
    isLoading: isLoadingYouthList,
    mutate: mutateYouthList,
  } = useFetchInstituteProvidedYouthList(
    Number(hrDemandInstituteId),
    youthListFilters,
  );

  useEffect(() => {
    if (youthList && youthList.length > 0) {
      const approvedYouths = youthList
        .filter((youth: any) => {
          return (
            youth.approval_status == IndustryAssociationYouthApproval.APPROVED
          );
        })
        .map((youth: any) => youth.id);

      setCheckedYouths(new Set(approvedYouths));
    }
  }, [youthList]);

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

  const rejectAction = async (itemId: number) => {
    try {
      let response = await rejectHRDemandYouth(itemId);
      if (isResponseSuccess(response)) {
        successStack(
          <IntlMessages
            id='common.subject_rejected'
            values={{subject: <IntlMessages id='common.youth_approval' />}}
          />,
        );
      }
      mutateYouthList();
    } catch (error: any) {
      processServerSideErrors({error, errorStack});
    }
  };

  const submitYouthApproval = useCallback(async () => {
    try {
      await approveYouths(
        Number(hrDemandInstituteId),
        Array.from(checkedYouths),
      );
      successStack(
        messages['industry_association.youth_approved_successfully'],
      );
      mutateYouthList();
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
        Header: messages['common.cv'],
        accessor: 'cv_link',
        Cell: (props: any) => {
          let data = props.row.original;
          let URL = data?.cv_link;
          if (URL) {
            URL = FILE_SERVER_FILE_VIEW_ENDPOINT + URL;
          }

          return data?.youth_id ? (
            <Link href={LINK_CV_BANK + '/' + data.youth_id} target={'_blank'}>
              <CommonButton
                btnText={'youth_profile.label'}
                variant={'contained'}
              />
            </Link>
          ) : URL ? (
            <Link href={URL} target={'_blank'}>
              <CommonButton btnText={'common.see_cv'} variant={'contained'} />
            </Link>
          ) : (
            <></>
          );
        },
      },
      {
        Header: messages['common.status'],
        accessor: 'approval_status',
        Cell: (props: any) => {
          let data = props.row.original;
          let step: any = '';
          let btnColor: any = undefined;

          switch (data.approval_status) {
            case ApprovalStatus.PENDING:
              step = messages['common.pending'];
              btnColor = 'primary';
              break;
            case ApprovalStatus.APPROVED:
              step = messages['common.approved'];
              btnColor = 'success';
              break;
            case ApprovalStatus.REJECTED:
              step = messages['common.rejected'];
              btnColor = 'error';
              break;
            default:
              step = messages['common.pending'];
              btnColor = 'primary';
          }

          return (
            <CustomChip label={step} variant={'filled'} color={btnColor} />
          );
        },
      },

      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;

          return (
            <DatatableButtonGroup>
              <label style={{display: 'block', marginRight: '5px'}}>
                <Checkbox
                  value={data.id}
                  onChange={() => handleYouthCheck(data.id)}
                  checked={checkedYouths.has(data.id)}
                />
                {lodashStartCase(messages['common.accept'] as string)}
              </label>

              <RejectButton
                itemId={data.id}
                rejectTitle={messages['common.youth'] as string}
                rejectAction={rejectAction}>
                {messages['common.reject']}
              </RejectButton>
            </DatatableButtonGroup>
          );
        },
        sortable: false,
      },
    ],
    [messages, checkedYouths, youthList],
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
        data={youthList || []}
        loading={isLoadingYouthList}
        skipDefaultFilter={true}
      />
    </PageBlock>
  );
};

export default InstituteProvidedYouthList;
