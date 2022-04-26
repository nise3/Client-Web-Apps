// import Konva from 'konva';
import {atom} from 'recoil';
import {EditorPanel} from '../../interfaces/Editor';
import {Template} from '../../interfaces/StageConfig';

export const activePanelState = atom<EditorPanel>({
  key: 'activePanelState',
  default: EditorPanel.Settings,
});

export const selectedElementIdState = atom<string | undefined>({
  key: 'selectedElementIdState',
  default: undefined,
});
export const isLoadingState = atom({
  key: 'isLoadingState',
  default: false,
});

export const highlightedElementIdState = atom<string | undefined>({
  key: 'highlightedElementIdState',
  default: undefined,
});
export const ratioState = atom({
  key: 'ratioState',
  default: 1,
});
export const savedTemplateState = atom<Template | undefined>({
  key: 'savedTemplateState',
  default: undefined,
});
