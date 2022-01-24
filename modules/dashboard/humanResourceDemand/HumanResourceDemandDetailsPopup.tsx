import {useIntl} from 'react-intl';
import {useFetchHrDemandDetails} from '../../../services/IndustryManagement/hooks';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import IconList from '../../../@softbd/icons/IconList';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {Button, Grid} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import React from 'react';

type Props = {
  itemId: number;
  onClose: () => void;
  onApprove: (id: any) => void;
};

const HumanResourceDemandDetailsPopup = ({itemId, ...props}: Props) => {
  const {messages} = useIntl();

  const {data: itemData, isLoading} = useFetchHrDemandDetails(itemId);

  return (
    <>
      <CustomDetailsViewMuiModal
        open={true}
        {...props}
        title={
          <>
            <IconList />
            <IntlMessages id='common.human_resource' />
          </>
        }
        maxWidth={'md'}
        actions={
          <>
            <Button
              color={'primary'}
              variant={'contained'}
              startIcon={<DoneIcon />}
              onClick={() => props.onApprove(itemData?.id)}>
              {messages['common.accept']}
            </Button>

            <Button
              variant={'contained'}
              startIcon={<DeleteIcon />}
              color={'secondary'}
              onClick={props.onClose}>
              {messages['common.reject']}
            </Button>
          </>
        }>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.institute_name']}
              value={itemData?.institute_name}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.industry_name']}
              value={itemData?.industry_name}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.skills']}
              value={itemData?.skills}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.no_of_vacancy']}
              value={itemData?.vacancy}
              isLoading={isLoading}
            />
          </Grid>
        </Grid>
      </CustomDetailsViewMuiModal>
    </>
  );
};

export default HumanResourceDemandDetailsPopup;
