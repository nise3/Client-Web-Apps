// @ts-ignore
import OrganizationChart from 'nextjs-orgchart';
import 'nextjs-orgchart/dist/ChartContainer.css';
import 'nextjs-orgchart/dist/ChartNode.css';
import {getOrganizationUnitTypeHierarchy} from '../../../../services/organaizationManagement/OrganizationUnitTypeService';
import React, {useCallback, useEffect, useState} from 'react';
import {Popover, Typography} from '@material-ui/core';
import EditButton from '../../../../@softbd/elements/button/EditButton/EditButton';
import DeleteButton from '../../../../@softbd/elements/button/DeleteButton/DeleteButton';
import DatatableButtonGroup from '../../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import {useIntl} from 'react-intl';
import HumanResourceTemplateAddEditPopup from '../../../../modules/dashboard/human-resource-templates/HumanResourceTemplateAddEditPopup';
import AddButton from '../../../../@softbd/elements/button/AddButton/AddButton';
import {isResponseSuccess} from '../../../../@softbd/common/helpers';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import useNotiStack from '../../../../@softbd/hooks/useNotifyStack';
import {deleteHumanResourceTemplate} from '../../../../services/organaizationManagement/HumanResourceTemplateService';
import {useRouter} from 'next/router';
import AppPage from '../../../../@crema/hoc/AppPage';
import PageMeta from '../../../../@crema/core/PageMeta';

const OrgChart = () => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();

  const [chartData, setChartData] = useState<object>({});
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [orgUnitTypeId, setOrgUnitTypeId] = useState<any>(1);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const {organization_unit_type_id} = router.query;
      await setOrgUnitTypeId(organization_unit_type_id);
    })();
    getHierarchyChartData();
  }, [chartData]);

  const getHierarchyChartData = async () => {
    if (orgUnitTypeId) {
      let {data: response} = await getOrganizationUnitTypeHierarchy(
        orgUnitTypeId,
      );
      response.title = response.title_en;
      response.name = response.title_en;
      if (response.children && Array.isArray(response.children)) {
        response.children.map((node: any) => {
          node.title = node.id;
          node.name = node.title_bn;
        });
      } else {
        response.children.title = response.children.title_en;
        response.children.name = response.children.title_en;
      }
      await setChartData(response);
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);

  const closeAddEditModal = useCallback(() => {
    setIsOpenAddEditModal(false);
    setSelectedItemId(null);
  }, []);

  const openAddEditModal = useCallback(
    (itemId: number | null = null, isEdit: boolean = false) => {
      setIsOpenAddEditModal(true);
      setSelectedItemId(itemId);
      setIsEdit(isEdit);
    },
    [],
  );

  const handleClick = (event: any) => {
    setAnchorEl(event.id);
    setSelectedItemId(event.id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const reloadData = () => {
    getHierarchyChartData();
  };

  const deleteHumanResourceFromTemplate = async (humanResourceId: number) => {
    let response = await deleteHumanResourceTemplate(humanResourceId);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_deleted_successfully'
          values={{
            subject: <IntlMessages id='human_resource_template.label' />,
          }}
        />,
      );
      reloadData();
    }
  };

  return (
    <>
      <OrganizationChart
        datasource={chartData}
        draggable={true}
        onClickNode={handleClick}
      />
      {
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}>
          <Typography>
            <DatatableButtonGroup>
              <AddButton onClick={() => openAddEditModal(selectedItemId)} />
              <EditButton
                onClick={() => openAddEditModal(selectedItemId, true)}
              />
              <DeleteButton
                deleteAction={() =>
                  selectedItemId &&
                  deleteHumanResourceFromTemplate(selectedItemId)
                }
                deleteTitle={messages['common.delete_confirm'] as string}
              />
            </DatatableButtonGroup>
          </Typography>
        </Popover>
      }
      {isOpenAddEditModal && (
        <HumanResourceTemplateAddEditPopup
          itemId={selectedItemId}
          onClose={closeAddEditModal}
          refreshDataTable={reloadData}
          isEdit={isEdit}
        />
      )}
    </>
  );
};

export default AppPage(() => (
  <>
    <PageMeta title='Organization Chart' />
    <OrgChart />
  </>
));
