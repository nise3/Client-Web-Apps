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
import {useRouter} from 'next/router';
import {getCertificateIssueByIssueId} from '../../../../../../services/CertificateAuthorityManagement/CertificateIssueService';
import {
  getYouthProfile,
  getYouthProfileById,
} from '../../../../../../services/youthManagement/YouthService';
import {getBatch} from '../../../../../../services/instituteManagement/BatchService';
import {getCertificateById} from '../../../../../../services/CertificateAuthorityManagement/CertificateService';
import useNotiStack from '../../../../../../@softbd/hooks/useNotifyStack';
import {GiConsoleController} from 'react-icons/gi';

interface IYouthCertificateDetails {
  certificate_id: number;
  candidate_name: string;
  father_name: string;
  mother_name: string;
  candidate_nid: string;
  candidate_birth_cid: string;
  batch_name: string;
  batch_start_date: string;
  batch_end_date: string;
  course_name: string;
  training_center: string;
  grade: number;
}

function ViewRenderer() {
  const {errorStack} = useNotiStack();
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
  const [youthInfoData, setYouthInfoData] = useState<
    Partial<IYouthCertificateDetails> | undefined
  >({
    grade: 5,
  });
  const [certificateId, setCertificateId] = useState<any>(null);
  const [template, setTemplate] = useState<boolean | null>(null);

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

  const router = useRouter();
  const {query} = router;

  useEffect(() => {
    getCertificateIssueByIssueId(query.certificateIssueId).then((res) => {
      const issueInfo = res.data;
      setCertificateId(issueInfo.certificate_id);
      getYouthProfileById(issueInfo.youth_id).then((response) => {
        const {data: youth} = response;
        setYouthInfoData((prev) => {
          return {
            ...prev,
            ...{
              candidate_name: `${youth.first_name_en} ${youth.last_name_en}`,
              candidate_nid:
                youth.identity_number_type === 1 ? youth.identity_number : null,
              candidate_birth_cid:
                youth.identity_number_type === 2 ? youth.identity_number : null,
            },
          };
        });
      });

      getBatch(issueInfo.batch_id).then((response) => {
        const {data: batch} = response;
        setYouthInfoData((prev) => {
          return {
            ...prev,
            ...{
              batch_name: batch.title,
              batch_start_date: batch.batch_start_date,
              batch_end_date: batch.batch_end_date,
              course_name: batch.course_title,
              training_center: batch.training_center_title_en,
            },
          };
        });
      });
    });
  }, [query]);

  const loadTemplate = async (templateJson: any, youthInfo: any) => {
    // const template = JSON.parse(t);
    // template.elements.map((t: any) => {
    //   if (t.type === 'input') {
    //     console.log(t.props.class);
    //     //@ts-ignore
    //     console.log('name: ', youthInfo[t.props.class]);
    //     //@ts-ignore
    //     t.props.text = youthInfo[t.props.class];
    //     t.props.align = 'center';
    //     console.log(t);
    //   }
    //   return 1;
    // });
    setLoadedTemplate(templateJson, getScreenDimensions());
  };

  useEffect(() => {
    if (youthInfoData?.batch_name && certificateId) {
      getCertificateById(1)
        .then((res) => {
          const {template} = res.data;
          const templateObj = JSON.parse(template);
          loadTemplate(templateObj, youthInfoData);
        })
        .catch((err) => {
          errorStack('Something Went Wrong');
        });
    }
  }, [youthInfoData, certificateId]);

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
