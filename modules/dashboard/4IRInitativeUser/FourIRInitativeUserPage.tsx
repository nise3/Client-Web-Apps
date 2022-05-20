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
// import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import IconBranch from '../../../@softbd/icons/IconBranch';
import {API_4IR_TEAM_MEMBERS} from '../../../@softbd/common/apiRoutes';
// import {FourIRTeamType} from '../../../shared/constants/AppEnums';
import Router, {useRouter} from 'next/router';
import FourIRInitiativeUserDetailsPopup from './FourIRInitiativeUserDetailsPopup';
import {Button} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface IFourIRImplementingTeamPageProps {
  fourIRInitiativeId: number;
}

const FourIRInitativeUserPage = ({
  fourIRInitiativeId,
}: IFourIRImplementingTeamPageProps) => {
  const router = useRouter();
  const {messages, locale} = useIntl();
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);

  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const {initiativeId} = router.query;
  const [selectedInitiativeIdId] = useState<number>(
    parseInt(initiativeId as string),
  );
  const openDetailsModal = useCallback(
    (itemId: number, memeberId: number) => {
      setIsOpenDetailsModal(true);
      setSelectedItemId(itemId);
      setSelectedMemberId(memeberId);
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
              <ReadButton
                onClick={() => openDetailsModal(data?.user_id, data?.id)}
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

  return (
    <>
      <PageBlock
        title={
          <>
            <IconBranch /> <IntlMessages id='common.contributions' />
          </>
        }
        extra={[
          <Button
            key={'button-1'}
            startIcon={<ArrowBackIcon />}
            variant='outlined'
            onClick={() => Router.back()}
            style={{float: 'right', right: '10px', top: '10px'}}>
            {messages['common.back']}
          </Button>,
        ]}>
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
            memberId={selectedMemberId}
          />
        )}
      </PageBlock>
    </>
  );
};

export default FourIRInitativeUserPage;
