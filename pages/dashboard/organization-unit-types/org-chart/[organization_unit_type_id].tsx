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
  const router = useRouter();

  const {organization_unit_type_id} = router.query;

  useEffect(() => {
    getHierarchyChartData();
  }, [organization_unit_type_id]);

  const getHierarchyChartData = async () => {
    let response = await getOrganizationUnitTypeHierarchy(
      organization_unit_type_id,
    );
    if (response) {
      const {data: item} = response;
      if (item) {
        item.id = 'm' + item.id;
        item.title = item.title_en;
        item.name = item.title_en;
        if (item.children && Array.isArray(item.children)) {
          item.children.map((node: any) => {
            node.id = 'm' + node.id;
            node.title = node.title_en;
            node.name = node.title_bn;
          });
        } else {
          item.children.id = 'm' + item.children.id;
          item.children.title = item.children.title_en;
          item.children.name = item.children.title_en;
        }
        setChartData(item);
      }
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);

  const closeAddEditModal = useCallback(() => {
    setIsOpenAddEditModal(false);
  }, []);

  const openAddEditModal = (
    itemId: number | null = null,
    isEdit: boolean = false,
  ) => {
    setSelectedItemId(itemId);
    setIsEdit(isEdit);
    setIsOpenAddEditModal(true);
  };

  useEffect(() => {
    const circles = Array.from(document.querySelectorAll('.oc-hierarchy'));
    circles.map((trigger) => {
      trigger.addEventListener('drop', (e: any) => {
        console.log(e.target);
        alert('clicked');
      });
    });
  }, []);

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
              <AddButton
                onClick={() => openAddEditModal(selectedItemId, false)}
              />
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
