import React, {useEffect, useRef} from 'react';
import {useIntl} from 'react-intl';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import {Grid} from '@mui/material';
import IconDivision from '../../../@softbd/icons/IconDivision';
import {useFetchCertificate} from '../../../services/locationManagement/hooks';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import * as konva from 'konva';
import dynamic from 'next/dynamic';
import {Stage, Layer, Rect} from 'react-konva';
type Props = {
  itemId: number;
  onClose: () => void;
  onEdit: (id: number) => void;
};

const CertificateViewPopup = ({itemId, onEdit, ...props}: Props) => {
  //   const {data: itemData, isLoading} = useFetchCertificate(itemId);
  const {messages} = useIntl();
  const stageRef = useRef(null);
  const Konva = konva.default;
  const {data: itemData, isLoading} = {
    data: {
      id: 1,
      title: 'Certificate of Pyhton Intermidate Course',
      result_type: 'Grading',
      purpose_name: 'BATCHES',
    },
    isLoading: false,
  };

  useEffect(() => {
    console.log(stageRef.current);
  }, []);

  return (
    <>
      <CustomDetailsViewMuiModal
        maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
        open={true}
        {...props}
        title={
          <>
            <IconDivision />
            <IntlMessages id='divisions.label' />
          </>
        }
        actions={
          <>
            <CancelButton onClick={props.onClose} isLoading={isLoading} />
            <EditButton
              onClick={() => onEdit(itemData?.id)}
              isLoading={isLoading}
            />
          </>
        }>
        <Grid container spacing={4}>
          <Grid item md={12}>
            <Stage
              //@ts-ignore
              width={window.innerWidth * 0.6}
              height={window.innerHeight * 0.6}>
              <Layer>
                <Rect //@ts-ignore
                  width={50}
                  height={50}
                  fill='red'
                />
                <Rect //@ts-ignore
                  width={50}
                  height={50}
                  fill='black'
                />
              </Layer>
            </Stage>{' '}
          </Grid>
        </Grid>
      </CustomDetailsViewMuiModal>
    </>
  );
};

export default CertificateViewPopup;
