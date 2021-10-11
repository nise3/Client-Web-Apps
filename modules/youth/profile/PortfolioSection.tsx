import {Box, Card, CardContent} from '@mui/material';
import CardHeader from './CardHeader';
import {BorderColor} from '@mui/icons-material';
import HorizontalLine from './component/HorizontalLine';
import CustomCarousel from '../../../@softbd/elements/display/CustomCarousel/CustomCarousel';
import React, {useCallback, useState} from 'react';
import {useIntl} from 'react-intl';
import CardItemWithButton from './component/CardItemWithButton';
import PortfolioAddEdit from './PortfolioAddEdit';
import {useFetchPortfolios} from '../../../services/youthManagement/hooks';

const PortfolioSection = () => {
  const {messages} = useIntl();
  const [portfolioId, setPortfolioId] = useState<number | null>(null);
  const {data: portfolios, mutate: mutatePortfolios} = useFetchPortfolios();
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

  return isOpenPortfolioAddEditForm ? (
    <PortfolioAddEdit
      itemId={portfolioId}
      onClose={closePortfolioAddEditForm}
    />
  ) : (
    <Card>
      <CardContent>
        <CardHeader
          headerTitle={messages['common.portfolio'] as string}
          buttons={[
            {
              label: messages['common.add_new_portfolio'] as string,
              icon: <BorderColor />,
              onclick: () => openPortfolioAddEditForm(null),
            },
          ]}
        />
      </CardContent>
      <HorizontalLine />
      <Box>
        <CustomCarousel>
          {(portfolios || []).map((portfolio: any) => {
            return (
              <React.Fragment key={portfolio?.id}>
                <CardItemWithButton
                  portfolio={portfolio}
                  onClick={() => openPortfolioAddEditForm(portfolio?.id)}
                />
              </React.Fragment>
            );
          })}
        </CustomCarousel>
      </Box>
    </Card>
  );
};
export default PortfolioSection;
