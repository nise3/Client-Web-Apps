import React, {useCallback, useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import {useIntl} from 'react-intl';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {API_COURSE_ENROLLMENTS} from '../../../@softbd/common/apiRoutes';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {getCalculatedSerialNo} from '../../../@softbd/utilities/helpers';
import IconCourse from '../../../@softbd/icons/IconCourse';
import Genders from '../../../@softbd/utilities/Genders';
import FourIRCertificateManagementDetailsPopUp from './FourIRCertificateManagementDetailsPopUp';
import LocaleLanguage from '../../../@softbd/utilities/LocaleLanguage';
import CustomChipPaymentStatus from '../applicationManagement/CustomChipPaymentStatus';

interface IFourIRAssessmentPage {
  fourIRInitiativeId: number;
}

const FourIRCertificateM    anagementPage = ({
  fourIRInitiativeId,
}: IFourIRAssessmentPage) => {
  const {messages, locale} = useIntl();

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);

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
        Header: messages['applicationManagement.courseTitle'],
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
        Header: messages['applicationManagement.applicantFullName_en'],
        accessor: 'full_name_en',
        isVisible: locale == LocaleLanguage.EN,
        disableFilters: true,
      },
      {
        Header: messages['applicationManagement.applicantFullName'],
        accessor: 'full_name',
        disableFilters: true,
      },
      {
        Header: messages['assessment.examiner'],
        accessor: 'training_center_title',
        disableFilters: true,
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
        Header: messages['applicationManagement.status'],
        isVisible: false,
        Cell: (props: any) => {
          let data = props.row.original;
          if (data.row_status === 0) {
            return <p>Inactive</p>;
          } else if (data.row_status === 1) {
            return <p>Approved</p>;
          } else if (data.row_status === 2) {
            return <p>Pending</p>;
          } else {
            return <p>Rejected</p>;
          }
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
      paramsValueModifier: (params: any) => {
        params['four_ir_initiative_id'] = fourIRInitiativeId;
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
            <IconCourse /> <IntlMessages id='certification.label' />
          </>
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
          <FourIRCertificateManagementDetailsPopUp
            key={1}
            itemId={selectedItemId}
            onClose={closeDetailsModal}
          />
        )}
      </PageBlock>
    </>
  );
};

export default FourIRCertificateManagementPage;
