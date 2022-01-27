import React, {useCallback, useMemo, useState} from 'react';
import CustomChip from '../../../@softbd/elements/display/CustomChip/CustomChip';
import PersonIcon from '@mui/icons-material/Person';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import {useIntl} from 'react-intl';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import IconJobSector from '../../../@softbd/icons/IconJobSector';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {API_HUMAN_RESOURCE_DEMAND} from '../../../@softbd/common/apiRoutes';
import {Button} from '@mui/material';
import HumanResourceDemandMangePopup from './HumanResourceDemandMangePopup';
import CustomChipVacancyApprovalStatus from './CustomChipVacancyApprovalStatus';

const HumanResourceDemandPage = () => {
  const {messages} = useIntl();
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
      },
      {
        Header: messages['skill.label'],
        accessor: 'skill_title',
      },
      {
        Header: messages['common.vacancy_approval_status'],
        accessor: 'rejected_by_industry_association',
        Cell: (props: any) => {
          let data = props.row.original;
          if (data?.rejected_by_industry_association == 1) {
            return <CustomChipVacancyApprovalStatus value={0} />;
          } else if (
            data?.rejected_by_industry_association == 0 &&
            data?.vacancy_approved_by_industry_association == 0
          ) {
            return <CustomChipVacancyApprovalStatus value={2} />;
          } else {
            return <CustomChipVacancyApprovalStatus value={1} />;
          }
        },
      },

      {
        Header: messages['common.vacancy'],
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <>
              <CustomChip
                icon={<PersonIcon fontSize={'small'} />}
                color={'primary'}
                label={data?.vacancy}
              />
            </>
          );
        },
      },

      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <DatatableButtonGroup>
              <Button
                variant={'outlined'}
                onClick={() => openAddEditModal(data.id)}>
                {messages['common.manage']}
              </Button>
            </DatatableButtonGroup>
          );
        },
        sortable: false,
      },
    ],
    [messages],
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
