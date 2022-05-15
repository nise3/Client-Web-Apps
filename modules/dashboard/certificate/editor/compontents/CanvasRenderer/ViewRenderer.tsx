import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { Layer, Rect, Stage } from 'react-konva';
import { useRecoilBridgeAcrossReactRoots_UNSTABLE, useRecoilValue } from 'recoil';
import useNotiStack from '../../../../../../@softbd/hooks/useNotifyStack';
import { getCertificateIssueByIssueId } from '../../../../../../services/CertificateAuthorityManagement/CertificateIssueService';
import { getCertificateById } from '../../../../../../services/CertificateAuthorityManagement/CertificateService';
import { getBatch } from '../../../../../../services/instituteManagement/BatchService';
import { getGuardianByYouthId } from '../../../../../../services/youthManagement/GuardianService';
import {
  getYouthProfileById
} from '../../../../../../services/youthManagement/YouthService';
import { CERTIRICATE_LANGUAGE } from '../../../Constants';
import { CANVAS_STROKE, EDITOR_MARGIN } from '../../constants';
import useRatioControls from '../../hooks/useRatioControl';
import { Dimensions } from '../../interfaces/StageConfig';
import { isLoadingState, ratioState } from '../../state/atoms/editor';
import { backgroundState, dimensionsState } from '../../state/atoms/template';
import { ElementRefsContainer } from '../../state/containers//ElementRefsContainer';
import { EditorAreaContainer } from '../../state/containers/EditorAreaContainer';
import { StageRefContainer } from '../../state/containers/StageRefContainer';
import useTemplateDispatcher from '../../state/dispatchers/template';
import { loadTemplateImages } from '../../utils/template';
import Elements from './Elements';

interface IYouthCertificateDetails {
  'candidate-name': string;
  'father-name': string;
  'mother-name': string;
  'candidate-nid': string;
  'candidate-birth-cid': string;
  'batch-name': string;
  'batch-start-date': string;
  'batch-end-date': string;
  'course-name': string;
  'training-center': string;
  grade: number;
  marks: number;
}

function ViewRenderer() {
  const { errorStack } = useNotiStack();
  const ratio = useRecoilValue(ratioState);
  const dimensions = useRecoilValue(dimensionsState);
  const background = useRecoilValue(backgroundState);
  const isLoading = useRecoilValue(isLoadingState);
  const RecoilBridge = useRecoilBridgeAcrossReactRoots_UNSTABLE();
  const { fitToScreen } = useRatioControls();
  const { getScreenDimensions } = EditorAreaContainer.useContainer();
  const { setLoadedTemplate } = useTemplateDispatcher();
  const { editorAreaRef, setScreenDimensions } =
    EditorAreaContainer.useContainer();
  const { stageAreaRef } = StageRefContainer.useContainer();

  const [containerDimensions, setContainerDimensions] = useState<
    Dimensions | undefined
  >();
  const [youthInfoData, setYouthInfoData] = useState<
    Partial<IYouthCertificateDetails> | undefined
  >({
    grade: 5,
  });
  const [certificateId, setCertificateId] = useState<any>(null);

  useEffect(() => {
    if (editorAreaRef.current) {
      const containerDimensions = editorAreaRef.current.getBoundingClientRect();
      setContainerDimensions(containerDimensions);

      setScreenDimensions({
        width: containerDimensions.width - 2 * EDITOR_MARGIN,
        height: 500 - 2 * EDITOR_MARGIN,
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
  const { query } = router;

  useEffect(() => {
    getCertificateIssueByIssueId(query.certificateIssueId).then((res) => {
      const issueInfo = res.data;
      setCertificateId(issueInfo.certificate_id);
      Promise.all([
        getYouthProfileById(issueInfo.youth_id).then(res => res.data),
        getBatch(issueInfo.batch_id).then(res => res.data),
        // getGuardianByYouthId(issueInfo.youth_id)
        getGuardianByYouthId(9).then(res => res.data),
        getCertificateById(issueInfo.certificate_id)
      ]).then(resp => {
        const youth = resp[0];
        const batch = resp[1];
        const gardian = resp[2] as any[] | undefined;
        const certificate = resp[3];
        let father_name:any = null;
        let mother_name:any = null;
        const isBangla = certificate.data.language == CERTIRICATE_LANGUAGE.BANGLA;
        // console.log('certificate.data.language' , certificate.data.language)
        if(gardian && gardian.length > 0){
          father_name = gardian.find((e:any)=> e.relationship_type == 1)[isBangla ? 'name' : 'name_en'];
          mother_name = gardian.find((e:any)=> e.relationship_type == 2)[isBangla ? 'name' : 'name_en'];
        }
        // console.log(gardian, father_name, mother_name)

        setYouthInfoData((prev) => {

          const youboj = {
            'candidate-name': `${youth[isBangla ? 'first_name' : 'first_name_en']} ${youth[isBangla ? 'last_name' : 'last_name_en']}`,
            'candidate-nid':
              youth.identity_number_type === 1 ? youth.identity_number : null,
            'candidate-birth-cid':
              youth.identity_number_type === 2 ? youth.identity_number : null,
            'batch-name': batch[isBangla ? 'title' : 'title_en'],
            'batch-start-date': batch.batch_start_date,
            'batch-end-date': batch.batch_end_date,
            'course-name': batch[isBangla ? 'course_title' : 'course_title_en'],
            'training-center': batch[isBangla ? 'training_center_title' : 'training_center_title_en'],
            'father-name': father_name,
            'mother-name': mother_name
          }

          return {
            ...prev,
            ...youboj,
          };
        });
      });
    })

}, [query]);

const loadTemplate = async (template: any, youthInfo: any) => {
  template.elements.map((t: any) => {
    if (t.type === 'input') {
      //@ts-ignore
      t.props.text = youthInfo[t.props.class];
    }
  });
  await loadTemplateImages(template),
    setLoadedTemplate(template, getScreenDimensions());
};

useEffect(() => {
  if (certificateId) {
    getCertificateById(certificateId)
      .then((res) => {
        const { template } = res.data;
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
console.log(area);

return (
  <div
    className={`view-area-container ${isLoading ? 'view-area-container-loading' : ''
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
        // offsetX={area.offset.x}
        // offsetY={area.offset.y}
        width={area.stageDimensions.width + area.offset.x}
        height={area.stageDimensions.height + area.offset.y}
        ref={stageAreaRef}
        listening={false}>
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
