import React, {useCallback, useMemo, useState} from 'react';
import PageBlock from '../../../../@softbd/utilities/PageBlock';
import {useIntl} from 'react-intl';
import ReadButton from '../../../../@softbd/elements/button/ReadButton/ReadButton';
import DatatableButtonGroup from '../../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import useReactTableFetchData from '../../../../@softbd/hooks/useReactTableFetchData';
import {API_COURSE_ENROLLMENTS} from '../../../../@softbd/common/apiRoutes';
import ReactTable from '../../../../@softbd/table/Table/ReactTable';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import {getCalculatedSerialNo} from '../../../../@softbd/utilities/helpers';
import IconCourse from '../../../../@softbd/icons/IconCourse';
import Genders from '../../../../@softbd/utilities/Genders';
import ApplicationDetailsPopup from './ApplicationDetailsPopup';
import CustomChipPaymentStatus from './CustomChipPaymentStatus';
import LocaleLanguage from '../../../../@softbd/utilities/LocaleLanguage';
import {Button} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useRouter} from 'next/router';
import {
  useFetch4IRInitiative,
  useFetchFourIRTagline,
} from '../../../../services/4IRManagement/hooks';

interface IEnrolledYouthList {
  selectedCourseId: number;
  previousHandler: () => void;
}

const EnrolledYouthList = ({
  selectedCourseId,
  previousHandler,
}: IEnrolledYouthList) => {
  const {messages, locale} = useIntl();

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  //const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);

  const router = useRouter();
  const taglineId = Number(router.query.taglineId);
  const initativeId = Number(router.query.initiativeId);
  const {data: tagline} = useFetchFourIRTagline(Number(taglineId));
  const {data: initaitive} = useFetch4IRInitiative(initativeId);

  /** details modal */
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
          return getCalculatedSerialNo(
            props.row.index,
            props.currentPageIndex,
            props.currentPageSize,
          );
        },
      },
      {
        Header: messages['applicationManagement.applicantFullName'],
        accessor: 'full_name',
        isVisible: locale == LocaleLanguage.BN,
        disableFilters: true,
      },
      {
        Header: messages['applicationManagement.applicantFullName_en'],
        accessor: 'full_name_en',
        isVisible: locale == LocaleLanguage.EN,
        disableFilters: true,
      },
      {
        Header: messages['menu.industry_contact'],
        accessor: 'mobile',
      },
      {
        Header: messages['common.email'],
        accessor: 'email',
      },

      {
        Header: messages['applicationManagement.programTitle'],
        accessor: 'program_title',
        isVisible: false,
      },
      {
        Header: messages['applicationManagement.programTitle_en'],
        accessor: 'program_title_en',
        isVisible: false,
      },
      {
        Header: messages['applicationManagement.courseTitle'],
        accessor: 'course_title',
        isVisible: false,
      },
      {
        Header: messages['applicationManagement.courseTitle_en'],
        accessor: 'course_title_en',
        isVisible: false,
      },
      {
        Header: messages['menu.batch'],
        accessor: 'batch_title',
        isVisible: false,
      },
      {
        Header: messages['menu.batch_en'],
        accessor: 'batch_title_en',
        isVisible: false,
      },

      {
        Header: messages['common.paymentStatus'],
        accessor: 'payment_status',
        filter: 'rowStatusFilter',
        isVisible: false,
        Cell: (props: any) => {
          let data = props.row.original;
          return <CustomChipPaymentStatus value={data?.payment_status} />;
        },
      },

      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <DatatableButtonGroup>
              <ReadButton onClick={() => openDetailsModal(data.id)} />
            </DatatableButtonGroup>
          );
        },
      },
    ],
    [messages, locale],
  );

  const {onFetchData, data, loading, pageCount, totalCount} =
    useReactTableFetchData({
      urlPath: API_COURSE_ENROLLMENTS,
      paramsValueModifier: (params) => {
        params['course_id'] = selectedCourseId;
        return params;
      },
    });

  const filteredData = data?.map((youth: any) => {
    let gender_label: string;
    if (youth?.gender === parseInt(Genders.MALE)) {
      gender_label = 'Male';
    } else if (youth?.gender === parseInt(Genders.FEMALE)) {
      gender_label = 'Female';
    } else {
      gender_label = 'Others';
    }
    return {
      ...youth,
      gender_label,
      full_name: youth?.first_name + ' ' + youth?.last_name,
    };
  });

  return (
    <>
      <PageBlock
        title={
          <>
            <IconCourse /> <IntlMessages id='enrollment_view_enrollment' />{' '}
            {`(${tagline?.name} > ${initaitive?.name})`}
          </>
        }
        extra={
          <Button
            startIcon={<ArrowBackIcon />}
            variant='outlined'
            onClick={() => previousHandler()}
            style={{float: 'right', right: '10px', top: '10px'}}>
            {messages['common.back']}
          </Button>
        }>
        <ReactTable
          columns={columns}
          data={filteredData}
          fetchData={onFetchData}
          loading={loading}
          pageCount={pageCount}
          totalCount={totalCount}
        />

        {isOpenDetailsModal && selectedItemId && (
          <ApplicationDetailsPopup
            key={1}
            itemId={selectedItemId}
            onClose={closeDetailsModal}
          />
        )}
      </PageBlock>
    </>
  );
};

export default EnrolledYouthList;
