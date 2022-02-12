import {useIntl} from 'react-intl';
import useNotiStack from '../../../../@softbd/hooks/useNotifyStack';
import {useAuthUser} from '../../../../@crema/utility/AppHooks';
import {YouthAuthUser} from '../../../../redux/types/models/CommonAuthUser';
import {useDispatch} from 'react-redux';
import {useFetchYouthAddresses} from '../../../../services/youthManagement/hooks';
import React, {useCallback, useEffect, useState} from 'react';
import {getYouthProfile} from '../../../../services/youthManagement/YouthService';
import {isResponseSuccess} from '../../../../@softbd/utilities/helpers';
import {UPDATE_AUTH_USER} from '../../../../redux/types/actions/Auth.actions';
import {getYouthAuthUserObject} from '../../../../redux/actions';
import {deleteAddressItem} from '../../../../services/youthManagement/AddressService';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import AddressAddEditPage from './addressAddEditPage';
import ContentLayout from '../component/ContentLayout';
import CustomParabolaButton from '../component/CustomParabolaButton';
import {Add} from '@mui/icons-material';
import HorizontalLine from '../component/HorizontalLine';
import {Avatar, Box, Typography} from '@mui/material';
import AddressViewPage from './addressViewPage';

const AddressSection = () => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const authUser = useAuthUser<YouthAuthUser>();
  const dispatch = useDispatch();
  const [isPresentAddressExists, setIsPresentAddressExists] = useState(false);
  const [isPermanentAddressExists, setIsPermanentAddressExists] =
    useState(false);

  const [addressFilter] = useState({});
  const [isOpenAddressAddEditForm, setIsOpenAddressAddEditForm] =
    useState<boolean>(false);
  const [addressId, setAddressId] = useState<number | null>(null);

  const {
    data: addresses,
    isLoading,
    mutate: mutateAddresses,
  } = useFetchYouthAddresses(addressFilter);

  useEffect(() => {
    if (addresses?.length > 0) {
      addresses.map((address: any) => {
        if (address?.address_type === 1) {
          setIsPresentAddressExists(true);
        } else if (address?.address_type === 2) {
          setIsPermanentAddressExists(true);
        }
      });
    }
  }, [addresses]);

  const openAddressAddEditFrom = useCallback((itemId: number | null = null) => {
    setAddressId(itemId);
    setIsOpenAddressAddEditForm(true);
  }, []);

  const closeAddressAddEditFrom = useCallback(() => {
    updateProfile();
    mutateAddresses();
    setIsOpenAddressAddEditForm(false);
  }, []);

  const updateProfile = () => {
    (async () => {
      const response = await getYouthProfile();
      if (isResponseSuccess(response) && response.data) {
        dispatch({
          type: UPDATE_AUTH_USER,
          payload: getYouthAuthUserObject({...authUser, ...response.data}),
        });
      }
    })();
  };

  const deleteAddress = useCallback(async (itemId: number) => {
    let response = await deleteAddressItem(itemId);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_deleted_successfully'
          values={{subject: <IntlMessages id='common.address' />}}
        />,
      );
      updateProfile();
      setIsPresentAddressExists(false);
      setIsPermanentAddressExists(false);
      mutateAddresses();
    }
  }, []);

  return isOpenAddressAddEditForm ? (
    <AddressAddEditPage itemId={addressId} onClose={closeAddressAddEditFrom} />
  ) : (
    <ContentLayout
      title={messages['common.address']}
      isLoading={isLoading}
      actions={
        isPresentAddressExists && isPermanentAddressExists ? (
          <CustomParabolaButton
            buttonVariant={'outlined'}
            title={messages['label.new_address'] as string}
            icon={<Add />}
            disabled={true}
          />
        ) : (
          <CustomParabolaButton
            buttonVariant={'outlined'}
            title={messages['label.new_address'] as string}
            icon={<Add />}
            onClick={() => openAddressAddEditFrom(null)}
          />
        )
      }>
      {!addresses || addresses?.length == 0 ? (
        <>
          <HorizontalLine />
          <Box sx={{display: 'flex'}}>
            <Avatar>T</Avatar>
            <Typography style={{marginLeft: '15px'}}>
              {messages['common.no_data_found']}
            </Typography>
          </Box>
        </>
      ) : (
        <AddressViewPage
          addresses={addresses}
          onOpenAddEditForm={openAddressAddEditFrom}
          onDeleteAddress={deleteAddress}
        />
      )}
    </ContentLayout>
  );
};

export default AddressSection;
