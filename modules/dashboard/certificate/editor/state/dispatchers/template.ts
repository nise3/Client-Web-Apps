import Konva from 'konva';
import {useRecoilCallback} from 'recoil';
import {savedTemplateState} from '../atoms/editor';
import {backgroundState} from '../atoms/template';
import {templateSelector} from '../selectors/template';

function useTemplateDispatcher() {
  const updateBackground = useRecoilCallback(
    ({set}) =>
      (background: Konva.ShapeConfig) => {
        set(backgroundState, (config) => ({...config, ...background}));
      },
    [],
  );
  const setCurrentTemplateToSave = useRecoilCallback(
    ({set, snapshot}) =>
      async () => {
        const template = await snapshot.getPromise(templateSelector);
        set(savedTemplateState, template);
        return template;
      },
    [],
  );

  return {
    updateBackground,
    setCurrentTemplateToSave,
  };
}

export default useTemplateDispatcher;
