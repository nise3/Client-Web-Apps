import React from 'react';
import { DefaultFonts } from '../../constants';
import { ShapeType, TextConfig } from '../../interfaces/Shape';
import useElementsDispatcher from '../../state/dispatchers/elements';
import Button from '../ui/Button';
import SideMenuPanel from '../ui/SideMenuPanel';

const INPUT_PROPERTY = {
  candidateName: {
    text: 'Candidate Name',
    fontSize: 24,
    fontFamily: DefaultFonts.Regular,
    align: 'center',
    fillEnabled: true,
    fill: 'rgba(0, 0, 0, 1)',
    lineHeight: 1,
    shadowEnabled: false,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowBlur: 5,
    strokeEnabled: false,
    stroke: 'rgba(0, 0, 0, 1)',
    strokeWidth: 1,
    class: 'candidate-name',
  },
  fatherName: {
    text: 'Father Name',
    fontSize: 24,
    fontFamily: DefaultFonts.Regular,
    align: 'center',
    fillEnabled: true,
    fill: 'rgba(0, 0, 0, 1)',
    lineHeight: 1,
    shadowEnabled: false,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowBlur: 5,
    strokeEnabled: false,
    stroke: 'rgba(0, 0, 0, 1)',
    strokeWidth: 1,
    class: 'father-name',
  },
  motherName: {
    text: 'Mother Name',
    fontSize: 24,
    fontFamily: DefaultFonts.Regular,
    align: 'center',
    fillEnabled: true,
    fill: 'rgba(0, 0, 0, 1)',
    lineHeight: 1,
    shadowEnabled: false,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowBlur: 5,
    strokeEnabled: false,
    stroke: 'rgba(0, 0, 0, 1)',
    strokeWidth: 1,
    class: 'mother-name',
  },
  candidateNid: {
    text: 'Candidate Nid',
    fontSize: 24,
    fontFamily: DefaultFonts.Regular,
    align: 'center',
    fillEnabled: true,
    fill: 'rgba(0, 0, 0, 1)',
    lineHeight: 1,
    shadowEnabled: false,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowBlur: 5,
    strokeEnabled: false,
    stroke: 'rgba(0, 0, 0, 1)',
    strokeWidth: 1,
    class: 'candidate-nid',
  },
  candidateBcid: {
    text: 'Candidate Birth ID',
    fontSize: 24,
    fontFamily: DefaultFonts.Regular,
    align: 'center',
    fillEnabled: true,
    fill: 'rgba(0, 0, 0, 1)',
    lineHeight: 1,
    shadowEnabled: false,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowBlur: 5,
    strokeEnabled: false,
    stroke: 'rgba(0, 0, 0, 1)',
    strokeWidth: 1,
    class: 'candidate-birth-cid',
  },
  batchName: {
    text: 'Batch Name',
    fontSize: 24,
    fontFamily: DefaultFonts.Regular,
    align: 'center',
    fillEnabled: true,
    fill: 'rgba(0, 0, 0, 1)',
    lineHeight: 1,
    shadowEnabled: false,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowBlur: 5,
    strokeEnabled: false,
    stroke: 'rgba(0, 0, 0, 1)',
    strokeWidth: 1,
    class: 'batch-name',
  },
  courseName: {
    text: 'Course Name',
    fontSize: 24,
    fontFamily: DefaultFonts.Regular,
    align: 'center',
    fillEnabled: true,
    fill: 'rgba(0, 0, 0, 1)',
    lineHeight: 1,
    shadowEnabled: false,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowBlur: 5,
    strokeEnabled: false,
    stroke: 'rgba(0, 0, 0, 1)',
    strokeWidth: 1,
    class: 'course-name',
  },
  trainingName: {
    text: 'Training Center',
    fontSize: 24,
    fontFamily: DefaultFonts.Regular,
    align: 'center',
    fillEnabled: true,
    fill: 'rgba(0, 0, 0, 1)',
    lineHeight: 1,
    shadowEnabled: false,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowBlur: 5,
    strokeEnabled: false,
    stroke: 'rgba(0, 0, 0, 1)',
    strokeWidth: 1,
    class: 'training-center',
  },
  batchStartDate: {
    text: 'Batch Start Date',
    fontSize: 24,
    fontFamily: DefaultFonts.Regular,
    align: 'center',
    fillEnabled: true,
    fill: 'rgba(0, 0, 0, 1)',
    lineHeight: 1,
    shadowEnabled: false,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowBlur: 5,
    strokeEnabled: false,
    stroke: 'rgba(0, 0, 0, 1)',
    strokeWidth: 1,
    class: 'batch-start-date',
  },
  batchEndDate: {
    text: 'Batch End Date',
    fontSize: 24,
    fontFamily: DefaultFonts.Regular,
    align: 'center',
    fillEnabled: true,
    fill: 'rgba(0, 0, 0, 1)',
    lineHeight: 1,
    shadowEnabled: false,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowBlur: 5,
    strokeEnabled: false,
    stroke: 'rgba(0, 0, 0, 1)',
    strokeWidth: 1,
    class: 'batch-end-date',
  },
  grade: {
    text: 'Grade',
    fontSize: 24,
    fontFamily: DefaultFonts.Regular,
    align: 'center',
    fillEnabled: true,
    fill: 'rgba(0, 0, 0, 1)',
    lineHeight: 1,
    shadowEnabled: false,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowBlur: 5,
    strokeEnabled: false,
    stroke: 'rgba(0, 0, 0, 1)',
    strokeWidth: 1,
    class: 'grade',
  },
  marks: {
    text: 'Marks',
    fontSize: 24,
    fontFamily: DefaultFonts.Regular,
    align: 'center',
    fillEnabled: true,
    fill: 'rgba(0, 0, 0, 1)',
    lineHeight: 1,
    shadowEnabled: false,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowBlur: 5,
    strokeEnabled: false,
    stroke: 'rgba(0, 0, 0, 1)',
    strokeWidth: 1,
    class: 'marks',
  },
};
// interface IYouthCertificateDetails {
//   certificate_id: number;
//   candidate_name: string;
//   father_name: string;
//   mother_name: string;
//   candidate_nid: string;
//   candidate_birth_cid: string;
//   batch_name: string;
//   batch_start_date: string;
//   batch_end_date: string;
//   course_name: string;
//   training_center: string;
//   grade: number;
// }
function InputToolPanel() {
  const {createElement} = useElementsDispatcher();

  const handleClickAddText = (input: string) => () => {
    //@ts-ignore
    createElement<TextConfig>(ShapeType.Input, INPUT_PROPERTY[input]);
  };

  return (
    <SideMenuPanel title='Input'>
      <div className='text-picker-button-container'>
        {Object.keys(INPUT_PROPERTY).map((value: string) => {
          return (
            <Button
              type='gray'
              className='text-picker-button'
              style={{fontFamily: DefaultFonts.Regular, fontWeight: 'normal'}}
              onClick={handleClickAddText(value)}>
              {
                //@ts-ignore
                INPUT_PROPERTY[value].text
              }
            </Button>
          );
        })}
      </div>
    </SideMenuPanel>
  );
}

export default InputToolPanel;
