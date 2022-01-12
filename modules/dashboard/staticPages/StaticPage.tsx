import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import {useIntl} from 'react-intl';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import StaticPageDetailsPopup from './StaticPageDetailsPopup';
import StaticPageAddEditPopup from './StaticPageAddEditPopup';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconStaticPage from '../../../@softbd/icons/IconStaticPage';
import {useFetchStaticPageTypes} from '../../../services/cmsManagement/hooks';
import StaticPageTypes from './StaticPageTypes';
import StaticBlockAddEditPopup from './StaticBlockAddEditPopup';
import StaticPageCategoryTypes from '../../../@softbd/utilities/StaticPageCategoryTypes';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {CommonAuthUser} from '../../../redux/types/models/CommonAuthUser';

const StaticPage = () => {
  const {messages} = useIntl();
  const authUser = useAuthUser<CommonAuthUser>();

  const [staticPageTypesFilters, setStaticPageTypesFilters] = useState({
    category: [StaticPageCategoryTypes.COMMON],
  });
  const {data: staticPageTypes, isLoading}: any = useFetchStaticPageTypes(
    staticPageTypesFilters,
  );

  const [selectedStaticPage, setSelectedStaticPage] = useState<any>(null);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);

  useEffect(() => {
    if (authUser) {
      const categories = [StaticPageCategoryTypes.COMMON];
      if (authUser?.isSystemUser) {
        categories.push(
          StaticPageCategoryTypes.NISE3,
          StaticPageCategoryTypes.YOUTH,
        );
      } else if (authUser?.isInstituteUser) {
        categories.push(StaticPageCategoryTypes.TSP);
      } else if (authUser?.isOrganizationUser) {
        categories.push(StaticPageCategoryTypes.INDUSTRY);
      } else if (authUser?.isIndustryAssociationUser) {
        categories.push(StaticPageCategoryTypes.INDUSTRY_ASSOCIATION);
      }

      setStaticPageTypesFilters({
        category: categories,
      });
    }
  }, [authUser]);

  const closeAddEditModal = useCallback(() => {
    setIsOpenAddEditModal(false);
    setSelectedStaticPage(null);
  }, []);

  const openAddEditModal = useCallback((page = null) => {
    setSelectedStaticPage(page);
    setIsOpenDetailsModal(false);
    setIsOpenAddEditModal(true);
  }, []);

  const openDetailsModal = useCallback(
    (code: string) => {
      setSelectedStaticPage(code);
      setIsOpenDetailsModal(true);
    },
    [selectedStaticPage],
  );

  const closeDetailsModal = useCallback(() => {
    setIsOpenDetailsModal(false);
  }, []);

  const getPageTypeTitle = (type: number) => {
    switch (type) {
      case StaticPageTypes.PAGE:
        return messages['static_page_content_type.static_page'];
      case StaticPageTypes.BLOCK:
        return messages['static_page_content_type.page_block'];
      default:
        return '';
    }
  };

  const getCategoryTitle = (category: number) => {
    switch (category) {
      case StaticPageCategoryTypes.NISE3:
        return messages['common.nise3'];
      case StaticPageCategoryTypes.YOUTH:
        return messages['common.youth'];
      default:
        return '';
    }
  };

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
        Header: messages['common.type'],
        Cell: (props: any) => {
          return getPageTypeTitle(props.row.original.type);
        },
      },
      {
        Header: messages['common.show_in'],
        Cell: (props: any) => {
          return getCategoryTitle(props.row.original.category);
        },
        isVisible: authUser && authUser.isSystemUser,
      },
      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <DatatableButtonGroup>
              <ReadButton onClick={() => openDetailsModal(data)} />
              <EditButton onClick={() => openAddEditModal(data)} />
            </DatatableButtonGroup>
          );
        },
        sortable: false,
      },
    ],
    [messages, authUser],
  );

  return (
    <>
      <PageBlock
        title={
          <>
            <IconStaticPage /> <IntlMessages id='static_page.label' />
          </>
        }>
        <ReactTable
          columns={columns}
          data={staticPageTypes || []}
          loading={isLoading}
          hideToolbar={false}
        />
        {isOpenAddEditModal &&
          selectedStaticPage &&
          selectedStaticPage.type == StaticPageTypes.PAGE && (
            <StaticPageAddEditPopup
              key={1}
              onClose={closeAddEditModal}
              pageCode={selectedStaticPage.page_code}
              pageCategory={selectedStaticPage.category}
            />
          )}

        {isOpenAddEditModal &&
          selectedStaticPage &&
          selectedStaticPage.type == StaticPageTypes.BLOCK && (
            <StaticBlockAddEditPopup
              key={1}
              onClose={closeAddEditModal}
              pageCode={selectedStaticPage.page_code}
              pageCategory={selectedStaticPage.category}
            />
          )}

        {isOpenDetailsModal && selectedStaticPage && (
          <StaticPageDetailsPopup
            key={1}
            pageCode={selectedStaticPage.page_code}
            pageType={selectedStaticPage.type}
            pageCategory={selectedStaticPage.category}
            onClose={closeDetailsModal}
            openEditModal={openAddEditModal}
          />
        )}
      </PageBlock>
    </>
  );
};

export default StaticPage;
