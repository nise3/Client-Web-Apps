import React, {useEffect, useState} from 'react';
import {deleteInstitute, getAllInstitutes} from '../../../services/instituteManagement/InstituteService';
import ConfirmDialog from '../../../shared/components/elements/ConfirmDialog';
import DataTableActionButtons from '../../../shared/components/blocks/DataTableActionButtons';
import ButtonGroup from 'antd/lib/button/button-group';
import ReadButton from '../../../shared/components/elements/Button/ReadButton';
import EditButton from '../../../shared/components/elements/Button/EditButton';
import DeleteButton from '../../../shared/components/elements/Button/DeleteButton';
import PageBlock from '../../../shared/components/blocks/PageBlock';
import AddButton from '../../../shared/components/elements/Button/AddButton';
import Datatable from '../../../shared/components/elements/Datatable';
import InstituteAddEditPopup from '../../../shared/components/page-components/institute/InstituteAddEditPopup';
import InstituteDetailsPopup from '../../../shared/components/page-components/institute/InstituteDetailsPopup';

const InstitutePage = () => {
  const [institutes, setInstitutes] = useState<Array<Institute> | []>([]);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [instituteId, setInstituteId] = useState<number | null>(null);

  useEffect(() => {
    loadInstitutesData();
  }, []);

  const loadInstitutesData = async () => {
    let institutes = await getAllInstitutes();
    console.log('institutes',institutes);
    setInstitutes(institutes);
  };

  const closeAddEditModal = () => {
    setIsOpenAddEditModal(false);
    setInstituteId(null);
  }


  const openAddEditModal = (instituteId: number | null = null) => {
    setIsOpenAddEditModal(true);
    setInstituteId(instituteId);
  }

  const openDetailsModal = (instituteId: number) => {
    setIsOpenDetailsModal(true);
    setInstituteId(instituteId);
  }

  const closeDetailsModal = () => {
    setIsOpenDetailsModal(false);
  }

  const showConfirm = (instituteId: number) => {
    ConfirmDialog(() => deleteInstituteItem(instituteId));
  }

  const deleteInstituteItem = async (instituteId: number) => {
    let data = await deleteInstitute(instituteId);
    if (data) {
      //Toast.success(t('object_deleted_successfully', {object: t('institute')}));
      loadInstitutesData();
    }
  }

  const columns = [
    {
      title: 'title_en',
      dataIndex: 'title_en',
      key: 'title_en',
    },
    {
      title: 'title_bn',
      dataIndex: 'title_bn',
      key: 'title_bn',
    },
    {
      title: 'institutes:code',
      dataIndex: 'code',
      key: 'code'
    },
    {
      title: 'institutes:domain',
      dataIndex: 'domain',
      key: 'domain'
    },
    {
      title: 'address',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'action',
      key: 'action',
      render(data: Institute) {
        return (
          <DataTableActionButtons>
            <ButtonGroup>
              <ReadButton onClick={() => openDetailsModal(data.id)}/>
              <EditButton onClick={() => openAddEditModal(data.id)}/>
              <DeleteButton onClick={() => showConfirm(data.id)}/>
            </ButtonGroup>
          </DataTableActionButtons>
        )
      }
    }
  ];

  return (
    <>
      <PageBlock
        title={'institutes:institute_title'}
        extra={[
          <AddButton key={1} className="float-right" onClick={() => openAddEditModal(null)}/>
        ]}
      >
        <Datatable data={institutes} columns={columns} size={'small'}/>
      </PageBlock>

      {
        isOpenAddEditModal && <InstituteAddEditPopup
          instituteId={instituteId}
          isOpenAddEditModal={isOpenAddEditModal}
          closeAddEditModal={closeAddEditModal}
          loadInstituteTableData={loadInstitutesData}
        />
      }
      {
        isOpenDetailsModal && <InstituteDetailsPopup
          instituteId={instituteId}
          isOpenDetailsModal={isOpenDetailsModal}
          closeDetailsModal={closeDetailsModal}
          openAddEditModal={openAddEditModal}
        />
      }
    </>
  );
};

export default InstitutePage;