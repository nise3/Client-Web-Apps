// @ts-ignore
import OrganizationChart from 'nextjs-orgchart';
import 'nextjs-orgchart/dist/ChartContainer.css';
import 'nextjs-orgchart/dist/ChartNode.css';
import React, {useCallback, useEffect, useState} from 'react';
import {Popover, Typography} from '@material-ui/core';
import {useRouter} from 'next/router';
import {
  deleteHumanResourceTemplate,
  getHumanResourceTemplate,
  updateHumanResourceTemplate,
} from '../../../services/organaizationManagement/HumanResourceTemplateService';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {isResponseSuccess} from '../../../@softbd/utilities/helpers';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DeleteButton from '../../../@softbd/elements/button/DeleteButton/DeleteButton';
import HumanResourceTemplateAddEditPopup from '../human-resource-templates/HumanResourceTemplateAddEditPopup';
import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {getOrganizationUnitTypeHierarchy} from '../../../services/organaizationManagement/OrganizationUnitTypeService';

const makeHierarchyData = (item: any) => {
  // next-js organization chart dont take id as number to render chart, so prepending a 'm'
  item.id = 'm' + item.id;
  item.title = item.title_en;
  item.name = item.title_bn;

  if (item.children && Array.isArray(item.children)) {
    item.children.map((node: any) => {
      makeHierarchyData(node);
    });
  } else {
    return item;
  }
  return item;
};

const getHierarchyHierarchyData = async (
  organization_unit_type_id: number,
  setHierarchyData: any,
): Promise<boolean> => {
  let response = await getOrganizationUnitTypeHierarchy(
    organization_unit_type_id,
  );
  if (response) {
    const {data: item} = response;
    if (item) {
      makeHierarchyData(item);
      setHierarchyData(item);
      return true;
    } else {
      return false;
    }
  }
  return false;
};

const OrganizationUnitTypeHierarchy = () => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const router = useRouter();

  const [HierarchyData, setHierarchyData] = useState<object>({});
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [selectedItemParentId, setSelectedItemParentId] = useState<
    number | null
  >(null);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);

  const {organizationUnitTypeId} = router.query;

  useEffect(() => {
    if (organizationUnitTypeId) {
      getHierarchyHierarchyData(
        Number(organizationUnitTypeId),
        setHierarchyData,
      ).then((res: boolean) => {
        if (!res) {
          openAddEditModal();
        }
      });
    }
  }, [organizationUnitTypeId]);

  const closeAddEditModal = useCallback(() => {
    setIsOpenAddEditModal(false);
  }, []);

  const openAddEditModal = (isEdit: boolean = false) => {
    setIsEdit(isEdit);
    setIsOpenAddEditModal(true);
  };

  // Tree coloring portion is not completed
  const colors = ['green', 'red', 'blue'];
  const shuffleLists = (root: HTMLDivElement) => {
    let elems = root.getElementsByTagName('ul');

    // @ts-ignore
    for (let item of elems) {
      console.log('item', item);
    }
  };
  function treeColoring(root: any, step: number) {
    let heading = root.getElementsByClassName('oc-heading')[0];
    if (heading) {
      heading.style.backgroundColor = colors[step];
    } else {
      return;
    }

    shuffleLists(root);
  }

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
    treeColoring(node[0], 0);

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
        draggedNodeId = Number(draggedNodeId?.toString().replace('m', ''));
        droppedNodeId = Number(droppedNodeId.toString().replace('m', ''));

        //drag node and drop node is same, no need to further approach
        if (draggedNodeId == droppedNodeId) {
          return false;
        }
        let humanResourceTemplate;
        (async () => {
          let response = await getHumanResourceTemplate(draggedNodeId);
          if (response) {
            //if dragged node is a parent node , then prevent drag and drop
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

    //attaching drag&drop event listener to every hierarchy node.
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

  const handlePopOverClose = () => {
    setAnchorEl(null);
  };

  const reloadHierarchyData = useCallback(() => {
    getHierarchyHierarchyData(Number(organizationUnitTypeId), setHierarchyData);
  }, [organizationUnitTypeId]);

  const deleteHumanResourceFromTemplate = useCallback(async () => {
    const humanResourceId = Number(selectedItemId?.toString().replace('m', ''));
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
      reloadHierarchyData();
    }
  }, []);

  return (
    <>
      <OrganizationChart
        datasource={HierarchyData}
        draggable={true}
        onClickNode={handleNodeClick}
      />
      {
        <Popover
          id={anchorEl ? 'simple-popover' : undefined}
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handlePopOverClose}
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
              <AddButton onClick={() => openAddEditModal(false)} />
              <EditButton onClick={() => openAddEditModal(true)} />
              {selectedItemParentId && (
                <DeleteButton
                  deleteAction={() =>
                    selectedItemId && deleteHumanResourceFromTemplate()
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
          refreshDataTable={reloadHierarchyData}
          isEdit={isEdit}
          organizationUnitTypeId={Number(organizationUnitTypeId)}
        />
      )}
    </>
  );
};

export default OrganizationUnitTypeHierarchy;
