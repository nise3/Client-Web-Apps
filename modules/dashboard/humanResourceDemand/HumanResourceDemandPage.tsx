import React, {useCallback, useMemo, useState} from 'react';
import CustomChip from '../../../@softbd/elements/display/CustomChip/CustomChip';
import PersonIcon from '@mui/icons-material/Person';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import {useIntl} from 'react-intl';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import IconJobSector from '../../../@softbd/icons/IconJobSector';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import ApproveButton from '../../../@softbd/elements/button/ApproveButton/ApproveButton';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {API_HUMAN_RESOURCE_DEMAND_LIST} from '../../../@softbd/common/apiRoutes';
import RejectButton from '../applicationManagement/RejectButton';
import HumanResourceDemandDetailsPopup from './HumanResourceDemandDetailsPopup';

const HumanResourceDemandPage = () => {
  const {messages} = useIntl();

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);

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

  const onClickApprove: any = useCallback((id: any) => {
    console.log('approved button in details page', id);
    closeDetailsModal();
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
        Header: messages['common.institute_name'],
        accessor: 'institute_name',
      },
      {
        Header: messages['common.industry_name'],
        accessor: 'industry_name',
      },
      {
        Header: messages['common.no_of_vacancy'],
        accessor: 'no_of_vacancy',
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <>
              <CustomChip
                icon={<PersonIcon fontSize={'small'} />}
                color={'primary'}
                label={data.no_of_vacancy}
              />
            </>
          );
        },
      },
      {
        Header: messages['common.skills'],
        accessor: 'skills',
      },
      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <DatatableButtonGroup>
              <ReadButton onClick={() => openDetailsModal(data.id)} />
              <ApproveButton onClick={() => console.log('approved')} />
              <RejectButton
                // onClick={() => console.log('deny')}
                rejectAction={() => {}}
                rejectTitle={messages['common.delete_confirm'] as string}
              />
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
      urlPath: API_HUMAN_RESOURCE_DEMAND_LIST,
    });

  return (
    <>
      <PageBlock
        title={
          <>
            <IconJobSector /> <IntlMessages id='common.human_resource' />
          </>
        }>
        <ReactTable
          columns={columns}
          data={data}
          fetchData={onFetchData}
          loading={loading}
          pageCount={pageCount}
          totalCount={totalCount}
        />

        {isOpenDetailsModal && selectedItemId && (
          <HumanResourceDemandDetailsPopup
            key={1}
            itemId={selectedItemId}
            onClose={closeDetailsModal}
            onApprove={onClickApprove}
          />
        )}
      </PageBlock>
    </>
  );
};

export default HumanResourceDemandPage;
