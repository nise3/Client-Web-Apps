import React, {useCallback, useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import {deleteFAQ} from '../../../services/cmsManagement/FAQService';
import {useIntl} from 'react-intl';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DeleteButton from '../../../@softbd/elements/button/DeleteButton/DeleteButton';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {API_FAQS} from '../../../@softbd/common/apiRoutes';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {isResponseSuccess} from '../../../@softbd/utilities/helpers';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import FAQDetailsPopup from './FAQDetailsPopupup';
import FAQAddEditPopup from './FAQAddEditPopup';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import LocaleLanguage from '../../../@softbd/utilities/LocaleLanguage';
import IconFAQ from "../../../@softbd/icons/IconFAQ";

const FAQPage = () => {
  const {messages, locale} = useIntl();
  const {successStack} = useNotiStack();

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

  const openDetailsModal = useCallback((itemId: number) => {
    setIsOpenDetailsModal(true);
    setSelectedItemId(itemId);
  }, []);

  const closeDetailsModal = useCallback(() => {
    setIsOpenDetailsModal(false);
  }, []);

  const deleteFAQItem = async (itemId: number) => {
    let response = await deleteFAQ(itemId);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_deleted_successfully'
          values={{subject: <IntlMessages id='menu.faq' />}}
        />,
      );

      refreshDataTable();
    }
  };

  const refreshDataTable = useCallback(() => {
    setIsToggleTable((previousToggle) => !previousToggle);
  }, []);

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
      {
        Header: messages['faq.show_in'],
        accessor: 'show_in_label',
      },
      {
        Header: messages['common.institute'],
        accessor: 'institute_title',
        isVisible: locale == LocaleLanguage.BN,
      },
      {
        Header: messages['institute.name_en'],
        accessor: 'institute_title_en',
        isVisible: locale == LocaleLanguage.EN,
      },
      {
        Header: messages['faq.question'],
        accessor: 'question_short',
      },
      {
        Header: messages['faq.answer'],
        accessor: 'answer_short',
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
                deleteAction={() => deleteFAQItem(data.id)}
                deleteTitle='Are you sure?'
              />
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
      urlPath: API_FAQS,
    });

  let modifiedData = data?.map((faq: any) => {
    let name: string, question_short: string, answer_short: string;
    if (parseInt(faq?.show_in) === 1) {
      name = 'NISE';
    } else if (parseInt(faq?.show_in) === 2) {
      name = 'Youth';
    } else if (parseInt(faq?.show_in) === 3) {
      name = faq?.institute_title;
    } else if (parseInt(faq?.show_in) === 4) {
      name = faq?.organization_title;
    } else if (parseInt(faq?.show_in) === 5) {
      name = faq?.industry_association_title;
    } else {
      name = '';
    }

    question_short = faq?.question ? faq?.question.substr(0, 25) + '.....' : '';
    answer_short = faq?.answer ? faq?.answer.substr(0, 25) + '.....' : '';

    return {
      ...faq,
      name,
      question_short,
      answer_short,
    };
  });

  return (
    <>
      <PageBlock
        title={
          <>
            <IconFAQ /> <IntlMessages id='menu.faq' />
          </>
        }
        extra={[
          <AddButton
            key={1}
            onClick={() => openAddEditModal(null)}
            isLoading={loading}
            tooltip={
              <IntlMessages
                id={'common.add_new'}
                values={{
                  subject: messages['menu.faq'],
                }}
              />
            }
          />,
        ]}>
        {modifiedData && (
          <ReactTable
            columns={columns}
            data={modifiedData}
            fetchData={onFetchData}
            loading={loading}
            pageCount={pageCount}
            totalCount={totalCount}
            toggleResetTable={isToggleTable}
          />
        )}
        {isOpenAddEditModal && (
          <FAQAddEditPopup
            key={1}
            onClose={closeAddEditModal}
            itemId={selectedItemId}
            refreshDataTable={refreshDataTable}
          />
        )}
        {isOpenDetailsModal && selectedItemId && (
          <FAQDetailsPopup
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

export default FAQPage;
