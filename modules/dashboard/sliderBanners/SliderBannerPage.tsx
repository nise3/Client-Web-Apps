import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import {useIntl} from 'react-intl';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DeleteButton from '../../../@softbd/elements/button/DeleteButton/DeleteButton';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {isResponseSuccess} from '../../../@softbd/utilities/helpers';
import {
  useFetchSliderBanners,
  useFetchSliders,
} from '../../../services/cmsManagement/hooks';
import SliderBannerAddEditPopup from './SliderBannerAddEditPopup';
import SliderBannerDetailsPopup from './SliderBannerDetailsPopup';
import {deleteSliderBanner} from '../../../services/cmsManagement/SliderBannerService';
import IconSliderBanner from '../../../@softbd/icons/IconSliderBanner';
import RowStatus from '../../../@softbd/utilities/RowStatus';
import {ISelectFilterItem} from '../../../shared/Interface/common.interface';

const SliderBannerPage = () => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();

  const [sliderBannerFilters] = useState({});
  const {
    data: sliderBanners,
    isLoading,
    mutate: mutateSliderBanners,
  }: any = useFetchSliderBanners(sliderBannerFilters);

  const [sliderFilterItems, setSliderFilterItems] = useState<
    Array<ISelectFilterItem>
  >([]);
  const [sliderFilters] = useState<any>({
    row_status: RowStatus.ACTIVE,
  });
  const {data: sliders} = useFetchSliders(sliderFilters);

  useEffect(() => {
    if (sliders) {
      setSliderFilterItems(
        sliders.map((slider: any) => {
          return {
            id: slider.id,
            title: slider.title,
          };
        }),
      );
    }
  }, [sliders]);

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

  const deleteSliderBannerItem = async (itemId: number) => {
    let response = await deleteSliderBanner(itemId);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_deleted_successfully'
          values={{subject: <IntlMessages id='banners.label' />}}
        />,
      );

      await refreshDataTable();
    }
  };

  const refreshDataTable = useCallback(() => {
    mutateSliderBanners();
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
        Header: messages['common.link'],
        accessor: 'link',
      },
      {
        Header: messages['common.sub_title'],
        accessor: 'sub_title',
        isVisible: false,
        disableFilters: true,
      },
      {
        Header: messages['slider.label'],
        accessor: 'slider_id',
        isVisible: false,
        filter: 'selectFilter',
        selectFilterItems: sliderFilterItems,
        Cell: (props: any) => {
          let data = props.row.original;
          return <>{data?.slider_title}</>;
        },
      },

      {
        Header: messages['common.status'],
        accessor: 'row_status',
        disableFilters: true,
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
                deleteAction={() => deleteSliderBannerItem(data.id)}
                deleteTitle={'Are you sure?'}
              />
            </DatatableButtonGroup>
          );
        },
        sortable: false,
      },
    ],
    [messages, sliderFilterItems],
  );

  return (
    <>
      <PageBlock
        title={
          <>
            <IconSliderBanner /> <IntlMessages id='banners.label' />
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
                  subject: messages['banners.label'],
                }}
              />
            }
          />,
        ]}>
        <ReactTable
          columns={columns}
          data={sliderBanners || []}
          loading={isLoading}
        />
        {isOpenAddEditModal && (
          <SliderBannerAddEditPopup
            key={1}
            onClose={closeAddEditModal}
            itemId={selectedItemId}
            refreshDataTable={refreshDataTable}
          />
        )}

        {isOpenDetailsModal && selectedItemId && (
          <SliderBannerDetailsPopup
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

export default SliderBannerPage;
