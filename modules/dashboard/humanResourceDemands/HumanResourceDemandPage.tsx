import React, {useCallback, useMemo, useState} from 'react';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import {useIntl} from 'react-intl';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import IconJobSector from '../../../@softbd/icons/IconJobSector';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {API_HUMAN_RESOURCE_DEMAND} from '../../../@softbd/common/apiRoutes';
import HumanResourceDemandMangePopup from './HumanResourceDemandMangePopup';
import CustomChipApprovalStatus from './CustomChipApprovalStatus';
import {HrDemandApprovalStatusByIndustry} from './HrDemandEnums';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import Link from 'next/link';
import {LINK_HUMAN_RESOURCE_DEMAND} from '../../../@softbd/common/appLinks';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import LocaleLanguage from '../../../@softbd/utilities/LocaleLanguage';

const HumanResourceDemandPage = () => {
  const {messages, locale} = useIntl();
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);
  const openAddEditModal = useCallback((itemId: number | null = null) => {
    setIsOpenAddEditModal(true);
    setSelectedItemId(itemId);
  }, []);

  const closeAddEditModal = useCallback(() => {
    setIsOpenAddEditModal(false);
    setSelectedItemId(null);
  }, []);
  const refreshDataTable = useCallback(() => {
    setIsToggleTable((previousToggle) => !previousToggle);
  }, []);
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
        Header: messages['organization.label'],
        accessor: 'organization_title',
        isVisible: locale == LocaleLanguage.BN,
      },
      {
        Header: messages['organization.label_en'],
        accessor: 'organization_title_en',
        isVisible: locale == LocaleLanguage.EN,
      },
      {
        Header: messages['common.approval_status'],
        accessor: 'rejected_by_industry_association',
        Cell: (props: any) => {
          let data = props.row.original;
          if (data?.rejected_by_industry_association == 1) {
            return (
              <CustomChipApprovalStatus
                value={HrDemandApprovalStatusByIndustry.REJECTED}
                variant={'filled'}
              />
            );
          } else if (
            data?.rejected_by_industry_association == 0 &&
            data?.vacancy_approved_by_industry_association == 0
          ) {
            return (
              <CustomChipApprovalStatus
                variant={'filled'}
                value={HrDemandApprovalStatusByIndustry.PENDING}
              />
            );
          } else {
            return (
              <CustomChipApprovalStatus
                variant={'filled'}
                value={HrDemandApprovalStatusByIndustry.APPROVED}
              />
            );
          }
        },
      },
      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;
          const URL = LINK_HUMAN_RESOURCE_DEMAND + `/${data.id}`;
          return (
            <DatatableButtonGroup>
              <EditButton onClick={() => openAddEditModal(data.id)} />
              <Link href={URL + '?show_cv=1'} passHref>
                <ReadButton>{messages['common.cv_read']}</ReadButton>
              </Link>
              <Link href={URL + '?show_cv=0'} passHref>
                <ReadButton>{messages['common.youth_read']}</ReadButton>
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
      urlPath: API_HUMAN_RESOURCE_DEMAND,
    });

  return (
    <>
      <PageBlock
        title={
          <>
            <IconJobSector /> <IntlMessages id='hr_demand.label' />
          </>
        }>
        <ReactTable
          columns={columns}
          data={data || []}
          fetchData={onFetchData}
          loading={loading}
          pageCount={pageCount}
          totalCount={totalCount}
          toggleResetTable={isToggleTable}
        />
        {isOpenAddEditModal && (
          <HumanResourceDemandMangePopup
            refreshDataTable={refreshDataTable}
            itemId={selectedItemId}
            onClose={closeAddEditModal}
          />
        )}
      </PageBlock>
    </>
  );
};

export default HumanResourceDemandPage;
