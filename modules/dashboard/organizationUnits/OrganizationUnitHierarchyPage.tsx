// @ts-ignore
import OrganizationChart from 'nextjs-orgchart';
import React, {useCallback, useEffect, useState} from 'react';
import {Popover, styled} from '@mui/material';
import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useRouter} from 'next/router';
import {useOrganizationUnitHierarchy} from '../../../services/organaizationManagement/hooks';
import {
  deleteHumanResource,
  getHumanResource,
  updateHumanResource,
} from '../../../services/organaizationManagement/HumanResourceService';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {isResponseSuccess} from '../../../@softbd/utilities/helpers';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DeleteButton from '../../../@softbd/elements/button/DeleteButton/DeleteButton';
import HumanResourceAddEditPopup from '../humanResources/HumanResourceAddEditPopup';
import {HIERARCHY_NODE_ID_PREFIX_STRING} from '../../../@softbd/common/constants';
import ChartCSS from '../organizationUnitTypes/ChartCSS';
import LocaleLanguage from '../../../@softbd/utilities/LocaleLanguage';

const getIdFromNodeId = (nodeId: string) => {
  return Number(nodeId.toString().replace(HIERARCHY_NODE_ID_PREFIX_STRING, ''));
};

const isPrependedM = (item: any) =>
  typeof item.id == 'string' &&
  item.id.indexOf(HIERARCHY_NODE_ID_PREFIX_STRING) > -1;

const makeHierarchyData = (item: any, titleField: any) => {
  // next-js organization chart dont take id as number to render chart, so prepending a 'm'
  item.id = isPrependedM(item.id)
    ? item.id
    : HIERARCHY_NODE_ID_PREFIX_STRING + item.id;
  item.name = item[titleField];

  if (item.children && Array.isArray(item.children)) {
    item.children.map((node: any) => {
      makeHierarchyData(node, titleField);
    });
  } else {
    return item;
  }

  return item;
};

const StyledWrapper = styled('div')(() => ({...ChartCSS}));

const OrganizationUnitHierarchyPage = () => {
  const {messages, locale} = useIntl();
  const {successStack} = useNotiStack();

  const [HierarchyData, setHierarchyData] = useState<object>({});
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [selectedItemParentId, setSelectedItemParentId] = useState<
    number | null
  >(null);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);

  const {organizationUnitId} = router.query;
  const {
    data,
    metaData,
    mutate: mutateHierarchyData,
  } = useOrganizationUnitHierarchy(Number(organizationUnitId));

  useEffect(() => {
    const titleField = locale == LocaleLanguage.EN ? 'title_en' : 'title';

    if (data) {
      const HierarchyData = makeHierarchyData(data, titleField);
      setHierarchyData(HierarchyData);
    }

    if (metaData._response_status && !data && organizationUnitId) {
      openAddEditModal();
    }
  }, [data, organizationUnitId, locale]);

  const closeAddEditModal = useCallback(() => {
    setIsOpenAddEditModal(false);
  }, []);

  const openAddEditModal = (isEdit: boolean = false) => {
    setIsEdit(isEdit);
    setIsOpenAddEditModal(true);
  };

  //Tree coloring portion is not completed
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

  //search for dragged element.
  function getElementId(
    ele: any,
    step: number,
    maxStep: number,
  ): string | boolean {
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

    const handleDragStart = (e: any) => {
      draggedNodeId = e.target?.id;
    };

    node.map((trigger) => {
      trigger.addEventListener('dragstart', handleDragStart);
    });

    const handleDrop = (e: any) => {
      droppedNodeId = getElementId(e.target, 0, 3);

      if (droppedNodeId) {
        draggedNodeId = getIdFromNodeId(String(draggedNodeId));
        droppedNodeId = getIdFromNodeId(String(droppedNodeId));
      } else {
        return false;
      }

      //prevent api call if drag & drop node is same.
      if (draggedNodeId == droppedNodeId) {
        return false;
      }
      let humanResource;
      (async () => {
        let response = await getHumanResource(draggedNodeId);
        if (response) {
          //prevent drag&drop if node is root element. only root element have no parent.
          if (!response.data.parent_id) {
            successStack(
              <IntlMessages id='common.root_cant_be_drag_and_drop' />,
            );

            return false;
          }
          humanResource = response.data;
          humanResource.parent_id = droppedNodeId;
          response = await updateHumanResource(draggedNodeId, humanResource);
          if (isResponseSuccess(response)) {
            successStack(
              <IntlMessages
                id='common.subject_updated_successfully'
                values={{
                  subject: <IntlMessages id='human_resource.label' />,
                }}
              />,
            );
          }
        } else {
          return false;
        }
      })();
    };

    node.map((trigger) => {
      trigger.addEventListener('drop', handleDrop);
    });

    //detaching drag&drop event listener to every hierarchy node during unmount.
    return () => {
      node.map((trigger) => {
        trigger.removeEventListener('drop', handleDrop);
        trigger.removeEventListener('dragstart', handleDragStart);
      });
    };
  }, []);

  const handleNodeClick = (event: any) => {
    const el = document.getElementById(event.id);
    setAnchorEl(el ? el : event.id);

    const itemId = event.id
      .toString()
      .replace(HIERARCHY_NODE_ID_PREFIX_STRING, '');
    setSelectedItemId(itemId);
    setSelectedItemParentId(event.parent_id);
  };

  const handleActionPopOverClose = () => {
    setAnchorEl(null);
  };

  const deleteHumanResourceItem = useCallback(() => {
    selectedItemId &&
      (async () => {
        let response = await deleteHumanResource(selectedItemId);
        if (isResponseSuccess(response)) {
          successStack(
            <IntlMessages
              id='common.subject_deleted_successfully'
              values={{
                subject: <IntlMessages id='human_resource.label' />,
              }}
            />,
          );
          mutateHierarchyData();
        }
      })();
  }, [selectedItemId]);

  return (
    <StyledWrapper>
      <OrganizationChart
        datasource={HierarchyData}
        draggable={true}
        onClickNode={handleNodeClick}
      />
      {
        <Popover
          id={Boolean(anchorEl) ? 'simple-popover' : undefined}
          title={'Hierarchy Action Buttons'}
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleActionPopOverClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}>
          <DatatableButtonGroup>
            <AddButton tooltip={''} onClick={() => openAddEditModal(false)} />
            <EditButton onClick={() => openAddEditModal(true)} />
            {selectedItemParentId && selectedItemId && (
              <DeleteButton
                deleteAction={() => deleteHumanResourceItem()}
                deleteTitle={messages['common.delete_confirm'] as string}
              />
            )}
          </DatatableButtonGroup>
        </Popover>
      }
      {isOpenAddEditModal && (
        <HumanResourceAddEditPopup
          itemId={selectedItemId}
          onClose={closeAddEditModal}
          refreshDataTable={mutateHierarchyData}
          isEdit={isEdit}
          organizationUnitId={Number(organizationUnitId)}
        />
      )}
    </StyledWrapper>
  );
};

export default OrganizationUnitHierarchyPage;
