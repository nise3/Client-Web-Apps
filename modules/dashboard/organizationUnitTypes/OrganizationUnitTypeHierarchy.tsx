// @ts-ignore
import OrganizationChart from 'nextjs-orgchart';
import React, {useCallback, useEffect, useState} from 'react';
import {Popover, styled} from '@mui/material';
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
import HumanResourceTemplateAddEditPopup from '../humanResourceTemplates/HumanResourceTemplateAddEditPopup';
import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {getOrganizationUnitTypeHierarchy} from '../../../services/organaizationManagement/OrganizationUnitTypeService';
import {HIERARCHY_NODE_ID_PREFIX_STRING} from '../../../@softbd/common/constants';
import ChartCSS from './ChartCSS';
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

  item.title = item[titleField];
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

const getHierarchyHierarchyData = async (
  organization_unit_type_id: number,
  setHierarchyData: any,
  locale: any,
): Promise<boolean> => {
  let response = await getOrganizationUnitTypeHierarchy(
    organization_unit_type_id,
  );
  if (response) {
    const {data: item} = response;
    const titleField = locale == LocaleLanguage.EN ? 'title_en' : 'title';

    if (item) {
      makeHierarchyData(item, titleField);
      setHierarchyData(item);
      return true;
    } else {
      return false;
    }
  }
  return false;
};

const StyledWrapper = styled('div')(() => ({...ChartCSS}));

const OrganizationUnitTypeHierarchy = () => {
  const {messages, locale} = useIntl();
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
        locale,
      ).then((res: boolean) => {
        if (!res) {
          openAddEditModal();
        }
      });
    }
  }, [organizationUnitTypeId, locale]);

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

    let draggedNodeId: string | number | null = null;
    let droppedNodeId: string | number | null | boolean = null;

    const handleDragStart = (event: any) => {
      draggedNodeId = event.target?.id;
    };

    node.map((trigger: Element) => {
      trigger.addEventListener('dragstart', handleDragStart);
      // trigger.addEventListener('dragstart', (e: any) => {
      //   draggedNodeId = e.target?.id;
      // });
    });

    const handleDrop = (e: any) => {
      droppedNodeId = getElementId(e.target, 0, 3);
      draggedNodeId = getIdFromNodeId(String(draggedNodeId));
      droppedNodeId = getIdFromNodeId(String(droppedNodeId));

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
                  subject: <IntlMessages id='human_resource_template.label' />,
                }}
              />,
            );
          }
        }
      })();
    };

    node.map((trigger) => {
      trigger.addEventListener('drop', handleDrop);
    });

    //detaching drag&drop event listener to every hierarchy node.
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

  const handlePopOverClose = () => {
    setAnchorEl(null);
  };

  const reloadHierarchyData = useCallback(() => {
    getHierarchyHierarchyData(
      Number(organizationUnitTypeId),
      setHierarchyData,
      locale,
    );
  }, [organizationUnitTypeId, locale]);

  const deleteHumanResourceFromTemplate = useCallback(() => {
    selectedItemId &&
      (async () => {
        let response = await deleteHumanResourceTemplate(selectedItemId);
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
          id={anchorEl ? 'simple-popover' : undefined}
          title={'Organization Unit type Hierarchy Action Buttons'}
          open={Boolean(anchorEl)}
          onClose={handlePopOverClose}
          anchorEl={anchorEl}
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
                deleteAction={() => deleteHumanResourceFromTemplate()}
                deleteTitle={messages['common.delete_confirm'] as string}
              />
            )}
          </DatatableButtonGroup>
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
    </StyledWrapper>
  );
};

export default OrganizationUnitTypeHierarchy;
