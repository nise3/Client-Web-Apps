import React, {useCallback, useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import {useIntl} from 'react-intl';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import SkillDetailsPopup from './SkillDetailsPopup';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconSkill from '../../../@softbd/icons/IconSkill';
import InterviewChipRowStatus from './InterviewChipRowStatus';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import {Download, Message} from '@mui/icons-material';
import {useFetchPublicSkills} from '../../../services/youthManagement/hooks';

const ApplicantListPage = () => {
  const {messages} = useIntl();

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [applicantsFilters] = useState({});

  const {data: applicantList, isLoading} = useFetchPublicSkills(applicantsFilters);

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
          return props.row.index + 1;
        },
      },
      {
        Header: messages['common.name'],
        accessor: 'name',
      },
      {
        Header: messages['common.post'],
        accessor: 'position',
        inVisible: false,
      },
      {
        Header: messages['common.qualification'],
        accessor: 'qualification',
        inVisible: false,
      },
      {
        Header: messages['common.experience'],
        accessor: 'experience',
        inVisible: false,
      },
      {
        Header: messages['common.status'],
        accessor: 'applicant_status',
        Cell: (props: any) => {
          let data = props.row.original;
          return <InterviewChipRowStatus value={data?.applicant_status} />;
        },
      },
      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <DatatableButtonGroup>
              <ReadButton onClick={() => openDetailsModal(data.id)} />
              <CommonButton
                onClick={() => console.log(data.id, data.course_id)}
                btnText='common.interview'
                startIcon={<Message style={{marginLeft: '5px'}} />}
                color='secondary'
              />
              <CommonButton
                onClick={() => console.log(data.id, data.course_id)}
                btnText='common.download'
                startIcon={<Download style={{marginLeft: '5px'}} />}
                color='primary'
              />
            </DatatableButtonGroup>
          );
        },
        sortable: false,
      },
    ],
    [messages],
  );

  return (
    <>
      <PageBlock
        title={
          <>
            <IconSkill /> <IntlMessages id='applicant.label' />
          </>
        }>
        <ReactTable
          columns={columns}
          data={applicantList || []}
          loading={isLoading}
          skipDefaultFilter={true}
        />

        {isOpenDetailsModal && selectedItemId && (
          <SkillDetailsPopup
            key={1}
            itemId={selectedItemId}
            onClose={closeDetailsModal}
          />
        )}
      </PageBlock>
    </>
  );
};

export default ApplicantListPage;
