import React, {useEffect, useMemo, useState} from 'react';
import {Layer, Rect, Stage} from 'react-konva';
import {useRecoilBridgeAcrossReactRoots_UNSTABLE, useRecoilValue} from 'recoil';
import {CANVAS_STROKE, EDITOR_MARGIN} from '../../constants';
import {EditorAreaContainer} from '../../state/containers/EditorAreaContainer';
import {ElementRefsContainer} from '../../state/containers//ElementRefsContainer';
import useRatioControls from '../../hooks/useRatioControl';
import {Dimensions} from '../../interfaces/StageConfig';
import {isLoadingState, ratioState} from '../../state/atoms/editor';
import {backgroundState, dimensionsState} from '../../state/atoms/template';
import Elements from './Elements';
import Template from '../../template';
import useTemplateDispatcher from '../../state/dispatchers/template';

function ViewRenderer() {
  const ratio = useRecoilValue(ratioState);
  const dimensions = useRecoilValue(dimensionsState);
  const background = useRecoilValue(backgroundState);
  const isLoading = useRecoilValue(isLoadingState);
  const RecoilBridge = useRecoilBridgeAcrossReactRoots_UNSTABLE();
  const {fitToScreen} = useRatioControls();
  const {getScreenDimensions} = EditorAreaContainer.useContainer();
  const {setLoadedTemplate} = useTemplateDispatcher();
  const {editorAreaRef, setScreenDimensions} =
    EditorAreaContainer.useContainer();
  const [containerDimensions, setContainerDimensions] = useState<
    Dimensions | undefined
  >();

  useEffect(() => {
    if (editorAreaRef.current) {
      const containerDimensions = editorAreaRef.current.getBoundingClientRect();
      setScreenDimensions({
        width: containerDimensions.width - 2 * EDITOR_MARGIN,
        height: containerDimensions.height - 2 * EDITOR_MARGIN,
      });

      fitToScreen();

      const observer = new ResizeObserver((entries) => {
        const containerDimensions = entries[0].target.getBoundingClientRect();

        setContainerDimensions(containerDimensions);
        setScreenDimensions({
          width: containerDimensions.width - 2 * EDITOR_MARGIN,
          height: containerDimensions.height - 2 * EDITOR_MARGIN,
        });
      });

      observer.observe(editorAreaRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, [editorAreaRef, fitToScreen, setScreenDimensions]);
  const userInfo = {
    'candidate-name': 'Talukdar Mohammad Sirajul Islam',
  };
  const loadTemplate = async () => {
    const templateJson = Template;
    const template = JSON.parse(templateJson);
    console.log(template);
    template.elements.map((t: any) => {
      if (t.type === 'input') {
        console.log(t.props.class);
        //@ts-ignore
        console.log('name: ', userInfo[t.props.class]);
        //@ts-ignore
        t.props.text = userInfo[t.props.class];
        t.props.align = 'center';
        console.log(t);
      }
      return 1;
    });

    // await Promise.all([
    //   loadTemplateImages(template),
    //   loadTemplateFonts(template),
    // ]);
    // autoCorrectTemplateIssues(template);

    // // Do not show loader if all fonts loaded from cache
    // clearTimeout(loadingTimeout);

    setLoadedTemplate(template, getScreenDimensions());
    // console.log('inside load template');
  };
  useEffect(() => {
    loadTemplate();
    // console.log('loaded');
  }, []);

  const area = useMemo(() => {
    if (!containerDimensions) {
      return null;
    }

    const canvasArea = {
      width: dimensions.width * ratio + 2 * EDITOR_MARGIN,
      height: dimensions.height * ratio + 2 * EDITOR_MARGIN,
    };
    const stageDimensions = {
      width: Math.max(1, containerDimensions.width, canvasArea.width),
      height: Math.max(1, containerDimensions.height, canvasArea.height),
    };

    const offsetX =
      (Math.max(0, (stageDimensions.width - canvasArea.width) / 2) +
        EDITOR_MARGIN) /
      ratio;
    const offsetY =
      (Math.max(0, (stageDimensions.height - canvasArea.height) / 2) +
        EDITOR_MARGIN) /
      ratio;

    return {
      containerDimensions,
      stageDimensions,
      scale: {
        x: ratio,
        y: ratio,
      },
      offset: {
        x: -offsetX,
        y: -offsetY,
      },
    };
  }, [containerDimensions, dimensions.height, dimensions.width, ratio]);

  return (
    <div
      className={`canvas-area-container ${
        isLoading ? 'canvas-area-container-loading' : ''
      }`}
      ref={editorAreaRef}>
      {/* {isLoading && (
        <>
          <CircularProgress />
        </>
      )} */}

      {area && (
        <Stage
          scaleX={area.scale.x}
          scaleY={area.scale.y}
          offsetX={area.offset.x}
          offsetY={area.offset.y}
          width={area.stageDimensions.width}
          height={area.stageDimensions.height}>
          <RecoilBridge>
            <ElementRefsContainer.Provider>
              <Layer>
                <Rect
                  x={-CANVAS_STROKE / ratio}
                  y={-CANVAS_STROKE / ratio}
                  width={dimensions.width + (2 * CANVAS_STROKE) / ratio}
                  height={dimensions.height + (2 * CANVAS_STROKE) / ratio}
                  shadowColor='black'
                  shadowOpacity={0.1}
                  shadowBlur={4}
                  shadowEnabled
                  fill='rgb(229, 231, 235)'
                />
                <Rect
                  width={dimensions.width}
                  height={dimensions.height}
                  shadowColor='black'
                  shadowOpacity={0.06}
                  shadowBlur={2}
                  shadowEnabled
                  {...background}
                />
              </Layer>
              <Layer
                clipX={0}
                clipY={0}
                clipWidth={dimensions.width}
                clipHeight={dimensions.height}>
                <Elements />
              </Layer>
            </ElementRefsContainer.Provider>
          </RecoilBridge>
        </Stage>
      )}
    </div>
  );
}

export default ViewRenderer;
