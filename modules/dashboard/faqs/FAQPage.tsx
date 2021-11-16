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
import {API_ALL_FAQS} from '../../../@softbd/common/apiRoutes';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {isResponseSuccess} from '../../../@softbd/utilities/helpers';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconInstitute from '../../../@softbd/icons/IconInstitute';
import FAQDetailsPopup from './FAQDetailsPopupup';
import FAQAddEditPopup from './FAQAddEditPopup';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {CommonAuthUser} from '../../../redux/types/models/CommonAuthUser';

const FAQPage = () => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const authUser = useAuthUser<CommonAuthUser>();

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
        Header: messages['faqs.show_in'],
        accessor: 'show_in_label',
      },
      {
        Header: messages['common.name'],
        accessor: 'name',
      },
      {
        Header: messages['faqs.question'],
        accessor: 'question_short',
      },
      {
        Header: messages['faqs.answer'],
        accessor: 'answer_short',
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
    [messages],
  );

  const {onFetchData, data, loading, pageCount, totalCount} =
    useReactTableFetchData({
      urlPath: API_ALL_FAQS,
      paramsValueModifier: (params: any) => {
        if (authUser?.isInstituteUser)
          params['institute_id'] = authUser?.institute_id;
        else if (authUser?.isOrganizationUser)
          params['organization_id'] = authUser?.organization_id;
        return params;
      },
    });

  let modifiedData = data?.map((faq: any) => {
    let name: string = '',
      question_short: string = '',
      answer_short: string = '';
    if (parseInt(faq?.show_in) === 1) {
      name = 'NISE3';
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
            <IconInstitute /> <IntlMessages id='menu.faq' />
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
                  subject: messages['menu.faqs'],
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
