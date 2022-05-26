import React, {useMemo} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import {useIntl} from 'react-intl';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {API_4IR_ASSESSMENT} from '../../../@softbd/common/apiRoutes';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {getCalculatedSerialNo} from '../../../@softbd/utilities/helpers';
import IconCourse from '../../../@softbd/icons/IconCourse';
import Genders from '../../../@softbd/utilities/Genders';
import LocaleLanguage from '../../../@softbd/utilities/LocaleLanguage';
import {Typography} from '@mui/material';
import {IPageHeader} from '../4IRSteppers';

interface IFourIRAssessmentPage {
  fourIRInitiativeId: number;
  pageHeader: IPageHeader;
}

const FourIRAssessmentPage = ({
  fourIRInitiativeId,
  pageHeader,
}: IFourIRAssessmentPage) => {
  const {messages, locale} = useIntl();

  // const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  // const [selectedItem, setSelectedItem] = useState<Object | null>(null);
  // const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);

  // /** details modal */
  // const openDetailsModal = useCallback((item: any) => {
  //   setSelectedItem(item);
  //   setIsOpenDetailsModal(true);
  //   setSelectedItemId(item.id);
  // }, []);
  //
  // const closeDetailsModal = useCallback(() => {
  //   setIsOpenDetailsModal(false);
  //   setSelectedItem(null);
  // }, []);

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
        Header: messages['assessment.examinee'],
        Cell: (props: any) => {
          let data = props.row.original;
          const youth_profile = data?.youth_profile;
          return (
            <Typography>{`${youth_profile?.first_name} ${youth_profile?.last_name}`}</Typography>
          );
        },
      },
      {
        Header: messages['applicationManagement.courseTitle'],
        accessor: 'course_title',
      },
      {
        Header: messages['applicationManagement.courseTitle_en'],
        accessor: 'course_title_en',
        isVisible: locale === LocaleLanguage.EN,
      },

      {
        Header: messages['assessment.examiner'],
        accessor: 'examiner_name',
      },

      // {
      //   Header: messages['common.actions'],
      //   Cell: (props: any) => {
      //     let data = props.row.original;
      //     return (
      //       <DatatableButtonGroup>
      //         <ReadButton onClick={() => openDetailsModal(data)} />
      //       </DatatableButtonGroup>
      //     );
      //   },
      // },
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
            <IconCourse /> <IntlMessages id='assessment.label' />{' '}
            {`(${pageHeader?.tagline_name} > ${pageHeader?.initative_name})`}
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

        {/*{isOpenDetailsModal && selectedItem && selectedItemId && (*/}
        {/*  <FourIRAssessmentDetailsPopUp*/}
        {/*    key={1}*/}
        {/*    itemData={selectedItem}*/}
        {/*    itemId={selectedItemId}*/}
        {/*    onClose={closeDetailsModal}*/}
        {/*  />*/}
        {/*)}*/}
      </PageBlock>
    </>
  );
};

export default FourIRAssessmentPage;
