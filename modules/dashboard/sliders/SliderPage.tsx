import React, {useCallback, useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import {useIntl} from 'react-intl';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DeleteButton from '../../../@softbd/elements/button/DeleteButton/DeleteButton';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import SliderDetailsPopup from './SliderDetailsPopup';
import SliderAddEditPopup from './SliderAddEditPopup';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {isResponseSuccess} from '../../../@softbd/utilities/helpers';
import IconSlider from '../../../@softbd/icons/IconSlider';
import {deleteSlider} from '../../../services/cmsManagement/SliderService';
import {useFetchSliders} from '../../../services/cmsManagement/hooks';

const SliderPage = () => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();

  const [sliderFilters] = useState({});
  const {
    data: sliders,
    isLoading,
    mutate: mutateSliders,
  }: any = useFetchSliders(sliderFilters);

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);

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

  const deleteSliderItem = async (itemId: number) => {
    let response = await deleteSlider(itemId);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_deleted_successfully'
          values={{subject: <IntlMessages id='slider.label' />}}
        />,
      );

      await refreshDataTable();
    }
  };

  const refreshDataTable = useCallback(() => {
    mutateSliders();
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
        Header: messages['common.title'],
        accessor: 'title',
      },
      {
        Header: messages['common.show_in'],
        accessor: 'show_in_label',
      },
      {
        Header: messages['common.sub_title'],
        accessor: 'sub_title',
        isVisible: false,
      },
      {
        Header: messages['institute.label'],
        accessor: 'institute_title',
        isVisible: false,
      },
      {
        Header: messages['organization.label'],
        accessor: 'organization_title',
        isVisible: false,
      },
      {
        Header: messages['common.button_text'],
        accessor: 'button_text',
        isVisible: false,
      },
      {
        Header: messages['common.link'],
        accessor: 'link',
        isVisible: false,
      },
      {
        Header: messages['common.alt_title'],
        accessor: 'alt_title',
        isVisible: false,
      },
      {
        Header: messages['common.banner_template'],
        accessor: 'banner_template',
        isVisible: false,
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
                deleteAction={() => deleteSliderItem(data.id)}
                deleteTitle={'Are you sure?'}
              />
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
            <IconSlider /> <IntlMessages id='slider.label' />
          </>
        }
        extra={[
          <AddButton
            key={1}
            onClick={() => openAddEditModal(null)}
            isLoading={isLoading}
            tooltip={
              <IntlMessages
                id={'common.add_new'}
                values={{
                  subject: messages['slider.label'],
                }}
              />
            }
          />,
        ]}>
        <ReactTable
          columns={columns}
          data={sliders || []}
          loading={isLoading}
        />
        {isOpenAddEditModal && (
          <SliderAddEditPopup
            key={1}
            onClose={closeAddEditModal}
            itemId={selectedItemId}
            refreshDataTable={refreshDataTable}
          />
        )}

        {isOpenDetailsModal && selectedItemId && (
          <SliderDetailsPopup
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

export default SliderPage;
