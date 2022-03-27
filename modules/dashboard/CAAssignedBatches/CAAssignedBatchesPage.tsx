import React, {useCallback, useMemo, useState} from 'react';
import {useIntl} from 'react-intl';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {API_RTO_BATCH} from '../../../@softbd/common/apiRoutes';
import IconBatch from '../../../@softbd/icons/IconBatch';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import {FiUserCheck} from 'react-icons/fi';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {CommonAuthUser} from '../../../redux/types/models/CommonAuthUser';
import CABatchManagePopup from './CABatchManagePopup';
import EditIcon from '@mui/icons-material/Edit';
import CustomChipCertificationStatus from './CustomChipCertificationStatus';

const CAAssignedBatchesPage = () => {
  const {messages, locale} = useIntl();
  const router = useRouter();
  const path = router.pathname;
  const authUser = useAuthUser<CommonAuthUser>();
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [selectedAssessmentDate, setSelectedAssessmentDate] = useState<
    number | null
  >(null);
  const [selectedAssessorId, setSelectedAssessorId] = useState<number | null>(
    null,
  );
  const [isOpenBatchManageModal, setIsOpenBatchManageModal] = useState(false);
  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);

  const closeBatchManageModal = useCallback(() => {
    setIsOpenBatchManageModal(false);
    setSelectedItemId(null);
    setSelectedAssessorId(null);
    setSelectedAssessmentDate(null);
  }, []);

  const openBatchManageModal = useCallback(
    (
      itemId: number | null = null,
      assessorId: number | null = null,
      assessmentDate: any = '',
    ) => {
      setIsOpenBatchManageModal(true);
      setSelectedItemId(itemId);
      setSelectedAssessorId(assessorId);
      setSelectedAssessmentDate(assessmentDate);
    },
    [],
  );

  const refreshDataTable = useCallback(() => {
    setIsToggleTable((prevToggle: any) => !prevToggle);
  }, [isToggleTable]);

  const columns = useMemo(
    () => [
      {
        Header: '#',
        Cell: (props: any) => {
          return props.row.index + 1;
        },
        disableFilters: true,
        disableSortBy: true,
      },
      /*{
        Header: messages['rto.name'],
        accessor: 'rto_title',
        isVisible: locale == LocaleLanguage.BN,
      },
      {
        Header: messages['common.number_of_youth'],
        accessor: 'number_of_youths',
      },*/
      {
        Header: messages['rpl_batch.title'],
        accessor: 'title',
      },
      {
        Header: messages['rpl_batch.title_en'],
        accessor: 'title_en',
      },
      {
        Header: messages['rpl_sector.label'],
        accessor: 'rpl_sector_title',
      },
      {
        Header: messages['rpl_occupation.label'],
        accessor: 'rpl_occupation_title',
      },
      {
        Header: messages['certification_status.label'],
        accessor: 'certification_status',
        Cell: (props: any) => {
          const data = props.row.original;
          return (
            <CustomChipCertificationStatus value={data?.certification_status} />
          );
        },
      },

      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;
          let itemId = data?.id;
          let assessorId = data?.assessor_id;
          let assessmentDate = data?.assessment_date;
          return (
            <DatatableButtonGroup>
              <CommonButton
                onClick={() => {
                  openBatchManageModal(itemId, assessorId, assessmentDate);
                }}
                btnText='common.manage'
                startIcon={<EditIcon style={{marginLeft: '5px'}} />}
                style={{marginLeft: '10px'}}
                variant='outlined'
                color='primary'
              />
              <Link href={`${path}/${data?.id}/youths`} passHref={true}>
                <CommonButton
                  btnText='youth.label'
                  startIcon={<FiUserCheck style={{marginLeft: '5px'}} />}
                  style={{marginLeft: '10px'}}
                  variant='outlined'
                  color='primary'
                />
              </Link>
            </DatatableButtonGroup>
          );
        },
        sortable: false,
      },
    ],
    [messages, locale],
  );

  const {onFetchData, data, loading, pageCount, totalCount} =
    useReactTableFetchData({
      urlPath: API_RTO_BATCH,
      paramsValueModifier: (params: any) => {
        if (authUser?.institute_id)
          params['institute_id'] = authUser?.institute_id;
        return params;
      },
    });

  return (
    <>
      <PageBlock
        title={
          <>
            <IconBatch /> <IntlMessages id='batches.label' />
          </>
        }>
        <ReactTable
          columns={columns}
          data={data}
          fetchData={onFetchData}
          loading={loading}
          pageCount={pageCount}
          totalCount={totalCount}
          toggleResetTable={isToggleTable}
        />
        {isOpenBatchManageModal && (
          <CABatchManagePopup
            onClose={closeBatchManageModal}
            itemId={selectedItemId}
            assessorId={selectedAssessorId}
            assessmentDate={selectedAssessmentDate}
            refreshDataTable={refreshDataTable}
          />
        )}
      </PageBlock>
    </>
  );
};

export default CAAssignedBatchesPage;
