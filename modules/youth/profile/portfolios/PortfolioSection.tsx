import {Box, Typography} from '@mui/material';
import {Add} from '@mui/icons-material';
import HorizontalLine from '../component/HorizontalLine';
import CustomCarousel from '../../../../@softbd/elements/display/CustomCarousel/CustomCarousel';
import React, {useCallback, useState} from 'react';
import {useIntl} from 'react-intl';
import CardItemWithButton from '../component/CardItemWithButton';
import PortfolioAddEdit from './PortfolioAddEdit';
import {useFetchPortfolios} from '../../../../services/youthManagement/hooks';
import CustomParabolaButton from '../component/CustomParabolaButton';
import ContentLayout from '../component/ContentLayout';
import BoxContentSkeleton from '../component/BoxContentSkeleton';
import {deletePortfolio} from '../../../../services/youthManagement/PortfolioService';
import {isResponseSuccess} from '../../../../@softbd/utilities/helpers';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import useNotiStack from '../../../../@softbd/hooks/useNotifyStack';
import {getYouthProfile} from '../../../../services/youthManagement/YouthService';
import {UPDATE_AUTH_USER} from '../../../../redux/types/actions/Auth.actions';
import {getYouthAuthUserObject} from '../../../../redux/actions';
import {useAuthUser} from '../../../../@crema/utility/AppHooks';
import {YouthAuthUser} from '../../../../redux/types/models/CommonAuthUser';
import {useDispatch} from 'react-redux';
import NoDataFoundComponent from '../../common/NoDataFoundComponent';

const PortfolioSection = () => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const authUser = useAuthUser<YouthAuthUser>();
  const dispatch = useDispatch();
  const [portfolioId, setPortfolioId] = useState<number | null>(null);
  const {
    data: portfolios,
    isLoading,
    mutate: mutatePortfolios,
  } = useFetchPortfolios();
  const [isOpenPortfolioAddEditForm, setIsOpenPortfolioAddEditForm] =
    useState<boolean>(false);

  const openPortfolioAddEditForm = useCallback(
    (itemId: number | null = null) => {
      setPortfolioId(itemId);
      setIsOpenPortfolioAddEditForm(true);
    },
    [],
  );
  const closePortfolioAddEditForm = useCallback(() => {
    setPortfolioId(null);
    setIsOpenPortfolioAddEditForm(false);
    updateProfile();
    mutatePortfolios();
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

  const onDeletePortfolio = useCallback(async (itemId: number) => {
    let response = await deletePortfolio(itemId);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_deleted_successfully'
          values={{subject: <IntlMessages id='common.portfolio' />}}
        />,
      );
      updateProfile();
      mutatePortfolios();
    }
  }, []);

  return isOpenPortfolioAddEditForm ? (
    <PortfolioAddEdit
      itemId={portfolioId}
      onClose={closePortfolioAddEditForm}
    />
  ) : (
    <ContentLayout
      title={messages['common.portfolio']}
      isLoading={isLoading}
      actions={
        <CustomParabolaButton
          buttonVariant={'outlined'}
          title={messages['common.add_new_portfolio'] as string}
          icon={<Add />}
          onClick={() => openPortfolioAddEditForm(null)}
        />
      }
      contentSkeleton={<BoxContentSkeleton />}>
      <HorizontalLine />
      {!portfolios || portfolios?.length == 0 ? (
        <>
          <Box sx={{display: 'flex'}}>
            <Typography style={{marginLeft: '15px'}}>
              <NoDataFoundComponent
                messageType={messages['common.portfolio']}
                messageTextType={'inherit'}
              />
            </Typography>
          </Box>
        </>
      ) : (
        <Box>
          <CustomCarousel itemsInDesktop={3}>
            {(portfolios || []).map((portfolio: any) => {
              return (
                <React.Fragment key={portfolio?.id}>
                  <CardItemWithButton
                    portfolio={portfolio}
                    onDeletePortfolio={onDeletePortfolio}
                    onClick={() => openPortfolioAddEditForm(portfolio?.id)}
                  />
                </React.Fragment>
              );
            })}
          </CustomCarousel>
        </Box>
      )}
    </ContentLayout>
  );
};
export default PortfolioSection;
