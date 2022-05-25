import React, {useCallback, useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import {useIntl} from 'react-intl';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import FourIREmploymentAddEditPopup from './FourIREmploymentAddEditPopup';
import FourIREmploymentDetailsPopup from './FourIREmploymentDetailsPopup';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {getCalculatedSerialNo} from '../../../@softbd/utilities/helpers';
import IconBranch from '../../../@softbd/icons/IconBranch';
import {API_4IR_CERTIFICATE} from '../../../@softbd/common/apiRoutes';
import {Typography} from '@mui/material';
import {IPageHeader} from '../4IRSteppers';

interface IFourEmploymentPageProps {
  fourIRInitiativeId: number;
  pageHeader: IPageHeader;
}

const FourIREmploymentPage = ({
  fourIRInitiativeId,
  pageHeader,
}: IFourEmploymentPageProps) => {
  const {messages, locale} = useIntl();
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);
  const closeAddEditModal = useCallback(() => {
    setIsOpenAddEditModal(false);
    setSelectedItemId(null);
  }, []);

  const openAddEditModal = useCallback((itemId: number | null = null) => {
    setIsOpenDetailsModal(false);
    setIsOpenAddEditModal(true);
    setSelectedItemId(itemId);
  }, []);

  const openDetailsModal = useCallback(
    (itemId: number) => {
      setIsOpenDetailsModal(true);
      setSelectedItemId(itemId);
    },
    [selectedItemId],
  );

  const closeDetailsModal = useCallback(() => {
    setIsOpenDetailsModal(false);
  }, []);

  const refreshDataTable = useCallback(() => {
    setIsToggleTable((prevToggle: any) => !prevToggle);
  }, [isToggleTable]);

  const columns = useMemo(
    () => [
      {
        Header: '#',
        disableFilters: true,
        disableSortBy: true,
        Cell: (props: any) => {
          return getCalculatedSerialNo(
            props.row.index,
            props.currentPageIndex,
            props.currentPageSize,
          );
        },
      },

      {
        Header: messages['common.name'],
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <Typography>{`${data.youth_profile.first_name} ${data.youth_profile.last_name}`}</Typography>
          );
        },
      },
      {
        Header: messages['common.contact_number'],
        Cell: (props: any) => {
          let data = props.row.original;
          return <Typography>{data.youth_profile.mobile}</Typography>;
        },
      },
      {
        Header: messages['youth.email'],
        Cell: (props: any) => {
          let data = props.row.original;
          return <Typography>{data.youth_profile.email}</Typography>;
        },
      },
      {
        Header: messages['4ir.employment_status'],
        Cell: (props: any) => {
          let data = props.row.original;

          const e_status =
            data?.employment_status == 1
              ? 'Self Employed'
              : data?.employment_status == 2
              ? 'Employed'
              : 'Not Applicable';
          return <Typography>{e_status}</Typography>;
        },
      },

      /** dont remove the following commented code, until you are sure */
      /*      {
              Header: messages['common.status'],
              accessor: 'row_status',
              filter: 'rowStatusFilter',
              Cell: (props: any) => {
                let data = props.row.original;
                return <CustomChipRowStatus value={data?.row_status} />;
              },
            },*/
      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <DatatableButtonGroup>
              {data?.employment_info?.id && (
                <ReadButton
                  onClick={() => openDetailsModal(data?.employment_info?.id)}
                />
              )}
              <EditButton onClick={() => openAddEditModal(data.id)} />
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
      urlPath: API_4IR_CERTIFICATE + `/${fourIRInitiativeId}`,
    });

  return (
    <>
      <PageBlock
        title={
          <>
            <IconBranch /> <IntlMessages id='4ir.employment' />{' '}
            {`(${pageHeader?.tagline_name} > ${pageHeader?.initative_name})`}
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
        {isOpenAddEditModal && (
          <FourIREmploymentAddEditPopup
            key={1}
            fourIRInitiativeId={fourIRInitiativeId}
            onClose={closeAddEditModal}
            itemId={selectedItemId}
            refreshDataTable={refreshDataTable}
            certificateData={data}
          />
        )}

        {isOpenDetailsModal && selectedItemId && (
          <FourIREmploymentDetailsPopup
            key={1}
            itemId={selectedItemId}
            onClose={closeDetailsModal}
            openEditModal={openAddEditModal}
          />
        )}
      </PageBlock>
    </>
  );
};

export default FourIREmploymentPage;
