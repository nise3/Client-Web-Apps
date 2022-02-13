import {IAddress} from '../../../../services/youthManagement/typing';
import {useIntl} from 'react-intl';
import {useCustomStyle} from '../../../../@softbd/hooks/useCustomStyle';
import HorizontalLine from '../component/HorizontalLine';
import React from 'react';
import {styled} from '@mui/material/styles';
import {Box, Grid} from '@mui/material';
import {Fonts, ThemeMode} from '../../../../shared/constants/AppEnums';
import CustomParabolaButton from '../component/CustomParabolaButton';
import {BorderColor} from '@mui/icons-material';
import CircularDeleteButton from '../component/CircularDeleteButton';
import {H3} from '../../../../@softbd/elements/common';

const PREFIX = 'AddressViewPage';
const classes = {
  textStyle: `${PREFIX}-textStyle`,
};

const StyledGrid = styled(Grid)(({theme}) => ({
  [`& .${classes.textStyle}`]: {
    color:
      theme.palette.mode === ThemeMode.DARK
        ? theme.palette.common.white
        : theme.palette.common.black,
    fontWeight: Fonts.BOLD,
  },
}));

interface Props {
  addresses: Array<IAddress>;
  onOpenAddEditForm: (itemId: number) => void;
  onDeleteAddress: (itemId: number) => void;
}

const AddressViewPage = ({
  addresses,
  onOpenAddEditForm,
  onDeleteAddress,
}: Props) => {
  const {messages} = useIntl();
  const style = useCustomStyle();

  const getAddressString = (address: IAddress) => {
    const addressStr: Array<string> = [];

    if (address && address.house_n_road) {
      addressStr.push(address.house_n_road);
    }
    if (address && address.village_or_area) {
      addressStr.push(address.village_or_area);
    }
    if (address && address.zip_or_postal_code) {
      addressStr.push('postcode-' + address.zip_or_postal_code);
    }
    if (address && address.loc_upazila_title) {
      addressStr.push(address.loc_upazila_title);
    }
    if (address && address.loc_district_title) {
      addressStr.push(address.loc_district_title);
    }
    if (address && address.loc_division_title) {
      addressStr.push(address.loc_division_title);
    }

    return addressStr.join(', ');
  };

  return (
    <>
      {addresses.map((address: IAddress) => (
        <React.Fragment key={address.id}>
          <HorizontalLine />
          <StyledGrid container spacing={2}>
            <Grid item xs={12} sm={8} md={8}>
              <H3 sx={{...style.subtitle2}} className={classes.textStyle}>
                {address.address_type == 1
                  ? messages['common.present_address']
                  : address.address_type == 2
                  ? messages['common.permanent_address']
                  : messages['common.other_address']}
              </H3>
              {getAddressString(address)}
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <CustomParabolaButton
                  buttonVariant={'outlined'}
                  title={messages['common.edit_btn'] as string}
                  icon={<BorderColor />}
                  onClick={() => {
                    onOpenAddEditForm(address.id);
                  }}
                />
                <CircularDeleteButton
                  deleteAction={() => {
                    onDeleteAddress(address.id);
                  }}
                  deleteTitle={'delete'}
                />
              </Box>
            </Grid>
          </StyledGrid>
        </React.Fragment>
      ))}
    </>
  );
};

export default AddressViewPage;
