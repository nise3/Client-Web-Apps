import React, {useEffect, useState} from 'react';
import AppAnimate from '../../../@crema/core/AppAnimate';
import Datatable from '../../../@softbd/elements/Datatable';
import PageBlock from '../../../@softbd/PageBlock';
import AddButton from '../../../@softbd/elements/Button/AddButton';
import InstituteAddEditPopup from '../../../@softbd/page-components/institute/InstituteAddEditPopup';
import {
  deleteInstitute,
  getAllInstitutes,
} from '../../../services/instituteManagement/InstituteService';
import {useIntl} from 'react-intl';
import ReadButton from '../../../@softbd/elements/Button/ReadButton';
import EditButton from '../../../@softbd/elements/Button/EditButton';
import DeleteButton from '../../../@softbd/elements/Button/DeleteButton';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const InstitutePage = () => {
  const {messages} = useIntl();

  const [institutes, setInstitutes] = useState<Array<Institute> | []>([]);
  const [instituteId, setInstituteId] = useState<number | null>(null);
  const [loadingInstituteData, setLoadingInstituteData] =
    useState<boolean>(true);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);

  useEffect(() => {
    loadInstitutesData();
  }, []);

  const loadInstitutesData = async () => {
    let institutes = await getAllInstitutes();
    console.log('institutes', institutes);
    setInstitutes(institutes);
    setLoadingInstituteData(false);
  };

  const closeAddEditModal = () => {
    setIsOpenAddEditModal(false);
    setInstituteId(null);
  };

  const openAddEditModal = (instituteId: number | null = null) => {
    setIsOpenAddEditModal(true);
    setInstituteId(instituteId);
  };

  const openDetailsModal = (instituteId: number) => {
    setIsOpenDetailsModal(true);
    setInstituteId(instituteId);
  };

  const closeDetailsModal = () => {
    setIsOpenDetailsModal(false);
  };

  const deleteInstituteItem = async (instituteId: number) => {
    let data = await deleteInstitute(instituteId);
    if (data) {
      loadInstitutesData();
    }
  };

  const t = function (text: any) {
    return text;
  };

  const columns = [
    {
      title: messages['institute.title_en'],
      dataIndex: 'title_en',
      key: 'title_en',
    },
    {
      title: messages['institute.title_bn'],
      dataIndex: 'title_bn',
      key: 'title_bn',
    },
    {
      title: messages['institute.code'],
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: t('institutes:domain'),
      dataIndex: 'domain',
      key: 'domain',
    },
    {
      title: t('address'),
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: t('action'),
      key: 'action',
      render(data: Institute) {
        return (
          <ButtonGroup
            variant='text'
            color='primary'
            aria-label='text primary button group'>
            <ReadButton onClick={() => openDetailsModal(data.id)} />
            <EditButton onClick={() => openAddEditModal(data.id)} />
            <DeleteButton
              deleteAction={() => deleteInstituteItem(data.id)}
              deleteTitle={'Are you sure?'}
            />
          </ButtonGroup>
        );
      },
    },
  ];

  return (
    <>
      <AppAnimate animation='transition.slideUpIn' delay={200}>
        <PageBlock
          title={'Create Institute'}
          extra={[
            <AddButton key={1} onClick={() => setIsOpenAddEditModal(true)} />,
          ]}>
          <Datatable
            bordered
            columns={columns}
            data={institutes}
            rowKey={'id'}
            loading={loadingInstituteData}
          />
          {isOpenAddEditModal && (
            <InstituteAddEditPopup
              open={isOpenAddEditModal}
              onClose={() => setIsOpenAddEditModal(false)}
              title={'Add new institute'}
              key={1}
              itemId={instituteId}
            />
          )}

          {/*{isOpenDetailsModal && (*/}
          {/*  <InstituteDetailsPopup*/}
          {/*    instituteId={instituteId}*/}
          {/*    isOpenDetailsModal={isOpenDetailsModal}*/}
          {/*    closeDetailsModal={closeDetailsModal}*/}
          {/*    openAddEditModal={openAddEditModal}*/}
          {/*  />*/}
          {/*)}*/}
        </PageBlock>
      </AppAnimate>
    </>
  );
};

export default InstitutePage;
