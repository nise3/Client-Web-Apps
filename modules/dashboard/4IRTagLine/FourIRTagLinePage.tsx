import React, {useCallback, useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import {useIntl} from 'react-intl';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DeleteButton from '../../../@softbd/elements/button/DeleteButton/DeleteButton';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import FourIRTagLineAddEditPopup from './FourIRTagLineAddEditPopup';
import FourIRTagLineDetailsPopup from './FourIRTagLineDetailsPopup';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {
  getMomentDateFormat,
  isResponseSuccess,
} from '../../../@softbd/utilities/helpers';
import IconSkill from '../../../@softbd/icons/IconSkill';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import {useFetchFourIRTaglines} from '../../../services/4IRManagement/hooks';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import {FiUser} from 'react-icons/fi';
import {Link} from '../../../@softbd/elements/common';
import {deleteTagline} from '../../../services/4IRManagement/TaglineService';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';

const FourIRTagLinePage = () => {
  const {messages} = useIntl();
  const {successStack, errorStack} = useNotiStack();

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [taglinesFilters] = useState({});

  const {
    data: taglines,
    isLoading: isLoadingTaglines,
    mutate: mutateTaglines,
  } = useFetchFourIRTaglines(taglinesFilters);

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

  const deleteTaglineItem = async (taglineId: number) => {
    try {
      let response = await deleteTagline(taglineId);
      if (isResponseSuccess(response)) {
        successStack(
          <IntlMessages
            id='common.subject_deleted_successfully'
            values={{subject: <IntlMessages id='menu.tagline' />}}
          />,
        );
        refreshDataTable();
      }
    } catch (error: any) {
      processServerSideErrors({
        error,
        errorStack,
      });
    }
  };

  const refreshDataTable = useCallback(() => {
    mutateTaglines();
  }, [mutateTaglines]);

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
        Header: messages['common.name_bn'],
        accessor: 'name',
      },
      {
        Header: messages['common.name_en'],
        accessor: 'name_en',
        inVisible: false,
      },
      {
        Header: messages['common.start_date'],
        accessor: 'start_date',
        filter: 'dateTimeFilter',
        disableFilters: true,
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <span>{getMomentDateFormat(data?.start_date, 'DD MMM, YYYY')}</span>
          );
        },
      },
      {
        Header: messages['common.status'],
        accessor: 'row_status',
        filter: 'rowStatusFilter',
        Cell: (props: any) => {
          let data = props.row.original;
          return <CustomChipRowStatus value={data?.row_status} />;
        },
      },
      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <DatatableButtonGroup>
              <ReadButton onClick={() => openDetailsModal(data.id)} />
              <EditButton onClick={() => openAddEditModal(data.id)} />
              <DeleteButton
                deleteAction={() => deleteTaglineItem(data.id)}
                deleteTitle={messages['common.delete_confirm'] as string}
              />
              <Link href={`4ir-tagline/${data.id}/initiatives`}>
                <CommonButton
                  btnText='common.view_initiatives'
                  startIcon={<FiUser style={{marginLeft: '5px'}} />}
                  variant={'text'}
                />
              </Link>
            </DatatableButtonGroup>
          );
        },
        sortable: false,
      },
    ],
    [messages],
  );

  return (
    <>
      <PageBlock
        title={
          <>
            <IconSkill /> <IntlMessages id='menu.tagline' />
          </>
        }
        extra={[
          <AddButton
            key={1}
            onClick={() => openAddEditModal(null)}
            isLoading={isLoadingTaglines}
            tooltip={
              <IntlMessages
                id={'common.add_new'}
                values={{
                  subject: messages['menu.occupations'],
                }}
              />
            }
          />,
        ]}>
        <ReactTable
          columns={columns}
          data={taglines || []}
          loading={isLoadingTaglines}
          skipDefaultFilter={true}
        />
        {isOpenAddEditModal && (
          <FourIRTagLineAddEditPopup
            key={1}
            onClose={closeAddEditModal}
            itemId={selectedItemId}
            refreshDataTable={refreshDataTable}
          />
        )}

        {isOpenDetailsModal && selectedItemId && (
          <FourIRTagLineDetailsPopup
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

export default FourIRTagLinePage;
