import React, {useEffect, useState} from 'react';
import AppAnimate from '../../../@crema/core/AppAnimate';
import Datatable from '../../../@softbd/elements/Datatable';
import PageBlock from '../../../@softbd/PageBlock';
import AddButton from '../../../@softbd/elements/Button/AddButton';
import InstituteAddEditPopup from '../../../@softbd/page-components/institute/InstituteAddEditPopup';
import {getAllInstitutes} from '../../../services/instituteManagement/InstituteService';
import {useIntl} from 'react-intl';

const InstitutePage = () => {
  const {messages} = useIntl();

  const [institutes, setInstitutes] = useState<Array<Institute> | []>([]);
  const [loadingInstituteData, setLoadingInstituteData] =
    useState<boolean>(true);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);

  useEffect(() => {
    loadInstitutesData();
  }, []);

  const loadInstitutesData = async () => {
    let institutes = await getAllInstitutes();
    console.log('institutes', institutes);
    setInstitutes(institutes);
    setLoadingInstituteData(false);
  };

  // const showConfirm = (instituteId: number) => {
  //   ConfirmDialog(() => deleteInstituteItem(instituteId));
  // }
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
        return <></>;
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
              isOpenAddEditModal={isOpenAddEditModal}
              onClose={() => setIsOpenAddEditModal(false)}
              title={'Add new institute'}
              key={1}
              instituteId={null}
              loadInstituteTableData={{}}
            />
          )}
        </PageBlock>
      </AppAnimate>
    </>
  );
};

export default InstitutePage;
