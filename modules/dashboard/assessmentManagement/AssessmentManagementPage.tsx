import React, { useCallback, useMemo, useState } from "react";
import PageBlock from "../../../@softbd/utilities/PageBlock";
import { useIntl } from "react-intl";
import ReadButton from "../../../@softbd/elements/button/ReadButton/ReadButton";
import DatatableButtonGroup from "../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup";
import useReactTableFetchData from "../../../@softbd/hooks/useReactTableFetchData";
import { API_YOUTH_ASSESSMENT } from "../../../@softbd/common/apiRoutes";
import ReactTable from "../../../@softbd/table/Table/ReactTable";
import IntlMessages from "../../../@crema/utility/IntlMessages";
import { isResponseSuccess } from "../../../@softbd/utilities/helpers";
import IconCourse from "../../../@softbd/icons/IconCourse";
import AssessmentDetailsPopup from "./AssessmentDetailsPopup";
import RejectButton from "./RejectButton";
import useNotiStack from "../../../@softbd/hooks/useNotifyStack";
import CommonButton from "../../../@softbd/elements/button/CommonButton/CommonButton";
import { rejectEnrollment } from "../../../services/instituteManagement/RegistrationService";
import AssignBatchPopup from "./AssignAssessmentBatchPopup";
import { FiUserCheck } from "react-icons/fi";
import LocaleLanguage from "../../../@softbd/utilities/LocaleLanguage";

const AssessmentManagementPage = () => {
  const {messages, locale} = useIntl();
  const {successStack} = useNotiStack();

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);
  const [isOpenBatchAssignModal, setIsOpenBatchAssignModal] = useState(false);

  /** details modal */
  const openDetailsModal = useCallback((itemId: number) => {
    setIsOpenDetailsModal(true);
    setSelectedItemId(itemId);
  }, []);

  const closeDetailsModal = useCallback(() => {
    setIsOpenDetailsModal(false);
  }, []);

  /** Assign Batch Modal */
  const openAssignBatchModal = useCallback(
    (itemId: number | null = null) => {
      setIsOpenDetailsModal(false);
      setIsOpenBatchAssignModal(true);
      setSelectedItemId(itemId);
    },
    [],
  );

  const closeAssignBatchModal = useCallback(() => {
    setIsOpenBatchAssignModal(false);
    setSelectedItemId(null);
  }, []);

  const refreshDataTable = useCallback(() => {
    setIsToggleTable((previousToggle) => !previousToggle);
  }, [isToggleTable]);

  /** Method called to reject an assessment */
  const rejectYouthEnrollment = async (enrollment_id: number) => {
    let response = await rejectEnrollment(enrollment_id);
    if (isResponseSuccess(response)) {
      {
        successStack(<IntlMessages id='assessmentManagement.rejected' />);
      }
      refreshDataTable();
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
      /*{
        Header: messages['youth.label'],
        accessor: 'youth_id',
        isVisible: locale == LocaleLanguage.BN,
      },
      {
        Header: messages['assessmentManagement.assessment'],
        accessor: 'assessment_id',
        isVisible: locale == LocaleLanguage.BN,
      },*/
      {
        Header: messages['rpl_occupation.label'],
        accessor: 'rpl_occupation_title_en',
        isVisible: locale == LocaleLanguage.BN,
      },
      {
        Header: messages['rpl_level.label'],
        accessor: 'rpl_level_title',
        isVisible: locale == LocaleLanguage.EN,
      },
      {
        Header: messages['rpl_sector.label'],
        accessor: 'rpl_sector_title',
        isVisible: locale == LocaleLanguage.BN,
      },
      {
        Header: messages['rto_country.label'],
        accessor: 'rto_country_title',
        isVisible: locale == LocaleLanguage.EN,
      },
      {
        Header: messages['assessmentManagement.target_country'],
        accessor: 'target_country_title',
        isVisible: locale == LocaleLanguage.BN,
      },
      {
        Header: messages['rto.label'],
        accessor: 'rto_title',
        isVisible: locale == LocaleLanguage.EN,
      },

      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <DatatableButtonGroup>
              <ReadButton onClick={() => openDetailsModal(data.id)} />
              <CommonButton
                onClick={() => openAssignBatchModal(data.id)}
                btnText='applicationManagement.assignBatch'
                startIcon={<FiUserCheck style={{marginLeft: '5px'}} />}
                color='secondary'
              />

              {data.row_status !== 3 ? (
                <RejectButton
                  rejectAction={() => rejectYouthEnrollment(data.id)}
                  rejectTitle={messages['common.delete_confirm'] as string}
                />
              ) : (
                ''
              )}
            </DatatableButtonGroup>
          );
        },
      },
    ],
    [messages, locale],
  );

  const {onFetchData, data, loading, pageCount, totalCount} =
    useReactTableFetchData({
      urlPath: API_YOUTH_ASSESSMENT,
    });


  return (
    <>
      <PageBlock
        title={
          <>
            <IconCourse /> <IntlMessages id='assessmentManagement.label' />
          </>
        }>
        <ReactTable
          columns={columns}
          data={data}
          fetchData={onFetchData}
          loading={loading}
          pageCount={pageCount}
          totalCount={totalCount}
          toggleResetTable={isToggleTable}
        />
        {isOpenBatchAssignModal && (
          <AssignBatchPopup
            key={1}
            onClose={closeAssignBatchModal}
            itemId={selectedItemId}
            batchId={data?.rto_batch_id}
            refreshDataTable={refreshDataTable}
          />
        )}
        {isOpenDetailsModal && selectedItemId && (
          <AssessmentDetailsPopup
            key={1}
            itemId={selectedItemId}
            onClose={closeDetailsModal}
          />
        )}
      </PageBlock>
    </>
  );
};

export default AssessmentManagementPage;
