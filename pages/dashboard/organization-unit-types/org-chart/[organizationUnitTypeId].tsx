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
import {
  deleteHumanResourceTemplate,
  getHumanResourceTemplate,
  updateHumanResourceTemplate,
} from '../../../../services/organaizationManagement/HumanResourceTemplateService';
import {useRouter} from 'next/router';
import AppPage from '../../../../@crema/hoc/AppPage';
import PageMeta from '../../../../@crema/core/PageMeta';

const makeChartData = (item: any) => {
  item.id = 'm' + item.id;
  item.title = item.title_en;
  item.name = item.title_bn;

  if (item.children && Array.isArray(item.children)) {
    item.children.map((node: any) => {
      makeChartData(node);
    });
  } else {
    return item;
  }
  return item;
};

const getHierarchyChartData = async (
  organization_unit_type_id: any,
  setChartData: any,
) => {
  let response = await getOrganizationUnitTypeHierarchy(
    organization_unit_type_id,
  );
  if (response) {
    const {data: item} = response;
    if (item) {
      makeChartData(item);
      setChartData(item);
    }
  }
};

const OrgChart = () => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();

  const [chartData, setChartData] = useState<object>({});
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [selectedItemParentId, setSelectedItemParentId] = useState<
    number | null
  >(null);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);

  const {organizationUnitTypeId} = router.query;

  useEffect(() => {
    organizationUnitTypeId &&
      getHierarchyChartData(organizationUnitTypeId, setChartData);
  }, [organizationUnitTypeId]);

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

  function getElementId(
    ele: any,
    step: number,
    maxStep: number,
  ): number | boolean {
    if (step > maxStep) return false;
    if (ele.id) {
      return ele.id;
    }

    return getElementId(ele.parentNode, step + 1, maxStep);
  }

  useEffect(() => {
    const node = Array.from(document.querySelectorAll('.oc-hierarchy'));
    let draggedNodeId: number | null = null;
    let droppedNodeId = null;

    node.map((trigger) => {
      trigger.addEventListener('dragstart', (e: any) => {
        draggedNodeId = e.target?.id;
      });
    });

    node.map((trigger) => {
      trigger.addEventListener('drop', (e: any) => {
        droppedNodeId = getElementId(e.target, 0, 3);
        draggedNodeId = Number(draggedNodeId?.toString().substring(1));
        droppedNodeId = Number(droppedNodeId.toString().substring(1));
        let humanResourceTemplate;
        (async () => {
          let response = await getHumanResourceTemplate(draggedNodeId);
          if (response) {
            if (!response.data.parent_id) {
              successStack(
                <IntlMessages id='common.root_cant_be_drag_and_drop' />,
              );

              return false;
            }
            humanResourceTemplate = response.data;
            humanResourceTemplate.parent_id = droppedNodeId;
            response = await updateHumanResourceTemplate(
              draggedNodeId,
              humanResourceTemplate,
            );
            if (isResponseSuccess(response)) {
              successStack(
                <IntlMessages
                  id='common.subject_updated_successfully'
                  values={{
                    subject: (
                      <IntlMessages id='human_resource_template.label' />
                    ),
                  }}
                />,
              );
            }
          }
        })();
      });
    });

    node.map((trigger) => {
      trigger.removeEventListener('drop', () => {});
      trigger.removeEventListener('dragstart', () => {});
    });
  }, []);

  const handleNodeClick = (event: any) => {
    setAnchorEl(event.id);
    setSelectedItemId(event.id);
    setSelectedItemParentId(event.parent_id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const reloadData = useCallback(() => {
    getHierarchyChartData(organizationUnitTypeId, setChartData);
  }, [organizationUnitTypeId]);

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
        onClickNode={handleNodeClick}
        dropCriteria={(draggedNode: any, dragZone: any, dropZone: any) => {
          console.log('draggedNde;', draggedNode);
          return false;
          if (!draggedNode.parent) {
            return false;
          }
        }}
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
              {selectedItemParentId && (
                <DeleteButton
                  deleteAction={() =>
                    selectedItemId &&
                    deleteHumanResourceFromTemplate(selectedItemId)
                  }
                  deleteTitle={messages['common.delete_confirm'] as string}
                />
              )}
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
