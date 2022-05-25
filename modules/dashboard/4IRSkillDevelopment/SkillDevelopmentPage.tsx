import React, {useCallback, useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import {useIntl} from 'react-intl';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import {getCalculatedSerialNo} from '../../../@softbd/utilities/helpers';
import FourIRSkillDevelopmentDetailsPopUp from './FourIRSkillDevelopmentDetailsPopUp';
import {FiUserCheck} from 'react-icons/fi';
import IntlMessages from '../../../@crema/utility/IntlMessages';

import IconBranch from '../../../@softbd/icons/IconBranch';
import {BATCH_BY_4IR_INITIATIVE_ID} from '../../../@softbd/common/apiRoutes';
import LocaleLanguage from '../../../@softbd/utilities/LocaleLanguage';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import {IPageHeader} from '../4IRSteppers';

interface Props {
  fourIRInitiativeId: number;
  pageHeader: IPageHeader;
  showYouthListHandler: (batchId: number | null) => void;
}

const SkillDevelopmentPage = ({
  fourIRInitiativeId,
  pageHeader,
  showYouthListHandler,
}: Props) => {
  const {messages, locale} = useIntl();
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);

  const openDetailsModal = useCallback(
    (item: any) => {
      setIsOpenDetailsModal(true);
      setSelectedItemId(item.id as number);
    },
    [selectedItemId],
  );

  const closeDetailsModal = useCallback(() => {
    setIsOpenDetailsModal(false);
  }, []);

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
        Header: messages['common.title'],
        accessor: 'title',
        isVisible: locale == LocaleLanguage.BN,
      },

      {
        Header: messages['common.courses'],
        accessor: 'course_title',
        disableFilters: true,
      },
      {
        Header: messages['4ir.skill_development_traning_center'],
        accessor: 'training_center_title',
      },
      {
        Header: messages['4ir.skill_development_batch_start_date'],
        accessor: 'batch_start_date',
      },
      {
        Header: messages['4ir.skill_development_batch_end_date'],
        accessor: 'batch_end_date',
      },
      {
        Header: messages['batches.total_and_available_seat'],
        accessor: 'number_of_seats',
        disableFilters: true,
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <span>{data?.available_seats + '/' + data?.number_of_seats}</span>
          );
        },
      },
      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <DatatableButtonGroup>
              <ReadButton onClick={() => openDetailsModal(data)} />

              <CommonButton
                onClick={() => showYouthListHandler(data.id)}
                btnText='youth.label'
                startIcon={<FiUserCheck style={{marginLeft: '5px'}} />}
                style={{marginLeft: '10px'}}
                variant='outlined'
                color='primary'
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
      urlPath: BATCH_BY_4IR_INITIATIVE_ID + `/${fourIRInitiativeId}`,
    });

  return (
    <>
      <PageBlock
        title={
          <>
            <IconBranch /> <IntlMessages id='4ir.skill_development' />{' '}
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
        />

        {isOpenDetailsModal && selectedItemId && (
          <FourIRSkillDevelopmentDetailsPopUp
            key={1}
            itemId={selectedItemId}
            onClose={closeDetailsModal}
          />
        )}
      </PageBlock>
    </>
  );
};

export default SkillDevelopmentPage;
