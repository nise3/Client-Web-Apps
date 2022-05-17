import React, {useCallback, useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import {useIntl} from 'react-intl';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {API_4IR_ASSESSMENT} from '../../../@softbd/common/apiRoutes';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {getCalculatedSerialNo} from '../../../@softbd/utilities/helpers';
import IconCourse from '../../../@softbd/icons/IconCourse';
import Genders from '../../../@softbd/utilities/Genders';
import FourIRAssessmentDetailsPopUp from './FourIRAssessmentDetailsPopUp';
import LocaleLanguage from '../../../@softbd/utilities/LocaleLanguage';

interface IFourIRAssessmentPage {
  fourIRInitiativeId: number;
}

const FourIRAssessmentPage = ({fourIRInitiativeId}: IFourIRAssessmentPage) => {
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
        accessor: 'course_name',
      },
      {
        Header: messages['applicationManagement.courseTitle_en'],
        accessor: 'course_name_en',
        isVisible: locale === LocaleLanguage.EN,
      },
      {
        Header: messages['assessment.examinee'],
        accessor: 'examinee_name',
      },
      {
        Header: messages['assessment.examiner'],
        accessor: 'examiner_name',
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
      urlPath: API_4IR_ASSESSMENT + `/${fourIRInitiativeId}`,
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
            <IconCourse /> <IntlMessages id='assessment.label' />
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
          <FourIRAssessmentDetailsPopUp
            key={1}
            itemId={selectedItemId}
            onClose={closeDetailsModal}
          />
        )}
      </PageBlock>
    </>
  );
};

export default FourIRAssessmentPage;
