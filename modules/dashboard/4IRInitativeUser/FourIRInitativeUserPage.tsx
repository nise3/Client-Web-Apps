import React, {useCallback, useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import {useIntl} from 'react-intl';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import {getCalculatedSerialNo} from '../../../@softbd/utilities/helpers';
// import FourIRImplementingTeamDetailsPopup from './FourIRImplementingTeamDetailsPopup';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import IconBranch from '../../../@softbd/icons/IconBranch';
import {API_4IR_TEAM_MEMBERS} from '../../../@softbd/common/apiRoutes';
import {FourIRTeamType} from '../../../shared/constants/AppEnums';
import {useRouter} from 'next/router';
import FourIRInitiativeUserDetailsPopup from './FourIRInitiativeUserDetailsPopup';
interface IFourIRImplementingTeamPageProps {
  fourIRInitiativeId: number;
}

const FourIRInitativeUserPage = ({
  fourIRInitiativeId,
}: IFourIRImplementingTeamPageProps) => {
  const router = useRouter();
  const {messages, locale} = useIntl();
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const {initiativeId} = router.query;
  const [selectedInitiativeIdId, setSelectedInitiativeIdId] = useState<number>(
    parseInt(initiativeId as string),
  );
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
        Header: messages['common.name'],
        accessor: 'name',
      },
      {
        Header: messages['common.team_name'],
        accessor: 'team_type',
      },

      {
        Header: messages['common.designation'],
        accessor: 'designation',
      },
      {
        Header: messages['4ir.role_or_responsibility'],
        accessor: 'role_responsibility',
        isVisible: false,
      },
      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <DatatableButtonGroup>
              <ReadButton onClick={() => openDetailsModal(data?.id)} />
            </DatatableButtonGroup>
          );
        },
        sortable: false,
      },
    ],
    [messages, locale],
  );
  console.log();
  const {onFetchData, data, loading, pageCount, totalCount} =
    useReactTableFetchData({
      urlPath: API_4IR_TEAM_MEMBERS,
      paramsValueModifier: (params) => {
        params['four_ir_initiative_id'] = selectedInitiativeIdId;
        return params;
      },
    });

  let modifiedData = data?.map((fourirUser: any) => {
    let team_type: string;
    if (parseInt(fourirUser?.team_type) === 1) {
      team_type = 'Implementing Team';
    } else if (parseInt(fourirUser?.team_type) === 2) {
      team_type = 'Expert Team';
    } else {
      team_type = '';
    }

    return {
      ...fourirUser,
      team_type,
    };
  });

  console.log(modifiedData);
  return (
    <>
      <PageBlock
        title={
          <>
            <IconBranch /> <IntlMessages id='common.contributions' />
          </>
        }>
        {modifiedData && (
          <ReactTable
            columns={columns}
            data={modifiedData}
            fetchData={onFetchData}
            loading={loading}
            pageCount={pageCount}
            totalCount={totalCount}
          />
        )}

        {isOpenDetailsModal && selectedItemId && (
          <FourIRInitiativeUserDetailsPopup
            key={1}
            itemId={selectedItemId}
            initiativeId={selectedInitiativeIdId!}
            onClose={closeDetailsModal}
          />
        )}
      </PageBlock>
    </>
  );
};

export default FourIRInitativeUserPage;
