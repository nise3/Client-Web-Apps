import {Box, Typography} from '@mui/material';
import {BorderColor} from '@mui/icons-material';
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

const PortfolioSection = () => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
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
    mutatePortfolios();
  }, []);

  const onDeletePortfolio = useCallback(async (itemId: number) => {
    let response = await deletePortfolio(itemId);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_deleted_successfully'
          values={{subject: <IntlMessages id='reference.label' />}}
        />,
      );
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
          icon={<BorderColor />}
          onClick={() => openPortfolioAddEditForm(null)}
        />
      }
      contentSkeleton={<BoxContentSkeleton />}>
      <HorizontalLine />
      {!portfolios || portfolios?.length == 0 ? (
        <>
          <Box sx={{display: 'flex'}}>
            <Typography style={{marginLeft: '15px'}}>
              {messages['common.no_data_found']}
            </Typography>
          </Box>
        </>
      ) : (
        <Box>
          <CustomCarousel>
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
