import React, {useMemo} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import {useIntl} from 'react-intl';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {API_YOUTHS} from '../../../@softbd/common/apiRoutes';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconCourse from '../../../@softbd/icons/IconCourse';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import {useRouter} from 'next/router';
import NextLink from 'next/link';
import {Link} from '@mui/material';
import {FiDownload, FiMessageCircle, FiUserCheck} from 'react-icons/fi';
import Visibility from '@mui/icons-material/Visibility';

const FreelanceCornerPage = () => {
  const {messages} = useIntl();
  const router = useRouter();
  const path = router.pathname;

  /*const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
        const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
        const [isToggleTable, setIsToggleTable] = useState<boolean>(false);*/

  /** details modal */
  /*  const openDetailsModal = useCallback((itemId: number) => {
          setIsOpenDetailsModal(true);
          setSelectedItemId(itemId);
        }, []);*/

  /*  const closeDetailsModal = useCallback(() => {
          setIsOpenDetailsModal(false);
        }, []);*/

  /*  const refreshDataTable = useCallback(() => {
          setIsToggleTable((previousToggle) => !previousToggle);
        }, [isToggleTable]);*/

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
        Header: messages['youth.fullName'],
        accessor: 'full_name',
        isVisible: true,
      },
      {
        Header: messages['youth.mobile'],
        accessor: 'mobile',
      },
      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <DatatableButtonGroup>
              <NextLink href={`${path}/youth-cv/${data?.id}`} passHref={true}>
                <Link underline='none'>
                  <CommonButton
                    btnText='applicationManagement.viewCV'
                    startIcon={<Visibility style={{marginLeft: '5px'}} />}
                    variant={'text'}
                  />
                </Link>
              </NextLink>
              <CommonButton
                onClick={() => {}}
                btnText='common.interview'
                startIcon={<FiMessageCircle style={{marginLeft: '5px'}} />}
                color='primary'
              />
              <CommonButton
                onClick={() => {}}
                btnText='common.hire'
                startIcon={<FiUserCheck style={{marginLeft: '5px'}} />}
                color='secondary'
              />
              <CommonButton
                btnText='common.download'
                startIcon={<FiDownload style={{marginLeft: '5px'}} />}
                color='inherit'
              />
            </DatatableButtonGroup>
          );
        },
      },
    ],
    [messages],
  );

  const {onFetchData, data, loading, pageCount, totalCount} =
    useReactTableFetchData({
      urlPath: API_YOUTHS,
      paramsValueModifier: (params: any) => {
        params['is_freelance_profile'] = 1;
        return params;
      },
    });

  const filteredData = data?.map((youth: any) => {
    return {
      ...youth,
      full_name: youth?.first_name + ' ' + youth?.last_name,
    };
  });

  return (
    <>
      <PageBlock
        title={
          <>
            <IconCourse /> <IntlMessages id='freelance_corner.label' />
          </>
        }>
        <ReactTable
          columns={columns}
          data={filteredData}
          fetchData={onFetchData}
          loading={loading}
          pageCount={pageCount}
          totalCount={totalCount}
          /*toggleResetTable={isToggleTable}*/
        />
        {/*{isOpenDetailsModal && selectedItemId && (
          <AssessmentDetailsPopup
            key={1}
            itemId={selectedItemId}
            onClose={closeDetailsModal}
          />
        )}*/}
      </PageBlock>
    </>
  );
};

export default FreelanceCornerPage;
