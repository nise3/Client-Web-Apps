import {useIntl} from 'react-intl';
import React, {useCallback, useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import IconUser from '../../../@softbd/icons/IconUser';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import SkillDevelopmentReportDetailsPopup from './SkillDevelopmentReportDetailsPopup';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import {Link} from '../../../@softbd/elements/common';

const SkillDevelopmentReportPage = () => {
  const {messages} = useIntl();

  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const openDetailsModal = useCallback((itemId: number) => {
    setIsOpenDetailsModal(true);
    setSelectedItemId(itemId);
  }, []);

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
          return props.row.index + 1;
        },
      },

      {
        Header: messages['skill_development_report.approved_trade_number'],
        accessor: 'approved_trade_number',
        disableFilters: true,
      },
      {
        Header: messages['skill_development_report.current_trade_number'],
        accessor: 'score',
        disableFilters: true,
      },
      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;
          return <ReadButton onClick={() => openDetailsModal(data.id)} />;
        },
        sortable: false,
      },
    ],
    [messages],
  );

  //todo: urlPath must be given after getting api
  const {onFetchData, data, loading, pageCount, totalCount} =
    useReactTableFetchData({
      urlPath: '/rt',
    });

  return (
    <>
      <PageBlock
        title={
          <>
            <IconUser /> <IntlMessages id='skill_development_report.label' />
          </>
        }
        extra={[
          <Link key={selectedItemId} href={'/create'}>
            <AddButton
              onClick={() => openDetailsModal(3)} //todo: item id must be integrated here after getting api
              isLoading={loading}
              tooltip={
                <IntlMessages
                  id={'common.add_new'}
                  values={{
                    subject: messages['skill_development_report.label'],
                  }}
                />
              }
            />
          </Link>,

          //todo: this will be removed after getting api..
          <AddButton
            key={Math.random()}
            onClick={() => openDetailsModal(1)}
            isLoading={loading}
            tooltip={
              <IntlMessages
                id={'common.add_new'}
                values={{
                  subject: messages['skill_development_report.label'],
                }}
              />
            }
          />,
        ]}>
        <ReactTable
          columns={columns}
          data={data}
          fetchData={onFetchData}
          loading={loading}
          pageCount={pageCount}
          totalCount={totalCount}
        />

        {isOpenDetailsModal && (
          <SkillDevelopmentReportDetailsPopup
            key={1}
            itemId={selectedItemId}
            onClose={closeDetailsModal}
          />
        )}
      </PageBlock>
    </>
  );
};

export default SkillDevelopmentReportPage;
